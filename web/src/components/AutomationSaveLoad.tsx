import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import {
  Save,
  Download,
  Trash,
  Database,
  FileEarmarkArrowDown,
  FileEarmarkArrowUp,
} from 'react-bootstrap-icons';
import { automationStorage, SavedAutomation } from '../services/automationStorage';

interface AutomationSaveLoadProps {
  currentSteps: any[];
  onLoadSteps: (_steps: any[]) => void;
}

export function AutomationSaveLoad({ currentSteps, onLoadSteps }: AutomationSaveLoadProps) {
  const [automations, setAutomations] = useState<SavedAutomation[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = async () => {
    try {
      const data = await automationStorage.getAllAutomations();
      setAutomations(data.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
    } catch (error) {
      console.error('Error loading automations:', error);
    }
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      alert('Por favor, insira um nome para a automação');
      return;
    }

    try {
      setIsLoading(true);
      if (selectedId && automations.find((a) => a.id === selectedId)) {
        await automationStorage.updateAutomation(selectedId, newName, currentSteps);
      } else {
        const id = await automationStorage.saveAutomation(newName, currentSteps);
        setSelectedId(id);
      }
      await loadAutomations();
      alert('Automação salva com sucesso!');
    } catch (error) {
      console.error('Error saving automation:', error);
      alert('Erro ao salvar automação');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    if (!selectedId) {
      alert('Por favor, selecione uma automação');
      return;
    }

    try {
      setIsLoading(true);
      const automation = await automationStorage.getAutomation(selectedId);
      if (automation) {
        onLoadSteps(automation.steps);
        setNewName(automation.name);
        alert('Automação carregada com sucesso!');
      }
    } catch (error) {
      console.error('Error loading automation:', error);
      alert('Erro ao carregar automação');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) {
      alert('Por favor, selecione uma automação');
      return;
    }

    if (!confirm('Tem certeza que deseja excluir esta automação?')) {
      return;
    }

    try {
      setIsLoading(true);
      await automationStorage.deleteAutomation(selectedId);
      setSelectedId('');
      setNewName('');
      await loadAutomations();
      alert('Automação excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting automation:', error);
      alert('Erro ao excluir automação');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const json = await automationStorage.exportToJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `automations_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting automations:', error);
      alert('Erro ao exportar automações');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await automationStorage.importFromJSON(text);
      await loadAutomations();
      alert('Automações importadas com sucesso!');
    } catch (error) {
      console.error('Error importing automations:', error);
      alert('Erro ao importar automações');
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    const automation = automations.find((a) => a.id === id);
    if (automation) {
      setNewName(automation.name);
    } else {
      setNewName('');
      // Limpa as ações quando "Nova automação..." é selecionado
      onLoadSteps([]);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="fas fa-save me-2"></i>
          Gerenciar Automações
        </h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Selecionar Automação</Form.Label>
                <Form.Select value={selectedId} onChange={handleSelectChange} disabled={isLoading}>
                  <option value="">Nova automação...</option>
                  {automations.map((automation) => (
                    <option key={automation.id} value={automation.id}>
                      {automation.name} - {new Date(automation.updatedAt).toLocaleString()}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Nome da Automação</Form.Label>
                <Form.Control
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Digite o nome da automação"
                  disabled={isLoading}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="d-flex gap-2 mb-3">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={isLoading || !currentSteps.length}
                >
                  <Save className="me-2" />
                  Salvar
                </Button>
                <Button variant="success" onClick={handleLoad} disabled={isLoading || !selectedId}>
                  <Download className="me-2" />
                  Carregar
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading || !selectedId}>
                  <Trash className="me-2" />
                  Excluir
                </Button>
              </div>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col md={12}>
              <h6 className="mb-3">
                <Database className="me-2" />
                Backup / Restauração
              </h6>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" onClick={handleExport} disabled={isLoading}>
                  <FileEarmarkArrowDown className="me-2" />
                  Exportar BD
                </Button>
                <Button
                  as="label"
                  variant="outline-secondary"
                  disabled={isLoading}
                  style={{ cursor: 'pointer' }}
                >
                  <FileEarmarkArrowUp className="me-2" />
                  Importar BD
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="d-none"
                    disabled={isLoading}
                  />
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
