let images = document.querySelectorAll(".news-image");
let summaries = document.querySelectorAll(".summary");
let channels = document.querySelectorAll(".news-channel");
let newsButton = document.querySelectorAll(".news-button");

const getToday = async (no = 0) => {
  try {
    let response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=92c9aa4b54ae4bc7a74c5dda09987a37"
    );
    console.log(response);
    feedNews(response, no);
  } catch (error) {
    console.log(error);
  }
};
const feedNews = (response, no) => {
  let sliceFrom = 0;
  let sliceTo = 0;
  let index = 0;
  if (no == 0) {
    sliceTo = 6;
  }
  if (no == 6) {
    sliceTo = 6;
  }
  if (no == 13) {
    sliceFrom = 5;
    sliceTo = 12;
  }
  if (no == 21) {
    sliceFrom = 11;
    sliceTo = 18;
  }
  response.data.articles.slice(sliceFrom, sliceTo).forEach(news => {
    let author = news.source.name;
    let newsUrl = news.url;
    if (author == null) {
      author = undefined;
    }
    let title = news.title;
    let imageUrl = news.urlToImage;
    showNews(author, title, imageUrl, newsUrl, index);
    index++;
  });
};
getToday();

const showNews = (
  author = "Unknown source",
  title,
  imageUrl,
  newsUrl,
  index
) => {
  console.log(author);
  console.log(index);
  console.log(images);
  newsButton[index].href = newsUrl;
  images[index].src = imageUrl;
  summaries[index].innerHTML = title;
  channels[index].innerHTML = author;
};

const checkPagination = itemsNo => {
  console.log("hello world");
  let no = 1;
  while (no <= itemsNo) {
    console.log("hello world");
    let eachNews = document.getElementById("paginationlist");
    if (no == 1) {
      eachNews.innerHTML += `<li class="active"><a href="#" onclick="loadNext(${no})">${no}</a></li>`;
    } else {
      eachNews.innerHTML += `<li class=""><a href="#"  onclick="loadNext(${no})">${no}</a></li>`;
    }
    no++;
  }
};
checkPagination(3);
const loadNext = no => {
  if (no == 1) {
    getToday(6);
  }
  if (no == 2) {
    getToday(13);
  }
  if (no == 3) {
    getToday(21);
  }
};
