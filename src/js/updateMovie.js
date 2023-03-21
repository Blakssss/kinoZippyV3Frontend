console.log("vi er i updateMovie")

const pbCreateTable = document.getElementById("pbCreateTable")
const tblMovie = document.getElementById("tblMovie")

function createTable(movie) {
    console.log(movie.title)
    if (!movie.title) return;

    let cellCount = 0
    let rowCount = tableMovies.rows.length
    let row = tableMovies.insertRow(rowCount)
    row.id = movie.title;

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.title

    cell = row.insertCell(cellCount++)
    let atag = document.createElement("a")
    atag.setAttribute("href", movie.href)
    atag.innerText = movie.title
    cell.appendChild(atag)

    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.region.title

    cell = row.insertCell(cellCount++)
    let inpHrefPhoto = document.createElement("input")
    inpHrefPhoto.type = "text"
    inpHrefPhoto.setAttribute("value", movie.hrefPhoto)
    cell.appendChild(inpHrefPhoto)

    cell = row.insertCell(cellCount++)
    let img = document.createElement("img")
    img.setAttribute("src", movie.hrefPhoto)
    img.setAttribute("alt", "hej")
    img.setAttribute("width", 150)
    img.setAttribute("height", 150)
    cell.appendChild(img)

    //Update knap, sender movie til PUT
    cell = row.insertCell(cellCount++)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        movie.hrefPhoto = inpHrefPhoto.value;
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

async function deleteKommune(movie) {
    console.log("slet movie" + movie.title)
}

async function updateMovie(movie) {
    console.log(movie.hrefPhoto)
    console.log(movie)
    const response = await restUpdateKommune(movie)
    console.log(response)
}

async function restUpdateKommune(movie) {
    const url = "http://localhost:8080/movie" + movie.title;
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
    };
    return response;
}



function actionCreateTable() {
    lstMovies.forEach(createTable)
}

pbCreateTable.addEventListener('click', actionCreateTable)

