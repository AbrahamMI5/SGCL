import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { usersApi, apiUrls, security } from "./api/userApi";
import 'jspdf-autotable';
import headerImage from './img/Docs/uatxLogo.png';

const PDFGenerator = ({ content}) => {
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null); // Estado para la vista previa

    useEffect(() => {
        generatePDF(content.data); // Generar PDF después de cargar los datos
    }, []); // Solo se ejecuta una vez al montar el componente

    const createPDF = () => {
        const doc = new jsPDF('landscape');
        const laboratories = content.data
        // Agregar imagen como encabezado
        if (headerImage) {
            doc.addImage(headerImage, 'JPEG', 13, 14, 12, 20); // Ajustar tamaño y posición según sea necesario
        }

        // Crear variables para el texto estático
        const label = "Facultad: ";
        const label1 = "No. Página: ";
        const label2 = "Bitácora de Mantenimiento Preventivo del Mes de ";
        const label3 = "del año ";
        const responsable = "Responsable del mantenimiento"
        const coordinador = "Coordinador Administrativo (o responsable asignado)"
        doc.setFontSize(11);

        // Medir ancho
        const labelWidth = doc.getTextWidth(label); // Calcular el ancho del texto estático
        const contentWidth = doc.getTextWidth(content.facultad);

        // Colocar texto
        doc.text(label, 20, 40); // Ajustar posición
        doc.text("   " + content.facultad, 20 + labelWidth, 40);
        doc.text(label1 + "   " + doc.internal.getCurrentPageInfo().pageNumber, 50 + contentWidth + labelWidth, 40);
        doc.text(label2 + "   " + content.mes, 20, 47);
        doc.text(label3 + "   " + content.año, 50 + contentWidth + labelWidth, 47);
        doc.text(content.responsibleName, 43 , 165);
        doc.text(content.coordinador, 190, 165);

        doc.setFontSize(10);
        doc.text(responsable, 57, 181)
        doc.text(coordinador, 180, 181)



        // Dibujar la línea debajo del contenido (subrayado)
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(37, 41, 160, 41);
        doc.line(183, 41, 220, 41);
        doc.line(106, 48, 160, 48);
        doc.line(176, 48, 220, 48);
        doc.line(36, 177, 130, 177);
        doc.line(176, 177, 271, 177);


        // Agregar tabla
        const tableData = [
            ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4', 'Columna 5'],
            ['Universidad Autonoma de Tlaxcala', '', '', 'Código:', '400e-RG-17'],
            ['Registro: ', 'BITÁCORA DE MANTENIMIENTO PREVENTIVO', '', 'Revisión:', content.revision],
        ];

        const tableData1 = [
            ['Actividad', 'Acción Emprendida', 'Responsable', 'Observación'],
            ...laboratories.map(laboratory => (
                ['MANTENIMIENTO PREVENTIVO A EQUIPOS DE COMPUTO EN EL LABORATORIO ' + laboratory.labName.toUpperCase(), laboratory.action, laboratory.responsibleName, laboratory.observation]
            ))
        ];

        const footer = [
            ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4'],
            ['Documento exclusivo para uso de la dependencia responsable o autoridad correspondiente', '', 'Página:', doc.internal.getCurrentPageInfo().pageNumber+' de '+doc.getNumberOfPages()],
        ];

        const tableStyles = {
            theme: 'grid',
            styles: {
                lineColor: [255, 0, 0], // Color de línea (rojo)
                fillColor: [255, 255, 255], // Color de fondo (blanco)
                lineWidth: 0,
            },
            didParseCell: (data) => {
                const { row, column } = data;

                // Evitar que se escriba el texto en la celda específica
                if (row.index === 1 && column.index === 1) { // Fila 3, columna 2
                    data.cell.text = []; // Dejar la celda vacía
                    return; // Salir para no dibujar el texto predeterminado
                }
            },
            didDrawCell: (data) => {
                const { row, column } = data;

                // Cambiar el tamaño de fuente para una celda específica
                if (row.index === 1 && column.index === 1) { // Cambiar la celda en la fila 2, columna 2
                    doc.setFontSize(12); // Aumentar tamaño de texto
                    doc.text('BITÁCORA DE MANTENIMIENTO PREVENTIVO', 81, data.cell.y + 5); // Dibujar texto en la celda
                }

                // Dibuja la línea superior para la primera fila
                if (row.index === 0) {
                    const { x, y, width } = data.cell;
                    doc.setDrawColor(255, 0, 0); // Color rojo
                    doc.setLineWidth(0.1);
                    doc.line(x, y, x + width, y); // Línea superior
                }
                // Línea bajo
                if (row.index === 1) {
                    const { x, y, height, width } = data.cell;
                    doc.setDrawColor(255, 0, 0); // Color rojo
                    doc.setLineWidth(0.1); // Línea doble
                    doc.line(x, y + height, x + width, y + height); // Línea inferior
                    doc.line(x, y + height + 0.5, x + width, y + height + 0.5);
                }
            },
        };

        const tableStyles1 = {
            theme: 'grid',
            headStyles: {
                fillColor: [211, 211, 211],
                textColor: [0, 0, 0],
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                fontSize: 10
            },
            styles: {
                lineColor: [0, 0, 0],
                fillColor: [255, 255, 255],
                fontSize: 9
            }
        };

        const tableStyles2 = {
            theme: 'grid',
            styles: {
                lineColor: [255, 0, 0], // Color de línea (rojo)
                fillColor: [255, 255, 255], // Color de fondo (blanco)
                lineWidth: 0,
                fontSize: 7
            },
            didDrawCell: (data) => {
                const { row, column } = data;

                // Dibuja la línea superior para la primera fila
                if (row.index === 0) {
                    const { x, y, width } = data.cell;
                    doc.setDrawColor(255, 0, 0); // Color rojo
                    doc.setLineWidth(0.1);
                    doc.line(x, y, x + width, y); // Línea superior
                }
                // Línea bajo
                if (row.index === 0) {
                    const { x, y, height, width } = data.cell;
                    doc.setDrawColor(255, 0, 0); // Color rojo
                    doc.setLineWidth(0.1); // Línea doble
                    doc.line(x, y + height, x + width, y + height); // Línea inferior
                }
            },
        };

        doc.autoTable({
            body: tableData.slice(1), // Filas de datos
            startY: 15, // Posición de inicio de la tabla
            margin: { left: 25 }, // Espacio para colocar la tabla al lado derecho de la imagen
            ...tableStyles
        });

        doc.autoTable({
            head: [tableData1[0]],
            body: tableData1.slice(1), // Filas de datos
            startY: 55, // Posición de inicio de la tabla
            ...tableStyles1
        });

        doc.autoTable({
            body: footer.slice(1), // Filas de datos
            startY: 188, // Posición de inicio de la tabla
            ...tableStyles2
        });

        return doc;
    };

    const generatePDF = () => {
        const doc = createPDF(); // Pasar los laboratorios cargados
        const pdfData = doc.output('datauristring');
        setPdfPreviewUrl(pdfData);
    };

    const downloadPDF = () => {
        const doc = createPDF(); // Asegurarse de usar el estado actualizado
        doc.save(`Mantenimiento semestral `+content.mes+` `+content.año+'.pdf');
    };

    return (
        <div>
            <h2>Vista Previa del PDF:</h2>
            <iframe
                src={pdfPreviewUrl}
                width="100%"
                height="500px"
                title="Vista Previa PDF"
            />
            <button onClick={downloadPDF}>Descargar PDF</button>
        </div>
    );
};

export default PDFGenerator;
