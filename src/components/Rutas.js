import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import UsuarioCreate from './Usuario/UsuarioCreate';
import UsuarioUpdate from './Usuario/UsuarioUpdate';

import InventarioCreate from './Inventario/InventarioCreate';
import InventarioUpdate from './Inventario/InventarioUpdate';

import EmpleadoCreate from './Empleado/EmpleadoCreate';
import EmpleadoUpdate from './Empleado/EmpleadoUpdate';

import ServicioCreate from './Servicio/ServicioCreate';
import ServicioUpdate from './Servicio/ServicioUpdate';
const Rutas = () => {
  return (
    <Routes>
      {/*USUARIO*/ }
      <Route path="/usuariocreate" element={<UsuarioCreate />} />
      <Route path="/update/:id" element={<UsuarioUpdate />}/>
      {/*USUARIO*/ }
      
      {/*INVENTARIO*/ }
      <Route path="/inventariocreate" element={<InventarioCreate/>} />
      <Route path="/inventarioupdate" element={<InventarioUpdate/>} />
      {/*INVENTARIO*/ }

      {/*EMPLEADO*/ }
      <Route path="/empleadocreate" element={<EmpleadoCreate/>} />
      <Route path="/empleadoupdate" element={<EmpleadoUpdate/>} />
      {/*EMPLEADO*/ }

      {/*SERVICIO*/ }
      <Route path="/serviciocreate" element={<ServicioCreate/>} />
      <Route path="/servicioupdate" element={<ServicioUpdate/>} />
      {/*SERVICIO*/ }






    </Routes>
  );
};

export default Rutas;
