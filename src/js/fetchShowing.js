const urlShowings = "http://localhost:8080/showings"

//fetchany tager fat i movies og laver dem til en JSON
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

let lstShowings = []

const tableShowings = document.getElementById("tableShowings")

let isExecuted = false;

function createTable(showing) {


    if (!isExecuted){
        let cellCount = 0
        let rowCount = tableShowings.rows.length
        let row = tableShowings.insertRow(rowCount)
        row.id = showing.id;

        let cell = row.insertCell(cellCount++)
        cell.innerHTML = showing.id;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = showing["movie"].title;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = showing["movie"].releaseDate;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = showing["movie"].rating;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = showing["movie"].length;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = showing["movie"].genre
        cell = row.insertCell(cellCount++)
        cell.innerHTML = showing["movie"].ageLimit;

        console.log(lstShowings)

        isExecuted = true
    }


}

async function actionShowShowings() {
    lstShowings = await fetchAny(urlShowings);
    lstShowings.forEach(createTable)
}
const pbCreateTable = document.getElementById("pbCreateTable")
pbCreateTable.addEventListener("click",actionShowShowings)

