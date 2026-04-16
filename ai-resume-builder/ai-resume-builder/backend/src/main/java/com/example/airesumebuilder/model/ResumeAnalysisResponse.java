package com.example.airesumebuilder.model;

import java.util.List;

public class ResumeAnalysisResponse {
    private int matchScore;
    private List<String> missingKeywords;
    private String profileSummaryAndSuggestions;

    public ResumeAnalysisResponse(int matchScore, List<String> missingKeywords, String profileSummaryAndSuggestions) {
        this.matchScore = matchScore;
        this.missingKeywords = missingKeywords;
        this.profileSummaryAndSuggestions = profileSummaryAndSuggestions;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }

    public List<String> getMissingKeywords() {
        return missingKeywords;
    }

    public void setMissingKeywords(List<String> missingKeywords) {
        this.missingKeywords = missingKeywords;
    }

    public String getProfileSummaryAndSuggestions() {
        return profileSummaryAndSuggestions;
    }

    public void setProfileSummaryAndSuggestions(String profileSummaryAndSuggestions) {
        this.profileSummaryAndSuggestions = profileSummaryAndSuggestions;
    }
}
