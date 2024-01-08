'use strict';
import { TextDocumentShowOptions, TextEditor, Uri, ViewColumn, window, workspace } from 'vscode';
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
        Logger.log(`SavedEditor.open: Opening this <${this}>`);

        try {
            const document = await workspace.openTextDocument(this.fsPath);

            return window.showTextDocument(document, {
                viewColumn: this.viewColumn,
                preserveFocus: true,
                preview: false
            });
        }
        catch (err) {
            Logger.error(err as Error, 'openEditor');
            return undefined;
        }
    }
}
