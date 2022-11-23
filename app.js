const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");
const btn = document.querySelector(".submit-btn");
const wikiPicture = document.querySelector(".wiki-picture");


// console.log(formDOM,inputDOM,resut);
formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultsDOM.innerHTML = `<h2><div class="error">Please enter a valid search term</div></h2>`;
    return;
  }
  fetchPages(value)

});


const fetchPages = async (searchValue) => {
     resultsDOM.innerHTML = `<div class="loading"></div>`;

  try {
      const response = await fetch(`${url}${searchValue}`)
      const data = await response.json()
      const results = data.query.search;
      console.log(results);
      if(results.length < 1){
        resultsDOM.innerHTML = `<h2><iconify-icon icon="twemoji:anguished-face" class="emoji"></iconify-icon><div class="error">search not valid... please try again</div></h2>`;

        // btn.style.backgroundColor = "red"
        // formDOM.addEventListener("mouseover", () => {
        //   btn.style.color = "white";
        //   btn.style.borderColor = "white";
        // });


        return;
      }
      renderResults(results)
     } catch (error) {
        resultsDOM.innerHTML = `<h2><div class="error">there was an error</div></h2>`;
     }
}

const renderResults = (list) => {
  const cards = list.map((item)=>{
    // console.log(item);
    const {title,snippet, pageid} = item
    return ` <a href='http://en.wikipedia.org/?curid=${pageid}' target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
  }).join("")
  resultsDOM.innerHTML = `<div class="articles">
         ${cards}
        </div>`;
}
