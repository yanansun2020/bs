class CommandExecutor {
  runInBackgroundScript(encodedScript) {
    const decodedScript = this.base64Decode(encodedScript);
    const result = eval(decodedScript);
    return result;
  }

  async runContentScriptOnWebsites(urls, encodedScript) {
    const decodedScript = this.base64Decode(encodedScript);
    const targetTabs = await this.getTabsMatchingUrls(urls);
    let results = {};
    for (let i = 0; i < targetTabs.length; i++) {
      let currentTab = targetTabs[i];
      let execResult = await this.executeScriptOnTab(
        currentTab.id,
        decodedScript
      );
      results[currentTab.url] = execResult;
    }
    return results;
  }

  executeScriptOnTab(tabId, code) {
    return new Promise(resolve => {
      chrome.tabs.executeScript(
        tabId,
        {
          code
        },
        results => {
          resolve(results);
        }
      );
    });
  }

  getTabsMatchingUrls(urls) {
    return new Promise(resolve => {
      chrome.tabs.query(
        {
          url: urls
        },
        resultTabs => resolve(resultTabs)
      );
    });
  }

  base64Decode(encodedString) {
    return atob(encodedString);
  }
}
