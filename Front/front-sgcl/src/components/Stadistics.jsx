import './App.css';
import PDFStadisticsGenerator from './PDFStadisticsGenerator';
import { usersApi, apiUrls, security } from "./api/userApi";
import { useEffect, useState } from "react";


export function Stadistics() {

    const [sem, setSem] = useState([]);
    const [view, setView] = useState(false);
    const [idSemester, setIdSemester] = useState();
    const [stadistics, setStadistics] = useState();

    const handleOnChangeSemester=(event)=>{
        setIdSemester(event.target.value)
    }

    useEffect(() => {
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getAllSemester)
            .then(respSem => {
                setSem(respSem.data);
            })
            .catch(error => {
                console.error('Error fetching semesters :', error);
            });
    }, []);

    const generatePDF=(event)=>{
        event.preventDefault()
        setView(false)
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getStadistics+ idSemester)
            .then(resp => {
                setStadistics(resp.data);
                setView(true)
            })
            .catch(error => {
                console.error('Error fetching estadistics:', error);
            });
    }

    return (
        <>
            <h1 className='margin-cell'>Estadísticas</h1>
            <form onSubmit={generatePDF}>
                <select style={{height: "30px"}} onChange={handleOnChangeSemester} required>
                    <option />
                    {sem.map((semester) => {
                        return (
                            <option key={semester.idSemester} value={semester.idSemester} >{semester.name}</option>
                        );
                    })}
                </select>
                <button className='bt' type='submit'>Visualizar</button>
            </form>
            {view &&
                <><PDFStadisticsGenerator content={stadistics} /></>

            }
            <div style={{height: "15%"}}/>


        </>
    )
}

export default Stadistics;