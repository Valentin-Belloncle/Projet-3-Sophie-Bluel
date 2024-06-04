import { getProjects } from "../service.js";
import { generateModalProjects, openModal } from "../script.js";


const projectsApi = await getProjects();
generateModalProjects (projectsApi);
openModal();


