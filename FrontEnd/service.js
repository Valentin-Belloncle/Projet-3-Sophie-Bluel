// Récupération des projets depuis l'API
export async function getProjets() {
	const reponse = await fetch("http://localhost:5678/api/works");
	const projetsApi = await reponse.json();
	return projetsApi;
}

// Récupération des catégories depuis l'API
export async function getCategories() {
	const reponse = await fetch("http://localhost:5678/api/categories");
	const categoriesApi = await reponse.json();
	return categoriesApi;
}

// Envoie des informations du login à l'API
export async function postLogin () {
	document.getElementById("loginForm").addEventListener("submit", async function(event) {
		event.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		const truc = {
			"email": username, 
			"password": password
		};
		const login = JSON.stringify(truc);
		console.log(username, password);
		const  Response = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json", 
				"Accept": "*/*"
			},
			body: login
		});
		console.log(Response.json());
	});
};