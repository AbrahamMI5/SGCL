package com.sgcl.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.AnualDocVO;
import com.sgcl.demo.models.DocumentVO;
import com.sgcl.demo.models.SemesterDocVO;
import com.sgcl.demo.models.RequestModels.AnualDocResponse;
import com.sgcl.demo.models.RequestModels.DocumentRequest;
import com.sgcl.demo.models.RequestModels.DocumentResponse;
import com.sgcl.demo.models.RequestModels.SemesterDocResponse;
import com.sgcl.demo.repositories.AnualDocumentRepository;
import com.sgcl.demo.repositories.DocumentRepository;
import com.sgcl.demo.repositories.LaboratoryRepository;
import com.sgcl.demo.repositories.SemesterDocumentRepository;



@Service
public class DocumentService {
    @Autowired
    AnualDocumentRepository anualDocumentRepository;

    @Autowired
    SemesterDocumentRepository semesterDocumentRepository;

    @Autowired
    DocumentRepository documentRepository;

    @Autowired
    LaboratoryRepository laboratoryRepository;

    public DocumentVO createAnualDocument(DocumentVO document, List<AnualDocVO> anualList){
        documentRepository.save(document);
        
        for (AnualDocVO anual : anualList) {
            try{
                anual.setDocumentsIdDocuments(document.getIdDocuments());
                anualDocumentRepository.save(anual);
            }catch(Exception e){
                documentRepository.delete(document);
                throw new IllegalArgumentException("Error en los datos");
            }
            
        }
        return document;
    }

    public DocumentVO createSemesterDocument(DocumentVO document, List<SemesterDocVO> semesterList){
        documentRepository.save(document);
        
        for (SemesterDocVO semester : semesterList) {
            try{
                semester.setDocumentsId(document.getIdDocuments());
                semesterDocumentRepository.save(semester);
            }catch(Exception e){
                documentRepository.delete(document);
                throw new IllegalArgumentException("Error en los datos");
            }
            
        }

        return document;
    }

    public List<DocumentResponse> readDocuments(){
        List<DocumentResponse> response = new ArrayList<>();
        List<DocumentVO> documentList = new ArrayList<>();

        documentList = documentRepository.findAll();

        for (DocumentVO documento : documentList) {
            List<AnualDocResponse> anualRespList = new ArrayList<>();
            List<SemesterDocResponse> semesterRespList = new ArrayList<>();

            DocumentResponse docresp = new DocumentResponse();
            docresp.setDocumentVO(documento);

            List<AnualDocVO> anualList = anualDocumentRepository.getAnualDocVOByDocument(documento.getIdDocuments());
            for(AnualDocVO anualdoc : anualList){
                AnualDocResponse anualresp = new AnualDocResponse();
                anualresp.setDays1(anualdoc.getDays1());
                anualresp.setDays2(anualdoc.getDays2());
                anualresp.setMonth1(anualdoc.getMonth1());
                anualresp.setMonth2(anualdoc.getMonth2());
                anualresp.setDocumentsIdDocuments(anualdoc.getDocumentsIdDocuments());
                anualresp.setIdAnualdoc(anualdoc.getIdAnualdoc());
                anualresp.setLaboratoriesIdLaboratories(laboratoryRepository.findById(anualdoc.getLaboratoriesIdLaboratories()).get());
                anualRespList.add(anualresp);
            }
            docresp.setAnualDocVO(anualRespList);

            List<SemesterDocVO> semesterList = semesterDocumentRepository.getSemesterDocVOByDocument(documento.getIdDocuments());
            for(SemesterDocVO anualdoc : semesterList){
                SemesterDocResponse anualresp = new SemesterDocResponse();
                anualresp.setAction(anualdoc.getAction());
                anualresp.setDocumentsId(anualdoc.getDocumentsId());
                anualresp.setIdSemesterdoc(anualdoc.getIdSemesterdoc());
                anualresp.setObservation(anualdoc.getObservation());
                anualresp.setLaboratoriesIdLaboratories(laboratoryRepository.findById(anualdoc.getLaboratoriesIdLaboratories()).get());
                semesterRespList.add(anualresp);
            }
            docresp.setSemesterDocVO(semesterRespList);

            response.add(docresp);
        }
        return response;
    }
     
}
