
manifest:
  version: 1.0

automations:
  check_moment_dependency:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: |
             Result of `moment` is `{{ checkMomentDependency }}`
  help_with_review:
    if:
      - true
    run:
      - action: add-comment@v1
        args:
          comment: "{{ repo | testingRequest() | prependTitle("gitStream Code Review") | toBase64String }}"

moment_result: {{ repo | checkMomentDependency }}