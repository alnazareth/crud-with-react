// En este apartado importamos los componentes con vamos a estar utilizando para este proyecto
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DataTable from './components/DataTable/DataTable';
import FormComponent from './components/Form/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';  
function App() {
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleDataAdded = () => {
    setDataUpdated(!dataUpdated); 
  };
// Aqui Renderizamos la estructura principal de la aplicación.
  return (
    <Container>
      <Row className="mt-5">
        <Col md={8}>
          <DataTable key={dataUpdated} />
        </Col>
        <Col md={4}>
          <FormComponent onDataAdded={handleDataAdded} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
