# -*- mode: yaml -*-

manifest:
  version: 1.0

automations:
  pr_approved:
    if:
      - {{ pr.title.includes("add-comment") }}
    run:
      - action: add-label@v1
        args:
          label: 'askai'
      - action: add-comment@v1
        args:
          comment: |
            Hello true {{ "" | getTimestamp() }}

  # pr_approved_2:
  #   if:
  #     - true
  #   run:
  #     - action: set-required-approvals@v1
  #       args:
  #         approvals: 2