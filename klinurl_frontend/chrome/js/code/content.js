
async function postData(data) {
    const url = "klinurl.me/api/v1/shorten"

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
  
   
const urlShortener = (url) => { 

    postData( { "long_url": url })
        .then(data => {
            originalUrl = encodeURI(data.data.longUrl)
            newUrl = encodeURI(data.data.klinUrl)

            document.getElementById("shortened-url").href = newUrl
            document.getElementById("original-url").href = originalUrl

            document.getElementById("shortened-url").innerHTML = newUrl
            document.getElementById("original-url").innerHTML = originalUrl
        }
    );
};


const getInputFieldCOntent = () => { 
    let longUrl = document.getElementById("longurl").value;
    urlShortener(longUrl)
};


document.addEventListener("DOMContentLoaded", () => {
    var button = document.getElementById("klinurl-button")

    button.addEventListener("click", (e) => {
        getInputFieldCOntent()
    })
});
