"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const search_1 = require("./utils/search");
const matchSearchPhrase_1 = require("./utils/matchSearchPhrase");
function activate(_) {
    const provider = {
        // @ts-ignore
        provideInlineCompletionItems: async (document, position, context, token) => {
            const textBeforeCursor = document.getText(new vscode.Range(position.with(undefined, 0), position));
            const match = (0, matchSearchPhrase_1.matchSearchPhrase)(textBeforeCursor);
            let items = [];
            if (match) {
                let rs;
                try {
                    rs = await (0, search_1.search)(match.searchPhrase);
                    if (rs) {
                        items = rs.results.map(item => {
                            const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                            return {
                                text: output,
                                insertText: output,
                                range: new vscode.Range(position.translate(0, output.length), position)
                            };
                        });
                    }
                }
                catch (err) {
                    vscode.window.showErrorMessage(err.toString());
                }
            }
            return { items };
        },
    };
    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
exports.activate = activate;
