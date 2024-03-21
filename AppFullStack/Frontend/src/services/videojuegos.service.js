/* crear el servicio de artículos que nos permitirá consumir los datos de la 
webapi expuesta por el backend */

import axios from "axios";

const urlResource = "http://localhost:4000/api/videojuegos";

async function Buscar(Nombre, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdVideojuego);
  return resp.data;
}

async function Grabar(item) {
    if (item.IdVideojuego === 0) {
      await axios.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.IdVideojuego, item);
    }
  }
  
export const videojuegosService = {
    Buscar,
    BuscarPorId,
    Grabar
};