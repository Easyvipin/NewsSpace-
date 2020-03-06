let images = document.querySelectorAll(".news-image");
let summaries = document.querySelectorAll(".summary");
let channels = document.querySelectorAll(".news-channel");
let newsButton = document.querySelectorAll(".news-button");
const News = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?country=us&apiKey=92c9aa4b54ae4bc7a74c5dda09987a37"
      )
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        reject("Error");
      });
  });
};
News()
  .then(resp => {
    console.log(resp);
    resp.data.articles.slice(0, 3).forEach((news, index) => {
      let author = news.source.name;
      let newsUrl = news.url;
      if (author == null) {
        author = undefined;
      }
      let title = news.title;
      let imageUrl = news.urlToImage;
      showNews(author, title, imageUrl, newsUrl, index);
    });
  })
  .catch(error => {
    console.log(error);
  });
/* function to show news */
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
