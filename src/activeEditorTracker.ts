'use strict';
import { commands, Disposable, TextEditor, window } from 'vscode';
import { BuiltInCommands } from './constants';

export class ActiveEditorTracker extends Disposable {

    private _disposable: Disposable;
    private _resolver: ((editor?: TextEditor | PromiseLike<TextEditor>) => void) | undefined;

    constructor() {
        super(() => this.dispose());

        this._disposable = window.onDidChangeActiveTextEditor(e => this._resolver && this._resolver(e));
    }

    dispose() {
        this._disposable && this._disposable.dispose();
    }

    async awaitClose(timeout: number = 500): Promise<TextEditor> {
        this.close();
        return this.wait(timeout);
    }

    async awaitNext(timeout: number = 500): Promise<TextEditor> {
        this.next();
        return this.wait(timeout);
    }

    async close(): Promise<{} | undefined> {
        return commands.executeCommand(BuiltInCommands.CloseActiveEditor);
    }

    async next(): Promise<{} | undefined> {
        return commands.executeCommand(BuiltInCommands.NextEditor);
    }

    async wait(timeout: number = 500): Promise<TextEditor> {
        const editor = await new Promise<TextEditor>((resolve, reject) => {
            let timer: any;

            this._resolver = (editor?: TextEditor | PromiseLike<TextEditor>) => {
                if (timer && editor) {
                    clearTimeout(timer as any);
                    timer = 0;
                    resolve(editor);
                }
            };

            timer = setTimeout(() => {
                if (window.activeTextEditor) {
                    resolve(window.activeTextEditor);
                    timer = 0;
                } else {
                    reject(new Error('Active text editor is not available'));
                }
            }, timeout) as any;
        });
        this._resolver = undefined;
        return editor;
    }
}
