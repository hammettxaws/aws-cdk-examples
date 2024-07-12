# Lambda Pipeline Deploy

This example creates the infrastructure for a CodePipeline Pipeline that deploys a lambda function.

## Preparation

The CodePipeline Pipeline will trigger based on changes from a CodeCommit Repository `lambda-code`. This is required for the pipeline to successfully run, but not required for this stack to deploy.

For instructions on Creating a CodeCommit Repository see the [CodeCommit documentation](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html) or review the details below.

```bash
aws codecommit create-repository --repository-name lambda-app
git init && git branch -m main
git add . && git commit -m "project init"
git remote add origin ssh://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/lambda-app
git push origin main
```

## Deploying

```bash
npm install
npm run cdk -- deploy LambdaPipelineStack
```

## Clean up

Once you're done, remove the resources you have created. Back up any data prior to running the following commands.

```bash
# destroy the CloudFormation stack
npm run cdk -- destroy LambdaPipelineStack
# delete the CodeCommit repository
aws codecommit delete-repository --repository-name lambda-app
```
