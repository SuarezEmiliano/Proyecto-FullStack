/* crear el servicio de artículos que nos permitirá consumir los datos de la 
webapi expuesta por el backend */

import axios from "axios";

const urlResource = "http://localhost:4000/api/clientes";

async function Buscar(Nombre, Pagina) {
const resp = await axios.get(urlResource, {
params: { Nombre, Pagina },
});
return resp.data;
}

async function BuscarPorLeg(item) {
const resp = await axios.get(urlResource + "/" + item.Legajo);
return resp.data;
}

async function Grabar(item) {
    if (item.Legajo === 0) {
        await axios.post(urlResource, item);
    } else {
        await axios.put(urlResource + "/" + item.Legajo, item);
    }
}

export const clientesService = {
    Buscar,
    BuscarPorLeg,
    Grabar
};