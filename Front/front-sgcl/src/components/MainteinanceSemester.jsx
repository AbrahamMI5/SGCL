import './App.css';
import React, { useState, useEffect } from 'react';
import pdf from './img/pdf.svg'
import { Link } from 'react-router-dom';
import { usersApi, apiUrls, security } from './api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MainteinanceSemester() {

    const [AnualS, setAnualS] = useState(true);
    const [bgcolorC, setBgcolorC] = useState('#FFF');
    const [bgcolorT, setBgcolorT] = useState('#D9D9D9');
    const [anualDoc, setAnualDoc] = useState([]);
    const [semesterDoc, setSemesterDoc] = useState([]);
    const [mostrarComponenteS, setMostrarComponenteS] = useState(false);
    const [mostrarComponenteA, setMostrarComponenteA] = useState(false);
    const [laboratories, setLaboratories] = useState([]);
    const [transicion, setTransicion] = useState(false);
    const [searchS, setSearchS] = useState("");
    const [searchA, setSearchA] = useState("");

    const [formDataAnual, setFormDataAnual] = useState({
        documentVO: {
            responsibleName: '',
            month: '',
            year: '',
            adminResponsibleName: ''
        },
        anualDocVO: []
    });
    const [formDataSemestral, setFormDataSemestral] = useState({
        documentVO: {
            responsibleName: '',
            month: '',
            year: '',
            adminResponsibleName: ''
        },
        semesterDocVO: []
    });

    const months = [
        { fullName: "Enero", shortName: "ene" },
        { fullName: "Febrero", shortName: "feb" },
        { fullName: "Marzo", shortName: "mar" },
        { fullName: "Abril", shortName: "abr" },
        { fullName: "Mayo", shortName: "may" },
        { fullName: "Junio", shortName: "jun" },
        { fullName: "Julio", shortName: "jul" },
        { fullName: "Agosto", shortName: "ago" },
        { fullName: "Septiembre", shortName: "sep" },
        { fullName: "Octubre", shortName: "oct" },
        { fullName: "Noviembre", shortName: "nov" },
        { fullName: "Diciembre", shortName: "dic" },
    ];

    useEffect(() => {
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;
        usersApi.get(apiUrls.getDocument)
            .then(response => {
                response.data.forEach(document => {
                    if (document.semesterDocVO.length) {
                        setSemesterDoc(prevSemesterDoc => [...prevSemesterDoc, document]);
                    }
                    if (document.anualDocVO.length) {
                        setAnualDoc(prevAnualDoc => [...prevAnualDoc, document]);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
            });
        usersApi.get(apiUrls.getAllLaboratories)
            .then(respLaboratories => {
                setLaboratories(respLaboratories.data);
                // Initialize form data for laboratories
                setFormDataAnual(prevState => ({
                    ...prevState,
                    anualDocVO: respLaboratories.data.map(lab => ({
                        labName: lab.labName
                    }))
                }));
                setFormDataSemestral(prevState => ({
                    ...prevState,
                    semesterDocVO: respLaboratories.data.map(lab => ({
                        action: '',
                        observation: '',
                        labName: lab.labName
                    }))
                }));
            })
            .catch(error => {
                console.error('Error fetching laboratories:', error);
            });

        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
            }
            if (toastMessageW) {
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
            }
        }, 1000);


    }, []);

    const handleAnual = () => {
        setAnualS(true);
        setBgcolorC('#FFF');
        setBgcolorT('#D9D9D9');
    };

    const handleSemester = () => {
        setAnualS(false);
        setBgcolorC('#D9D9D9');
        setBgcolorT('#FFF');
    };

    const handleMostrarComponenteS = () => {
        setMostrarComponenteS(!mostrarComponenteS);
        setTimeout(() => {
            setTransicion(true);
        }, 200);
    };

    const handleMostrarComponenteA = () => {
        setMostrarComponenteA(!mostrarComponenteA);
        setTimeout(() => {
            setTransicion(true);
        }, 200);
    };

    const handleChangeAnual = (e) => {
        const { name, value } = e.target;
        setFormDataAnual(prevState => ({
            ...prevState,
            documentVO: {
                ...prevState.documentVO,
                [name]: value
            }
        }));
    };

    const handleAddField = (labIndex, event) => {
        event.preventDefault();
        setFormDataAnual(prevState => {
            const updatedAnualDocVO = [...prevState.anualDocVO];
            if (!updatedAnualDocVO[labIndex].dates) {
                updatedAnualDocVO[labIndex].dates = [];
            }
            updatedAnualDocVO[labIndex].dates.push({ month: '', days: '' });
            return {
                ...prevState,
                anualDocVO: updatedAnualDocVO
            };
        });
    };

    const filterS = (event) => {
        setSearchS(event.target.value)
    }

    const filterA = (event) => {
        setSearchA(event.target.value)
    }

    const handleChangeSemestral = (e) => {
        const { name, value } = e.target;
        setFormDataSemestral(prevState => ({
            ...prevState,
            documentVO: {
                ...prevState.documentVO,
                [name]: value
            }
        }));
    };

    const handleChangeSemestralDate = (e) => {
        const [year, monthNumber] = e.target.value.split('-');
        const month = monthNames[parseInt(monthNumber, 10) - 1];
        setFormDataSemestral((prevData) => ({
            ...prevData,
            documentVO: {
                ...prevData.documentVO,
                year: year,
                month: month,
            },
        }));
    };

    const handleLaboratoryChangeAnual = (labIndex, dateIndex, field, value) => {
        setFormDataAnual(prevState => {
            const updatedAnualDocVO = [...prevState.anualDocVO];
            const updatedDates = [...updatedAnualDocVO[labIndex].dates];
            updatedDates[dateIndex] = {
                ...updatedDates[dateIndex],
                [field]: value
            };
            updatedAnualDocVO[labIndex].dates = updatedDates;
            return {
                ...prevState,
                anualDocVO: updatedAnualDocVO
            };
        });
    };


    const handleLaboratoryChangeSemestral = (index, field, value) => {
        const updatedLaboratories = formDataSemestral.semesterDocVO.map((lab, i) =>
            i === index ? { ...lab, [field]: value } : lab
        );
        setFormDataSemestral(prevState => ({
            ...prevState,
            semesterDocVO: updatedLaboratories
        }));
    };

    const handleSubmitAnual = (e) => {
        e.preventDefault();
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;
        usersApi.post(`${apiUrls.setAnualDoc}`, formDataAnual)
            .then(response => {
                localStorage.setItem('toastMessage', 'Documento creado');
                window.location.reload();
            }).catch(error => {
                console.log("Error al crear documento anual", error)
                toast.error("Error al crear documento anual")
            })
    };

    const handleSubmitSemestral = (e) => {
        e.preventDefault();
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;
        usersApi.post(`${apiUrls.setSemesterDoc}`, formDataSemestral)
            .then(response => {
                localStorage.setItem('toastMessage', 'Documento creado')
                window.location.reload();
            }).catch(error => {
                console.log("Error al crear documento semestral", error)
                toast.error("Error al crear documento semestral")
            })
    };

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

    const monthNames = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
    ];

    const yourData = (data) => ({
        "anual": true,
        "data": data
    });

    const yourDataS = (data) => ({
        "anual": false,
        "data": data
    });

    return (
        <>
            <ToastContainer />
            <h1>Mantenimientos de laboratorios</h1>
            <div>
                <button onClick={handleAnual} style={{ backgroundColor: bgcolorC }}>Anual</button>
                <button onClick={handleSemester} style={{ backgroundColor: bgcolorT }}>Semestral</button>
            </div>

            {AnualS ? (
                <>
                    <div style={{ marginTop: "2%", paddingBottom: "2%" }} className="AddRequest">
                        <input type="text" style={{ width: "100%" }} placeholder="Buscar por año" onChange={filterA} />
                    </div>
                    <div style={{ textAlign: 'right', marginTop: "2%" }}>
                        <button className='bt adUsr' onClick={handleMostrarComponenteA}>
                            Agregar reporte
                        </button>
                    </div>
                    {mostrarComponenteA && (
                        <div style={{ transition: 'opacity 0.5s, height 0.5s', opacity: transicion ? 1 : 0, height: transicion ? 'auto' : 0 }}>
                            <form className="usrsCard" onSubmit={handleSubmitAnual}>
                                <div>
                                    <label htmlFor="responsibleName">Nombre del responsable</label>
                                    <input
                                        type="text"
                                        id="responsibleName"
                                        name="responsibleName"
                                        placeholder="Nombre del responsable"
                                        value={formDataAnual.documentVO.responsibleName}
                                        onChange={handleChangeAnual}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="adminResponsibleName">Nombre del coordinador</label>
                                    <input
                                        type="text"
                                        id="adminResponsibleName"
                                        name="adminResponsibleName"
                                        placeholder="Nombre del coordinador"
                                        value={formDataAnual.documentVO.adminResponsibleName}
                                        onChange={handleChangeAnual}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="year">Año</label>
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        placeholder="YYYY"
                                        max={2100}
                                        min={1900}
                                        value={formDataAnual.documentVO.year}
                                        onChange={handleChangeAnual}
                                        required
                                    />
                                </div>
                                <br />
                                {formDataAnual.anualDocVO.map((laboratory, labIndex) => (
                                    <React.Fragment key={laboratory.labName}>
                                        <h4 style={{ width: "38%" }}>{laboratory.labName}</h4>
                                        <div style={{ width: "60%" }} />
                                        {laboratory.dates && laboratory.dates.map((date, index) => (
                                            <React.Fragment key={`${labIndex}-${index}`}>
                                                <div style={{ width: "28%" }} />
                                                <div style={{ width: "28%" }}>
                                                    <label>Mes</label>
                                                    <select
                                                        style={{ height: "26px", width: "100%" }}
                                                        value={date.month}
                                                        onChange={(e) => handleLaboratoryChangeAnual(labIndex, index, 'month', e.target.value)}
                                                        required
                                                    >
                                                        <option value="" />
                                                        {months.map((month) => (
                                                            <option key={month.shortName} value={month.shortName}>
                                                                {month.fullName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div style={{ width: "28%" }}>
                                                    <label>Días</label>
                                                    <input
                                                        type="text"
                                                        placeholder="dd-dd"
                                                        value={date.days}
                                                        onChange={(e) => handleLaboratoryChangeAnual(labIndex, index, 'days', e.target.value)}
                                                        style={{ width: "100%" }}
                                                        maxLength={5}
                                                        required
                                                    />
                                                </div>
                                            </React.Fragment>
                                        ))}
                                        <div style={{ width: "95%", display: "flex" }}>
                                            <button style={{ alignSelf: "end" }} onClick={(e) => handleAddField(labIndex, e)}>Agregar mes</button>
                                        </div>
                                    </React.Fragment>
                                ))}


                                <div className="usrs-button">
                                    <button type="submit">Crear</button>
                                    <button type="button" onClick={() => window.location.reload()}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    )}
                    <table border="1" style={{ marginTop: "2%", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anualDoc.length === 0 ? (
                                <tr>
                                    <td colSpan="2" style={{ textAlign: "center" }}>Sin documentos</td>
                                </tr>
                            ) : (
                                (() => {
                                    let find = false;

                                    const rows = anualDoc.map(document => {
                                        const match = searchA === "" || document.documentVO.year.toString().toLowerCase().includes(searchA.toLowerCase());

                                        if (match) {
                                            find = true;
                                            return (
                                                <tr key={document.documentVO.idDocuments}>
                                                    <td>Mantenimiento anual {document.documentVO.year}.pdf</td>
                                                    <td style={{ textAlign: "center", padding: "5px" }}>
                                                        <Link to={'/Maintenance/Preview'} state={yourData(document)}>
                                                            <img src={pdf} alt="ver pdf" className='M-Img' style={{ cursor: "pointer" }} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return null;
                                    });

                                    if (!find) {
                                        rows.push(
                                            <tr key="no-results">
                                                <td colSpan="2" style={{ textAlign: "center" }}>Sin coincidencias para la búsqueda actual</td>
                                            </tr>
                                        );
                                    }

                                    return rows;
                                })()
                            )}
                        </tbody>


                    </table>
                </>
            ) : (
                <>
                    <div style={{ marginTop: "2%", paddingBottom: "2%" }} className="AddRequest">
                        <input type="text" style={{ width: "100%" }} placeholder="Buscar por mes y año" onChange={filterS} />
                    </div>
                    <div style={{ textAlign: 'right', marginTop: "2%" }}>
                        <button className='bt adUsr' onClick={handleMostrarComponenteS}>
                            Agregar reporte
                        </button>
                    </div>
                    {mostrarComponenteS && (
                        <div style={{ transition: 'opacity 0.5s, height 0.5s', opacity: transicion ? 1 : 0, height: transicion ? 'auto' : 0 }}>
                            <form className="usrsCard" onSubmit={handleSubmitSemestral}>
                                <div>
                                    <label htmlFor="responsibleName">Nombre del responsable</label>
                                    <input
                                        type="text"
                                        id="responsibleName"
                                        name="responsibleName"
                                        placeholder="Nombre del responsable"
                                        value={formDataSemestral.documentVO.responsibleName}
                                        onChange={handleChangeSemestral}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="adminResponsibleName">Nombre del coordinador</label>
                                    <input
                                        type="text"
                                        id="adminResponsibleName"
                                        name="adminResponsibleName"
                                        placeholder="Nombre del coordinador"
                                        value={formDataSemestral.documentVO.adminResponsibleName}
                                        onChange={handleChangeSemestral}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="year">Fecha</label>
                                    <input
                                        type="month"
                                        id="year"
                                        name="year"
                                        min="1900-01"
                                        max="2100-12"
                                        placeholder="YYYY-MM"
                                        onChange={handleChangeSemestralDate}
                                        required
                                    />
                                </div>
                                <br />
                                {formDataSemestral.semesterDocVO.map((laboratory, index) => (
                                    <React.Fragment key={index}>
                                        <h4 style={{ width: "23%" }}>{laboratory.labName}</h4>
                                        <div>
                                            <label>Acción emprendida</label>
                                            <input
                                                type="text"
                                                placeholder="Acción emprendida"
                                                value={laboratory.action}
                                                onChange={(e) => handleLaboratoryChangeSemestral(index, 'action', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label>Observación</label>
                                            <input
                                                type="text"
                                                placeholder="Observación"
                                                value={laboratory.observation}
                                                onChange={(e) => handleLaboratoryChangeSemestral(index, 'observation', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </React.Fragment>
                                ))}
                                <div className="usrs-button">
                                    <button type="submit">Crear</button>
                                    <button type="button" onClick={() => setMostrarComponenteS(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    )}
                    <table border="1" style={{ marginTop: "2%", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                let find = false;

                                const rows = semesterDoc.map(document => {
                                    const monthName = fullMonth(document.documentVO.month);
                                    const match = searchS === "" || monthName.toLowerCase().includes(searchS.toLowerCase()) || document.documentVO.year.toString().toLowerCase().includes(searchS.toLowerCase());

                                    if (match) {
                                        find = true;
                                        return (
                                            <tr key={document.documentVO.idDocuments}>
                                                <td>Mantenimiento semestral {monthName} {document.documentVO.year}.pdf</td>
                                                <td style={{ textAlign: "center", padding: "5px" }}>
                                                    <Link to={'/Maintenance/Preview'} state={yourDataS(document)}>
                                                        <img src={pdf} alt="ver pdf" className='M-Img' style={{ cursor: "pointer" }} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }

                                    return null;
                                });

                                if (!find) {
                                    rows.push(
                                        <tr key="no-results">
                                            <td colSpan="2" style={{ textAlign: "center" }}>Sin coincidencias para la búsqueda actual</td>
                                        </tr>
                                    );
                                }

                                return rows;
                            })()}
                        </tbody>

                    </table>
                </>
            )
            }
        </>
    );
}

export default MainteinanceSemester;
