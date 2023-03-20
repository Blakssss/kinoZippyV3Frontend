console.log("vi er i fetchregioner")
const urlUsers = "http://localhost:8080/users"
const deleteUserURL = "http://localhost:8080/deleteUser"


//fetchany tager fat i users og laver dem til en JSON
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

const tableUsers = document.getElementById("tableUsers")

const pbCreateTable = document.getElementById("pbCreateTable")
const pbDeleteUser = document.getElementById("modalBtnDelete")
const pbUpdateUser = document.getElementById("modalBtnUpdate")

let isExecuted = false;
function createTable(user) {
    if(!isExecuted) {


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
}

let lstUsers = []

async function actionShowUsers() {
    console.log("hej")
    lstUsers = await fetchAny(urlUsers);
    console.log("fetch any gik fint")
    lstUsers.forEach(createTable)
    isExecuted = true;
    console.log("createtable gik fint")
    console.log(lstUsers)
}

function updateUser() {

}

async function deleteUser() {

    const userid = document.getElementById("modal-userId").value

    const deleteReq = {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({})
    }

    const response = await fetch(deleteUserURL + "/" + userid, deleteReq).catch((error) => console.log(error));
    console.log(response)
    return response
}
/*
function actionDeleteUser() {
    const userid = document.getElementById("modal-userId").value
    console.log(userid)
    const responseDeleteUser = deleteUser(userid)
    console.log(responseDeleteUser)
}
*/

pbCreateTable.addEventListener("click", actionShowUsers)
pbUpdateUser.addEventListener("click", updateUser)
pbDeleteUser.addEventListener("click", deleteUser)


