

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

            if (hasUrls === true){
                let urlsList = data.urls
                let table = document.getElementById("klinurl-table-body");

                for (let index = 0; index < urlsList.length; index++) {
                    const element =  urlsList[index];

                    let originalUrl = encodeURI(element.long_url)
                    let newUrl = encodeURI(element.klin_url)
                    let scheme = encodeURI(element.scheme)
                    let newurlHref = scheme.concat(newUrl);
                    let trimmedUrl = originalUrl

                    if(trimmedUrl.length > 10){
                        trimmedUrl = trimmedUrl.substring(0,20).concat("...");
                    }

                    // Create an empty <tr> element and add it to the 1st position of the table:
                    let row = table.insertRow(-1);

                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);

                    let newUrlString =`
                                    <small>
                                            <a 
                                                href="${newurlHref} "    
                                                class="text-muted"
                                                target="blank"
                                            >
                                            ${newUrl}       
                                            </a>
                                    </small>
                                `
                    
                    let originalUrlString =`
                                <small>
                                        <a 
                                            href="${originalUrl} "    
                                            class="text-muted"
                                            target="blank"
                                        >
                                        ${trimmedUrl}       
                                        </a>
                                </small>
                            `

                    // Add the urls to the new cells:
                    cell1.innerHTML = newUrlString;
                    cell2.innerHTML = originalUrlString;      
                }  
            }else{
                let elem = document.getElementById("no-saved-urls");
                elem.innerHTML = "You have no shortened urls yet"  ; 
            }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    writeDataToDom();
});
