import React from "react";
import moment from "moment";

export default function VideojuegosListado({
  Items, /* Estado */
  Consultar, /* Funcion */
  Modificar, /* Funcion */
  Pagina, /* Estado */
  RegistrosTotal, /* Estado */
  Paginas, /* Estado */
  Buscar, /* Funcion */
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">IdVideojuego</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Stock</th>
                        <th className="text-center">Fecha Salida</th>
                        <th className="text-center">IdCategoria</th>
                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Items &&
                        Items.map((Item) => (
                        <tr key={Item.IdVideojuego}>
                            <td>{Item.IdVideojuego}</td>
                            <td>{Item.Nombre}</td>
                            <td className="text-end">{Item.Precio}</td>
                            <td className="text-end">{Item.FechaSalida}</td>
                            <td className="text-end">
                            {moment(Item.FechaSalida).format("DD/MM/YYYY")}
                            </td>
                            <td className="text-end">{Item.IdCategoria}</td>
                            <td className="text-center text-nowrap">
                            <button
                                className="btn btn-sm btn-outline-primary"
                                title="Consultar"
                                onClick={() => Consultar(Item)}
                            >
                                <i className="fa fa-eye"></i>
                                </button>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            title="Modificar"
                            onClick={() => Modificar(Item)}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginador*/}
            <div className="paginador">
                <div className="row">
                    <div className="col">
                        <span className="pyBadge">Registros: {RegistrosTotal}</span>
                    </div>
                    <div className="col text-center">
                        Pagina: &nbsp;
                        <select
                            value={Pagina}
                            onChange={(e) => {
                                Buscar(e.target.value);
                            }}
                        >
                            {Paginas?.map((x) => (
                                <option value={x} key={x}>
                                {x}
                                </option>
                            ))}
                        </select>
                        &nbsp; de {Paginas?.length}
                    </div>
                </div>
            </div>
        </div>
    );
}