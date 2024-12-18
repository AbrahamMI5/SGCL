import { useEffect, useState } from "react";

import { SetTechnologyServiceStatus } from "./SetTechnologyServiceStatus";
import { apiUrls, usersApi, security } from './api/userApi';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SemesterCardView } from './SemesterCardView';


export function RequestService() {

    const [sem, setSem] = useState([]);

    useEffect(() => {
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getAllSemester)
            .then(respSem => {
                setSem(respSem.data);
            })
            .catch(error => {
                console.error('Error fetching semesters:', error);
            });
    }, []);

    return (
        <>
            <ToastContainer />
            <h1 className='margin-cell'>Solicitudes de servicio</h1>
            <div className="semBody">
                {sem.map((semester) => {
                    return (
                        <SemesterCardView key={semester.idSemester} labName={semester.name} idLaboratories={semester.idSemester} startDate={semester.startDate} endDate={semester.endDate} isActive={semester.isActive} />

                    );
                })}
            </div>
            {/*<div>
                <button style={{ backgroundColor: `${bgcolorC}`, border: '1px solid black' }} onClick={handleComputer}>Cómputo</button>
                <button style={{ backgroundColor: `${bgcolorT}`, border: '1px solid black' }} onClick={handleTechnology}>Tecnología</button>
            </div>
            <div style={{ marginTop: "2%", paddingBottom: "2%" }} className="AddRequest">
                <input type="Buscar" style={{ width: "100%" }} placeholder="Buscar por nombre o correo de solicitante o usuario final" onChange={filter} />
            </div>*/}

            {/*computerS &&
                <>
                    <h2>Servicio de cómputo</h2>

                    <h3>Pendientes</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredWOS = responseCompWOS.filter((comp) => {
                            if (search === "") return true;
                            return comp.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredWOS.length > 0) {
                            hasResults = true;
                            return filteredWOS.map((comp) => (
                                <SetComputerServiceStatus key={comp.idRequestService} compr={comp} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes pendientes</h3>;
                    })()}

                    <h3>Resueltas</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredWS = responseCompWS.filter((comp) => {
                            if (search === "") return true;
                            return comp.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredWS.length > 0) {
                            hasResults = true;
                            return filteredWS.map((comp) => (
                                <SetComputerServiceStatus key={comp.idRequestService} compr={comp} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes resueltas</h3>;
                    })()}
                </>
            */}

            {/*!computerS &&
                <>
                    <h2>Servicio de tecnología</h2>

                    <h3>Pendientes</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredTechWOS = responseTechWOS.filter((tech) => {
                            if (search === "") return true;
                            return tech.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                   tech.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                   tech.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                   tech.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredTechWOS.length > 0) {
                            hasResults = true;
                            return filteredTechWOS.map((tech) => (
                                <SetTechnologyServiceStatus key={tech.idRequestService} techr={tech} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes pendientes</h3>;
                    })()}

                    <h3>Resueltas</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredTechWS = responseTechWS.filter((tech) => {
                            if (search === "") return true;
                            return tech.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                   tech.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                   tech.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                   tech.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredTechWS.length > 0) {
                            hasResults = true;
                            return filteredTechWS.map((tech) => (
                                <SetTechnologyServiceStatus key={tech.idRequestService} techr={tech} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes resueltas</h3>;
                    })()}
                </>
            */}
        </>
    );
}
export default RequestService;
