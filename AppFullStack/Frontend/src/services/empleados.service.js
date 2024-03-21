/* crear el servicio de artículos que nos permitirá consumir los datos de la 
webapi expuesta por el backend */

import axios from "axios";

const urlResource = "http://localhost:4000/api/empleados";

async function Buscar(Nombre, Pagina) {
const resp = await axios.get(urlResource, {
    params: { Nombre, Pagina },
});
return resp.data;
}

async function BuscarPorId(item) {
const resp = await axios.get(urlResource + "/" + item.IdEmpleado);
return resp.data;
}

async function ActivarDesactivar(item) {
await axios.delete(urlResource + "/" + item.IdEmpleado);
}

async function Grabar(item) {
    if (item.IdEmpleado=== 0) {
    await axios.post(urlResource, item);
    } else {
    await axios.put(urlResource + "/" + item.IdEmpleado, item);
    }
}

export const empleadosService = {
    Buscar,
    BuscarPorId,
    ActivarDesactivar,
    Grabar
};