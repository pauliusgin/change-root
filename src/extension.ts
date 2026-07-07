import * as path from "path";
import * as vscode from "vscode";

/* go one level up */
async function setParentAsRoot(): Promise<void> {
  const currentDir = getCurrentDir();
  if (!currentDir) {
    return;
  }

  const parentPath = path.dirname(currentDir.fsPath);
  if (parentPath === currentDir.fsPath) {
    return;
  }

  await openFolder(vscode.Uri.file(parentPath));
}

/* set selected dir as root */
async function setSelectionAsRoot(uri?: vscode.Uri): Promise<void> {
  let selectedDir: vscode.Uri | null = null;

  if (uri) {
    selectedDir = uri;
  } else {
    selectedDir = await getFocusedExplorerItemUri();
  }
  if (!selectedDir) {
    return;
  }

  const stat = await vscode.workspace.fs.stat(selectedDir);
  /* bitwise AND check */
  const isDirectory =
    (stat.type & vscode.FileType.Directory) === vscode.FileType.Directory;
  if (!isDirectory) {
    return;
  }

  const current = getCurrentDir();

  if (current?.fsPath === selectedDir.fsPath) {
    return;
  }

  await openFolder(selectedDir);
}

async function getFocusedExplorerItemUri(): Promise<vscode.Uri | null> {
  const lastItemInClipboard = await vscode.env.clipboard.readText();

  try {
    await vscode.commands.executeCommand("copyFilePath");
    const copiedPaths = await vscode.env.clipboard.readText();
    if (!copiedPaths) {
      return null;
    }

    const pathsList = copiedPaths
      .split(/\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (!pathsList.length) {
      return null;
    }

    const focusedItemUri = vscode.Uri.file(pathsList[0]);

    return focusedItemUri;
  } finally {
    await vscode.env.clipboard.writeText(lastItemInClipboard);
  }
}

function getCurrentDir(): vscode.Uri | null {
  return vscode.workspace.workspaceFolders?.[0]?.uri ?? null;
}

async function openFolder(uri: vscode.Uri) {
  await vscode.commands.executeCommand("vscode.openFolder", uri, {
    forceReuseWindow: true,
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "change-root.setSelectionAsRoot",
      setSelectionAsRoot,
    ),
    vscode.commands.registerCommand(
      "change-root.setParentAsRoot",
      setParentAsRoot,
    ),
  );
}

export function deactivate() {}
