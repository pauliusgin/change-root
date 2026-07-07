import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('registers change-root commands', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('change-root.setAsRoot'));
		assert.ok(commands.includes('change-root.goToParentRoot'));
	});
});
