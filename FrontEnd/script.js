// Ajout de la galerie de projet dans HTML 
export function genererProjets(projets){
	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionFiches = document.querySelector(".gallery");

	for (let i = 0; i < projets.length; i++) {
		const article = projets[i];
		// Création d’une balise dédiée à un projet
		const pieceElement = document.createElement("figure");
		// Création des balises 
		const imageElement = document.createElement("img");
		imageElement.src = article.imageUrl;
		imageElement.alt = article.title;
		const nomElement = document.createElement("figcaption");
		nomElement.innerText = article.title;        
		// On rattache la balise article a la section Fiches
		sectionFiches.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
	}
}

export function genererFiltres(categories){
	// Récupération de l'élément du DOM qui accueillera les filtres
	const sectionFiches = document.querySelector(".categories");

	for (let i = 0; i < categories.length; i++) {
		const article = categories[i];
		// Création des balises 
		const buttonElement = document.createElement("button");
		buttonElement.id = article.id;
		buttonElement.innerText = article.name;
		// On rattache la balise article a la section Fiches
		sectionFiches.appendChild(buttonElement);
	}
}

const boutonFiltrer = document.querySelector("button");

boutonFiltrer.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= 35;
	});
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});