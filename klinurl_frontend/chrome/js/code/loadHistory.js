

async function loadData(data) {
    const url = "http://klinurl.me/api/v1/urls/list";

    const response = await fetch(
        url, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    return response.json(); 
}

const writeDataToDom = () => { 

    loadData()
        .then(data => {

            let hasUrls = data.has_urls;
            let elem = document.getElementById("no-saved-urls");

            if (hasUrls === true){
                let urlsList = data.urls
                elem.innerHTML = "Urls found fam!" ;  
            }else{
                elem.innerHTML = "no Urls found fam!"  ; 
            }
           
            // originalUrl = encodeURI(data.urls.long_url)
            // newUrl = encodeURI(data.urls.klin_url)
            // scheme = encodeURI(data.data.scheme)
            // newurlHref = scheme.concat(newUrl);
            // trimmedUrl = String(data.data.longUrl)

            // if(trimmedUrl.length > 10){
            //     trimmedUrl = trimmedUrl.substring(0,20).concat("...");
            // } 
            // document.getElementById("shortened-url").href = newurlHref;
            // document.getElementById("original-url").href = originalUrl;

            // document.getElementById("shortened-url").innerHTML = newUrl;
            // document.getElementById("original-url").innerHTML = trimmedUrl;

            // if (isDuplicate === true){
            //     let elem = document.getElementById("error-section");
            //     elem.classList.add("klinurl-animate");
            //     elem.innerHTML = "url already shortened !"  ;  
            // };

        });
};

document.addEventListener("DOMContentLoaded", () => {
    writeDataToDom();
});
