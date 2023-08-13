addEventBridgeRuleTarget(ENV, vulnerabsPIPLambda, ACCOUNT_ID, [
  'newVulnerabilityFound/v1',
])