# 附件管理器+（Attachment Manager Expand）

附件管理器，支持附件文件夹名称绑定笔记名、自动重命名、自动删除、显示/隐藏。

在原插件的基础上单独添加了筛选文件类型的功能，达到一站式管理。使用仓库时可能会包含除md文件以外的文件，比如xmind文件，pdf文件等，而默认是只会显示Obsidian支持的文件类型。如果把“检测所有类型文件”开关打开，又可能会显示不想要显示的某些类型文件。所以在原插件的基础上，通过输入自己需要的文件类型，不用再回到原文件中操作。
## 功能

* 附件文件夹名称绑定笔记名
* 下载当前打开的笔记（md、canvas）中远程图片至本地
* 自动重命名“粘贴图片”
* 笔记名调整自动修改“附件文件夹”和“附件”的名称
* 删除笔记自动删除附件文件夹
* 附件文件夹的显示/隐藏
* 附件文件夹透明化

⚠️  **重要：** 插件启动时会覆盖 **下面2个设置**，在禁用时会恢复。
* **文件与链接 -> 内部链接类型** 生成附件的链接。
* **文件与链接 -> 附件默认存放路径** 自定义附件文件夹。

## 怎么使用

### 从插件市场安装

* 社区插件市场中搜索 **Attachment Manager**
* 安装并启用插件

### 手工安装

1. 从 [Git releases](https://github.com/chenfeicqq/obsidian-attachment-manager/releases) 下载 `main.js`, `styles.css`, `manifest.json` 文件。
2. 到笔记仓库的插件目录（`笔记仓库目录/.obsidian/plugins`）下创建插件目录 `obsidian-attachment-manager`。
3. 复制 `main.js`, `styles.css`, `manifest.json` 到插件文件夹 `obsidian-attachment-manager`。
4. 在 Obsidian 设置中，启用插件。

## 插件截图

![](https://raw.githubusercontent.com/chenfeicqq/obsidian-attachment-manager/master/images/overview.png)

![](https://raw.githubusercontent.com/chenfeicqq/obsidian-attachment-manager/master/images/zh/settings.png)

![](https://raw.githubusercontent.com/chenfeicqq/obsidian-attachment-manager/master/images/zh/command.png)

![](https://raw.githubusercontent.com/chenfeicqq/obsidian-attachment-manager/master/images/zh/toggle-hide-ribbon.png)
