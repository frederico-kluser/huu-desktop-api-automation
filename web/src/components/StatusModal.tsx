import React from 'react';
import { Modal, Button, Badge, Spinner } from 'react-bootstrap';
import { StatusResult } from '../types/status.types';

interface StatusModalProps {
  show: boolean;
  onHide: () => void;
  status: StatusResult | null;
  loading: boolean;
  onCheckStatus: () => void;
}

/**
 * Modal para exibir status da API
 * @param {StatusModalProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente do modal
 */
const StatusModal: React.FC<StatusModalProps> = ({
  show,
  onHide,
  status,
  loading,
  onCheckStatus,
}) => {
  const formatLatency = (ms: number) => {
    if (ms < 0) return 'N/A';
    return `${ms}ms`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('pt-BR');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-heartbeat me-2"></i>
          Status da API
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center py-4">
        {loading ? (
          <div>
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p className="text-muted">Verificando status...</p>
          </div>
        ) : status ? (
          <div>
            <div className="mb-4">
              {status.ok ? (
                <div>
                  <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                  <h4 className="mt-3 text-success">API Online</h4>
                </div>
              ) : (
                <div>
                  <i className="fas fa-times-circle text-danger" style={{ fontSize: '4rem' }}></i>
                  <h4 className="mt-3 text-danger">API Offline</h4>
                </div>
              )}
            </div>

            <div className="text-start">
              <p className="mb-2">
                <strong>Status:</strong>{' '}
                <Badge bg={status.ok ? 'success' : 'danger'}>
                  {status.ok ? 'ONLINE' : 'OFFLINE'}
                </Badge>
              </p>

              <p className="mb-2">
                <strong>Latência:</strong>{' '}
                <span className={status.latency > 1000 ? 'text-warning' : 'text-success'}>
                  {formatLatency(status.latency)}
                </span>
              </p>

              <p className="mb-2">
                <strong>Mensagem:</strong> {status.message}
              </p>

              <p className="mb-0 text-muted small">
                <strong>Última verificação:</strong> {formatDate(status.checkedAt)}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <i className="fas fa-info-circle text-info" style={{ fontSize: '3rem' }}></i>
            <p className="mt-3">Clique no botão abaixo para verificar o status da API</p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onCheckStatus} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Verificando...
            </>
          ) : (
            <>
              <i className="fas fa-sync-alt me-2"></i>
              Verificar Agora
            </>
          )}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusModal;
