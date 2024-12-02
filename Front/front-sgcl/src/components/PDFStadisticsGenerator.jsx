import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { usersApi, apiUrls, security } from "./api/userApi";
import 'jspdf-autotable';
import headerImage from './img/Docs/uatxLogo.png';

const PDFStadisticsGenerator = ({ content }) => {
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null); // Estado para la vista previa

    useEffect(() => {
        generatePDF();
    }, []);

    const descripcion = "Estadísticas de los laboratorios de ingeniería en computación del periodo: " + content.semester.name + "."

    function fullMonth(mesAbreviado) {
        const meses = {
            ene: "Enero",
            feb: "Febrero",
            mar: "Marzo",
            abr: "Abril",
            may: "Mayo",
            jun: "Junio",
            jul: "Julio",
            ago: "Agosto",
            sep: "Septiembre",
            oct: "Octubre",
            nov: "Noviembre",
            dic: "Diciembre"
        };

        return meses[mesAbreviado] || "Abreviatura de mes inválida";
    }
    const createPDF = () => {
        const doc = new jsPDF('portrait');

        // Agregar imagen como encabezado
        if (headerImage) {
            doc.addImage(headerImage, 'JPEG', 13, 14, 12, 20); // Ajustar tamaño y posición según sea necesario
        }

        
        // Agregar tabla
        const tableData = [
            ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4', 'Columna 5'],
            ['', 'Universidad Autónoma de Tlaxcala', '', 'FCBIyT', ''],
            ['', 'ESTADÍSTICAS DE LABORATORIOS', '', content.semester.name, ""],
        ];

        const tableData1 = [
            ['Laboratorio', 'No. Solicitudes por periodo', 'Asistentes por periodo', 'Horas semanales'],
            ...content.laboratory.map(laboratory => (
                [laboratory.labName.toUpperCase(), laboratory.userRequest, laboratory.attendants, laboratory.semanalHours]
            ))
        ];

        const footer = [
            ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4'],
            ['Documento exclusivo para uso de la dependencia responsable o autoridad correspondiente', '', 'Página:', doc.internal.getCurrentPageInfo().pageNumber + ' de ' + doc.getNumberOfPages()],
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
            startY: 48, // Posición de inicio de la tabla
            ...tableStyles1
        });

        doc.autoTable({
            body: footer.slice(1), // Filas de datos
            startY: 275, // Posición de inicio de la tabla
            ...tableStyles2
        });

        doc.setFontSize(12);
        doc.text(descripcion, 15, 40,)


        return doc;
    };

    const generatePDF = () => {
        const doc = createPDF(); 
        const blob = doc.output('blob'); 
        const pdfBlobUrl = URL.createObjectURL(blob);
        setPdfPreviewUrl(pdfBlobUrl);
    };

    const downloadPDF = () => {
        const doc = createPDF(); 
        doc.save(`Estadísticas ` + content.semester.name +'.pdf');
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

export default PDFStadisticsGenerator;