import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand">
        <i className="fa fa-industry"></i>
        &nbsp;<i>Videojuegos</i>
        </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/videojuegos">
              Videojuegos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/plataformas">
              Plataformas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/empleados">
              Empleados
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/clientes">
              Clientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/categorias">
              Categorias
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Menu };