# CDK Pipelines

This example creates the infrastructure for a CodePipeline Pipeline that deploys a sample stack across multiple AWS accounts.

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

## CDK Bootstrapping

[Bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) is the process of preparing an environment for deployment. Bootstrapping is a one-time action that you must perform for every environment that you deploy resources into.

As we are deploying across accounts you will need to bootstrap all environments referencing their account/region pairs.

```bash
# bootstrap pipeline account 
npm run cdk -- --profile PIPELINE_PROFILE bootstrap PIPELINE_ACCOUNT/PIPELINE_REGION --cloudformation-execution-policies 'arn:aws:iam::aws:policy/AdministratorAccess'

# bootstrap target account, allowing (--trust) the pipeline account to deploy into the environment as well as allowing (--trust-for-lookup) the pipeline account to view context information.
npm run cdk -- --profile TARGET_PROFILE bootstrap TARGET_ACCOUNT/TARGET_REGION --cloudformation-execution-policies 'arn:aws:iam::aws:policy/AdministratorAccess' --trust PIPELINE_ACCOUNT --trust-for-lookup PIPELINE_ACCOUNT
```

## Environment Variables

Copy [.env.example](./.env.example) to `.env` and update account and region details.

## Deploying

```bash
npm install
npm run cdk -- deploy CrossAccountPipelineStack
```

## Clean up

Once you're done, remove the resources you have created. Back up any data prior to running the following commands.

```bash
# destroy the CloudFormation stack
npm run cdk -- destroy CrossAccountPipelineStack
# delete the CodeCommit repository
aws codecommit delete-repository --repository-name example
```
