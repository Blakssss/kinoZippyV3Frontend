console.log("vi er i fetchregioner")
const urlUsers = "http://localhost:8080/users"



//fetchany tager fat i users og laver dem til en JSON
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}


const tableUsers = document.getElementById("tableUsers")
function createTable(user) {
    console.log(user.username)

    let cellCount = 0
    let rowCount = tableUsers.rows.length
    console.log(rowCount)
    let row = tableUsers.insertRow(rowCount)
    row.id = user.username;

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = user.username;
    cell = row.insertCell(cellCount++)
    cell.innerHTML = user.password;
}
let lstUsers = []

async function actionShowUsers() {
    console.log("hej")
    lstUsers = await fetchAny(urlUsers);
    console.log("fetch any gik fint")
    lstUsers.forEach(createTable)
    console.log("createtable gik fint")
    console.log(lstUsers)
}
const pbCreateTable = document.getElementById("pbCreateTable")
pbCreateTable.addEventListener("click",actionShowUsers)

