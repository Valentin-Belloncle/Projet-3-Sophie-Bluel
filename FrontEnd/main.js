import { getProjets } from "./service.js";
import { genererProjets } from "./script.js";

const projetsApi = await getProjets();
genererProjets(projetsApi);