import { Stack, StackProps, Stage, StageProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export class StageApp extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);

      new StackApp(this, 'AppStack');
    }
}

export class StackApp extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);

      // SSM is being used to demonstrate some configuration being deployed.
      new StringParameter(this, 'AppParameter', {
        allowedPattern: '.*',
        description: 'App configuration',
        stringValue: 'Application string',
      });
    }
}