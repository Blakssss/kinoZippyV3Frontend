console.log("vi er i fetchMoviesLocal")
const urlMovies = "http://localhost:8080/movies"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
let lstKommuner = []
async function actionFetchMovies() {
    lstKommuner = await fetchAny(urlMovies);
    lstKommuner.forEach(fillMovieDropDown)
}
function fillMovieDropDown(movie) {
    //console.log(kom)
    const el = document.createElement("option")
    el.textContent = movie.title
    el.value = movie.genre
    el.region = movie
    ddMovies.appendChild(el)
}

const pbFetchKommuner = document.getElementById("pbFetchKommuner")
pbFetchKommuner.addEventListener('click', actionFetchKommuner)

