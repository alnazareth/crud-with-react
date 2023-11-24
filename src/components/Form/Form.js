import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../services/api';

const FormComponent = (props) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo se ingresen letras
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/data', formData);
      setFormData({ name: '', description: '' }); // Limpiar el formulario después de enviar
      props.onDataAdded(); // Notificar al componente padre que se han añadido datos
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          pattern="[a-zA-Z\s]*"
          title="Solo se permiten letras"
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          pattern="[a-zA-Z\s]*"
          title="Solo se permiten letras"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Agregar a la lista
      </Button>
      
    </Form>
  );
};

export default FormComponent;
