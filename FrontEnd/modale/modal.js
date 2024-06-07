import { getProjects } from "../service.js";
import { generateModalProjects, processModal, deleteProject } from "../script.js";


const projectsApi = await getProjects();
generateModalProjects (projectsApi);
processModal();
deleteProject();

