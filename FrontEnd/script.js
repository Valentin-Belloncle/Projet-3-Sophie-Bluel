import { postLogin, deleteProjectApi, postPhoto } from "./service.js";

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

//____________________________MODALE____________________________//

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
		imageElement.id = article.id;
		// Création des div ayant pour rôle de "bouton" de suppression
		const divElement = document.createElement("div");
		divElement.className = "iconDiv";
		const iconeElement = document.createElement("i");
		iconeElement.className = "fa-solid fa-trash-can";
		// On rattache la balise article à la section Fiches
		sectionCards.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(divElement);
		divElement.appendChild(iconeElement);
	}
}

// Ouverture/fermeture de la modale
export function processModal() {
	const overlay = document.querySelector(".overlay");
	const modal = document.querySelector(".modal");
	const modal1 = document.querySelector(".modal1");
	const modal2 = document.querySelector(".modal2");
	const backModal = document.querySelector("#backModal");
	// Ouverture modale
	document.querySelector(".editorButton").addEventListener("click", () => {
		overlay.style.display = "block";
		modal.style.display = "flex";
		// Fermeture modale
		document.querySelector("#closeModal").addEventListener("click", () => {
			modal.style.display = "none";
			overlay.style.display = "none";
		});
		// Passage à la seconde page de modale
		document.querySelector(".addPhoto").addEventListener("click", () => {
			modal1.style.display = "none";
			modal2.style.display = "flex";
			backModal.style.display = "inline";
		});
		// Retour à la première page
		document.querySelector("#backModal").addEventListener("click", () => {
			modal1.style.display = "flex";
			modal2.style.display = "none";
			backModal.style.display = "none";
		});
	});
}

// Gestion de la réponse de l'API après délétion
function processDeleteResponseCode(response){
	switch(response.status) {
	case 204:
		// Affichage de la confirmation de supression dans la console 
		alert("Supression du projet réussie");
		break;
	case 401:
		alert("Utilisateur non autorisé");
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

// Supression d'un projet sélectionné par l'utilisateur
export function deleteProject() {
	// Sélection de tous les "boutons" de supression de la la galerie de la modale
	const figureGallery = document.querySelectorAll(".modal1 figure");
	// Ajout un écouteur d'événements à chaque bouton
	figureGallery.forEach((figure) => {
		const idProject = figure.querySelector("img").id;
		const binButton = figure.querySelector(".iconDiv");
		binButton.addEventListener("click", async function() {
			const responseApi = await deleteProjectApi(idProject);
			// Gestion réponse API
			processDeleteResponseCode(responseApi);
		});
	});
}

export function setControlButton() {
	const requiredFields = document.querySelectorAll("[required]");
	const submitButton = document.getElementById("submitButton");
	requiredFields.forEach((field) => {
		field.addEventListener("input", () => {
			let isValid = true;	
			requiredFields.forEach((f) => {
				if (!f.value) {
					isValid = false;
				}
			});
			submitButton.disabled = !isValid ;
		});
	});
}

export function setPreviewImage() {
	document.querySelector(".inputFile").addEventListener("input", (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function() {
			const imageBlock = document.getElementById("imagePreview");
			const inputBlock = document.querySelector(".addPhotoArea div");
			imageBlock.src = reader.result;
			imageBlock.style.display = "block";
			inputBlock.style.display = "none";
		};
		reader.readAsDataURL(file);
	});
}

export function generateOptions(categories) {
	const select = document.querySelector(".modal2 select");
	categories.forEach(category => {
		const option = document.createElement("option");
		option.value = category.id;
		option.innerText = category.name;
		select.appendChild(option);
	});
}

// Gestion de la réponse de l'API après ajout photo
function processAddPhotoResponseCode(response){
	switch(response.status) {
	case 201:
		// Affichage de la confirmation d'ajout dans la console '
		alert("Ajout du projet réussie");
		break;
	case 400:
		alert("Fichier ou syntaxe invalide");
		// Informer l'utilisateur que les données envoyées sont invalides
		break;
	case 401:
		alert("Utilisateur non autorisé");
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

// Récupération et envoie des données des inputs puis gestion de la réponse API après validation ajout photo
export function setEventAddPhoto() {
	document.getElementById("submitButton").addEventListener("click", async(event) => {
		event.preventDefault();
		const imageData = new FormData();

		const image = document.querySelector(".inputFile").files[0];
		const title = document.getElementById("title").value;
		const category = document.getElementById("category").value;

		imageData.append("image", image);
		imageData.append("title", title);
		imageData.append("category", parseInt(category));

		const responseApi = await postPhoto(imageData);
		processAddPhotoResponseCode(responseApi);
	});
}