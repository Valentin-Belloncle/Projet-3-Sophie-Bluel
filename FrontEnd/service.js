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