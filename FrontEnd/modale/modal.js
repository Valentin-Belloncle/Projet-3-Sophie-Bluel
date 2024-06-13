import { getProjects, getCategories } from "../service.js";
import { generateModalProjects, processModal, deleteProject, setControlButton, setPreviewImage, generateOptions, setEventAddPhoto } from "../script.js";


const projectsApi = await getProjects();
generateModalProjects (projectsApi);
processModal();
deleteProject();
setControlButton();
setPreviewImage();
const categoriesApi = await getCategories();
generateOptions(categoriesApi);
setEventAddPhoto();
