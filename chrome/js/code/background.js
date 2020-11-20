//this function adds the browser's current tab url to the form's input field
const getCurrentTabUrl = (url) => { 
    document.getElementById("long-url").value = url;
};


const urlShortener = (url) => { 
    document.getElementById("long-url").value = url;
};


const getInputFieldCOntent = () => { 
    let longUrl = document.getElementById("long-url").value;
    alert(longUrl)
};


//this grabs the current tab's url when the addon's icon is clicked
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    getCurrentTabUrl(tabs[0].url);
});


//this listens for the click event on the popup's form submit button
document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("form-submit")

    button.addEventListener("click", (e) => {
        getInputFieldCOntent()
    })
})
