const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const carouselContent = document.getElementById('carousel-content');

const country = "us";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

// Create cards and carousel items
const generateUI = (articles) => {
  container.innerHTML = '';
  carouselContent.innerHTML = '';

  articles.forEach((item, index) => {
    // Create card
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">${item.title}</div>
        <div class="news-description">${item.description || item.content || ""}</div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);

    // Create carousel item
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) carouselItem.classList.add("active");
    carouselItem.innerHTML = `<img src="${item.urlToImage}" class="d-block w-100" alt="${item.title}">
      <div class="carousel-caption d-none d-md-block">
        <h5>${item.title}</h5>
        <p>${item.description}</p>
      </div>`;
    carouselContent.appendChild(carouselItem);
  });

  // Add event listener to all 'Read More' buttons
  document.querySelectorAll('.view-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.add('active');
      window.open(e.target.href, '_blank');
    });
  });
};

// Fetch news data
const getNews = async () => {
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};

// Category selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

// Create category buttons

const createOptions = () => {
  for (let i of options) {
    if (i === "entertainment") {
      optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}" onclick="window.location.href='entertainment.html'">${i}</button>`;
    } else {
      optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
  }
};



const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};
