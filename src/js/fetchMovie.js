const urlMovies = "http://localhost:8080/movies"

//fetchany tager fat i movies og laver dem til en JSON
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}


const tableMovies = document.getElementById("tableMovies")
function createTable(movie) {
    console.log(movie.title)

    let cellCount = 0
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
}
let lstMovies = []

async function actionShowUsers() {
    console.log("hej")
    lstMovies = await fetchAny(urlMovies);
    console.log("fetch any gik fint")
    lstMovies.forEach(createTable)
    console.log("createtable gik fint")
    console.log(lstMovies)
}
const pbCreateTable = document.getElementById("pbCreateTable")
pbCreateTable.addEventListener("click",actionShowUsers)

