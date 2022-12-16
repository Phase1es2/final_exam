var movie_cell_template =
    "<div class='col movie-cell'><div class='movie-poster'><img src='var2'></div><div class='movie-title'> var1 </div></div>";
const api_key = "3af0aa7e8e340541e4f03038c080930a";
const search_base_url = "https://api.themoviedb.org/3/search/movie?";
const search_template_url =
    "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&page=1&include_adult=false&&query=";

const poster_base_url = "https://image.tmdb.org/t/p/w500";

// use this function to concantenate (build) your search url
function getSearchUrl(queryString) {
    var url = search_template_url + queryString;

    return url;
}

// use this function to concantenate (build) your poster url
function getPosterUrl(imageString) {
    var url = poster_base_url + imageString;
    return url;
}

// Shorthand for $( document ).ready()
$(function () {
    // ========================================================
    // TASK 1: key input processing
    // ========================================================
    $("input").on({
        // keydown - backspace or delete processing only
        keydown: function (e) {
            var code = e.which;
            //    console.log("KEYDOWN-key:" + code);
        },
        // keypress - everything else processing
        keypress: function (e) {
            var code = e.which;
            if (code == 13) {
                let search_term = document.getElementById("search_term").value;

                let search_api_url = getSearchUrl(search_term);

                search_api_url = console.log(search_term);
                $.ajax({
                    url: search_api_url,
                    success: function (data) {
                        render(data);
                    },
                    cache: false
                });
            }
            //  console.log("KEYPRESS-key:" + code);
        }
    });
    // ========================================================
    // TASK 2:  process search on TMDB
    // ========================================================
    $("#get-movie-btn").on("click", api_search);

    // Do the actual search in this function
    function api_search(e) {
        // get text value from the input field
        // let search_term = "";
        let search_term = document.getElementById("search_term").value;
        // prepare search string url => search_api_url
        let search_api_url = getSearchUrl(search_term);
        //search_api_url = console.log(search_term);
        $.ajax({
            url: search_api_url,
            success: function (data) {
                render(data);
            },
            cache: false
        });
    }
    // ========================================================
    // TASK 3: perform all movie grid rendering operations
    // ========================================================
    function render(data) {

        // get movie data from search results data
        let movies = data.results;

        var row = document.createElement('div');
        row.classList.add('row');

        // select the movie grid and dump the sample html (if any)
        const movieGrid = document.getElementById("movie-grid");

        movieGrid.innerHTML = '';

        movieGrid.appendChild(row);

        //there was error for movies.length; 
        for (let i = 1; i <= movies.length; i++) {
            // every group of 4 gets their own class=row 
            if ((i % 4) === 0) {
                
                // Create a new div element with the "row" class
                row = document.createElement('div');
                row.classList.add('row');
                // Append the row to the container element
                movieGrid.appendChild(row);
            }
            //utilize the movie_cell_template to append, then add data from
            // movie data results (parsed JSON)
            // let movies = data.results;
            movie_cell_template = "<div class='col col-3 movie-cell'><div class='movie-poster'><img src='" + getPosterUrl(movies[i].poster_path) + "'></div><div class='movie-title'><h6> " + movies[i].original_title + "</h6> </div></div>";

            row.innerHTML += movie_cell_template;
        }

    }
});