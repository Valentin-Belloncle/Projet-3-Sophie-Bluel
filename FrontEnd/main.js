import { getProjects, getCategories } from "./service.js";
import { generateProjects, generateFilters, filterProjects } from "./script.js";

const projectsApi = await getProjects();
generateProjects(projectsApi);
const categoriesApi = await getCategories();
generateFilters(categoriesApi);
filterProjects(projectsApi);