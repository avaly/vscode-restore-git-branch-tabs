'use strict';
import { TextDocumentShowOptions, TextEditor, ViewColumn, window, workspace } from 'vscode';
import { IConfig, defaultIConfig } from './configuration';
import { ExtensionKey } from './constants';
import { Logger } from './logger';

export interface ISavedEditor {
    fsPath: string;
    viewColumn: ViewColumn;
}

export class SavedEditor {

    fsPath: string;
    viewColumn: ViewColumn;

    constructor(savedEditor: ISavedEditor) {
        this.fsPath = savedEditor.fsPath;
        this.viewColumn = savedEditor.viewColumn;
    }

    toString = () : string => {
        return `SavedEditor{fsPath:${this.fsPath};viewColumn:${this.viewColumn}}`;
    }

    async open() {
        const defaults: TextDocumentShowOptions = {
            viewColumn: this.viewColumn,
            preserveFocus: true,
            preview: false
        };

        let cfg = workspace.getConfiguration().get<IConfig>(ExtensionKey);
        if (cfg === undefined) {
            cfg = defaultIConfig;
        }
        let cfgTerminalFocus = cfg.returnFocusOnTerminal

        Logger.log(`SavedEditor.open: Opening this <${this}>`);

        const active_terminal = window.activeTerminal

        openEditor(this.fsPath, defaults);

        /* 
        Restoring the terminal focus since some people may be using
        it to switch branches.
        */
        if (active_terminal != undefined && cfgTerminalFocus) {
            Logger.log(`Returning focus to terminal <${active_terminal.name}>`);
            active_terminal.show();
        }
    }
}

async function openEditor(fsPath: string, options: TextDocumentShowOptions): Promise<TextEditor | undefined> {
    try {
        const document = await workspace.openTextDocument(fsPath);
        return window.showTextDocument(document, options);
    }
    catch (err) {
        Logger.error(err as Error, 'openEditor');
        return undefined;
    }
}
