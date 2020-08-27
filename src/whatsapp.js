const setNotificationSound = async function (url) {
    keys = await caches.keys()
    url = url || 'https://amersaw.info/CustomWhatsapp.mp3'

    folderKey = keys.find((l) => /^wa[0-9.]+/.test(l))
    cache = await caches.open(folderKey)
    fileKey = (await cache.keys()).find((k) => /web\.whatsapp.com\/notification/.test(k.url))
    fileKey = fileKey?.url || '/notification_0a598282e94e87dea63e466d115e4a83.mp3'
    fileKey = fileKey.replace("https://web.whatsapp.com", "")
    response = await fetch(url)
    await cache.delete(fileKey)
    cache.put(fileKey, response)
}
async function clearAllCaches() {
    caches.keys().then(cachesKeys => {
        for (var ck in cachesKeys) {
            caches.open(cachesKeys[ck]).then(cache => {
                cache.keys().then(keys => {
                    for (var k in keys) {
                        cache.delete(keys[k])
                    }
                })
            })

        }
    })

}

var obj = {};
obj['soundUrl'] = 'https://amersaw.info/CustomWhatsapp.mp3';

chrome.storage.local.set(obj, function () {
    console.log('Value is set');
});


chrome.storage.local.get(['soundUrl'], function (result) {

    setNotificationSound(result.key)
    console.log('Value currently is ' + result.key);
});