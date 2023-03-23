console.log("vi er i fetchregioner")
const urlUsers = "http://localhost:8080/users"
const deleteUserURL = "http://localhost:8080/deleteUser"
const updateUserUrl = "http://localhost:8080/updateUser/"
const createUserUrl = "http://localhost:8080/user";

//fetchAny tager fat i users og laver dem til en JSON
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

const tableUsers = document.getElementById("tableUsers")

const pbCreateTable = document.getElementById("pbCreateTable")
const pbDeleteUser = document.getElementById("modalBtnDelete")


let isExecuted = false;

function createTable(user) {
    console.log(user.username)
    if(!isExecuted){
        let cellCount = 0

        let rowCount = tableUsers.rows.length

        console.log(rowCount)

        let row = tableUsers.insertRow(rowCount)
        row.id = user.username;

        let cell = row.insertCell(cellCount++)
        cell.innerHTML = user.id;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = user.username;
        cell = row.insertCell(cellCount++)
        cell.innerHTML = user.password;



        //Update knap, sender User til PUT
        cell = row.insertCell(cellCount++)
        let pbUpdate = document.createElement("button")
        pbUpdate.textContent = "Update"
        pbUpdate.id = "updateUserModal"
        pbUpdate.type = "button"
        pbUpdate.className = "btn btn-primary"
        pbUpdate.setAttribute('data-toggle', 'modal');
        pbUpdate.setAttribute('data-target', '#updateUserModal');
        pbUpdate.addEventListener('click', function () {
            $('#updateUserModal').modal('show');
            // Vi har lavet en hidden id værdi i vores table, som ikke bliver vist i formen for brugeren,
            // men som vi bruger til at få fat i id'et, så vi kan finde useren i DB ud fra id'et
            document.getElementById("hiddenUserId").value = user.id
        })
        cell.appendChild(pbUpdate)

        //Delete knap, sender User til DELETE
        cell = row.insertCell(cellCount++)
        let pbDelete = document.createElement("button")
        pbDelete.textContent = "Delete"
        pbDelete.className = "btn btn-primary"
        pbDelete.addEventListener('click', function () {
            const rowDelete = document.getElementById(user.username)
            deleteUser(user.id).then(response => response.json())
            rowDelete.remove();
        })
        cell.appendChild(pbDelete)
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

// UPDATE USER
const pbUpdateUser = document.getElementById("updateUserBtn")

async function updateUser() {

    const form = document.getElementById("updateUserForm");
    const id = document.getElementById("hiddenUserId").value;

    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;

    await fetch(updateUserUrl + id, {
        method: 'PATCH',
        body: JSON.stringify({ username: username, password: password }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            $('#updateModal').modal('hide');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}



// CREATE USER
const pbCreateUser = document.getElementById("createUserBtnModal")

async function createUser() {

    let usernameCreate = document.getElementById("createUsername").value;
    let passwordCreate = document.getElementById("createPassword").value;

    await fetch(createUserUrl, {
        method: 'POST',
        body: JSON.stringify({ username: usernameCreate, password: passwordCreate }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            $('#createUserModal').modal('hide');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// DELETE USER
async function deleteUser(userid) {

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

// EVENTS
pbCreateTable.addEventListener("click", actionShowUsers)
pbUpdateUser.addEventListener("click", updateUser)
pbDeleteUser.addEventListener("click", deleteUser)
pbCreateUser.addEventListener("click", createUser)

