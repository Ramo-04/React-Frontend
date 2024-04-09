import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import UsuarioCreate from './UsuarioCreate';
import UsuarioUpdate from './UsuarioUpdate';
import InventarioCreate from './InventarioCreate';
import InventarioUpdate from './InventarioUpdate';
import EmpleadoCreate from './EmpleadoCreate';
import EmpleadoUpdate from './EmpleadoUpdate';
import ServicioCreate from './ServicioCreate';
import ServicioUpdate from './ServicioUpdate';
const Rutas = () => {
  return (
    <Routes>
      {/*USUARIO*/ }
      <Route path="/" element={<UsuarioCreate />} />
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
