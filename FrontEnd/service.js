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

// Envoie des informations du login et reception de laà l'API
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
