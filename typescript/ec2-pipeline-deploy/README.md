# EC2 Pipeline Deploy

This example creates the infrastructure for a CodePipeline Pipeline that deploys a number of EC2 instances in various ways.

To show different options of configuration the following stacks are include
- Single Stack - a single EC2 Instance using a community Amazon Machine Image.
- Autoscaling Stack - a single EC2 Instance in an Autoscaling Group using an Amazon Linux image.
- Gold Stack - a single EC2 Instance using a pre-baked Amazon Machine Image.

These are planned to be broken down into separate examples.

## Preparation

The CodePipeline Pipeline will trigger based on changes from a CodeCommit Repository `example`. This is required for the pipeline to successfully run, but not required for this stack to deploy.

For instructions on Creating a CodeCommit Repository see the [CodeCommit documentation](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-repository.html) or review the details below.

```bash
aws codecommit create-repository --repository-name ec2-example
git init -b main
git add . && git commit -m "project init"
git remote add origin ssh://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/ec2-example
git push origin main
```

## Deploying

```bash
npm install
npm run cdk -- deploy Ec2PipelineStack
```

## Clean up

Once you're done, remove the resources you have created. Back up any data prior to running the following commands.

```bash
# destroy the CloudFormation stack
npm run cdk -- destroy Ec2PipelineStack
npm run cdk -- destroy Ec2PipelineStack/**
# delete the CodeCommit repository
aws codecommit delete-repository --repository-name ec2-example
```
