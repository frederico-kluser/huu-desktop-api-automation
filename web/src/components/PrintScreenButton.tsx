import React, { useState } from 'react';
import { Button, Alert, Spinner, Image } from 'react-bootstrap';
import { ScreenCaptureResponse, ApiResponse } from '../types/api.types';

/**
 * Componente para capturar tela e exibir o resultado
 */
const PrintScreenButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Realiza a captura de tela através da API
   */
  const handlePrintScreen = async (): Promise<void> => {
    // Previne múltiplos cliques
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/screen/print', {
        method: 'GET',
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY || 'YOUR_API_KEY_HERE',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as ApiResponse<ScreenCaptureResponse>;

      if (data.success && 'data' in data && data.data.image) {
        // Formata a imagem base64 para exibição
        const imageUrl = `data:image/png;base64,${data.data.image}`;
        setCapturedImage(imageUrl);
      } else {
        const errorMessage = 'message' in data ? data.message : 'Resposta inválida da API';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Erro ao capturar tela:', err);
      setError(err instanceof Error ? err.message : 'Erro ao capturar tela');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Wrapper para o event handler que não retorna Promise
   */
  const handlePrintScreenClick = (): void => {
    handlePrintScreen().catch((err) => {
      console.error('Erro não tratado na captura de tela:', err);
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    });
  };

  return (
    <div className="print-screen-container">
      <Button
        variant="success"
        size="lg"
        onClick={handlePrintScreenClick}
        disabled={isLoading}
        className="mb-3"
      >
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Capturando...
          </>
        ) : (
          <>
            <i className="fas fa-camera me-2"></i>
            Print Screen
          </>
        )}
      </Button>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {capturedImage && (
        <div className="captured-image-container mt-3">
          <h5 className="mb-3">
            <i className="fas fa-image me-2"></i>
            Captura de Tela
          </h5>
          <Image
            src={capturedImage}
            alt="Captura de tela"
            fluid
            rounded
            className="shadow"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default PrintScreenButton;
