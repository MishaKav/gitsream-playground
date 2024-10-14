# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  pr_approved:
    if:
      - {{ source.diff.files | match(attr='new_file', term='serverless.yml') | some }}
    run:
      - action: add-comment@v1
        args:
          comment: |
            Hello true {{ "" | getTimestamp() }}

  pr_approved_2:
    if:
      - false
    run:
      - action: add-comment@v1
        args:
          comment: |
            Hello false {{ "" | getTimestamp() }}
