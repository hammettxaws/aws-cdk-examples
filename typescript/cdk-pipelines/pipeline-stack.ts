import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";


export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(this, 'Repository',
      'example'
    )

    const pipeline = new CodePipeline(this, 'pipeline', {
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

    // Add additional stages
    // See: https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html#cdk_pipeline_stages
    // pipeline.addStage(new AppStage(this, "App", {
    //   env: { ... }
    // }));
  }
}
