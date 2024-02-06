import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import { Construct } from 'constructs';

export class AutoscalingStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new AutoscalingStack(this, 'AutoscalingStack');
  }
}

class AutoscalingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'AutoScalingVpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.1.2.0/24'),
      maxAzs: 3,
    })

    const instanceSg = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow ssh access to ec2 instances',
      allowAllOutbound: true
    });
    instanceSg.addIngressRule(
      ec2.Peer.ipv4('10.1.2.0/24'),
      ec2.Port.tcp(22), 'allow ssh access from within the vpc'
    );

    new autoscaling.AutoScalingGroup(this, 'AutoScalingGroup', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      associatePublicIpAddress: false,
      securityGroup: instanceSg,
      blockDevices: [
        {
            deviceName: '/dev/xvda',
            volume: autoscaling.BlockDeviceVolume.ebs(15, {
              volumeType: autoscaling.EbsDeviceVolumeType.GP3,
              throughput: 125,
            }),
          },
      ],
    });
  }
}