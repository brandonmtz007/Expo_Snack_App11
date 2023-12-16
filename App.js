import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');
  const [newProductCostPrice, setNewProductCostPrice] = useState('');
  const [newProductSalePrice, setNewProductSalePrice] = useState('');
  const [newProductPhotography, setNewProductPhotography] = useState('');
  const [newProductStoreId, setNewProductStoreId] = useState('');
  const [clients, setClients] = useState([]);
  const [newClientName, setNewClientName] = useState('');
  const [newClientAddress, setNewClientAddress] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientBillingPeriod, setNewClientBillingPeriod] = useState('');
  const [newClientBillingDay, setNewClientBillingDay] = useState('');
  const [newClientBillingHour, setNewClientBillingHour] = useState('');
  const [newClientStoreId, setNewClientStoreId] = useState('');
  const [newClientPhotography, setNewClientPhotography] = useState('');

  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [showClients, setShowClients] = useState(false);

  const handleLogin = async () => {
    const response = await fetch(
      `https://programacion-de-moviles.000webhostapp.com/5f/api2.php?comando=login&usuario=${username}&contrasena=${password}`
    );
    const data = await response.json();
    if (data.usuario) {
      alert('Iniciaste sesión correctamente');
      setIsLoggedIn(true);
    } else {
      alert('Hubo un error al iniciar sesión');
    }
  };

  const [showProducts, setShowProducts] = useState(false);
