import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './components/Header';
import PrintScreenButton from './components/PrintScreenButton';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg">
              <Card.Body className="text-center p-5">
                <div className="mb-4">
                  <i className="fas fa-robot fa-4x mb-3"></i>
                  <h1 className="display-4">Hello World!</h1>
                  <p className="lead text-muted">Bem-vindo à API de Automação Desktop NutJS</p>
                </div>

                <Row className="mt-4">
                  <Col md={4}>
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body className="text-center">
                        <i className="fas fa-mouse fa-2x text-success mb-3"></i>
                        <h5>Controle do Mouse</h5>
                        <p className="text-muted small">Automatize movimentos, cliques e scroll</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body className="text-center">
                        <i className="fas fa-keyboard fa-2x text-info mb-3"></i>
                        <h5>Controle do Teclado</h5>
                        <p className="text-muted small">
                          Digite texto e execute combinações de teclas
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body className="text-center">
                        <i className="fas fa-desktop fa-2x text-warning mb-3"></i>
                        <h5>Captura de Tela</h5>
                        <p className="text-muted small">Capture e analise imagens da tela</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="mt-5">
                  <hr className="my-4" />
                  <h3 className="mb-4">Teste de Funcionalidades</h3>
                  <PrintScreenButton />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
