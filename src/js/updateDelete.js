console.log("Vi er i updateDelete")
const movieUrl = "http://localhost:8080/movie";

const deleteBtn = document.getElementById("deleteMovieBtn");
deleteBtn.addEventListener("submit", deleteMovie);

const updateBtn = document.getElementById("updateMovieBtn");
updateBtn.addEventListener("submit", updateMovie);

async function deleteMovie() {
    const deleteForm = document.getElementById("deleteMovieForm");
    const formData = new FormData(deleteForm);

    const url = movieUrl + "/" + formData.get("title");
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

    const url = movieUrl + "/" + formData.get("title");
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