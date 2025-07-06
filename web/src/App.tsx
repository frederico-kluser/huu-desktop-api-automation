import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Header from './components/Header';
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
                  <i className="fas fa-robot fa-4x text-primary mb-3"></i>
                  <h1 className="display-4 text-primary">Hello World!</h1>
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

                <div className="mt-4">
                  <Badge bg="success" className="me-2">
                    <i className="fas fa-check-circle me-1"></i>
                    API Online
                  </Badge>
                  <Badge bg="info" className="me-2">
                    <i className="fas fa-code me-1"></i>
                    TypeScript
                  </Badge>
                  <Badge bg="warning">
                    <i className="fas fa-bolt me-1"></i>
                    Fastify
                  </Badge>
                </div>

                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="me-3"
                    href="/api/health"
                    target="_blank"
                  >
                    <i className="fas fa-heartbeat me-2"></i>
                    Verificar Status da API
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    href="https://github.com/nutjs/nut.js"
                    target="_blank"
                  >
                    <i className="fab fa-github me-2"></i>
                    Documentação
                  </Button>
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
