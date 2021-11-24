const config = {
  url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:",
  parentId: "book-cards",
  searchBtnId: "isbn-search-btn",
  searchInputId: "isbn-search",
}

const parent = document.getElementById(config.parentId);
const searchBtn = document.getElementById(config.searchBtnId);
const searchInput = document.getElementById(config.searchInputId);

searchBtn.addEventListener("click",function(){
  let isbn = searchInput.value;
  fetch(`${config.url}${isbn}`)
  .then(res => res.json())
  .then(function(data){
    if(parent.innerHTML !== ""){
      parent.innerHTML = "";
    }
    if(Object.keys(data).length === 0&& data.constructor === Object){
      parent.innerHTML = "<h1>Not Found</h1>";
    }else{
      for(let bookKey in data){
        let currentBook = data[bookKey];
        parent.append(generateBookCard(currentBook));
      }
    }
  });
});

function generateBookCard(bookData){
  let bookEle = document.createElement("div");
  bookEle.innerHTML = `
  <div class="card p-3">
    <div class="d-flex flex-column flex-md-row pb-3">
      <div class="col-6 col-md-4 mx-auto mb-3 mb-md-0 px-0">
        <img src="${bookData.cover.medium ? bookData.cover.medium : 'https://lh3.googleusercontent.com/proxy/12eGnqLhNdia2AXBERgMl69uKey1rOL_9RqpMlCfO2d-g3O67vJP8wBRB4129mRSKzFtqlAyzji6bjU0FSesYcRVBOW4NG6Q3gq8E5Y'}" alt="">
      </div>
      <div class="col-12 col-md-8">
        <h5 class="font-weight-bold text-center text-md-left">${bookData.title ? bookData.title : ""}</h5>
        <p>${bookData.by_statement ? bookData.by_statement : ""}</p>
      </div>
    </div>
    <div class="table-responsive" >
      <table class="table table-striped col-12 col-md-10">
        <tr>
          <th>Page</th>
          <td>${bookData.number_of_pages ? bookData.number_of_pages : ""}</td>
        </tr>
        <tr>
          <th>Publisher</th>
          <td>${bookData.authors ? parseDataOL(bookData.authors) : ""} </td>
        </tr>
        <tr>
          <th>Published Date</th>
          <td>${bookData.publish_date ? bookData.publish_date : ""}</td>
        </tr>
        <tr>
          <th>Categories</th>
          <td>${bookData.subjects ? parseDataOL(bookData.subjects) : ""}</td>
        </tr>
      </table>
    </div>
  </div>
  `;

  return bookEle;
}


function parseDataOL(data){
  let parsed = "";
  for(let i = 0; i < data.length - 1; i++){
      parsed += (data[i].name + ",");
  }
  return parsed + data[data.length-1].name;
}
