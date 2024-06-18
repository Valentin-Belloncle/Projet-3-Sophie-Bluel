// Récupération des projets depuis l'API
export async function getProjects() {
	const reponse = await fetch("http://localhost:5678/api/works");
	const projetsApi = await reponse.json();
	return projetsApi;
}

// Récupération des catégories depuis l'API
export async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	const categoriesApi = await response.json();
	return categoriesApi;
}

// Envoie des informations du login et reception de la réponse de l'API
export async function postLogin (username, password) {

	const loginData = JSON.stringify({
		"email": username, 
		"password": password
	});

	const  response = await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: loginData
	});
	return response;
};

// Récupération du token de connection
function getToken() {
	return window.localStorage.getItem("token");
}

// Supression d'un projet par son ID
export async function deleteProjectApi(idProject) {
	const response = await fetch(`http://localhost:5678/api/works/${parseInt(idProject)}`, {
		method: "DELETE",
		headers: { 
			"Content-Type": "application/json", 
			"Authorization": "Bearer " + getToken()
		}
	});
	return response;
}

// Envoie de la photo ajoutée au back et réception réponse API
export async function postPhoto(imageData) {

	console.log(imageData);

	const  response = await fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: { 
			"Authorization": "Bearer " + getToken()
		},
		body: imageData
	});
	return response;
}