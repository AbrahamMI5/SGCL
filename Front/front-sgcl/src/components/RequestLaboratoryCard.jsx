export function RequestLaboratoryCard() {
    return (
        <div className="AddRequest" style={{ marginBottom: '5%' }}>
            <div className="RequestLabInput" >
                <div className="RequestLabMid" style={{ marginBottom: '3%' }}>
                    <label htmlFor="laboratory">Laboratorio</label>
                    <input readOnly name="day" id="startHorary" className="RequestLabInput-S"/>
                </div>
                <div className="RequestLabMid" style={{ marginBottom: '3%' }}>
                    <label htmlFor="laboratory">Fecha</label>
                    <input readOnly name="date" id="startHorary" className="RequestLabInput-S"/>
                </div>
                <div className="RequestLabMid" style={{ marginBottom: '3%' }}>
                    <label htmlFor="laboratory">Materia</label>
                    <input readOnly name="subject" id="startHorary" className="RequestLabInput-S"/>
                </div>
            </div>
        </div>
    )
}

export default RequestLaboratoryCard;