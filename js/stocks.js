
// Initialize Materialize components
$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
});

$(document).ready(function(){
  $('.carousel').carousel();
});



$(document).ready(function(){
  $('.tooltipped').tooltip();
});
      
    

const viewBtn = document.querySelector(".view");
const searchInput = document.querySelector(".search");
const container = document.querySelector(".container");
const errorMessageElement = document.querySelector("#error-message");
const backTopBtn = document.querySelector(".backTop");

function saveStock(stock) {
  localStorage.setItem("stocks", JSON.stringify(stock));
}

function readStock() {
  const stockDataString = JSON.parse(localStorage.getItem("stocks")) || [];
  return stockDataString;
}

function getApi() {
  const ticker = searchInput.value.toUpperCase();

  //error handling for ticker input
  if (/\d/.test(ticker)) {
    errorMessageElement.innerText = "Make sure there are no numbers.";
    errorMessageElement.style.display = "block";
    errorMessageElement.style.marginTop = "1em";
    viewBtn.style.marginTop = "1em";
    return;
  } else {
    errorMessageElement.style.display = "none";
  }

  // save the stock to local storage
  const saveStocks = readStock();
  saveStocks.push(ticker);
  saveStock(saveStocks);

  const requestUrl = `https://api.polygon.io/v2/reference/news?ticker=${ticker}&limit=5&apiKey=8Dd82QhY1RJF_mf637R9R_0Mf6jlJU5A`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.results.length; i++) {
        console.log(data);
        displayNews(data);
      }
      console.log(data.results[0].article_url);
    });

}

viewBtn.addEventListener("click", getApi);

function displayNews(data) {
  //general reset to display news
  searchInput.value = "";
  const stockContainer = document.querySelector(".stockContainer");
  stockContainer.innerHTML = "";
 document.querySelector(".load-container").style.display = "none";

  data.results.forEach((article) => {
    // card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.margin = "1em";
    cardDiv.style.padding = "1em";
    cardDiv.style.border = "1px solid #ccc";
    cardDiv.style.borderRadius = "8px";
    cardDiv.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    cardDiv.style.display = "flex";
    cardDiv.style.flexDirection = "column";
    cardDiv.style.alignItems = "center";
    

    // title
    const newsTitle = document.createElement("h6");
    newsTitle.textContent = article.title;
    cardDiv.appendChild(newsTitle);

    // image
    const newsImg = document.createElement("img");
    newsImg.src = article.image_url;
    newsImg.style.width = "50%";
    newsImg.style.borderRadius = "4px";
    cardDiv.appendChild(newsImg);

    //  keywords
    const newsKeywords = document.createElement("p");
    newsKeywords.textContent = `Keywords: ${article.keywords}`;
    cardDiv.appendChild(newsKeywords);

    // link
    const newsLink = document.createElement("a");
    newsLink.href = article.article_url;
    newsLink.target = "_blank";
    newsLink.textContent = "Read More";
    newsLink.style.marginTop = "1em";
    cardDiv.appendChild(newsLink);

    stockContainer.appendChild(cardDiv);
  });
}

// back to top button
function topFunction(event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}


backTopBtn.addEventListener("click", topFunction);