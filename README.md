> [!CAUTION]
>
> This extension is deprecated! It will receive no further updates.
>
> Use the [native "Save/restore open editors when switching branches" feature](https://code.visualstudio.com/updates/v1_89#_saverestore-open-editors-when-switching-branches) available starting with VSCode v1.89.

# Restore Git Branch Tabs Improved

> ⚠️ This is a fork of the original extension [Restore Git Branch Tabs](https://marketplace.visualstudio.com/items?itemName=gkotas.restore-git-branch-tabs), which had stalled in development.

Restore opened tabs on a per git branch basis.

Opened editors are saved for each branch in the workspace. Switching branches saves the currently opened editors and restores the editors that were opened when last editing the new branch.

This extension was heavily based off of the work done by [Eric Amodio](https://github.com/eamodio), specifically his [Restore Editors](https://github.com/eamodio/vscode-restore-editors/blob/master/README.md) extension.

![preview](images/preview.gif)

## Features

- Automatically saves editors when a git repository is detected in the workspace.

- New Branch Preserve Tabs: Option to keep tabs open when switching to a new branch instead of closing them.

- `Clear Saved Editors` command (`restoreGitBranchTabs:clear`) to clear all saved editors for every known branch.

- `Load Saved Editors` command (`restoreGitBranchTabs:load`) to manually load saved editors for the current branch.

- `Save Opened Editors` command (`restoreGitBranchTabs:save`) to manually save all open editors for the current branch.

## Extension Settings

| Name | Description
| ---- | -----------
|`restoreGitBranchTabs.debug` | Enable debug mode. Equivalent to `outputLevel` of `verbose`.
|`restoreGitBranchTabs.delayUpdate` | Delay (in milliseconds) to wait before restoring tabs after a git branch change. Useful when rebasing. Defaults to 0.
|`restoreGitBranchTabs.gitFolderLocation` | Path to directory of .git folder
|`restoreGitBranchTabs.newBranchPreserveTabs` | Preserve the current tabs when switching to a new branch. Defaults to `false`.
|`restoreGitBranchTabs.outputLevel` | Specifies the verbosity of the output channel. Allowed: 'silent' | 'errors' | 'verbose'. Defaults to `silent`
|`restoreGitBranchTabs.skipCommitsWithoutBranch` | Skip restore action on commits which are not the head of a branch. Useful when rebasing. Defaults to `false`.

## Known Issues

- View Columns are not used correctly meaning order of tabs isn't preserved.
- Extension doesn't activate if workspace is a subdirectory of a git repo (i.e. no .git in root of workspace)
