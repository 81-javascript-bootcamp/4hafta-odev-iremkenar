
//Please open with Live Server
import data from "./data.js";
import {
    searchMovieByTitle,
    makeBgActive
} from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const {
            root,
            searchInput,
            searchForm,
            yearHandler,
            yearSubmitter,
            genreSubmitter,
            genreHandler,
        } = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");

        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
        this.$genreSubmitter = document.getElementById(genreSubmitter);
        this.genreHandler = genreHandler;
    }

    createMovieEl(movie) {
        const {
            image,
            title,
            genre,
            year,
            id
        } = movie;
        return `<tr data-id="${id}" data-year="${year}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`;
    }
    //Please open with Live Server
    //This homework is a production of the collaboration with Oguzhan Olgun 
    //To create year radio buttons dynamically
    createYearRadioBtn(year, yearCount) {
        return `<div class="form-check">
            <input class="form-check-input" type="radio" name="year" id=${year} value=${year}>
               <label class="form-check-label" for=${year}>
                ${year} (${yearCount})
              </label>
               </div>`;
    }

    //To create genre check buttons dynamically
    createGenreCheckBtn(genre, genreCount) {
        return `<div class="form-check">
             <input class="form-check-input" type="checkbox" id="genre-${genre}" name="genre" value=${genre}>
               <label class="form-check-label" for="genre-${genre}">
                ${genre} (${genreCount})
                </label>
    </div>`;
    }

    //To insert year with number to radio buttons on html
    addToRadioBtn(content) {
        const $el = document.getElementById("filter-by-year");
        //
        $el.insertAdjacentHTML("afterbegin", content);
    }

    //To insert genre with number to check buttons on html
    addToCheckBtn(content) {
        const $el = document.getElementById("filter-by-genre");
        console.log($el);
        $el.insertAdjacentHTML("afterbegin", content);
    }

    //To create a new movie object that includes only years and genre from data.js
    createMovieObj() {
        const movieObj = {
            sortByYear: {},
            sortByGenre: {},
        };
        return movieObj;
    }    
    
    //To bind events for creation and insertion of radio buttons to html
    putRadioButtonsInHtml() {
        let movieObj = this.createMovieObj();
        console.log(movieObj);
    
        for (let i = 0; i < data.length; i++) {
            if (!movieObj.sortByYear[data[i].year]) {
                movieObj.sortByYear[data[i].year] = 1;
            } else {
                movieObj.sortByYear[data[i].year]++;
            }
        }
    
        for (let key in movieObj.sortByYear) {
            const $radioBtn = this.createYearRadioBtn(key, movieObj.sortByYear[key]);
            
            this.addToRadioBtn($radioBtn);
        }
        console.log(movieObj);
    }

     //To bind events for creation and insertion of check buttons to html
    putCheckBoxesInHtml() {
        let movieObj = this.createMovieObj();
        console.log(movieObj);
        
        for (let i = 0; i < data.length; i++) {
            if (!movieObj.sortByGenre[data[i].genre]) {
                movieObj.sortByGenre[data[i].genre] = 1;
            } else {
                movieObj.sortByGenre[data[i].genre]++;
            }
        }
    
        for (let key in movieObj.sortByGenre) {
            const $radioBtn = this.createGenreCheckBtn(
                key,
                movieObj.sortByGenre[key]
            );
            this.addToCheckBtn($radioBtn);
        }
    
        console.log(movieObj);
    }
    
    fillTable() {
        /* const moviesHTML = data.reduce((acc, cur) => {
                return acc + this.createMovieEl(cur);
            }, "");*/
        const moviesArr = data
            .map((movie) => {
                return this.createMovieEl(movie);
            })
            .join("");
        this.$tbodyEl.innerHTML = moviesArr;
    }

    reset() {
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        });
    }

    //To clear input value after each search event
    clearSearchedValue() {
        this.$searchInput.value = "";
    }

    handleSearch() {
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data
                .filter((movie) => {
                    return searchMovieByTitle(movie, searchValue);
                })
                .forEach(makeBgActive);
            this.clearSearchedValue();
        });
    }

    handleYearFilter() {
        this.$yearSubmitter.addEventListener("click", () => {
            //To control any future additions 
            /*if (!this.yearHandler == "year") {
                return;
            }*/
            this.reset();
            const selectedYear = document.querySelector(
                `input[name='${this.yearHandler}']:checked`
            ).value;

            const matchedMovies = data
                .filter((movie) => {
                    return movie.year === selectedYear;
                })
                .forEach(makeBgActive);
        });
    }

    handleGenreFilter() {
        this.$genreSubmitter.addEventListener("click", () => {
            //To control any future additions
            /*if (!this.genreHandler == "genre") {
                return;
            }*/
            this.reset();
            const selectedGenres = Array.from(document.querySelectorAll(
                `input[name="${this.genreHandler}"]:checked`
              )).map((checkbox) => checkbox.value);

              const mathedGenres = data.filter((movie) => {
                  console.log(movie.genre);
                  return selectedGenres.includes(movie.genre);
              }).forEach(makeBgActive);

            // Method 2
            // const checkboxes = document.querySelectorAll(`input[name="${this.genreHandler}"]:checked`);
            // console.log(checkboxes)
            // checkboxes.forEach(cur => {
            //     const matchedGenres = data.filter(movie => {
            //         return movie.genre === cur.value;
            //     }).forEach(makeBgActive)

            // })
        });
    }

    init() {
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.putRadioButtonsInHtml();
        this.putCheckBoxesInHtml();
        this.handleGenreFilter();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    yearSubmitter: "yearSubmitter",
    genreSubmitter: "genreSubmitter",
    genreHandler: "genre",
});

myMoviesApp.init();
