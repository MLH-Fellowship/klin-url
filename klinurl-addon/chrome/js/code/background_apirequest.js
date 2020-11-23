chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {

    // changeInfo.url includes the new url
    // check to make sure it includes http so it doesn't come up in the new tab page
    if (changeInfo.url && changeInfo.url.includes('http')) {
        alert(changeInfo.url) //DEBUG: Makes popup with new url every time it loads

        // https://attacomsian.com/blog/xhr-json-post-request
        const xhr = new XMLHttpRequest();

        // listen for `load` event
        xhr.onload = () => {

            // print JSON response
            if (xhr.status >= 200 && xhr.status < 300) {
                // parse JSON
                alert(xhr.responseText) //Response text. Need to actually parse this better
            } else {
                alert("Status code: " + status)
            }
        };

        // create a JSON object
        const json = {
            'longUrl': changeInfo.url
        };

        // open request
        xhr.open('POST', 'https://klinurl.herokuapp.com/api/v1/shorten');

        // set `Content-Type` header
        xhr.setRequestHeader('Content-Type', 'application/json');

        // send rquest with JSON payload
        xhr.send(JSON.stringify(json));
    }
});