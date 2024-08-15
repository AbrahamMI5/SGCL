package com.sgcl.demo.models.RequestModels;

import java.util.List;

import com.sgcl.demo.models.AnualDocVO;
import com.sgcl.demo.models.DocumentVO;
import com.sgcl.demo.models.SemesterDocVO;

public class DocumentRequest {
    private DocumentVO documentVO;
    private List<SemesterDocVO> semesterDocVO;
    private List<AnualDocVO> anualDocVO;
    
    public DocumentVO getDocumentVO() {
        return documentVO;
    }
    public void setDocumentVO(DocumentVO documentVO) {
        this.documentVO = documentVO;
    }
    public List<SemesterDocVO> getSemesterDocVO() {
        return semesterDocVO;
    }
    public void setSemesterDocVO(List<SemesterDocVO> semesterDocVO) {
        this.semesterDocVO = semesterDocVO;
    }
    public List<AnualDocVO> getAnualDocVO() {
        return anualDocVO;
    }
    public void setAnualDocVO(List<AnualDocVO> anualDocVO) {
        this.anualDocVO = anualDocVO;
    }
    
}
