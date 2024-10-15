# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  ask_ai:
    if:
      - {{ pr.labels | match(term="askai") | some }}
    run:
      - action: add-comment@v1
        args:
          comment: |
            {{ pr.labels | match(term="askai") | some | testingRequest(repo) }}