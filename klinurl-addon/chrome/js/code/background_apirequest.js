chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {

    // changeInfo.url includes the new url
    // check to make sure it includes http so it doesn't come up in the new tab page
    if (changeInfo.url && is_url(str)) {
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

function is_url(str) {
    
    // https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}