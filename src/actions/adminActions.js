import dispatcher from "../appDispatcher";
import * as adminApi from "../api/adminApi";



// ===== OWNER CREATION =====
export function getSpecies(oObject) {

    return adminApi.getSpecies().then(response => {
        return response;
    })
}


// ====== OWNER LOGIN =====
export function getBreed(species) {

    return adminApi.getBreed(species).then(response => {
        return response;
    })
}
