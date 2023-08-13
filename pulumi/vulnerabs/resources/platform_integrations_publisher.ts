import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'
import {
  addEventBridgeRuleTarget,
  LambdaDeclaration,
  LambdaUtils,
} from 'cn-pulumi-utils'
import { Config, LayerOutput, SharedResources } from 'cn-pulumi-utils/types'
import { ResourceHelper } from './resourceHelper'

export const createPlatformIntegrationsPublisherLambda = (
  resourceHelper: ResourceHelper,
  envConfig: Config,
  sharedResources: SharedResources,
  servicePath: string,
  cePath: string,
  service: string,
  vulnerabsLayers: LayerOutput[],
  lambdaVariables: pulumi.Input<aws.types.input.lambda.FunctionEnvironment>
) => {
  const { ENV, AWS_ACCOUNT: ACCOUNT_ID } = envConfig
  const lambdaUtils = new LambdaUtils(sharedResources.cnPythonLayerArn)
  // PIP = PlatformIntegrationsPublisher -> because it is the longest name ever
  const PIPLambdaPolicy = resourceHelper.getVulnerabsLambdaPolicy(
    ENV + 'PIPLambdaPolicy'
  )

  const createLambda = (
    lambda: LambdaDeclaration,
    policies: pulumi.Output<string>[] = [PIPLambdaPolicy.arn],
    envVars: pulumi.Input<aws.types.input.lambda.FunctionEnvironment> = lambdaVariables
  ) => {
    return lambdaUtils.createLambdaResource(
      lambda,
      service,
      servicePath,
      cePath,
      vulnerabsLayers,
      envVars,
      policies,
      sharedResources.sqsDlqArn,
      ENV
    )
  }

  const pipLambdaDeclaration: LambdaDeclaration = {
    path: 'platform_integrations_publisher',
    handler:
      'functions.platform_integrations_publisher.platform_integrations_publisher.handler',
    description:
      'Convert serverless vulnerabs into platform integrations events',
    common: true,
    timeout: 30,
  }
  const vulnerabsPIPLambda = createLambda(pipLambdaDeclaration, [
    PIPLambdaPolicy.arn,
    sharedResources.eventsBucketGetPolicyArn,
    sharedResources.eventsBucketPutPolicyArn,
    sharedResources.putMetricDataPolicyArn,
  ])
  addEventBridgeRuleTarget(ENV, vulnerabsPIPLambda, ACCOUNT_ID, [
    'newVulnerabilityFound/v1',
  ])
}