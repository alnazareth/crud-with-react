// En este apartado importamos los componentes con vamos a estar utilizando para este proyecto
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Table, Pagination, Button, Modal, Form } from 'react-bootstrap';

//En este apartado  definimos el componente Datatable y los estados respectivos a las acciones.
const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState({});

  //con esto manejamos la paginacion de la lista (Por defecto 30 registros)
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  /*En este método lo que hacemos es conectarnos con el servidor
   de pruebas para traernos los datos precargados de prueba en Localhost:5000 y llenar la tabla con los datos */
  const fetchData = async () => {
    try {
      const response = await api.get('/data');
      const dataWithActions = response.data.map(item => ({
        ...item,
        onDelete: () => handleDelete(item.id),
        onEdit: () => handleEdit(item),
      }));
      setData(dataWithActions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
// Aqui manejamos la eliminación de un registro de la lista.
  const handleDelete = async (id) => {
    try {
      await api.delete(`/data/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
// Aqui manejamos la edición de un registro de la lista mostrandose una modal para actualizar los datos.
  const handleEdit = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };

// Manejamos la edición de un registro mediante un identificador único y cerramos el modal.
  const handleSaveEdit = async () => {
    try {
      await api.put(`/data/${editItem.id}`, { name: editItem.name, description: editItem.description });
      fetchData();
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };
// Cerramos el modal de edición y reinicia el estado 'editItem'.
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditItem({});
  };

  // Manejamos los cambios en los inputs del formulario de edición.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Utiliza una expresión regular para permitir solo letras y espacios
    const onlyLetters = /^[A-Za-z\s]+$/;
    if (onlyLetters.test(value) || value === '') {
      setEditItem({ ...editItem, [name]: value });
    }
  };

    // Calcula el índice del último y primer elemento en la página actual.

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//Mediante este metodo manejamos el cambio de página en la paginación.
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
// Renderiza la interfaz de usuario con Bootstrap.
  return (
    <div>
      <h2>Total de Registros: {data.length}</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">No hay registros</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="danger" onClick={item.onDelete}>
                    Delete
                  </Button>
                  <Button variant="info" onClick={item.onEdit}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={editItem.name || ''}
                onChange={handleInputChange}
                name="name"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Apellido"
                value={editItem.description || ''}
                onChange={handleInputChange}
                name="description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
// Exportamos el componente DataTable para poder integrarlo con los demas en la app
export default DataTable;
