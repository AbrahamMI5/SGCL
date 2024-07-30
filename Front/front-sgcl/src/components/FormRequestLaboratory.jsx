import React, { useEffect, useState } from "react";
import { usersApi, apiUrls, security } from "./api/userApi";
import { jwtDecode } from 'jwt-decode';
import { RequestLaboratoryCard } from './RequestLaboratoryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function FormRequestLaboratory() {
    const [loading, setLoading] = useState(true);
    const [laboratories, setLaboratories] = useState([]);
    const [userId, setUserId] = useState([])
    const [selectedOptionDay, setSelectedOptionDay] = useState();
    const [selectedOptionGroup, setSelectedOptionGroup] = useState();
    const [requests, setRequests] = useState([]);
    const [startHorary, setStartHorary] = useState();
    const [endHorary, setEndHorary] = useState();


    const handleChangeDay = (event) => {
        setSelectedOptionDay(event.target.value);
    };

    const handleChangeStartHorary = (event) => {
        setStartHorary(event.target.value);
        let [hours, minutes, seconds] = event.target.value.split(":");

        setEndHorary(parseInt(hours) + 2 + ":" + minutes)


    };

    const handleChangeEndHorary = (event) => {
        setEndHorary(event.target.value);
        let [hours, minutes, seconds] = event.target.value.split(":");

        setStartHorary(parseInt(hours) - 2 + ":" + minutes)


    };

    const handleChangeGroup = (event) => {
        setSelectedOptionGroup(event.target.value);
    };

    useEffect(() => {
        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            console.log(toastMessage)

            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
                console.log('Toast notification displayed');
            }
            if (toastMessageW) {
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
                console.log('Toast notification displayed');
            }
        }, 1000);

        const fetchData = async () => {
            let token = localStorage.getItem('token');
            if (token) {
                security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
                try {
                    const respLaboratories = await usersApi.get(apiUrls.getAllLaboratories);
                    setLaboratories(respLaboratories.data);

                    const tokenDecod = jwtDecode(token);
                    const data = {
                        email: tokenDecod.sub,
                    };
                    const responseUser = await usersApi.post(apiUrls.getUserByEmail, data);
                    setUserId(responseUser.data.id);

                    const respReqLab = await usersApi.get(apiUrls.getRequestLabById + responseUser.data.id);
                    setRequests(respReqLab.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
                console.log(requests)
            }
        };

        fetchData();
    }, []);

    const freeLab = async () => {
        console.log()
        const laboratoryId = document.getElementById("laboratory").value;
        const startHorary = document.getElementById("startHorary").value;
        const day = selectedOptionDay; // Asegúrate de que esto esté definido
    
        try {
            const horaryResp = await usersApi.get(apiUrls.getLabHorarybyLab + laboratoryId);
            const data = horaryResp.data;

            const dayIndices = {
                "Lu": 0,
                "Ma": 4,
                "Mi": 8,
                "Ju": 12,
                "Vi": 16
            };
    
            const hourIndices = {
                "12:00": 0,
                "14:00": 1,
                "16:00": 2,
                "18:00": 3
            };
    
            const dayIndex = dayIndices[day];
            const hourIndex = hourIndices[startHorary];
    
            if (dayIndex !== undefined && hourIndex !== undefined) {
                const dataIndex = dayIndex + hourIndex; 
    
                if (dataIndex < data.length) {
                    console.log(!data[dataIndex].startdate);
                    return !data[dataIndex].startdate;
                } else {
                    console.error('Índice fuera de rango:', dataIndex);
                    return false;
                }
            } else {
                console.error('Día u hora no válidos:', day, startHorary);
                return false;
            }
        } catch (error) {
            console.error('Error fetching horariesByLab:', error);
            return false;
        }
    };
    

    const createRequest = async (event) => {
        event.preventDefault();
        const result = await freeLab();
            if (result) {
                try {
                    const requestData = {
                        startHorary: document.getElementById("startHorary").value + ':00',
                        endHorary: document.getElementById("endHorary").value + ':00',
                        day: selectedOptionDay,
                        subject: document.getElementById("materia").value,
                        groups: selectedOptionGroup,
                        studentNumber: document.getElementById("student").value,
                        laboratoriesIdLaboratories: document.getElementById("laboratory").value,
                        usersIdUsers: userId,
                        semesterIdSemester: 1,
                        requiredSoftware: document.getElementById("software").value
                    };
                    console.log(requestData)
                    let token = localStorage.getItem('token');
                    security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
                    const response = await usersApi.post(`${apiUrls.creageRequestLaboratory}`, requestData);
                    localStorage.setItem('toastMessage', 'Solicitud realizada');
                    window.location.reload()
                } catch (error) {
                    console.error('Error al solicitar laboratorio:', error);
                    toast.error("Error al solicitar laboratorio")
                }
            } else {
                toast.error("Horario no disponible")
            }

    }

    return (
        <>
            <ToastContainer />
            <h1 className="RequestLab">Solicitar laboratorios</h1>
            <div className="AddRequest">
                <div className="RequestLabInput">
                    <div className="RequestLabMid">
                        <label htmlFor="laboratory">Laboratorio</label>
                        <select name="laboratory" id="laboratory" className="RequestLabInput-L">
                            <option></option>
                            {laboratories.map(laboratory => (
                                <option key={laboratory.labName} value={laboratory.idLaboratories}>{laboratory.labName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="RequestLabSm">
                        <label htmlFor="day">Hora inicio</label>
                        <select value={startHorary} name="startHorary" id="startHorary" className="RequestLabInput-L" onChange={handleChangeStartHorary}>
                            <option value=""></option>
                            <option value="12:00">12:00</option>
                            <option value="14:00">02:00</option>
                            <option value="16:00">04:00</option>
                            <option value="18:00">06:00</option>
                        </select>
                    </div>
                    <div className="RequestLabSm">
                        <label htmlFor="day">Hora fin</label>
                        <select value={endHorary} name="endHorary" id="endHorary" className="RequestLabInput-L" onChange={handleChangeEndHorary}>
                            <option value=""></option>
                            <option value="14:00">02:00</option>
                            <option value="16:00">04:00</option>
                            <option value="18:00">06:00</option>
                            <option value="20:00">08:00</option>
                        </select>
                    </div>
                    <div className="RequestLabSm">
                        <label htmlFor="day">Dia</label>
                        <select name="day" id="day" className="RequestLabInput-S" style={{ marginTop: "-6%" }} onChange={handleChangeDay}>
                            <option ></option>
                            <option value="Lu">Lunes</option>
                            <option value="Ma">Martes</option>
                            <option value="Mi">Miércoles</option>
                            <option value="Ju">Jueves</option>
                            <option value="Vi">Viernes</option>

                        </select>
                    </div>
                </div>
                <div className="RequestLabInput" style={{ marginTop: '2%' }}>
                    <div className="RequestLabMid" >
                        <label htmlFor="materia">Materia</label>
                        <input name="materia" id="materia" className="RequestLabInput-L">
                        </input>
                    </div>
                    <div className="RequestLabMed">
                        <label htmlFor="group">Grupos</label>
                        <select name="group" id="group" className="RequestLabInput-M" onChange={handleChangeGroup}>
                            <option ></option>
                            <option value="1a">1 "A"</option>
                            <option value="1b">1 "B"</option>
                            <option value="1c">1 "C"</option>
                            <option value="2a">2 "A"</option>
                            <option value="2b">2 "B"</option>
                            <option value="2c">2 "C"</option>
                            <option value="3a">3 "A"</option>
                            <option value="3b">3 "B"</option>
                            <option value="3c">3 "C"</option>
                            <option value="4a">4 "A"</option>
                            <option value="4b">4 "B"</option>
                            <option value="4c">4 "C"</option>
                            <option value="5a">5 "A"</option>
                            <option value="5b">5 "B"</option>
                            <option value="5c">5 "C"</option>
                            <option value="6a">6 "A"</option>
                            <option value="6b">6 "B"</option>
                            <option value="6c">6 "C"</option>
                            <option value="7a">7 "A"</option>
                            <option value="7b">7 "B"</option>
                            <option value="7c">7 "C"</option>
                            <option value="8a">8 "A"</option>
                            <option value="8b">8 "B"</option>
                            <option value="8c">8 "C"</option>
                            <option value="9a">9 "A"</option>
                            <option value="9b">9 "B"</option>
                            <option value="9c">9 "C"</option>
                        </select>
                    </div>
                    <div className="RequestLabMed">
                        <label htmlFor="">No. alumnos</label>
                        <input type="number" name="students" id="student" className="RequestLabInput-M">
                        </input>
                    </div>

                </div>
                <div style={{ marginTop: '2%', marginLeft: "2%" }}>
                    <label htmlFor="software">Software requerido (Opcional)</label>
                    <textarea name="software" id="software" cols="15" rows="4" className="RequestLabTextArea"></textarea>
                </div>
                <div className="RequesLabButtons ">
                    <button className="bt" onClick={createRequest}> Solicitar </button>
                    <button className="bt" onClick={() => window.location.reload()}> Cancelar </button>
                </div>
            </div>
            <h1 className="RequestLab">Solicitados</h1>
            {requests.map(request => (
                <RequestLaboratoryCard key={request.idRequestLaboratory} labId={request.laboratoriesIdLaboratories} subject={request.subject} day={request.day} startHorary={request.startHorary} endHorary={request.endHorary} />
            ))}
            <div style={{ height: '50px' }}></div>
        </>
    )
}

export default FormRequestLaboratory;