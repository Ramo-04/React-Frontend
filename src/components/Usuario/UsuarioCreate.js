import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const UsuarioCreate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '20px auto' };  
  const [usuarios, setUsuarios] = useState([]);
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const usuario = { contraseña, correo, telefono, direccion };
    fetch('http://localhost:8086/api/Usuario/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(usuario) 
    }).then(() => {
      console.log("Nuevo Usuario Registrado");
      fetchUsuarios();
    });
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8086/api/Usuario/delete/${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log("Usuario eliminado correctamente");
      fetchUsuarios();
    });
  }

  const fetchUsuarios = () => {
    fetch("http://localhost:8086/api/Usuario/all")
      .then(res => res.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setUsuarios(result.data);
        } else {
          console.error("Los datos recibidos no son un array:", result);
        }
      })
      .catch(error => {
        console.error("Error al obtener los usuarios:", error);
      });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>AÑADIR USUARIO</u></h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="CORREO"
                variant="outlined"
                type='text'
                fullWidth
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="DIRECCION"
                variant="outlined"
                type='text'
                fullWidth
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-number"
                label="TELEFONO"
                type="text"
                fullWidth
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-required"
                label="CONTRASEÑA"
                type='text'
                fullWidth
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginLeft:'450px' }}>

               <Button variant="contained" color="success" style={{ width: '250px' }} onClick={handleClick}>
                 Registrar Usuario
               </Button>
             <div style={{ display: 'flex', width: '250px', marginTop: '60px' }}>
               <Button component={Link} to="/update/:id" variant="contained" color="primary" style={{ width: '400px' }}>
                 Actualizar Usuario
               </Button>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', marginLeft: '10px' }}>
              <Button component={Link} to="/inventariocreate" variant="contained" color="primary" style={{ width: '200px' }}>
                Ir a Inventario
              </Button>
              <Button component={Link} to="/empleadocreate" variant="contained" color="primary" style={{ width: '200px', marginLeft: '10px' }}>
                Ir a Empleado
              </Button>
              <Button component={Link} to="/serviciocreate" variant="contained" color="primary" style={{ width: '200px', marginLeft: '10px' }}>
                Ir a Servicio
              </Button>
            </div>

           </div>
          </Grid>
          </Grid>
        </Box>
      </Paper>
      <h1>Usuarios</h1>
      <Paper elevation={3} style={paperStyle}>
        {usuarios.map(usuario => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={usuario.id}>
            Id: {usuario.id}
            <br></br>
            <br></br>
            Correo: {usuario.correo}
            <br></br>
            <br></br>
            Contraseña: {usuario.contrasena}
            <br></br>
            <br></br>
            Dirección: {usuario.direccion}
            <br></br>
            <br></br>
            Teléfono: {usuario.telefono}
            <br></br>
            <br></br>
            <Button variant="contained" color="error" onClick={() => handleDelete(usuario.id)}>
              Eliminar Usuario
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  )
}

export default UsuarioCreate;
