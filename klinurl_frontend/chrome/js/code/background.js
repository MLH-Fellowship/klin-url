
const getCurrentTabUrl = (url) => { 
    document.getElementById("longurl").value = url;
};

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    getCurrentTabUrl(tabs[0].url);
});



document.addEventListener("DOMContentLoaded", () => {
    let klinurl = document.getElementById("shortened-url")
    let longurl = document.getElementById("original-url")

    klinurl.addEventListener("click", (e) => {
        chrome.tabs.create(
                            { 
                                url: klinurl.href, 
                                active: false 
                            }
                            );
    })

    longurl.addEventListener("click", (e) => {
        chrome.tabs.create(
                            { 
                                url: longurl.href,
                                active: false
                            }
                            );
    })
});

