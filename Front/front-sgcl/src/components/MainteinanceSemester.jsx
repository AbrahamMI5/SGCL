import './App.css';
import { jsPDF } from 'jspdf';
import React from 'react';

export function MainteinanceSemester() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
  };

  return (
    <>
      <h1>Hi</h1>
      <button onClick={generatePDF}>Generar PDF</button>
    </>
  );
}

export default MainteinanceSemester;

