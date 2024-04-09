import React, { useState, useEffect, } from 'react';
import { Container, Paper, TextField, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


const EmpleadoCreate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '40px auto' };
  const [empleados, setEmpleados] = useState([]);
  const [sueldo_bruto, setSueldo] = useState('');
  const [cargo, setCargo] = useState('');
  const [nombre_completo_empleado, setNombreCompleto] = useState('');
  const [id_usuario, setIdUsuario] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const empleado = { sueldo_bruto, cargo,  nombre_completo_empleado, id_usuario };
    fetch('http://localhost:8086/api/Empleado/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empleado)
    }).then(() => {
      console.log("Nuevo Empleado Registrado");
      fetchEmpleados();
    });
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8086/api/Empleado/delete/${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log("Empleado eliminado correctamente");
      fetchEmpleados();
    });
  }

  const fetchEmpleados = () => {
    fetch("http://localhost:8086/api/Empleado/all")
      .then(res => res.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setEmpleados(result.data);
        } else {
          console.error("Los datos recibidos no son un array:", result);
        }
      })
      .catch(error => {
        console.error("Error al obtener los empleados:", error);
      });
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>AÑADIR EMPLEADO</u></h1>
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
                  Registrar Empleado
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Button component={Link} to="/empleadoupdate" variant="contained" color="primary" style={{ marginLeft: '-425px' }}>
                  Actualizar Empleado
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
            Sueldo: {empleado.sueldo}
            <br></br>
            <br></br>
            Cargo: {empleado.cargo}
            <br></br>
            <br></br>
            Nombre Completo: {empleado.nombreCompleto}
            <br></br>
            <br></br>
            Id Usuario: {empleado.idUsuario}
            <br></br>
            <br></br>
            <Button variant="contained" color="error" onClick={() => handleDelete(empleado.id)}>
              Eliminar Empleado
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  )
}

export default EmpleadoCreate;
