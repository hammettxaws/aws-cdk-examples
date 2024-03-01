import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { StageApp } from "./stage-app";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(this, 'Repository',
      'example'
    )

    const pipeline = new CodePipeline(this, 'pipeline', {
      crossAccountKeys: true,
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
        env: {
          PRIMARY_ACCOUNT: process.env.PRIMARY_ACCOUNT as string,
          PRIMARY_REGION: process.env.PRIMARY_REGION as string,
          DEV_ACCOUNT: process.env.DEV_ACCOUNT as string,
          DEV_REGION: process.env.DEV_REGION as string,
          PROD_ACCOUNT: process.env.PROD_ACCOUNT as string,
          PROD_REGION: process.env.PROD_REGION as string,

        }
      }),
    });

    // Deploy application stack for development
    pipeline.addStage(new StageApp(this, "Development", {
      env: {
        account: process.env.DEV_ACCOUNT,
        region: process.env.DEV_REGION,
      }
    }));

    // Deploy application stack for production
    pipeline.addStage(new StageApp(this, "Production", {
      env: {
        account: process.env.PROD_ACCOUNT,
        region: process.env.PROD_REGION,
      }
    }));
  }
}
