$( document ).ready(function() {
    $(".dropdown-trigger").dropdown();
});

const viewBtn = document.querySelector('.view');
const searchInput = document.querySelector('.search');
const container = document.querySelector('.container');
const errorMessageElement = document.querySelector('#error-message');

function getApi() {
    const ticker = searchInput.value.toUpperCase();
    
    if (/\d/.test(ticker)) { 
        errorMessageElement.innerText = 'The input should not contain numbers.';
        errorMessageElement.style.display = 'block';
        return;
    } else {
        errorMessageElement.style.display = 'none';
    }

    const requestUrl = `https://api.polygon.io/v2/reference/news?ticker=${ticker}&limit=4&apiKey=8Dd82QhY1RJF_mf637R9R_0Mf6jlJU5A`;
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

viewBtn.addEventListener('click', getApi);

function displayNews(data) {
    searchInput.value = '';
    const stockContainer = document.querySelector('.stockContainer');
    stockContainer.innerHTML = '';
    data.results.forEach(article => {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('news');
    newsDiv.style.margin = '2em';
    const newsLink = document.createElement('a');
    newsLink.href = article.article_url;
    newsLink.target = '_blank';
    newsLink.textContent = article.article_url;
    const newsKeywords = document.createElement('p');
    newsKeywords.textContent = article.keywords;
   
    newsDiv.appendChild(newsKeywords);
    newsDiv.appendChild(newsLink);
    stockContainer.appendChild(newsDiv);
    });
   
}