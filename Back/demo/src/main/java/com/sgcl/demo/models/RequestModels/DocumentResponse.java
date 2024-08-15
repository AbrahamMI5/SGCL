package com.sgcl.demo.models.RequestModels;

import java.util.List;

import com.sgcl.demo.models.AnualDocVO;
import com.sgcl.demo.models.DocumentVO;
import com.sgcl.demo.models.SemesterDocVO;

public class DocumentResponse {
    private DocumentVO documentVO;
    private List<SemesterDocResponse> semesterDocVO;
    private List<AnualDocResponse> anualDocVO;
    
    public DocumentVO getDocumentVO() {
        return documentVO;
    }
    public void setDocumentVO(DocumentVO documentVO) {
        this.documentVO = documentVO;
    }
    public List<SemesterDocResponse> getSemesterDocVO() {
        return semesterDocVO;
    }
    public void setSemesterDocVO(List<SemesterDocResponse> semesterDocVO) {
        this.semesterDocVO = semesterDocVO;
    }
    public List<AnualDocResponse> getAnualDocVO() {
        return anualDocVO;
    }
    public void setAnualDocVO(List<AnualDocResponse> anualDocVO) {
        this.anualDocVO = anualDocVO;
    }
}
