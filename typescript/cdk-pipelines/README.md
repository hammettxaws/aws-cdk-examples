# CDK Pipelines

This example creates the infrastructure for a CodePipeline Pipeline that deploys a sample stack.

## Preparation

The CodePipeline Pipeline will trigger based on changes from a CodeCommit Repository `example`. This is required for the pipeline to successfully run, but not required for this stack to deploy.

For instructions on Creating a CodeCommit Repository see the [CodeCommit documentation](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html) or review the details below.

```bash
aws codecommit create-repository --repository-name example
git init && git branch -m main
git add . && git commit -m "project init"
git remote add origin ssh://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/example
git push origin main
```

## Deploying

```bash
$ npm install
$ npm run cdk -- deploy PipelineStack
```

## Clean up

Once you're done, remove the resources you have created. Back up any data prior to running the following commands.

```bash
# destroy the CloudFormation stack
npm run cdk -- destroy PipelineStack
# delete the CodeCommit repository
aws codecommit delete-repository --repository-name example
```
