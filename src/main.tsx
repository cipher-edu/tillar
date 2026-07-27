import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { hydrateFromApi } from '@/lib/hydrate';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);

function BootScreen({ message }: { message: string }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdfaf3',
        fontFamily: 'system-ui, sans-serif',
        color: '#1a202c',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 48,
            height: 48,
            margin: '0 auto 16px',
            borderRadius: 12,
            background: 'linear-gradient(135deg,#a67c00,#1675e0)',
          }}
        />
        <p style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7 }}>
          {message}
        </p>
      </div>
    </div>
  );
}

root.render(<BootScreen message="YuklanmoqdaвЂ¦" />);

hydrateFromApi().then((result) => {
  if (result.source === 'api') {
    console.info('[data] Django API ulandi');
  } else {
    console.warn('[data] Static fallback:', result.error);
  }
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
