import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
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
      }}>Allgemeine Geschäftsbedingungen</h1>
      
      <h2 style={{
        color: '#333',
        borderTop: '1px solid gray',
        paddingTop: '0.5rem'
      }}>1. Annahme der Bedingungen</h2>
      
      <p>Sie ("Benutzer" oder "Sie") und wir ("Unternehmen", "wir", "uns" oder "unser") sind an diese Allgemeinen Geschäftsbedingungen ("Vereinbarung") gebunden...</p>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#4fbabc', textDecoration: 'underline' }}>
          ← Zurück zur Hauptseite
        </Link>
      </div>
    </div>
  );
};

export default TermsPage;
