console.log("vi er i updateMovie")

const pbCreateTable = document.getElementById("pbCreateTable")
const tblMovies = document.getElementById("tblMovies")

function createTable(movie) {
    console.log(movie.title)
    if (!movie.title) return;

    let cellCount = 0
    let rowCount = tblMovies.rows.length
    let row = tblMovies.insertRow(rowCount)
    row.id = movie.title;

    let cell = row.insertCell(cellCount++)
    let inpTitle = document.createElement("input")
    inpTitle.type = "text"
    inpTitle.setAttribute("value", movie.title)
    cell.appendChild(inpTitle)

    cell = row.insertCell(cellCount++)
    let inpAgeLimit = document.createElement("input")
    inpAgeLimit.type = "text"
    inpAgeLimit.setAttribute("value", movie.ageLimit)
    cell.appendChild(inpAgeLimit)

    cell = row.insertCell(cellCount++)
    let inpGenre = document.createElement("input")
    inpGenre.type = "text"
    inpGenre.setAttribute("value", movie.genre)
    cell.appendChild(inpGenre)

    cell = row.insertCell(cellCount++)
    let inpLength = document.createElement("input")
    inpLength.type = "text"
    inpLength.setAttribute("value", movie.length)
    cell.appendChild(inpLength)

    cell = row.insertCell(cellCount++)
    let inpRating = document.createElement("input")
    inpRating.type = "text"
    inpRating.setAttribute("value", movie.rating)
    cell.appendChild(inpRating)

    cell = row.insertCell(cellCount++)
    let inpReleaseDate = document.createElement("input")
    inpReleaseDate.type = "text"
    inpReleaseDate.setAttribute("value", movie.releaseDate)
    cell.appendChild(inpReleaseDate)

    //Update knap, sender movie til PUT
    cell = row.insertCell(cellCount++)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        movie.title = inpTitle.value;
        movie.ageLimit = inpAgeLimit.value;
        movie.genre = inpGenre.value;
        movie.length = inpLength.value;
        movie.rating = inpRating.value;
        movie.releaseDate = inpReleaseDate.value;
        updateMovie(movie)
    })
    cell.appendChild(pbUpdate)

    //Delete knap, sender movie til DELETE
    cell = row.insertCell(cellCount++)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "buttondelete"
    pbDelete.addEventListener('click', function () {
        const rowdel = document.getElementById(movie.title)
        rowdel.remove();
        deleteMovie(movie)
    })
    cell.appendChild(pbDelete)

}

async function deleteMovie(movie) {
    console.log("slet movie" + movie.title)
}

async function updateMovie(movie) {
    console.log(movie.title)
    console.log(movie.ageLimit)
    console.log(movie.genre)
    console.log(movie.length)
    console.log(movie.rating)
    console.log(movie.releaseDate)
    console.log(movie)
    const response = await restUpdateMovie(movie)
    console.log(response)
}

async function restUpdateMovie(movie) {
    const url = "http://localhost:8080/movie";
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }
    const jsonString = JSON.stringify(movie);
    fetchOptions.body = jsonString;
    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);
    console.log(response);
    if (!response.ok) {
        console.log("Det gik ikke godt med update");
    }

    return response;
}


function actionCreateTable() {
    lstMovies.forEach(createTable)
}

pbCreateTable.addEventListener('click', actionCreateTable)

