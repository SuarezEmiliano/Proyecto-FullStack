/* crear el servicio de artículos que nos permitirá consumir los datos de la 
webapi expuesta por el backend */

import axios from "axios";

const urlResource = "http://localhost:4000/api/plataformas";

async function Buscar(Nombre, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdCategoria);
  return resp.data;
}

async function Grabar(item) {
    if (item.IdCategoria === 0) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.IdCategoria, item);
    }
  }
  
export const plataformasService = {
    Buscar,
    BuscarPorId,
    Grabar
};