import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from './pipeline-stack';

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack', {
  // env: {
  //   account: process.env.CDK_DEFAULT_ACCOUNT,
  //   region: process.env.CDK_DEFAULT_REGION,
  // },
});
