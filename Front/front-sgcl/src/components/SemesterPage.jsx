import { usersApi, apiUrls, security } from "./api/userApi";
import { useEffect, useState } from "react";
import { SemesterCard } from './SemesterCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SemesterPage() {

    const [sem, setSem] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (new Date(endDate) < new Date(startDate)) {
            event.preventDefault();
            alert('La fecha de cierre debe ser mayor que la fecha de inicio.');
        } else {
            try {

                const semData = {
                    name: document.getElementById("semName").value,
                    startDate: document.getElementById("startDate").value,
                    endDate: document.getElementById("endDate").value,
                    isActive: 0
                };
                if (semData.name != null && semData.name != '') {
                    security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
                    const response = await usersApi.post(`${apiUrls.createSemester}`, semData);
                    localStorage.setItem('toastMessage', 'Semester creado');
                } else {
                    toast.error("Faltan datos")
                    throw new SyntaxError("dato incompleto");
                }
                window.location.reload();
            } catch (error) {
                console.error('Error al crear el semestre:', error);
                toast.error("Error al crear el semestre")
            }
        }

    };

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
    }, []);

    function handleStartDateChange() {
        const startDate = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate');
    
    if (startDate) {
        const startDateObj = new Date(startDate);
        startDateObj.setDate(startDateObj.getDate() + 1);
        const newMinDate = startDateObj.toISOString().split('T')[0];
        endDateInput.min = newMinDate;
    }
    }

    return (
        <>
            <ToastContainer />
            <div className='labHeader'>
                <h1>Semestres</h1>
                <form className="I-AddSem" onSubmit={handleSubmit}>
                    <div className="I-AddLab-Title">
                        Agregar semestre
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <label>Semestre:</label><br></br>
                        <input type="text" placeholder='Nombre del laboratorio' className="LabName" id="semName" required maxLength={45}/>
                    </div>
                    <div className="addSem-Buttons" style={{ marginTop: "10px" }}>
                        <div>
                            <label htmlFor="startDate">Fecha de inicio:</label><br />
                            <input type="date" id="startDate" required onChange={handleStartDateChange} />
                        </div>
                        <div>
                            <label htmlFor="endDate">Fecha de cierre:</label><br />
                            <input type="date" id="endDate" required />
                        </div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <button className="bt-create" type="submit">Crear semestre</button>
                    </div>
                </form>

            </div>
            <div className="semBody">
                {sem.map((semester) => {
                    return (
                        <SemesterCard key={semester.idSemester} labName={semester.name} idLaboratories={semester.idSemester} startDate={semester.startDate} endDate={semester.endDate} isActive={semester.isActive} />
                    );
                })}

            </div>
            <div style={{ height: "50px" }}></div>
        </>
    )
}

export default SemesterPage;
