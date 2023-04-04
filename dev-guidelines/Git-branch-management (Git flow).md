# Git Flow

We are using git flow to manage the git branches for our prototype development.

A  description of how git flow works can be found here: https://blog.knoldus.com/introduction-to-git-flow/
It is a rather quick read.

We extend these principles slightly by the following points.

## Branch & commit naming

### Branches

Our master branch is "main", our development branch is "develop".
The names of other branches must always start with the type of branch the are followed by a slash "/" and then a shorthand of what the branch contains.

For example a feature branch that develops a feature called "Mobile friendly menu UI" would be called "feat/mobile-menu".

The branch type prefixes are as follows:

| branch type | name prefix |
| ----------- | ----------- |
| feature     | feat/       |
| hot fix     | fix/        |
| release     | rel/        |

### Commits

Commits are initially always made to a hotfix-, feature-, or in rare cases a release-branch. After merging branches it can become difficult to see which commits are needed for which feature (for example when preparing a release that should include certain features but not others). To make this better trackable commit messages should always start with the shorthand name of the branch they were initially commited to excluding the branch type prefix.

For example a commit that adds better CSS styling for menu-buttons for the mobile friendly menu UI on the branch "feat/mobile-menu" could have the commit message "mobile-menu: Added mobile friendly CSS styling for menu-buttons"