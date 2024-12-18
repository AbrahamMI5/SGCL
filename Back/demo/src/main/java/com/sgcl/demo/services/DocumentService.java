package com.sgcl.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgcl.demo.models.AnualDocVO;
import com.sgcl.demo.models.DatesVO;
import com.sgcl.demo.models.DocumentVO;
import com.sgcl.demo.models.SemesterDocVO;
import com.sgcl.demo.models.RequestModels.AnualDocDTO;
import com.sgcl.demo.models.RequestModels.AnualDocResponse;
import com.sgcl.demo.models.RequestModels.DocumentRequest;
import com.sgcl.demo.models.RequestModels.DocumentResponse;
import com.sgcl.demo.models.RequestModels.SemesterDocResponse;
import com.sgcl.demo.repositories.AnualDocumentRepository;
import com.sgcl.demo.repositories.DatesRepository;
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

    @Autowired
    DatesRepository datesRepository;

    public DocumentVO createAnualDocument(DocumentVO document, List<AnualDocDTO> anualList) {
        // Guardamos el documento principal
        documentRepository.save(document);

        // Iteramos sobre la lista de objetos AnualDocDTO
        int validation = 0;//Validador de la existencia de por lo menos una fecha
        for (AnualDocDTO anual : anualList) {
            try {
                // Siempre guardamos el laboratorio, con o sin fechas
                AnualDocVO anualDocVO = new AnualDocVO();
                anualDocVO.setDocumentsIdDocuments(document.getIdDocuments());
                anualDocVO.setLabName(anual.getLabName());
                anualDocumentRepository.save(anualDocVO); // Guardamos el laboratorio

                // Verificamos si hay fechas para este laboratorio
                if (anual.getDates() != null && !anual.getDates().isEmpty()) {
                    // Si tiene fechas, las guardamos
                    for (DatesVO date : anual.getDates()) {

                        date.setId_anual_doc(anualDocVO.getIdAnualdoc());
                        validation++;
                        datesRepository.save(date); // Guardamos cada fecha
                    }
                } else {
                    // Si no tiene fechas, solo dejamos el laboratorio guardado sin fechas asociadas
                    System.out.println("El laboratorio " + anual.getLabName()
                            + " no tiene fechas, pero se registró correctamente.");
                }

            } catch (Exception e) {
                documentRepository.delete(document);
                throw new IllegalArgumentException("Error al procesar el laboratorio: " + anual.getLabName(), e);
            }
        }
        if(validation == 0){  
            documentRepository.delete(document);
                throw new IllegalArgumentException("Error en los datos, sin fechas");
        }

        return document;
    }

    public DocumentVO createSemesterDocument(DocumentVO document, List<SemesterDocVO> semesterList) {
        documentRepository.save(document);

        for (SemesterDocVO semester : semesterList) {
            try {
                semester.setDocumentsId(document.getIdDocuments());
                semesterDocumentRepository.save(semester);
            } catch (Exception e) {
                documentRepository.delete(document);
                throw new IllegalArgumentException("Error en los datos");
            }

        }

        return document;
    }

    public List<DocumentResponse> readDocuments() {
        List<DocumentResponse> response = new ArrayList<>();
        List<DocumentVO> documentList = new ArrayList<>();

        documentList = documentRepository.findAll();

        for (DocumentVO documento : documentList) {
            List<AnualDocResponse> anualRespList = new ArrayList<>();
            List<SemesterDocResponse> semesterRespList = new ArrayList<>();

            DocumentResponse docresp = new DocumentResponse();
            docresp.setDocumentVO(documento);

            List<AnualDocVO> anualList = anualDocumentRepository.getAnualDocVOByDocument(documento.getIdDocuments());
            for (AnualDocVO anualdoc : anualList) {
                AnualDocResponse anualresp = new AnualDocResponse();
                List<DatesVO> actualdates = new ArrayList<>();
                List<DatesVO> datesList = datesRepository.getDatesByAnualDocumentId(anualdoc.getIdAnualdoc());
                for (DatesVO date : datesList) {
                    DatesVO newdate = new DatesVO();
                    newdate.setDays(date.getDays());
                    newdate.setMonth(date.getMonth());
                    newdate.setId_anual_doc(anualdoc.getIdAnualdoc());
                    actualdates.add(newdate);
                }
                anualresp.setDates(actualdates);
                anualresp.setDocumentsIdDocuments(anualdoc.getDocumentsIdDocuments());
                anualresp.setIdAnualdoc(anualdoc.getIdAnualdoc());
                anualresp.setLabName(anualdoc.getLabName());
                anualRespList.add(anualresp);
            }
            docresp.setAnualDocVO(anualRespList);

            List<SemesterDocVO> semesterList = semesterDocumentRepository
                    .getSemesterDocVOByDocument(documento.getIdDocuments());
            for (SemesterDocVO anualdoc : semesterList) {
                SemesterDocResponse anualresp = new SemesterDocResponse();
                anualresp.setAction(anualdoc.getAction());
                anualresp.setDocumentsId(anualdoc.getDocumentsId());
                anualresp.setIdSemesterdoc(anualdoc.getIdSemesterdoc());
                anualresp.setObservation(anualdoc.getObservation());
                anualresp.setLabName(anualdoc.getLabName());
                semesterRespList.add(anualresp);
            }
            docresp.setSemesterDocVO(semesterRespList);

            response.add(docresp);
        }
        return response;
    }

}
