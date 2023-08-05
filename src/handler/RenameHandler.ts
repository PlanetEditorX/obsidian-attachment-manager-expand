import { TFile, Vault, FileManager, FileSystemAdapter, normalizePath } from 'obsidian';
import * as Path from 'path';

import { Plugin } from "../Plugin"
import { VaultAttachmentConfiguration } from "../components/VaultAttachmentConfiguration"
import { buildFolderName, containsFilename } from "../Settings"

export class RenameHandler {
    vault: Vault
    plugin: Plugin
    adapter: FileSystemAdapter
    fileManager: FileManager
    vaultAttachmentConfiguration: VaultAttachmentConfiguration

    static build(plugin: Plugin) {
        const handler = new RenameHandler(plugin);
        return handler.handle.bind(handler);
    }

    constructor(plugin: Plugin) {
        this.vault = plugin.app.vault;
        this.plugin = plugin;
        this.adapter = plugin.adapter;
        this.fileManager = plugin.app.fileManager;
        this.vaultAttachmentConfiguration = plugin.vaultAttachmentConfiguration;
    }

    async handle(newFile: TFile, oldFilePath: string) {
        console.log('Handle Rename');

        if (newFile.extension !== 'md') {
            return;
        }

        // 未包含 filename，说明不是每个 md 文件一个附件文件夹
        if (!containsFilename(this.plugin.settings) || !this.plugin.settings.autoRenameFolder) {
            return;
        }
        const newFileName = newFile.basename;
        const newFolderName = buildFolderName(this.plugin.settings, newFileName);
        this.vaultAttachmentConfiguration.update(newFolderName)
        const newFolderPath = Path.join(Path.dirname(newFile.path), newFolderName);

        const oldFileName = Path.basename(oldFilePath, '.md');
        const oldFolderPath = Path.join(Path.dirname(oldFilePath), buildFolderName(this.plugin.settings, oldFileName));

        await this._renameFolder(oldFolderPath, newFolderPath);

        if (!this.plugin.settings.autoRenameFiles) {
            return;
        }

        await this._renameFiles(newFolderPath, newFileName, oldFileName)
    }

    async _renameFolder(oldFolderPath: string, newFolderPath: string) {
        if (await !this.adapter.exists(oldFolderPath) || oldFolderPath === newFolderPath) {
            return;
        }
        const oldFolder = this.vault.getAbstractFileByPath(oldFolderPath);

        if (oldFolder == null) {
            return;
        }

        await this.fileManager.renameFile(oldFolder, newFolderPath);

        // 父文件夹为空时，顺便删除父文件夹
        const oldFolderParentPath = Path.dirname(oldFolderPath);
        const oldFolderParentListedFiles = await this.adapter.list(oldFolderParentPath);
        if (oldFolderParentListedFiles.folders.length === 0 && oldFolderParentListedFiles.files.length === 0) {
            await this.adapter.rmdir(oldFolderParentPath, true);
        }
    }

    async _renameFiles(newFolderPath: string, newFileName: string, oldFileName: string) {

        const attachmentFiles = (await this.adapter.list(newFolderPath)).files;

        for (const file of attachmentFiles) {

            let attachmentFileName = Path.basename(file);

            if (!attachmentFileName.contains(oldFileName)) {
                continue;
            }

            attachmentFileName = attachmentFileName.replace(oldFileName, newFileName);

            const newFilePath = normalizePath(Path.join(newFolderPath, attachmentFileName));

            const attachmentFile = this.vault.getAbstractFileByPath(file);
            if (attachmentFile == null) {
                continue;
            }
            await this.fileManager.renameFile(attachmentFile, newFilePath);
        }
    }
}