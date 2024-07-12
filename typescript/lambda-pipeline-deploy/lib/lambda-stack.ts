import { Stack, StackProps, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class StageLambdaApp extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new StackLambdaApp(this, 'LambdaStack');
    }
}

export class StackLambdaApp extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const fnApp = new lambda.Function(this, 'appFunction', {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'index.handler',

        });

        new apigw.LambdaRestApi(this, 'appApi', {
            handler: fnApp
        });
    }
}