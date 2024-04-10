import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Grid, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EmpleadoUpdate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '20px auto' };  
  const { id } = useParams(); 
  const [selectedId, setSelectedId] = useState('');
  const [sueldo_bruto, setSueldo] = useState('');
  const [cargo, setCargo] = useState('');
  const [nombre_completo_empleado, setNombreCompleto] = useState('');
  const [id_usuario, setIdUsuario] = useState('');
  const [empleados, setEmpleados] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const empleado = { nombre_completo_empleado: nombre_completo_empleado, cargo: cargo, sueldo_bruto: parseFloat(sueldo_bruto), id_usuario };
    fetch(`http://localhost:8086/api/Empleado/update/${selectedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(empleado) 
    }).then(() => {
      console.log("Empleado actualizado correctamente");
    });
  }

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8086/api/Empleado/${id}`)
        .then(res => res.json())
        .then(data => {
          setSueldo(data.sueldo_bruto);
          setCargo(data.cargo);
          setNombreCompleto(data.nombre_completo_empleado);
          setIdUsuario(data.id_usuario);
        })
        .catch(error => {
          console.error("Error al obtener el empleado:", error);
        });
    }

    // Fetch empleados
    fetch('http://localhost:8086/api/Empleado/all')
      .then(res => res.json())
      .then(response => {
        const data = response.data; // Acceder a la propiedad data de la respuesta
        if (Array.isArray(data)) {
          setEmpleados(data);
        } else {
          console.error('La respuesta del servidor no es un array:', data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los empleados:', error);
      });
  }, [id]);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>ACTUALIZAR EMPLEADO</u></h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Seleccionar Empleado"
                fullWidth
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {empleados.map((empleado) => (
                  <MenuItem key={empleado.id} value={empleado.id}>
                    {empleado.nombre_completo_empleado}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="outlined-required"
                label="SUELDO"
                fullWidth
                value={sueldo_bruto}
                type='number'
                onChange={(e) => setSueldo(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="CARGO"
                fullWidth
                value={cargo}
                type='text'
                onChange={(e) => setCargo(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="NOMBRE COMPLETO"
                fullWidth
                value={nombre_completo_empleado}
                type='text'
                onChange={(e) => setNombreCompleto(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-required"
                label="ID USUARIO"
                fullWidth
                value={id_usuario}
                type='number'
                onChange={(e) => setIdUsuario(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="success" style={{ marginRight: '-400px' }} onClick={handleClick}>
                  Actualizar Empleado
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={200}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Button component={Link} to="/empleadocreate" variant="contained" color="primary" style={{ marginLeft: '-50px'}}>
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <h1>Empleados</h1>
      <Paper elevation={3} style={paperStyle}>
        {empleados.map(empleado => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={empleado.id}>
            Id: {empleado.id}
            <br></br>
            <br></br>
            Sueldo: {empleado.sueldo_bruto}
            <br></br>
            <br></br>
            Cargo: {empleado.cargo}
            <br></br>
            <br></br>
            Nombre completo: {empleado.nombre_completo_empleado}
            <br></br>
            <br></br>
            Id Usuario: {empleado.id_usuario}
            <br></br>
            <br></br>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}

export default EmpleadoUpdate;
