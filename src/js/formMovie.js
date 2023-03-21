console.log("Vi er i formMovie")
const movieUrl = "http://localhost:8080/movie";

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formMovie;

const deleteBtn = document.getElementById("deleteMovieBtn");
deleteBtn.addEventListener("submit", deleteMovie);

const updateBtn = document.getElementById("updateMovieBtn");
updateBtn.addEventListener("submit", updateMovie);

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

async function deleteMovie() {
    const deleteForm = document.getElementById("deleteMovieForm");
    const formData = new FormData(deleteForm);

    const url = movieUrl + "/" + formData.get("id");
    const fetchOptions = {
        method: "DELETE",
        mode: 'cors'
    }

    try {
        const response = await fetch(url, fetchOptions);
        console.log(response);
    } catch (error) {
        alert(error.message);
    }
}

async function updateMovie() {
    const updateForm = document.getElementById("updateMovieForm");
    const formData = new FormData(updateForm);

    const url = movieUrl + "/" + formData.get("id");
    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "PUT",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }

    try {
        const response = await fetch(url, fetchOptions);
        console.log(response);
    } catch (error) {
        alert(error.message);
    }
}