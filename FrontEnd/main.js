import { getProjects, getCategories } from "./service.js";
import { generateProjects, generateFilters, filterProjects, setEditorMod } from "./script.js";

// Récupération des projets depuis l'API et génération de la galerie
const projectsApi = await getProjects();
generateProjects(projectsApi);
// Récupération des catégories depuis l'API et génération puis gestion des boutons filtrants
const categoriesApi = await getCategories();
generateFilters(categoriesApi);
filterProjects(projectsApi);
// Vérification de connection par présence de la clé "connected" dans le stockage local
const connected = window.localStorage.getItem("connected");
setEditorMod (connected);
