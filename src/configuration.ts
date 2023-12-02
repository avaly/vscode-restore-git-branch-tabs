'use strict';
import { OutputLevel } from './logger';

export interface IConfig {
    newBranchPreserveTabs: boolean;
    gitFolderLocation: string;
    delayUpdate: number;
    debug: boolean;
    outputLevel: OutputLevel;
    skipCommitsWithoutBranch: boolean;
    returnFocusOnTerminal: boolean;
}

export const defaultIConfig: IConfig = {
    newBranchPreserveTabs: false,
    gitFolderLocation: '',
    delayUpdate: 0,
    debug: false,
    outputLevel: 'silent',
    skipCommitsWithoutBranch: false,
    returnFocusOnTerminal: false
}
