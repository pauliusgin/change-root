# Change Root

Change which folder VS Code treats as the workspace root with a shortcut.

# Why?

I occasionally need to change the workspace root one or two levels up or down, but I’ve always found the default way of doing it in VS Code somewhat cumbersome. After seeing how neo-tree.nvim handles it, I wanted to bring a similar experience to VS Code.

## Features

- **Set Selected Directory as Root** — pick a folder in the Explorer (right-click, or focus it and press the keybinding) to reopen the window with that folder as the new root.
- **Set Parent Directory as Root** — move up one level, setting the parent directory as the workspace root.

## Commands

| Command                          | Title                                       | Description                                                                                                       |
| -------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `change-root.setSelectionAsRoot` | Change Root: Set Selected Directory as Root | Sets the folder focused in the Explorer as the new workspace root. Also available from the Explorer context menu. |
| `change-root.setParentAsRoot`    | Change Root: Set Parent Directory as Root   | Sets the parent of the current root as the new workspace root.                                                    |

## Default Keybindings

Ships with these defaults, active while the Explorer tree is focused:

| Key         | Command                          |
| ----------- | -------------------------------- |
| `.`         | `change-root.setSelectionAsRoot` |
| `backspace` | `change-root.setParentAsRoot`    |

## How the selected folder is detected

- **Explorer context menu** — VS Code passes the clicked folder's URI directly to the command.
- **Keybinding** — VS Code does not pass the focused Explorer item's URI to a command, so the extension reads it via the built-in `copyFilePath` command. The focused item's path is written to the clipboard, read back, then the original clipboard contents are restored.

## Known Issues

- Setting a new root reloads the workspace, as a consequence open editor or terminal tabs will be closed.

## Release Notes

### 0.2.0

Updated icon.

### 0.1.0

Initial release: set a folder as the new workspace root from the Explorer, navigate up to the parent folder and default Explorer keybindings.
