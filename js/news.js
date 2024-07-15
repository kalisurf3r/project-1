$(document).ready(function() {
    $('.dropdown-trigger').dropdown();

    // Function to fetch and display news based on a search query
    function fetchNews(query) {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?q=${encodeURIComponent(query)}&relevance=${query}&lang=en&apikey=298a104ce7bcb504bbf5382af1321746`;

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                alert('No news found for the specsified query.');
            }
        })
        .catch(error => console.error('Error fetching news:', error));
    }

    // Function to display news articles
    function displayNews(articles) {
        const container = document.querySelector('.news-container');
        container.innerHTML = ''; // Clear previous content
        articles.forEach(article => {
            const newsDiv = document.createElement('div');
            newsDiv.className = 'card';
            newsDiv.innerHTML = `
                <div class="card-content">
                    <span class="card-title">${article.title}</span>
                    <p>${article.description || 'No description available.'}</p>
                </div>
                <div class="card-action">
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            `;
            container.appendChild(newsDiv);
        });
    }

    // Event listener for the 'View' button
    document.querySelector('.view').addEventListener('click', function() {
        const searchInput = document.querySelector('.search').value;
        if (searchInput.trim() !== '') {
            fetchNews(searchInput);
        } else {
            alert('Please enter a keyword to search.');
        }
    });
});
