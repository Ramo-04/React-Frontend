import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const InventarioCreate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '20px auto' };  
  const [inventarios, setInventarios] = useState([]);
  const [entrada_inventario, setEntradaInventario] = useState('');
  const [salida_inventario, setSalidaInventario] = useState('');
  const [precio_entrada, setPrecioEntrada] = useState('');
  const [precio_salida, setPrecioSalida] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad_inventario_stock, setCantidadInventarioStock] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const inventario = { entrada_inventario, salida_inventario, precio_entrada, precio_salida, producto, cantidad_inventario_stock };
    fetch('http://localhost:8086/api/Inventario/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(inventario) 
    }).then(() => {
      console.log("Nuevo Inventario Registrado");
      fetchInventarios();
    });
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8086/api/Inventario/delete/${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log("Inventario eliminado correctamente");
      fetchInventarios();
    });
  }

  const fetchInventarios = () => {
    fetch(`http://localhost:8086/api/Inventario/all`)
      .then(res => res.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setInventarios(result.data);
        } else {
          console.error("Los datos recibidos no son un array:", result);
        }
      })
      .catch(error => {
        console.error("Error al obtener los productos:", error);
      });
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>AÑADIR INVENTARIO</u></h1>
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
                label="Entrada de Inventario"
                fullWidth
                value={entrada_inventario}
                type='number'
                onChange={(e) => setEntradaInventario(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Precio de Entrada"
                fullWidth
                value={precio_entrada}
                type='number'
                onChange={(e) => setPrecioEntrada(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Producto"
                fullWidth
                value={producto}
                type='text'
                onChange={(e) => setProducto(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="Salida de Inventario"
                variant="outlined"
                fullWidth
                value={salida_inventario}
                type='number'
                onChange={(e) => setSalidaInventario(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Precio de Salida"
                variant="outlined"
                fullWidth
                value={precio_salida}
                type='number'
                onChange={(e) => setPrecioSalida(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Cantidad en Stock"
                variant="outlined"
                fullWidth
                value={cantidad_inventario_stock}
                type='number'
                onChange={(e) => setCantidadInventarioStock(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="success" style={{ marginRight: '-470px' }} onClick={handleClick}>
                  Registrar Inventario
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Button component={Link} to="/inventarioupdate" variant="contained" color="primary" style={{ marginLeft: '-490px' }}>
                  Actualizar Inventario
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
      <h1>Inventario</h1>
      <Paper elevation={3} style={paperStyle}>
  {inventarios.map(inventario => (
    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={inventario.id}>
      Id: {inventario.id}
      <br></br>
      <br></br>
      Entrada de Inventario: {inventario.entrada_inventario}
      <br></br>
      <br></br>
      Salida de Inventario: {inventario.salida_inventario}
      <br></br>
      <br></br>
      Precio de Entrada: {inventario.precio_entrada}
      <br></br>
      <br></br>
      Precio de Salida: {inventario.precio_salida}
      <br></br>
      <br></br>
      Producto: {inventario.producto}
      <br></br>
      <br></br>
      Cantidad en Stock: {inventario.cantidad_inventario_stock}
      <br></br>
      <br></br>
      <Button variant="contained" color="error" onClick={() => handleDelete(inventario.id)}>
        Eliminar Inventario
      </Button>
    </Paper>
  ))}
</Paper>
    </Container>
  )
}

export default InventarioCreate;
