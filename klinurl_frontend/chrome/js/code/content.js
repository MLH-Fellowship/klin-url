
async function postData(data) {
    const url = "http://localhost:8000/api/v1/shorten"

    const response = await fetch(
        url, 
        {
            method: 'POST',
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
            document.getElementById("shortened-url").href = newurlHref
            document.getElementById("original-url").href = originalUrl

            document.getElementById("shortened-url").innerHTML = newUrl
            document.getElementById("original-url").innerHTML = trimmedUrl

            if (isDuplicate === true){
                let elem = document.getElementById("error-section");
                elem.classList.add("klinur-animate");
                elem.innerHTML = "url already shortened"    
            };

            let copy = document.getElementById("klinurl-copy");
            copy.style.visibility = "visible";

            copy.addEventListener("click", (e) => {
                copyKlinLink();
            });
        });
};


const getInputFieldCOntent = () => { 
    let longUrl = document.getElementById("longurl").value;
    urlShortener(longUrl)
};


document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("klinurl-button")

    button.addEventListener("click", (e) => {
        getInputFieldCOntent()
        let elem = document.getElementById("error-section");
        elem.classList.remove("klinur-animate");
    });
});
