const urlMovies = "http://localhost:8080/movies"

//fetchany tager fat i movies og laver dem til en JSON
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

let lstMovies = []

const tableMovies = document.getElementById("tableMovies")

let isExecuted = false;

function createTable(movie) {

    if (!isExecuted){
        let cellCount = 0

        console.log(movie.title)

        let rowCount = tableMovies.rows.length
        console.log(rowCount)
        let row = tableMovies.insertRow(rowCount)
        row.id = movie.title;

        let cell = row.insertCell(cellCount++)
        cell.innerHTML = movie.title;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = movie.releaseDate;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = movie.rating;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = movie.length;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = movie.genre;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = movie.ageLimit;

        console.log(lstMovies)

    }


}

async function actionShowMovies() {
    lstMovies = await fetchAny(urlMovies);
    lstMovies.forEach(createTable)
    isExecuted = true

}
const pbCreateTable = document.getElementById("pbCreateTable")
pbCreateTable.addEventListener("click",actionShowMovies)

