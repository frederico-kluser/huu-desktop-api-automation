import React, { useState, useRef } from 'react';
import { Button, Alert, Spinner, Image } from 'react-bootstrap';
import { ScreenCaptureResponse, ApiResponse } from '../types/api.types';

/**
 * Componente para capturar tela e exibir o resultado
 */
const PrintScreenButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      console.error('Erro ao capturar tela:', err); // eslint-disable-line no-console
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
      console.error('Erro não tratado na captura de tela:', err); // eslint-disable-line no-console
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    });
  };

  /**
   * Manipula a seleção de arquivo de imagem
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verifica se é uma imagem
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    setError(null);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setCapturedImage(result);
      }
    };

    reader.onerror = () => {
      setError('Erro ao ler o arquivo de imagem.');
    };

    reader.readAsDataURL(file);
  };

  /**
   * Abre o seletor de arquivo
   */
  const handleSelectImageClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="print-screen-container">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div className="d-flex gap-2 mb-3">
        <Button variant="success" size="lg" onClick={handlePrintScreenClick} disabled={isLoading}>
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

        <Button variant="primary" size="lg" onClick={handleSelectImageClick} disabled={isLoading}>
          <i className="fas fa-folder-open me-2"></i>
          Selecionar Imagem
        </Button>
      </div>

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
            Imagem Capturada/Selecionada
          </h5>
          <Image
            src={capturedImage}
            alt="Captura de tela"
            fluid
            rounded
            className="shadow"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
          <div className="mt-3">
            <small className="text-muted d-block">
              <strong>Base64 Data URL:</strong>
            </small>
            <textarea
              readOnly
              value={capturedImage}
              className="form-control mt-2"
              rows={3}
              style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintScreenButton;
