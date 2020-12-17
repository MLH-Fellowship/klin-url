
async function postData(data) {
    const url = "http://www.klinurl.me/api/v1/shorten";

    const response = await fetch(
        url, 
        {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    return response.json(); 
}


const copyKlinLink = () => {
    let element = document.getElementById("shortened-url");
    elementText = element.textContent;

    try {
      navigator.clipboard.writeText(elementText);

      let elem = document.getElementById("tooltiptext");
      elem.innerHTML = "copied!"
    } catch (err) {
      alert("Oops, unable to copy");
    }
}
  
   
const urlShortener = (url) => { 

    postData( { "long_url": url })
        .then(data => {
            originalUrl = encodeURI(data.data.longUrl)
            newUrl = encodeURI(data.data.klinUrl)
            scheme = encodeURI(data.data.scheme)
            newurlHref = scheme.concat(newUrl);
            isDuplicate = data.data.isDuplicate;
            trimmedUrl = String(data.data.longUrl)

            if(trimmedUrl.length > 10){
                trimmedUrl = trimmedUrl.substring(0,20).concat("...");
            } 
            document.getElementById("shortened-url").href = newurlHref;
            document.getElementById("original-url").href = originalUrl;

            document.getElementById("shortened-url").innerHTML = newUrl;
            document.getElementById("original-url").innerHTML = trimmedUrl;

            if (isDuplicate === true){
                let elem = document.getElementById("error-section");
                elem.classList.add("klinurl-animate");
                elem.innerHTML = "url already shortened !"  ;  
            };

            let copy = document.getElementById("klinurl-copy");
            copy.style.visibility = "visible";

            copy.addEventListener("click", (e) => {
                copyKlinLink();
            });
        });
};


const validateUrl= (url) =>{
    let pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    
    return pattern.test(url);
};


const getInputFieldCOntent = () => { 
    let longUrl = document.getElementById("longurl").value;
    
    if (validateUrl(longUrl)){
        urlShortener(longUrl)
    };
};


document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("klinurl-button");

    button.addEventListener("click", (e) => {
        getInputFieldCOntent()
        let elem = document.getElementById("error-section");
        elem.classList.remove("klinurl-animate");
    });
});
