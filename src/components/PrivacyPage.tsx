import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div style={{
      fontFamily: 'Roboto, serif',
      letterSpacing: '0.75px',
      lineHeight: '1.25',
      margin: 'auto',
      width: '90%',
      padding: '20px 0',
      color: '#4d4848'
    }}>
      <h1 style={{
        fontSize: '2.25rem',
        lineHeight: '2.5rem',
        color: '#333'
      }}>Datenschutzrichtlinie</h1>
      
      <p>Wir sind bestrebt, Ihre persönlichen Daten sicher und privat zu halten...</p>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#4fbabc', textDecoration: 'underline' }}>
          ← Zurück zur Hauptseite
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPage;
