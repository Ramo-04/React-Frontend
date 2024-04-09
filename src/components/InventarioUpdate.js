import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

const InventarioUpdate = () => {
  const paperStyle = { padding: '50px 20px', width: '80%', margin: '20px auto' };  
  const { id } = useParams(); 
  const [updateId, setUpdateId] = useState(id || ''); // Estado para almacenar el ID que se actualizará
  const [entrada_inventario, setEntradaInventario] = useState('');
  const [salida_inventario, setSalidaInventario] = useState('');
  const [precio_entrada, setPrecioEntrada] = useState('');
  const [precio_salida, setPrecioSalida] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad_inventario_stock, setCantidadInventarioStock] = useState('');
  const [inventarios, setInventarios] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const inventario = { entrada_inventario, salida_inventario, precio_entrada, precio_salida, producto, cantidad_inventario_stock };
    fetch(`http://localhost:8086/api/Inventario/update/${updateId}`, { // Utiliza el ID actualizado
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(inventario) 
    }).then(() => {
      console.log("Inventario actualizado correctamente");
    });
  }

  useEffect(() => {
    if (id) {
      setUpdateId(id); // Actualiza el estado del ID cuando cambia en la URL
    }
  }, [id]);

  useEffect(() => {
    if (updateId) {
      fetch(`http://localhost:8086/api/Inventario/list/${updateId}`) // Utiliza el ID actualizado
        .then(res => res.json())
        .then(data => {
          setEntradaInventario(data.entrada_inventario || '');
          setSalidaInventario(data.salida_inventario || '');
          setPrecioEntrada(data.precio_entrada || '');
          setPrecioSalida(data.precio_salida || '');
          setProducto(data.producto || '');
          setCantidadInventarioStock(data.cantidad_inventario_stock || '');
        })
        .catch(error => {
          console.error("Error al obtener el inventario:", error);
        });
    }
  }, [updateId]);

  useEffect(() => {
    fetch(`http://localhost:8086/api/Inventario/all`)
      .then(res => res.json())
      .then(data => {
        setInventarios(data || []);
      })
      .catch(error => {
        console.error("Error al obtener los inventarios:", error);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "red" }}><u>ACTUALIZAR INVENTARIO</u></h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleClick}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="ID del Inventario"
                placeholder="ID del Inventario"
                type='number'
                fullWidth
                required
                value={updateId}
                onChange={(e) => setUpdateId(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
  <TextField
    label="Entrada de Inventario"
    placeholder="Entrada de Inventario"
    type='number'
    fullWidth
    required
    value={entrada_inventario}
    onChange={(e) => setEntradaInventario(e.target.value)}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Salida de Inventario"
    placeholder="Salida de Inventario"
    type='number'
    fullWidth
    required
    value={salida_inventario}
    onChange={(e) => setSalidaInventario(e.target.value)}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Precio de Entrada"
    placeholder="Precio de Entrada"
    type='number'
    fullWidth
    required
    value={precio_entrada}
    onChange={(e) => setPrecioEntrada(e.target.value)}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Precio de Salida"
    placeholder="Precio de Salida"
    type='number'
    fullWidth
    required
    value={precio_salida}
    onChange={(e) => setPrecioSalida(e.target.value)}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Producto"
    placeholder="Producto"
    type='text'
    fullWidth
    required
    value={producto}
    onChange={(e) => setProducto(e.target.value)}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Cantidad en Stock"
    placeholder="Cantidad en Stock"
    type='number'
    fullWidth
    required
    value={cantidad_inventario_stock}
    onChange={(e) => setCantidadInventarioStock(e.target.value)}
  />
  </Grid>

          </Grid>
          <Button variant="contained" color="primary" type="submit" style={{marginTop:"40px"}}>
            Actualizar Inventario
          </Button>
        </Box>
      </Paper>
      <h1>Inventarios</h1>
<Paper elevation={3} style={paperStyle}>
  {inventarios.length > 0 ? (
    inventarios.map(inventario => (
      <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={inventario.id}>
        Id: {inventario.id}
        <br></br>
        Entrada de Inventario: {inventario.entrada_inventario}
        <br></br>
        Salida de Inventario: {inventario.salida_inventario}
        <br></br>
        Precio de Entrada: {inventario.precio_entrada}
        <br></br>
        Precio de Salida: {inventario.precio_salida}
        <br></br>
        Producto: {inventario.producto}
        <br></br>
        Cantidad en Stock: {inventario.cantidad_inventario_stock}
        <br></br>
      </Paper>
    ))
  ) : (
    <p>No hay inventarios disponibles.</p>
  )}
</Paper>

    </Container>
  );
}

export default InventarioUpdate;
