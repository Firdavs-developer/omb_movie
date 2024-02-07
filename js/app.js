let elSearchForm = document.querySelector(".search-form");
let elFormInput = document.querySelector(".form-input");
let elOmdbTemplate = document.querySelector(".omdb-template").content;
let elOmdbMovie = document.querySelector(".omdb-movie")
let elMovies = document.querySelector(".movies");
let elOmdbFragment = new DocumentFragment();

let elIncr = document.querySelector(".incr");
let elCount = document.querySelector(".number");
let elDesc = document.querySelector(".desc");

const countPlus = () => {
    elIncr.addEventListener("click", () => {
        +elCount.textContent ++
    })
    elDesc.addEventListener("click", () => {
        if(elCount.textContent > 1){
            elCount.textContent--;
        }
        else{
            elCount.textContent = 1;
        }
    })
}
countPlus()



let API_KEY = "13ebc31e";
let API_MOVIE = "iron";

let API = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${API_MOVIE}&page=${+elCount.textContent + 2}`;


const omdbMovies = (movies) => {

    elMovies.innerHTML = null;
    
    fetch(movies).then(res => res.json()).then((movie) => {

        movie.Search.forEach((m) => {
            let elCloneOmdbTemplate = elOmdbTemplate.cloneNode(true);
            elCloneOmdbTemplate.querySelector(".omdb-img").src = m.Poster;
            elCloneOmdbTemplate.querySelector(".omdb-desc").textContent = m.Title;
            elCloneOmdbTemplate.querySelector(".omdb-year").textContent = m.Year;

            elOmdbFragment.appendChild(elCloneOmdbTemplate);
            elMovies.appendChild(elOmdbFragment);


            elFormInput.value = ""
            
        })        
    })
}
omdbMovies(API);

elSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let inputValue = elFormInput.value.trim();

    omdbMovies(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=` + inputValue);

})