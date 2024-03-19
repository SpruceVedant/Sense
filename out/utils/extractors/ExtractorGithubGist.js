"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtractorAbstract_1 = require("./ExtractorAbstract");
const linkedom_1 = require("linkedom");
const utils_1 = require("./utils");
class ExtractorGithubGist extends ExtractorAbstract_1.default {
    constructor() {
        super(...arguments);
        this.name = "Github Gist";
        this.URL = "gist.github.com";
        this.extractSnippets = (options) => {
            const target = (0, linkedom_1.parseHTML)(options.textContent);
            const doc = target.window.document;
            const snippet = doc.querySelector("table.highlight")?.textContent;
            if (!snippet || !(0, utils_1.isCodeValid)(snippet))
                return [];
            const socialCount = doc.querySelector(".social-count")?.textContent ?? "";
            const item = {
                votes: parseInt(socialCount),
                code: cleanContent(snippet),
                sourceURL: options.url,
                hasCheckMark: false
            };
            return [item];
        };
    }
}
exports.default = ExtractorGithubGist;
/**
 * Github Gist use table to display code, which produces a bunch of unnecessary characters.
 * This feature is used to them clean up
 * @param input
 * @returns
 */
function cleanContent(input) {
    return input.replace(/\n {6}\n {8}\n {8}/g, "");
}
