//this function adds the browser's current tab url to the 
//form's input field
const getCurrentTabUrl = (url) => { 
    document.getElementById("longurl").value = url;
};


//this function takes a long url and return its shortened
//version. It makes an api call to our backend
const urlShortener = (url) => { 
    alert(url);
};


//this function grabs the content of the addon's input field
//it then passes this content to the urlShortener function
const getInputFieldCOntent = () => { 
    let longUrl = document.getElementById("longurl").value;
    urlShortener(longUrl)
};


//this grabs the current tab's url when the addon's icon is clicked
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    getCurrentTabUrl(tabs[0].url);
});


//this listens for the click event on the popup's form submit button
document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("klinurl-button")

    button.addEventListener("click", (e) => {
        getInputFieldCOntent()
    })
})
