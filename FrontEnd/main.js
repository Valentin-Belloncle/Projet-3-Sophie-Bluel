import { getProjects, getCategories } from "./service.js";
import { generateProjects, generateFilters, filterProjects, setEditorMod } from "./script.js";

const projectsApi = await getProjects();
generateProjects(projectsApi);
const categoriesApi = await getCategories();
generateFilters(categoriesApi);
filterProjects(projectsApi);

// Vérification de connection
const connected = window.localStorage.getItem("connected");
setEditorMod (connected);