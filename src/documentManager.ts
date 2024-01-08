'use strict';
import { commands, Disposable, ExtensionContext, Tab, TabInputText, TextEditor, window, workspace } from 'vscode';
import { IConfig } from './configuration';
import { ExtensionKey, WorkspaceState, BuiltInCommands } from './constants';
import { Logger } from './logger';
import { ISavedEditor, SavedEditor } from './savedEditor';

export class DocumentManager extends Disposable {

    constructor(private context: ExtensionContext) {
        super(() => this.dispose());
    }

    dispose() { }

    clear() {
        let knownBranches = this.context.workspaceState.get<string[]>(WorkspaceState.KnownBranches, []);

        Logger.log('DocumentManager.clear: Deleting the known branches', knownBranches);

        knownBranches.forEach((branch) => {
            this.context.workspaceState.update(branch, undefined);
        });

        this.context.workspaceState.update(WorkspaceState.KnownBranches, undefined);
    }

    get(key: string): SavedEditor[] {
        const data = this.context.workspaceState.get<string>(key);

        Logger.log('DocumentManager.get: Got this data', data);

        const editors = (data && JSON.parse(data) as ISavedEditor[]) || [];

        return editors ? editors.map(item => new SavedEditor(item)) : [];
    }

    async open(key: string) {
        try {
            const editors = this.get(key);
            Logger.log(`DocumentManager.open: Branch <${key}> has these editors saved`, editors);

            // Use config option to determine if to close tabs if new branch has none saved
            let closeEditors = true;
            const cfg = workspace.getConfiguration().get<IConfig>(ExtensionKey);
            if (cfg != undefined && cfg.newBranchPreserveTabs && !editors.length) {
                closeEditors = false;
            }

            if (closeEditors) {
                await commands.executeCommand(BuiltInCommands.CloseAllEditors);
            }

            if (!editors.length) return;

            for (const editor of editors) {
                await editor.open();
            }
        }
        catch (err) {
            Logger.error(err as Error, 'DocumentManager.open');
        }
    }

    async save(key: string) {
        try {
            const editors: ISavedEditor[] = [];

            for (const tabGroup of window.tabGroups.all) {
                for (const tab of tabGroup.tabs) {
                    if (tab.input instanceof TabInputText) {
                        editors.push({
                            fsPath: tab.input.uri.fsPath,
                            viewColumn: 1
                        });
                    }
                }
            }

            Logger.log(`DocumentManager.save: Saving these editors ${JSON.stringify(editors)}`);

            this.context.workspaceState.update(key, JSON.stringify(editors));

            let knownBranches: string[];
            knownBranches = this.context.workspaceState.get<string[]>(WorkspaceState.KnownBranches, []);
            Logger.log('DocumentManager.save: List of known branches', knownBranches);

            if (knownBranches.indexOf(key) < 0) {
                knownBranches.push(key);
                Logger.log(`DocumentManager.save: This branch <${key}> not known, adding to list`);
                this.context.workspaceState.update(WorkspaceState.KnownBranches, knownBranches);
            }
        }
        catch (err) {
            Logger.error(err as Error, 'DocumentManager.save');
        }
    }
}
