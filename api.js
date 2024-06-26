// Define formatDate() function
function formatDate(datestring){
  // datestring is null
  if(!datestring){
    return 'No date';
  }

  const date = new Date(datestring);

  //datestring is invalid date
  if(isNaN(date.getTime())){
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2,'0');
  const day = date.getDate().toString().padStart(2,'0');

  return `${day}-${month}-${year}`;
}


// define getHeadline() functions
async function getHeadline(){
  // get APIkey and parameters from user input
  const apiKey = document.getElementById("apiKey1").value;
  const countryCode = document.getElementById("contry_code").value;
  const category = document.getElementById("category").value;
  const keyword = document.getElementById("keyword1").value.toLowerCase();
  
  // Define URL to fetch
  var url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
  
  // Define addParam() function
  function addParam(paramName, paramValue){
    if(paramValue !== ""){
      url += `&${paramName}=${paramValue}`;
    }
  }

  // Add each parameters to url
  addParam("country", countryCode);
  addParam("category", category);
  addParam("keyword", keyword);


  try{
    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if(data.articles.length > 0){

      // set viewContainer to keep text and defalutImage
      const viewContainer = document.getElementById("container");
      const defalutImage = './No_Image.png';
      
      // clear previous data
      viewContainer.innerHTML = '';

      // display 10 articles
      let view = '<div class="row row-cols-1 row-cols-md-2 g-4">';
      for(let i = 0; i < Math.min(10, data.articles.length); i++){
        view +=`
        <div class="col">
          <div class="card">
            <img src="${data.articles[i].urlToImage ? data.articles[i].urlToImage: defalutImage}" alt="thumbnail" height="400">
            <div class="card-body">
              <h5 class="card-title"><a href="${data.articles[i].url ? data.articles[i].url: '#'}" target="_blank">${data.articles[i].title ? data.articles[i].title: 'No Title'}</a></h5>
              <p class="card-text">${formatDate(data.articles[i].publishedAt)} / ${data.articles[i].author ? data.articles[i].author: 'No Author'}</p>
              <p class="card-text">${data.articles[i].description ? data.articles[i].description: 'No Description'}</p>
            </div>
          </div>
        </div>
        `;
      }
      view += '</div>'
      // set the container's HTML with the generated view
      viewContainer.innerHTML = view;
    }
    else{
      document.getElementById("container").innerHTML = `<p>No articles found</p>`;
    }
  }
  catch(error){
    console.error(error);
    document.getElementById("container").innerHTML = `<p>Error fetching news</p>`;
  }

}

// define getNews() function
async function getNews(){
  // get APIkey and parameters from user input
  const apiKey = document.getElementById("apiKey2").value;
  const keyword = document.getElementById("keyword2").value.toLowerCase();
  const sortBy = document.getElementById("sortBy").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  // Define URL to fetch
  var url = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;

  // Define addParam() function
  function addParam(paramName, paramValue){
    if(paramValue !== ""){
      url += `&${paramName}=${paramValue}`;
    }
  }

  // Add each parameters to url
  addParam("q", keyword);
  addParam("sortBy", sortBy);
  addParam("from", from);
  addParam("to", to);

  try{
    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if(data.articles.length > 0){

      // set viewContainer to keep text and defalutImage
      const viewContainer = document.getElementById("container");
      const defalutImage = './No_Image.png';
      
      // clear previous data
      viewContainer.innerHTML = '';

      // display 10 articles
      let view = '<div class="row row-cols-1 row-cols-md-2 g-4">';
      for(let i = 0; i < Math.min(10, data.articles.length); i++){
        view +=`
        <div class="col">
          <div class="card">
            <img src="${data.articles[i].urlToImage ? data.articles[i].urlToImage: defalutImage}" alt="thumbnail" height="400">
            <div class="card-body">
              <h5 class="card-title"><a href="${data.articles[i].url ? data.articles[i].url: '#'}" target="_blank">${data.articles[i].title ? data.articles[i].title: 'No Title'}</a></h5>
              <p class="card-text">${formatDate(data.articles[i].publishedAt)} / ${data.articles[i].author ? data.articles[i].author: 'No Author'}</p>
              <p class="card-text">${data.articles[i].description ? data.articles[i].description: 'No Description'}</p>
            </div>
          </div>
        </div>
        `;
      }
      view += '</div>'
      // set the container's HTML with the generated view
      viewContainer.innerHTML = view;
    }
    else{
      document.getElementById("container").innerHTML = `<p>No articles found for ${keyword}</p>`;
    }
  }
  catch(error){
    console.error(error);
    document.getElementById("container").innerHTML = `<p>Error fetching news</p>`;
  }
}
