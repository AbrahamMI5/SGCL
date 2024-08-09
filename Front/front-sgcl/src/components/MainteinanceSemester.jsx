import './App.css';
import React, { useState, useEffect } from 'react';
import pdf from './img/pdf.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom';


export function MainteinanceSemester() {

    const [AnualS, setAnualS] = useState(true);
    const [bgcolorC, setBgcolorC] = useState('#FFF');
    const [bgcolorT, setBgcolorT] = useState('#D9D9D9');

    const handleAnual = () => {
        setAnualS(true)
        setBgcolorC('#FFF')
        setBgcolorT('#D9D9D9')
    }

    const handleSemester = () => {
        setAnualS(false)
        setBgcolorC('#D9D9D9')
        setBgcolorT('#FFF')
    }

    const data = {
        "facultad": "Facultad de ciencias basicas de ingenieria y tecnologia. ",
        "revision": "01",
        "mes": "Diciembre",
        "año": "2023",
        "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
        "coordinador": "M. C. Carolina Rocío Sánchez Pérez",
        "data": [
            {
                "labName": "Cisco",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Oracle",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Inteligentes",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Cisco",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Oracle",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Inteligentes",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            }
        ]
    }

    const data1 = {
        "facultad": "Facultad de ciencias basicas de ingenieria y tecnologia. ",
        "revision": "01",
        "mes": "Diciembre",
        "año": "2023",
        "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
        "coordinador": "M. C. Carolina Rocío Sánchez Pérez",
        "data": [
            {
                "labName": "Cisco",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Oracle",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Inteligentes",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Cisco",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            },
            {
                "labName": "Oracle",
                "action": "SOPLETEADO DE MONITORES Y CPU´S EN PARTE INTERNA. LIMPIEZA EN PARTES EXTERNAS. REVISION DEL CORRECTO FUNCIONAMIENTO DE LOS MISMOS.",
                "responsibleName": "MANUEL ARTURO SANDOVAL GUTIÉRREZ",
                "observation": ""
            }
        ]
    }

    const yourData ={
        "anual": true,
        "data": data1
    }

    const yourDataS ={
        "anual": false,
        "data": data
    }


    return (
        <>
            <h1>Mantenimientos de laboratorios</h1>
            <div>
                <button onClick={handleAnual} style={{ backgroundColor: bgcolorC }}>Anual</button>
                <button onClick={handleSemester} style={{ backgroundColor: bgcolorT }}>Semestral</button>
            </div>
            {AnualS ?

                <>
                    <div style={{ marginTop: "2%", paddingBottom: "2%" }} className="AddRequest">
                        <input type="Buscar" style={{ width: "100%" }} placeholder="Buscar por año" />
                    </div>
                    <table border="1" style={{marginTop: "2%", width: "100%"}}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mantenimiento anual 2024.pdf</td>
                                <td style={{textAlign: "center", padding: "5px"}}><Link to={'/Mainteinance/Preview'} state={yourData}><img src={pdf} alt="ver pdf" className='M-Img' style={{cursor: "pointer"}} /></Link></td>
                            </tr>
                            <tr>
                                <td>Mantenimiento anual 2023.pdf</td>
                                <td style={{textAlign: "center", padding: "5px"}}><Link to={'/Mainteinance/Preview'} state={yourData}><img src={pdf} alt="ver pdf" className='M-Img' style={{cursor: "pointer"}} /></Link></td>
                            </tr>
                        </tbody>
                    </table>

                </>

                :
                <>
                    <div style={{ marginTop: "2%", paddingBottom: "2%" }} className="AddRequest">
                        <input type="Buscar" style={{ width: "100%" }} placeholder="Buscar por semestre" />
                    </div>
                    <table border="1" style={{marginTop: "2%", width: "100%"}}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mantenimiento diciembre 2024.pdf</td>
                                <td style={{textAlign: "center", padding: "5px"}}><Link to={'/Mainteinance/Preview'} state={yourDataS}><img src={pdf} alt="ver pdf" className='M-Img' style={{cursor: "pointer"}} /></Link></td>
                            </tr>
                            <tr>
                                <td>Mantenimiento julio 2023.pdf</td>
                                <td style={{textAlign: "center", padding: "5px"}}><Link to={'/Mainteinance/Preview'} state={yourDataS}><img src={pdf} alt="ver pdf" className='M-Img' style={{cursor: "pointer"}} /></Link></td>
                            </tr>
                        </tbody>
                    </table>

                </>
            }
            {/*}
            <PDFGeneratorAnual
                title="Informe de Mantenimiento Semestral"
                content={data1}
            />*/}
        </>
    );
}

export default MainteinanceSemester;

