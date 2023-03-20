console.log("Vi er i createUser")
const userUrl = "http://localhost:8080/user";

document.addEventListener('DOMContentLoaded', createFormEventListener);
let createUser;

function createFormEventListener(){
    createUser = document.getElementById("createUser");
    createUser.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {

    event.preventDefault();

    try {
        const formData = new FormData(createUser)

        const responseData = await postFormData(userUrl, formData)
        console.log(responseData);
    } catch (error) {
        alert(error.message)

    }
}
async function postFormData(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries())
    console.log(plainFormData)

    const formDataJsonString = JSON.stringify(plainFormData)

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }

    const response = await fetch(url, fetchOptions)
    return response;
}