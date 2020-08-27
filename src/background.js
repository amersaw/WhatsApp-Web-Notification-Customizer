var responseListener = function (details) {
    let newHeaders = details.responseHeaders.filter(h => h.name.toLowerCase() != "content-security-policy");
    //console.log(details)
    return { responseHeaders: newHeaders };
};

chrome.webRequest.onHeadersReceived.addListener(responseListener,
    { urls: ["https://web.whatsapp.com/*"] },
    ["blocking", "responseHeaders","extraHeaders"]);

chrome.webRequest.handlerBehaviorChanged();