const handleAddClient = async () => {
  const response = await fetch(
    `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=insertarcliente&nombre=${newClientName}&domicilio=${newClientAddress}&fotografia=${newClientPhotography}&correo=${newClientEmail}&telefono=${newClientPhone}&periodocobrar=${newClientBillingPeriod}&diacobrar=${newClientBillingDay}&horacobrar=${newClientBillingHour}&idtienda=${newClientStoreId}`
  );
  const data = await response.json();
  if (data.mensaje === 'ok') {
    alert('Cliente agregado con éxito');
    handleClients();
  } else {
    alert('Hubo un error al agregar el cliente');
  }
};


  const handleProducts = async () => {
    const response = await fetch(
      'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerproductos'
    );
    const data = await response.json();
    setProducts(data);
    setShowProducts(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveChanges = async () => {
    const response = await fetch(
      `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=editarproducto&nombre=${selectedProduct.nombre}&descripcion=${selectedProduct.descripcion}&cantidad=${selectedProduct.cantidad}&preciodecosto=${selectedProduct.preciodecosto}&preciodeventa=${selectedProduct.preciodeventa}&fotografia=${selectedProduct.fotografia}&idtienda=${selectedProduct.idtienda}&id=${selectedProduct.id}`
    );
    const data = await response.json();
    if (data.mensaje === 'ok') {
      alert('Producto editado con éxito');
    } else {
      alert('Hubo un error al editar el producto');
    }
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };
  const handleDeleteProduct = async (id) => {
    const response = await fetch(
      `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=eliminarproducto&id=${id}`
    );
    const data = await response.json();
    if (data.mensaje === 'ok') {
      alert('Producto eliminado con éxito');
      handleProducts();
    } else {
      alert('Hubo un error al eliminar el producto');
    }
  };
  const handleAddProduct = async () => {
    const response = await fetch(
      `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=insertarproducto&nombre=${newProductName}&descripcion=${newProductDescription}&cantidad=${newProductQuantity}&preciodecosto=${newProductCostPrice}&preciodeventa=${newProductSalePrice}&fotografia=${newProductPhotography}&idtienda=${newProductStoreId}`
    );
    const data = await response.json();
    if (data.mensaje === 'ok') {
      alert('Producto agregado con éxito');
      handleProducts();
    } else {
      alert('Hubo un error al agregar el producto');
    }
  };

  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const handleClients = async () => {
    const response = await fetch(
      'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerclientes'
    );
    const data = await response.json();
    setClients(data);
    setShowClients(true);
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleSaveClientChanges = async () => {
    const response = await fetch(
      `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=editarcliente&nombre=${selectedClient.nombre}&domicilio=${selectedClient.domicilio}&fotografia=${selectedClient.fotografia}&correo=${selectedClient.correo}&telefono=${selectedClient.telefono}&periodocobrar=${selectedClient.periodocobrar}&diacobrar=${selectedClient.diacobrar}&horacobrar=${selectedClient.horacobrar}&idtienda=${selectedClient.idtienda}&id=${selectedClient.id}`
    );
    const data = await response.json();
    if (data.mensaje === 'ok') {
      alert('Cliente editado con éxito');
    } else {
      alert('Hubo un error al editar el cliente');
    }
  };

  const handleDeleteClient = async (id) => {
    const response = await fetch(
      `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=eliminarcliente&id=${id}`
    );
    const data = await response.json();
    if (data.mensaje === 'ok') {
      alert('Cliente eliminado con éxito');
      handleClients();
    } else {
      alert('Hubo un error al eliminar el cliente');
    }
  };

  if (isLoggedIn) {
    if (selectedProduct) {
      return (
        <View style={styles.container}>
          <Button title="Regresar" onPress={handleBack} />
          <Text>
            {selectedProduct.nombre} - {selectedProduct.descripcion} -{' '}
            {selectedProduct.cantidad} - {selectedProduct.preciodecosto} -{' '}
            {selectedProduct.preciodeventa}
          </Text>
          <Image
            source={{ uri: selectedProduct.fotografia }}
            style={{ width: 50, height: 50 }}
          />
          <TextInput
            style={styles.input}
            value={selectedProduct.nombre}
            onChangeText={(text) =>
              setSelectedProduct({ ...selectedProduct, nombre: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedProduct.descripcion}
            onChangeText={(text) =>
              setSelectedProduct({ ...selectedProduct, descripcion: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedProduct.cantidad.toString()}
            onChangeText={(text) =>
              setSelectedProduct({ ...selectedProduct, cantidad: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedProduct.preciodecosto.toString()}
            onChangeText={(text) =>
              setSelectedProduct({ ...selectedProduct, preciodecosto: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedProduct.preciodeventa.toString()}
            onChangeText={(text) =>
              setSelectedProduct({ ...selectedProduct, preciodeventa: text })
            }
          />
          <Button title="Guardar cambios" onPress={handleSaveChanges} />
          <Button
            title="Eliminar"
            onPress={() => handleDeleteProduct(selectedProduct.id)}
          />
        </View>
      );
    } else if (showAddProductForm) {
      return (
        <View style={styles.container}>
          <Button
            title="Regresar"
            onPress={() => setShowAddProductForm(false)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setNewProductName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            onChangeText={(text) => setNewProductDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            onChangeText={(text) => setNewProductQuantity(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de costo"
            onChangeText={(text) => setNewProductCostPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de venta"
            onChangeText={(text) => setNewProductSalePrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fotografía (URL)"
            onChangeText={(text) => setNewProductPhotography(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID de la tienda"
            onChangeText={(text) => setNewProductStoreId(text)}
          />

          <Button title="Agregar producto" onPress={handleAddProduct} />
        </View>
      );
    } else if (showProducts) {
      return (
        <View style={styles.container}>
          <Button title="Productos" onPress={handleProducts} />
          <Button title="Clientes" onPress={handleClients} />
          <Button title="Ventas" onPress={() => {}} />
          <Button title="Reportes" onPress={() => {}} />
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View>
                <Text onPress={() => handleProductClick(item)}>
                  {item.nombre} - {item.descripcion} - {item.cantidad} -{' '}
                  {item.preciodecosto} - {item.preciodeventa}
                </Text>
                <Image
                  source={{ uri: item.fotografia }}
                  style={{ width: 50, height: 50 }}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteProduct(item.id)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          <Button
            title="Agregar producto"
            onPress={() => setShowAddProductForm(true)}
            style={styles.addButton}
          />
        </View>
      );
    }
    if (selectedClient) {
      return (
        <View style={styles.container}>
          <Button title="Regresar" onPress={() => setSelectedClient(null)} />
          <Text>
            {selectedClient.nombre} - {selectedClient.domicilio} -{' '}
            {selectedClient.correo} - {selectedClient.telefono} -{' '}
            {selectedClient.periodocobrar} - {selectedClient.diacobrar} -{' '}
            {selectedClient.horacobrar}
          </Text>
          <Image
            source={{ uri: selectedClient.fotografia }}
            style={{ width: 50, height: 50 }}
          />
          <TextInput
            style={styles.input}
            value={selectedClient.nombre}
            onChangeText={(text) =>
              setSelectedClient({ ...selectedClient, nombre: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedClient.domicilio}
            onChangeText={(text) =>
              setSelectedClient({ ...selectedClient, domicilio: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedClient.correo}
            onChangeText={(text) =>
              setSelectedClient({ ...selectedClient, correo: text })
            }
          />
          <TextInput
            style={styles.input}
            value={selectedClient.telefono}
            onChangeText={(text) =>
              setSelectedClient({ ...selectedClient, telefono: text })
            }
          />
          <Button title="Guardar cambios" onPress={handleSaveClientChanges} />
          <Button
            title="Eliminar"
            onPress={() => handleDeleteClient(selectedClient.id)}
          />
        </View>
      );
    } else if (showAddClientForm) {
      return (
        <View style={styles.container}>
          <Button
            title="Regresar"
            onPress={() => setShowAddClientForm(false)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setNewClientName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Domicilio"
            onChangeText={(text) => setNewClientAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={(text) => setNewClientEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            onChangeText={(text) => setNewClientPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fotografía (URL)"
            onChangeText={(text) => setNewClientPhotography(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Período de cobro"
            onChangeText={(text) => setNewClientBillingPeriod(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Día de cobro"
            onChangeText={(text) => setNewClientBillingDay(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Hora de cobro"
            onChangeText={(text) => setNewClientBillingHour(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID de la tienda"
            onChangeText={(text) => setNewClientStoreId(text)}
          />
          <Button title="Agregar cliente" onPress={handleAddClient} />
        </View>
      );
    } else if (showClients) {
      return (
        <View style={styles.container}>
          <Button title="Clientes" onPress={handleClients} />
          <Button title="Regresar" onPress={() => setShowClients(false)} />
          <FlatList
            data={clients}
            renderItem={({ item }) => (
              <View>
                <Text onPress={() => handleClientClick(item)}>
                  {item.nombre} - {item.domicilio} - {item.correo} -{' '}
                  {item.telefono} - {item.periodocobrar} - {item.diacobrar} -{' '}
                  {item.horacobrar}
                </Text>
                <Image
                  source={{ uri: item.fotografia }}
                  style={{ width: 50, height: 50 }}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteClient(item.id)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          <Button
            title="Agregar cliente"
            onPress={() => setShowAddClientForm(true)}
            style={styles.addButton}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Button title="Productos" onPress={handleProducts} />
          <Button title="Clientes" onPress={handleClients} />
          <Button title="Ventas" onPress={() => {}} />
          <Button title="Reportes" onPress={() => {}} />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Usuario"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
