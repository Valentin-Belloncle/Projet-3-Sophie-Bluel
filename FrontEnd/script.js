import { postLogin } from "./service.js";

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


//_______________________ LOGIN __________________________//

// Stockage de l'userID et token dans le local storage
async function saveToken(response) {
	response.json().then( (responseToken) => {
		localStorage.setItem("userId", parseInt(responseToken.userId));
		localStorage.setItem("token", responseToken.token);
		// Création d'une clé qui permettra de savoir si l'utilisateur est connecté
		localStorage.setItem("connected", true);
	});
};

// Gestion de la réponse de l'API après login
function processLoginResponseCode(response){
	switch(response.status) {
	case 200:
		// Confirmation de connexion dans la console 
		console.log("Connexion réussie");
		// Stockage token
		saveToken(response);
		// Renvoie à la page d'accueil
		document.location.href="../index.html";
		break;
	case 404:
		alert("Identifiant incorect");
		// Afficher un message d'erreur à l'utilisateur
		break;
	case 401:
		alert("Mot de passe incorect");
		// Afficher un message d'erreur à l'utilisateur
		break;
	case 500:
		alert("Erreur du serveur, réessayez plus tard");
		// Informer l'utilisateur qu'il y a eu une erreur serveur
		break;
	default:
		// Autres erreurs
		console.error("Erreur inattendue");
		// Informer l'utilisateur d'une erreur inconnue
	};
};

// Récupération et envoie des données utilisateurs du login puis gestion de la réponse API
export function setEventLogin() {
	document.getElementById("loginForm").addEventListener("submit", async function(event) {
		event.preventDefault();
		// Récupération valeurs input du login
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		// Envoie des valeurs à l'API
		const responseApi = await postLogin(username, password);
		// Gestion réponse API
		processLoginResponseCode(responseApi);
	});
};

// Affichage du mode editeur si connecté
export function setEditorMod(connected) {
	if (connected === "true") {
		document.querySelector(".editorStrip").style.display = "flex";
		document.querySelector(".editorButton").style.display = "flex";
	} else {
		document.querySelector(".editorStrip").style.display = "none";
		document.querySelector(".editorButton").style.display = "none";
	}
}

//____________________________MODAL____________________________//

// Ajout de la galerie de la modale dans HTML 
export function generateModalProjects(projects){
	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionCards = document.querySelector(".modal .gallery");

	for (let i = 0; i < projects.length; i++) {
		const article = projects[i];
		// Création d’une balise dédiée à un projet
		const pieceElement = document.createElement("figure");
		// Création des balises 
		const imageElement = document.createElement("img");
		imageElement.src = article.imageUrl;
		imageElement.alt = article.title;
		const divElement = document.createElement("div");
		divElement.className = "iconDiv";
		const iconeElement = document.createElement("i");
		iconeElement.className = "fa-solid fa-trash-can";
		// On rattache la balise article a la section Fiches
		sectionCards.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(divElement);
		divElement.appendChild(iconeElement);
	}
}

// Ouverture/fermeture de la modale
export function openModal() {
	document.querySelector(".editorButton").addEventListener("click", () => {
		const overlay = document.querySelector(".overlay");
		overlay.style.display = "block";
		const modal = document.querySelector(".modal");
		modal.style.display = "flex";
		const modal1 = document.querySelector(".modal1");
		const modal2 = document.querySelector(".modal2");
		const backModal = document.querySelector("#backModal");
		
		document.querySelector("#closeModal").addEventListener("click", () => {
			modal.style.display = "none";
			overlay.style.display = "none";
		});
		document.querySelector(".addPhoto").addEventListener("click", () => {
			modal1.style.display = "none";
			modal2.style.display = "flex";
			backModal.style.display = "inline";
		});
		document.querySelector("#backModal").addEventListener("click", () => {
			modal1.style.display = "flex";
			modal2.style.display = "none";
			backModal.style.display = "none";
		});
	});
}