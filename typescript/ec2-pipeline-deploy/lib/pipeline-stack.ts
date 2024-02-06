import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { SingleStage } from './single-stage';
import { AutoscalingStage } from './autoscaling-stage';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(this, 'Repository',
      'ec2-example'
    )

    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.codeCommit(repository, 'main'),
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    // deploy in parallel, also known as in a wave
    const waveApps = pipeline.addWave('Applications')
    waveApps.addStage(new SingleStage(this, `Single`))
    waveApps.addStage(new AutoscalingStage(this, `Autoscaling`))
  }
}
