import './App.css';
import PDFGeneratorAnual from './PDFGeneratorAnual';
import PDFGenerator from './PDFGenerator'
import { useLocation } from 'react-router-dom';


export function Previewpdf() {
    const location = useLocation(); 
    const {anual, data} = location.state || {};
    console.log(anual)
    console.log(data)
    return (
        <>
            {anual ?
                <PDFGeneratorAnual content={data} />
                :
                <PDFGenerator content={data} />

            }
        </>
    )
}

export default Previewpdf;