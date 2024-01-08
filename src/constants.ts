'use strict';

export const ExtensionKey = 'restoreGitBranchTabs';
export const ExtensionOutputChannelName = 'Restore Git Branch Tabs';

export type BuiltInCommands = 'workbench.action.nextEditor';
export const BuiltInCommands = {
    CloseAllEditors: 'workbench.action.closeAllEditors' as BuiltInCommands
};

export type WorkspaceState = 'restoreGitBranchTabs:knownBranches';
export const WorkspaceState = {
    KnownBranches: 'restoreGitBranchTabs:knownBranches' as WorkspaceState
};
