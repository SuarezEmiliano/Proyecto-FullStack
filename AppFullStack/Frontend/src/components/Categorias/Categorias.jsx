import React, { useState } from "react";
import moment from "moment";
import CategoriasBuscar from "./CategoriasBuscar";
import CategoriasListado from "./CategoriasListado";
import CategoriasRegistro from "./CategoriasRegistro";
import { categoriasService } from "../../services/categorias.service";

function Categorias() {
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [Nombre, setNombre] = useState("");

    const [Items, setItems] = useState(null);
    const [Item, setItem] = useState(null);
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);
  
    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        }
        else {
          _pagina = Pagina;
        }

        const data = await categoriasService.Buscar(Nombre, _pagina);
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);

        // generar array de las páginas para mostrar en select del paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }

    async function BuscarPorId(item, accionABMC) {
        const data = await categoriasService.BuscarPorId(item);
        setItem(data);
        setAccionABMC(accionABMC);
    }
       /*  if (accionABMC === "C") {
          alert("Consultando...");
        }
        if (accionABMC === "M") {
          alert("Modificando...");
        }
    } */
    
    function Consultar(item) {
        BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    function Modificar(item) {
        BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
    
    function Agregar() {
        setAccionABMC("A");
        setItem({
            IdCategoria: 0,
            Nombre: null,
            FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
        });
    }

    async function Grabar(item) {
        // agregar o modificar
        try
        {
          await categoriasService.Grabar(item);
        }
        catch (error)
        {
          alert(error?.response?.data?.message ?? error.toString())
          return;
        }
        await Buscar();
        Volver();
      
        setTimeout(() => {
          alert(
            "Registro " +
              (AccionABMC === "A" ? "agregado" : "modificado") +
              " correctamente."
          );
        }, 0);
    }
  
    // Volver/Cancelar desde Agregar/Modificar/Consultar
    function Volver() {
      setAccionABMC("L");
    }
  
    return (
        <div>
            <div className="tituloPagina">
            Categorias <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" &&  <CategoriasBuscar
                Nombre={Nombre}
                setNombre={setNombre}
                Buscar={Buscar}
                Agregar={Agregar}
            />}

            {/* Tabla de resutados de busqueda y Paginador */}
            {AccionABMC === "L" && Items?.length > 0 && <CategoriasListado
                {...{
                    Items,
                    Consultar,
                    Modificar,
                    Pagina,
                    RegistrosTotal,
                    Paginas,
                    Buscar,
                }}
            /> }

            {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
                <i className="fa fa-exclamation-sign"></i>
                No se encontraron registros...
            </div> }

            {/* Formulario de alta/modificacion/consulta */}
            {AccionABMC !== "L" && <CategoriasRegistro
                {...{ AccionABMC, 
                    Item, 
                    Grabar, 
                    Volver 
                }}
            /> }
        </div>
    );
}

export { Categorias };