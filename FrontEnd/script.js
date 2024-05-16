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
		const nomElement = document.createElement("p");
		nomElement.innerText = article.title;        
		// On rattache la balise article a la section Fiches
		sectionFiches.appendChild(pieceElement);
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
	}
}

