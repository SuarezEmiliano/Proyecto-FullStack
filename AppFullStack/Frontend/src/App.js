import './App.css';
import React from 'react'; //necesaria en stackblitz 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Inicio } from "./components/Inicio";
import { Videojuegos } from './components/videojuegos/Videojuegos';
import { Plataformas } from './components/plataformas/Plataformas';
import { Empleados } from './components/empleados/Empleados';
import { Clientes } from './components/clientes/Clientes';
import { Categorias } from './components/Categorias/Categorias';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className='divBody'>
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/videojuegos" element={<Videojuegos />} />
            <Route path="/plataformas" element={<Plataformas />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/categorias" element={<Categorias />} />

            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;