import { postLogin } from "./service.js"

// Ajout de la galerie de projet dans HTML 
export function generateProjects(projects){
	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionCards = document.querySelector(".gallery");

	for (let i = 0; i < projects.length; i++) {
		const article = projects[i];
		// Création d’une balise dédiée à un projet
		const pieceElement = document.createElement("figure");
		// Création des balises 
		const imageElement = document.createElement("img");
		imageElement.src = article.imageUrl;
		imageElement.alt = article.title;
		const nomElement = document.createElement("figcaption");
		nomElement.innerText = article.title;        
		// On rattache la balise article a la section Fiches
		sectionCards.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
	}
}

export function generateFilters(categories){
	// Récupération de l'élément du DOM qui accueillera les filtres
	const sectionCards = document.querySelector(".categories");

	for (let i = 0; i < categories.length; i++) {
		const article = categories[i];
		// Création des balises 
		const buttonElement = document.createElement("button");
		buttonElement.id = article.id;
		buttonElement.innerText = article.name;
		// On rattache la balise article a la section Fiches
		sectionCards.appendChild(buttonElement);
	}
}

// Filtrage des projets
export function filterProjects(projects){
	const filterButtons = document.querySelectorAll(".categories button");

	for (let i = 0; i < filterButtons.length; i++) {
		filterButtons[i].addEventListener("click", function (event) {
			const id = event.target.id;
			const projectsFilters = projects.filter(function (project) {
				return project.category.id == id;
			});
			//On efface le code HTML pour pouvoir afficher les modifications par la suite
			document.querySelector(".gallery").innerHTML = "";
			// Moddification de la galerie selon le bouton
			if (id == "allElements") {
				generateProjects(projects);
			} else {
				generateProjects(projectsFilters);
			}
		});
	};
};

// Gestion de la réponse de l'API après login
function processLoginResponse(response){
	console.log(response.status);
	switch(response.status) {
		
	case 200:
		// Succès
		return response.json().then(data => {
			console.log("Connexion réussie:", data);
			// Gérer les données de succès
		});
	case 400:
		// Mauvaise requête
		return response.json().then(data => {
			console.error("Erreur de requête:", data.message);
			// Afficher un message d'erreur à l'utilisateur
		});
	case 401:
		// Non autorisé
		console.error("Identifiants invalides");
		// Informer l'utilisateur que les identifiants sont incorrects
		break;
	case 500:
		// Erreur interne du serveur
		console.error("Erreur du serveur, réessayez plus tard");
		// Informer l'utilisateur qu'il y a eu une erreur serveur
		break;
	default:
		// Autres erreurs
		console.error("Erreur inattendue:", response.status);
            // Informer l'utilisateur d'une erreur inconnue
	}
}

export function setEventLogin() {
	document.getElementById("loginForm").addEventListener("submit", async function(event) {
		event.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		const responseApi = await postLogin(username, password);
		processLoginResponse(responseApi);
	});
};

