import React, { useState, } from 'react';
import { Container, Paper, TextField, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';

const UsuarioUpdate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '20px auto' };  
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const usuarioActualizado = {idUsuario, contraseña, correo, telefono, direccion }
    console.log(usuarioActualizado)
    fetch(`http://localhost:8086/api/Usuario/update/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioActualizado)
    }).then(() => {
      console.log("Usuario actualizado correctamente");
    });
  }

  React.useEffect(() => {
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
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>ACTUALIZAR USUARIO</u></h1>
          <Box
          component="form"
          noValidate
          autoComplete="off"
          >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="outlined-required"
                label="ID del Usuario"
                fullWidth
                value={idUsuario}
                type="number"
                onChange={(e) => setIdUsuario(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="CONTRASEÑA"
                fullWidth
                value={contraseña}
                type="text"
                onChange={(e) => setContraseña(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="CORREO"
                variant="outlined"
                fullWidth
                value={correo}
                type="text"
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="DIRECCION"
                variant="outlined"
                fullWidth
                value={direccion}
                type='text'
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-number"
                label="TELEFONO"
                type="number"
                fullWidth
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
               <Button variant="contained" color="success" textalign="center" style={{ marginLeft: "-400px" }} onClick={handleClick}>
               Actualizar Usuario
               </Button>
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
          Contraseña: {usuario.contraseña}
          <br></br>
          <br></br>
          Correo: {usuario.correo}
          <br></br>
          <br></br>
          Direccion: {usuario.direccion}
          <br></br>
          <br></br>
          Telefono: {usuario.telefono}
          <br></br>
          <br></br>
        </Paper>
        ))}

      </Paper>
    </Container>
  );
};

export default UsuarioUpdate;
