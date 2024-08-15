package com.sgcl.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgcl.demo.models.AnualDocVO;
import com.sgcl.demo.models.DocumentVO;
import com.sgcl.demo.models.SemesterDocVO;
import com.sgcl.demo.models.RequestModels.DocumentRequest;
import com.sgcl.demo.models.RequestModels.DocumentResponse;
import com.sgcl.demo.services.DocumentService;

@RestController
@RequestMapping("/document")

@CrossOrigin(origins = "*")
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @GetMapping("/getDocuments")
    public List<DocumentResponse> getClassrooms(){
        return this.documentService.readDocuments();
    }

    @PostMapping("/createAnual")
    public DocumentVO createDocumentVO(@RequestBody DocumentRequest documentVO){
        return this.documentService.createAnualDocument(documentVO.getDocumentVO(), documentVO.getAnualDocVO());
    }

    @PostMapping("/createSemester")
    public DocumentVO createSemesterVO(@RequestBody DocumentRequest documentVO){
        return this.documentService.createSemesterDocument(documentVO.getDocumentVO(), documentVO.getSemesterDocVO());
    }

}
