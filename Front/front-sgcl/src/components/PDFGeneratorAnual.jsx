import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import headerImage from './img/Docs/uatxLogo.png';

const PDFGeneratorAnual = ({ content }) => {
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null); // Estado para la vista previa

    useEffect(() => {
        generatePDF();
    }, []);

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
        const doc = new jsPDF('landscape');
        const laboratories = content.anualDocVO
        // Agregar imagen como encabezado
        if (headerImage) {
            doc.addImage(headerImage, 'JPEG', 13, 14, 12, 20); // Ajustar tamaño y posición según sea necesario
        }

        // Crear variables para el texto estático
        const label = "Facultad: ";
        const label1 = "No. Página: ";
        const label3 = "Año: ";
        const responsable = "Responsable del mantenimiento"
        const coordinador = "Responsables del área Administrativa de Facultad \n                     (o responsable asignado)"
        doc.setFontSize(11);

        // Medir ancho
        const labelWidth = doc.getTextWidth(label); // Calcular el ancho del texto estático
        const contentWidth = doc.getTextWidth("Facultad de ciencias básicas de ingeniería y tecnología.");

        // Colocar texto
        doc.text(label, 20, 40); // Ajustar posición
        doc.text("   " + "Facultad de ciencias básicas de ingeniería y tecnología.", 20 + labelWidth, 40);
        doc.text(label1 + "   " + doc.internal.getCurrentPageInfo().pageNumber, 50 + contentWidth + labelWidth + 40, 40);
        doc.text(label3 + "   " + content.documentVO.year, 50 + contentWidth + labelWidth, 40);
        doc.text(content.documentVO.responsibleName, 43, 165);
        doc.text(content.documentVO.adminResponsibleName, 190, 165);

        doc.setFontSize(10);
        doc.text(responsable, 57, 181)
        doc.text(coordinador, 185, 181)



        // Dibujar la línea debajo del contenido (subrayado)
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(37, 41, 160, 41);
        doc.line(171, 41, 200, 41);
        doc.line(223, 41, 236, 41);
        doc.line(36, 177, 130, 177);
        doc.line(176, 177, 271, 177);


        // Agregar tabla
        const tableData = [
            ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4', 'Columna 5'],
            ['Universidad Autónoma de Tlaxcala', '', '', 'Código:', '407e-RG-13'],
            ['Registro: ', 'PROGRAMA ANUAL DE MANTENIMIENTO PREVENTIVO', '', 'Revisión:\n9001:2015', "Agosto 2024\n        02"],
        ];

        const tableData1 = [
            ['Actividad y área', '', 'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.', 'Responsable del mantenimiento'],
            ...laboratories.flatMap(laboratory => {
                const row = ['Programación:', '', '', '', '', '', '', '', '', '', '', '', '', content.documentVO.responsibleName];

                const meses = {
                    ene: 1,
                    feb: 2,
                    mar: 3,
                    abr: 4,
                    may: 5,
                    jun: 6,
                    jul: 7,
                    ago: 8,
                    sep: 9,
                    oct: 10,
                    nov: 11,
                    dic: 12
                };

                // Asignar los días en las posiciones correspondientes a los meses
                laboratory.dates.forEach(function(date) {
                    let monthKey = meses[date.month];
                    if (row[monthKey]) {
                        row[monthKey] += '\n' + date.days;
                    } else {
                        row[monthKey] = date.days;
                    }
                });
                

                // Retornar las filas para el laboratorio
                return [
                    [
                        {
                            content: 'MANTENIMIENTO PREVENTIVO LABORATORIO ' + laboratory.labName.toUpperCase(),
                            rowSpan: 3,
                            styles: { halign: 'center', valign: 'middle', cellPadding: 1 }
                        },
                        ...row
                    ],
                    ['Fecha:', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                    ['Firma:', '', '', '', '', '', '', '', '', '', '', '', '', '']
                ];
            })
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
                    doc.text('PROGRAMA ANUAL DE MANTENIMIENTO PREVENTIVO', 85, data.cell.y + 5); // Dibujar texto en la celda
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
                fontSize: 9,
                cellPadding: 1
            },
            styles: {
                lineColor: [0, 0, 0],
                fillColor: [255, 255, 255],
                fontSize: 9,
                cellPadding: 1
            }, didDrawCell: function (data) {
                // Pintar la columna de "Programación:"
                if (data.column.index === 1) { // 1 es el índice de la columna de "Programación"
                    doc.setFillColor(212, 212, 212); // Color de fondo (RGB)
                    doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F'); // Rellenar la celda

                    // Dibujar el texto en la celda
                    doc.setFontSize(9); // Ajustar tamaño de fuente si es necesario
                    doc.setTextColor(0, 0, 0); // Establecer color del texto
                    const textX = data.cell.x + 1; // Ajustar la posición horizontal
                    const textY = data.cell.y + (data.cell.height / 2); // Centrar verticalmente
                    doc.text(data.cell.text[0], textX, textY); // Redibujar el texto de la celda

                    doc.setDrawColor(0, 0, 0); // Color del borde
                    doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height); // Dibujar el borde

                }
            }

        };

        const tableStyles2 = {
            theme: 'grid',
            styles: {
                lineColor: [255, 0, 0], // Color de línea (rojo)
                fillColor: [255, 255, 255], // Color de fondo (blanco)
                lineWidth: 0,
                fontSize: 6
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
            }
        };

        doc.autoTable({
            body: tableData.slice(1), // Filas de datos
            startY: 15, // Posición de inicio de la tabla
            margin: { left: 25 }, // Espacio para colocar la tabla al lado derecho de la imagen
            columnStyles: {
                1: { cellWidth: 130 }
            },
            ...tableStyles
        });

        doc.autoTable({
            head: [tableData1[0]],
            body: tableData1.slice(1), // Filas de datos
            startY: 44, // Posición de inicio de la tabla
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
        doc.save(`Mantenimiento anual ` + content.año + '.pdf');
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
            <div style={{ height: "50px" }}></div>
        </div>
    );
};

export default PDFGeneratorAnual;