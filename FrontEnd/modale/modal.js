import { getProjects } from "../service.js";
import { generateModalProjects, processModal } from "../script.js";


const projectsApi = await getProjects();
generateModalProjects (projectsApi);
processModal();


