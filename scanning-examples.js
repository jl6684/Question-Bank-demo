// OPTION 1: Ultra-Fast Minimal Scanning
async loadQuestionsMinimal() {
    // Only scan when both Subject AND Year are selected
    if (!this.filters.subject || !this.filters.year) {
        this.showMessage('Please select both Subject and Year to load questions');
        return;
    }
    
    // Scan only: questions/Subject/Year/*/*
    const questions = await this.scanSpecificPath(
        `questions/${this.filters.subject}/${this.filters.year}`
    );
}

// OPTION 2: Progressive Smart Scanning (Current Implementation - Enhanced)
async loadQuestionsProgressive() {
    if (this.filters.subject && !this.filters.year) {
        // Scan all years for this subject
        await this.scanSubjectAllYears(this.filters.subject);
    } else if (this.filters.subject && this.filters.year) {
        // Scan specific subject+year combination
        await this.scanSpecificCombination();
    }
}

// OPTION 3: Predictive Pre-scanning
async loadQuestionsPredictive() {
    // Start background scanning of likely combinations
    this.backgroundScanPopularCombinations();
    
    // Show immediate results if available, scan if needed
    const cached = this.getCachedResults();
    if (cached.length > 0) {
        this.showResults(cached);
    } else {
        await this.scanWithPriority();
    }
}

// OPTION 4: File System API
async loadQuestionsFileSystem() {
    try {
        // Request folder access (modern browsers only)
        const dirHandle = await window.showDirectoryPicker();
        const questions = await this.scanDirectoryHandle(dirHandle);
        return questions;
    } catch (error) {
        // Fallback to traditional scanning
        return this.loadQuestionsProgressive();
    }
}

// OPTION 5: Configuration-Based
async loadQuestionsConfig() {
    try {
        // Load pre-built question manifest
        const response = await fetch('questions.json');
        const config = await response.json();
        this.questions = config.questions;
        this.filterQuestions();
    } catch (error) {
        // Fallback to scanning if config not available
        return this.loadQuestionsProgressive();
    }
}

// OPTION 6: Hybrid Approach
async loadQuestionsHybrid() {
    // Try modern approaches first, fallback gracefully
    try {
        // Try File System API (fastest)
        if ('showDirectoryPicker' in window) {
            return await this.loadQuestionsFileSystem();
        }
        
        // Try configuration file (reliable)
        if (await this.configFileExists()) {
            return await this.loadQuestionsConfig();
        }
        
        // Fallback to smart scanning
        return await this.loadQuestionsProgressive();
        
    } catch (error) {
        // Final fallback to minimal scanning
        return await this.loadQuestionsMinimal();
    }
}
