import { App} from 'aws-cdk-lib';
import 'dotenv/config'
import { PipelineStack } from './pipeline-stack';

const app = new App();
new PipelineStack(app, 'CrossAccountPipelineStack', {
  env: {
    account: process.env.PRIMARY_ACCOUNT,
    region: process.env.PRIMARY_REGION,
  },
});
