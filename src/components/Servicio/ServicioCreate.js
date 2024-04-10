import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const ServicioCreate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '40px auto' };
  const [servicios, setServicios] = useState([]);
  const [nombre_servicio, setNombreServicio] = useState('');
  const [descripcion_servicio, setDescripcionServicio] = useState('');
  const [calidad_servicio, setCalidadServicio] = useState('');
  const [tipo_servicio, setTipoServicio] = useState('');
  const [id_empleado, setIdEmpleado] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const servicio = { nombre_servicio, descripcion_servicio, calidad_servicio, tipo_servicio, id_empleado };
    fetch('http://localhost:8086/api/Servicio/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(servicio)
    }).then(() => {
      console.log("Nuevo Servicio Registrado");
      fetchServicios();
    });
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8086/api/Servicio/delete/${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log("Servicio eliminado correctamente");
      fetchServicios();
    });
  }

  const fetchServicios = () => {
    fetch("http://localhost:8086/api/Servicio/all")
      .then(res => res.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setServicios(result.data);
        } else {
          console.error("Los datos recibidos no son un array:", result);
        }
      })
      .catch(error => {
        console.error("Error al obtener los servicios:", error);
      });
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>CREAR SERVICIO</u></h1>
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
                label="Nombre del Servicio"
                fullWidth
                value={nombre_servicio}
                type='text'
                onChange={(e) => setNombreServicio(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Descripción del Servicio"
                fullWidth
                value={descripcion_servicio}
                type='text'
                onChange={(e) => setDescripcionServicio(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Calidad del Servicio"
                fullWidth
                value={calidad_servicio}
                type='text'
                onChange={(e) => setCalidadServicio(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Tipo de Servicio"
                fullWidth
                value={tipo_servicio}
                type='text'
                onChange={(e) => setTipoServicio(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="ID del Empleado"
                fullWidth
                value={id_empleado}
                type='number'
                onChange={(e) => setIdEmpleado(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="success" style={{ marginRight: '-450px' }} onClick={handleClick}>
                  Registrar Servicio
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Button component={Link} to="/servicioupdate" variant="contained" color="primary" style={{ marginLeft: '-510px' }}>
                  Actualizar Servicio
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={200}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Button component={Link} to="/usuariocreate" variant="contained" color="primary" style={{ marginLeft: '-50px'}}>
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <h1>Servicios</h1>
      <Paper elevation={3} style={paperStyle}>
        {servicios.map(servicio => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={servicio.id}>
            Id: {servicio.id}
            <br></br>
            <br></br>
            Nombre del Servicio: {servicio.nombre_servicio}
            <br></br>
            <br></br>
            Descripción del Servicio: {servicio.descripcion_servicio}
            <br></br>
            <br></br>
            Calidad del Servicio: {servicio.calidad_servicio}
            <br></br>
            <br></br>
            Tipo de Servicio: {servicio.tipo_servicio}
            <br></br>
            <br></br>
            ID del Empleado: {servicio.id_empleado}
            <br></br>
            <br></br>
            <Button variant="contained" color="error" onClick={() => handleDelete(servicio.id)}>
              Eliminar Servicio
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  )
}

export default ServicioCreate;