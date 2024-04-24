import { useEffect, useState } from "react";
import { usersApi, apiUrls } from "./api/userApi";
import { jwtDecode } from 'jwt-decode';
import { RequestLaboratoryCard } from './RequestLaboratoryCard';

export function FormRequestLaboratory() {
    const [laboratories, setLaboratories] = useState([]);
    const [userId, setUserId] = useState([])
    const [selectedOptionDay, setSelectedOptionDay] = useState();
    const [selectedOptionGroup, setSelectedOptionGroup] = useState();
    const [requests, setRequests] = useState();

    const handleChangeDay = (event) => {
        setSelectedOptionDay(event.target.value);
    };

    const handleChangeGroup = (event) => {
        setSelectedOptionGroup(event.target.value);
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const tokenDecod = jwtDecode(token);
            const data = {
                email: tokenDecod.sub,
            };
            usersApi.get(apiUrls.getAllLaboratories)
                .then(respLaboratories => {
                    setLaboratories(respLaboratories.data);
                })
                .catch(error => {
                    console.error('Error fetching laboratories:', error);
                });

            usersApi.post(apiUrls.getUserByEmail, data)
                .then(responseUser => {
                    setUserId(responseUser.data.id)
                })
                .catch(error => {
                    console.error('Error fetching user id:', error);
                })


            usersApi.get(apiUrls.getRequestLabById + userId)
                .then(respReqLab => {
                    console.log(respReqLab)
                    setRequests(respReqLab.data);
                    console.log(requests)
                })
                .catch(error => {
                    console.error('Error fetching requests:', error);
                });
        }

    }, []);

    const createRequest = async (event) => {
        event.preventDefault();
        try {
            const requestData = {
                startHorary: document.getElementById("startHorary").value + ':00',
                endHorary: document.getElementById("endHorary").value + ':00',
                day: selectedOptionDay,
                subject: document.getElementById("materia").value,
                group: selectedOptionGroup,
                studentNumber: document.getElementById("student").value,
                laboratoriesIdLaboratories: document.getElementById("laboratory").value,
                usersIdUsers: userId,
                semesterIdSemester: 1,
                requiredSoftware: document.getElementById("software").value
            };
            console.log(requestData)
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.post(`${apiUrls.creageRequestLaboratory}`, requestData);
            window.location.reload()
        } catch (error) {
            console.error('Error al solicitar laboratorio:', error);
        }

    }

    return (
        <>
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
                        <input type="time" name="day" id="startHorary" className="RequestLabInput-S">
                        </input>
                    </div>
                    <div className="RequestLabSm">
                        <label htmlFor="day">Hora fin</label>
                        <input type="time" name="day" id="endHorary" className="RequestLabInput-S">
                        </input>
                    </div>
                    <div className="RequestLabSm">
                        <label htmlFor="day">Dia</label>
                        <select name="day" id="day" className="RequestLabInput-S" style={{ marginTop: "-6%" }} onChange={handleChangeDay}>
                            <option ></option>
                            <option value="Lu">Lunes</option>
                            <option value="Ma">Martes</option>
                            <option value="Mi">Miercoles</option>
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
                    <button className="bt"> Cancelar </button>
                </div>
            </div>
            <h1 className="RequestLab">Solicitudes</h1>
            <RequestLaboratoryCard />
            <div style={{ height: '50px' }}></div>
        </>
    )
}

export default FormRequestLaboratory;