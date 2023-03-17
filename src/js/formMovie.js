console.log("Vi er i formMovie")
const movieUrl = "http://localhost:8080/movie";

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formMovie;

function createFormEventListener(){
    formMovie = document.getElementById("createMovie");
    formMovie.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {

    event.preventDefault();

    try {
        const formData = new FormData(formMovie)

        const responseData = await postFormData(movieUrl, formData)
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
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }

    const response = await fetch(url, fetchOptions)
    return response;
}