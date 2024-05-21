import { getProjets, getCategories } from "./service.js";
import { genererProjets, genererFiltres, filtreProjets } from "./script.js";

const projetsApi = await getProjets();
genererProjets(projetsApi);
const categoriesApi = await getCategories();
genererFiltres(categoriesApi);
filtreProjets(projetsApi);