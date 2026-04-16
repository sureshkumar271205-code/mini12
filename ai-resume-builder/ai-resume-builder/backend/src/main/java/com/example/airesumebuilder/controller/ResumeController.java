package com.example.airesumebuilder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.airesumebuilder.model.ResumeAnalysisRequest;
import com.example.airesumebuilder.model.ResumeAnalysisResponse;
import com.example.airesumebuilder.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/analyze")
    public ResumeAnalysisResponse analyzeResume(@RequestBody ResumeAnalysisRequest request) {
        return resumeService.analyzeResume(request);
    }

    @GetMapping("/hello")
    public String check() {
        return "Backend is running!";
    }
}
