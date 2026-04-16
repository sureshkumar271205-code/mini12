package com.example.airesumebuilder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({ "/login", "/signup", "/architect" })
    public String forward() {
        return "forward:/index.html";
    }
}
