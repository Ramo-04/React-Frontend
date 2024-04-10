import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Grid, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ServicioUpdate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '20px auto' };  
  const { id } = useParams(); 
  const [selectedId, setSelectedId] = useState('');
  const [nombre_servicio, setNombreServicio] = useState('');
  const [descripcion_servicio, setDescripcionServicio] = useState('');
  const [calidad_servicio, setCalidadServicio] = useState('');
  const [tipo_servicio, setTipoServicio] = useState('');
  const [id_empleado, setIdEmpleado] = useState('');
  const [servicios, setServicios] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const servicio = { nombre_servicio, descripcion_servicio, calidad_servicio, tipo_servicio, id_empleado };
    fetch(`http://localhost:8086/api/Servicio/update/${selectedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(servicio) 
    }).then(() => {
      console.log("Servicio actualizado correctamente");
    });
  }

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8086/api/Servicio/${id}`)
        .then(res => res.json())
        .then(data => {
          setNombreServicio(data.nombre_servicio);
          setDescripcionServicio(data.descripcion_servicio);
          setCalidadServicio(data.calidad_servicio);
          setTipoServicio(data.tipo_servicio);
          setIdEmpleado(data.id_empleado);
        })
        .catch(error => {
          console.error("Error al obtener el servicio:", error);
        });
    }

    
    fetch('http://localhost:8086/api/Servicio/all')
      .then(res => res.json())
      .then(response => {
        const data = response.data; 
        if (Array.isArray(data)) {
          setServicios(data);
        } else {
          console.error('La respuesta del servidor no es un array:', data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los servicios:', error);
      });
  }, [id]);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>ACTUALIZAR SERVICIO</u></h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Seleccionar Servicio"
                fullWidth
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {servicios.map((servicio) => (
                  <MenuItem key={servicio.id} value={servicio.id}>
                    {servicio.nombre_servicio}
                  </MenuItem>
                ))}
              </TextField>
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
                <Button variant="contained" color="success" style={{ marginRight: '-400px' }} onClick={handleClick}>
                  Actualizar Servicio
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={200}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Button component={Link} to="/serviciocreate" variant="contained" color="primary" style={{ marginLeft: '-50px'}}>
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
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}

export default ServicioUpdate;
