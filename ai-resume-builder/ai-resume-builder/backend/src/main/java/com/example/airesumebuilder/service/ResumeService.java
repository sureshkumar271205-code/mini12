package com.example.airesumebuilder.service;

import java.util.*;
import org.springframework.stereotype.Service;

import com.example.airesumebuilder.model.ResumeAnalysisRequest;
import com.example.airesumebuilder.model.ResumeAnalysisResponse;

@Service
public class ResumeService {

    private static final Map<String, List<String>> ROLE_KEYWORDS = new HashMap<>();

    static {
        ROLE_KEYWORDS.put("software engineer", Arrays.asList("java", "python", "react", "spring", "sql", "docker", "aws", "git", "rest api", "junit"));
        ROLE_KEYWORDS.put("data scientist", Arrays.asList("python", "pandas", "numpy", "scikit-learn", "tensorflow", "sql", "tableau", "statistics", "data visualization", "jupyter"));
        ROLE_KEYWORDS.put("frontend developer", Arrays.asList("react", "angular", "vue", "javascript", "typescript", "css", "html", "redux", "responsive design", "figma"));
        ROLE_KEYWORDS.put("backend developer", Arrays.asList("java", "node", "python", "spring", "microservices", "sql", "mongodb", "aws", "docker", "kafka"));
        ROLE_KEYWORDS.put("product manager", Arrays.asList("agile", "scrum", "jira", "roadmap", "user stories", "communication", "leadership", "analytics", "market research", "stakeholder management"));
    }

    public ResumeAnalysisResponse analyzeResume(ResumeAnalysisRequest request) {
        String targetRole = request.getTargetRole().toLowerCase();
        List<String> requiredKeywords = ROLE_KEYWORDS.getOrDefault(targetRole, Arrays.asList("communication", "teamwork", "problem solving"));
        
        List<String> userSkills = new ArrayList<>();
        if (request.getSkills() != null) {
            for (String s : request.getSkills()) {
                userSkills.add(s.toLowerCase().trim());
            }
        }

        int matchCount = 0;
        List<String> missingKeywords = new ArrayList<>();

        for (String keyword : requiredKeywords) {
            boolean found = false;
            for (String userSkill : userSkills) {
                // Flexible matching: check if one contains the other
                if (userSkill.contains(keyword) || keyword.contains(userSkill)) {
                    found = true;
                    break;
                }
            }
            
            if (found) {
                matchCount++;
            } else {
                missingKeywords.add(keyword);
            }
        }

        double score = ((double) matchCount / requiredKeywords.size()) * 100;
        
        // Boost score based on experience
        if (request.getExperienceYears() > 2) score += 10;
        if (request.getExperienceYears() > 5) score += 10;

        if (score > 100) score = 100;

        String suggestions = generateSuggestions(score, missingKeywords, targetRole);

        return new ResumeAnalysisResponse((int) score, missingKeywords, suggestions);
    }

    private String generateSuggestions(double score, List<String> missing, String role) {
        StringBuilder sb = new StringBuilder();
        sb.append("Analysis for " + role + ":\n");
        if (score < 50) {
            sb.append("Your resume needs significant improvement to match standard job descriptions for this role.\n");
        } else if (score < 80) {
            sb.append("Good start! Consider adding more specific technical skills.\n");
        } else {
            sb.append("Excellent match! Your profile is strong.\n");
        }

        if (!missing.isEmpty()) {
            sb.append("Consider learning or highlighting these skills: " + String.join(", ", missing) + ".\n");
        } else {
            sb.append("You have all the core skills we looked for.\n");
        }
        
        return sb.toString();
    }
}
