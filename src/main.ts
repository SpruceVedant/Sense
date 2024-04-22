// Include StackExcahange for NetSuite
export function getConfig() {
    const config = vscode.workspace.getConfiguration("SuiteSense");

    const sites = {
        "stackoverflow.com": config.settings.sites.stackoverflow,
        "gist.github.com": config.settings.sites.githubGist
    };

    return {
        settings: {
            sites,
            maxResults: config.settings.maxResults
        }
    } as IConfig;
}