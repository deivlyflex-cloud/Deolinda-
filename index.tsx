
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('ZARA ONLINE: Inicializando aplicação...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("ZARA ONLINE: Erro fatal - Elemento 'root' não encontrado no DOM.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('ZARA ONLINE: Aplicação montada com sucesso.');
} catch (error) {
  console.error('ZARA ONLINE: Falha durante a renderização inicial:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: sans-serif; text-align: center;">
      <h2>Erro ao carregar aplicação</h2>
      <p>Verifique o console do navegador para mais detalhes.</p>
    </div>
  `;
}
