import './App.css';
import PDFGeneratorAnual from './PDFGeneratorAnual';
import PDFGenerator from './PDFGenerator'
import { useLocation } from 'react-router-dom';


export function Previewpdf() {
    const location = useLocation(); 
    const {anual, data} = location.state || {};
    return (
        <>
            {anual ?
                <PDFGeneratorAnual content={data} />
                :
                <PDFGenerator content={data} />

            }
            <div style={{height: "15%"}}/>
        </>
    )
}

export default Previewpdf;