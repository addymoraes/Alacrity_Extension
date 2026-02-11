const blacklist = [
    "https://chatgpt.com/",
    "https://gemini.google.com/",
    "https://claude.ai/"
]

function checkUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        return blacklist.some(blocked =>
            hostname.includes(blocked) || url.includes(blocked)
        );
    } catch (e) {
        return false; 
    }
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId === 0) {
        if (checkUrl(details.url)) {
            chrome.tabs.update(details.tabId, {
                url: chrome.runtime.getURL("popup.html") + "?blocked=" 
            })
        }
    }
})