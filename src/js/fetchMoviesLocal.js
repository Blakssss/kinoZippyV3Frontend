console.log("vi er i fetchMoviesLocal")
const urlMovies = "http://localhost:8080/movies"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
let lstMovies = []
async function actionFetchMovies() {
    lstMovies = await fetchAny(urlMovies);
}


const pbFetchMovies = document.getElementById("pbFetchMovies")
pbFetchMovies.addEventListener('click', actionFetchMovies)

