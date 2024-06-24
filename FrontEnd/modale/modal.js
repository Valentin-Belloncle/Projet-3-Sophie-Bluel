import { getProjects, getCategories } from "../service.js";
import { generateModalProjects, processModal, deleteProject, setControlButton, setPreviewImage, generateOptions, setEventAddPhoto } from "../script.js";

// Récupération des projets depuis l'API et génération de la galerie dans la modale
const projectsApi = await getProjects();
generateModalProjects (projectsApi);
// Gestion de l'ouverture et fermeture de la modale
processModal();
// Gestion de la suppression de projet dans la modale et mise à jour de l'API
deleteProject();
// Gestion activation/désactivation bouton de validation d'ajout de projet
setControlButton();
// Gestion de l'aperçu d'image
setPreviewImage();
// Récupération des catégories depuis l'API et génération des options de sélection dans la modale
const categoriesApi = await getCategories();
generateOptions(categoriesApi);
// Gestion de l'ajout de projet et envoie à l'API
setEventAddPhoto();
