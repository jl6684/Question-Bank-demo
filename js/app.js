class AdvancedQuestionBank {
    constructor() {
        this.questions = [];
        this.filteredQuestions = [];
        this.selectedQuestions = new Set();
        this.isLoading = false;
        this.scannedCombinations = new Set(); // Track what we've already scanned
        this.questionCache = new Map(); // Cache for faster subsequent loads
        this.lastScanTime = new Map(); // Track when each combination was last scanned
        
        // Filters
        this.filters = {
            subject: '',
            year: '',
            topic: '',
            difficulty: ''
        };
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.populateInitialFilters();
        this.showInitialMessage();
    }

    setupEventListeners() {
        // Filter selectors - now with lazy loading
        document.getElementById('subject').addEventListener('change', async (e) => {
            this.filters.subject = e.target.value;
            this.updateTopicOptions();
            await this.loadQuestionsForCurrentFilters();
        });
        
        document.getElementById('year').addEventListener('change', async (e) => {
            this.filters.year = e.target.value;
            await this.loadQuestionsForCurrentFilters();
        });
        
        document.getElementById('topic').addEventListener('change', async (e) => {
            this.filters.topic = e.target.value;
            await this.loadQuestionsForCurrentFilters();
        });
        
        document.getElementById('difficulty').addEventListener('change', async (e) => {
            this.filters.difficulty = e.target.value;
            await this.loadQuestionsForCurrentFilters();
        });
        
        // Selection controls
        document.getElementById('selectAllBtn').addEventListener('click', () => this.selectAllFiltered());
        document.getElementById('clearSelectionBtn').addEventListener('click', () => this.clearAllSelection());
        document.getElementById('printSelectedBtn').addEventListener('click', () => this.showPrintModal());
        
        // Print modal
        const closePrintModalBtn = document.getElementById('closePrintModal');
        if (closePrintModalBtn) {
            closePrintModalBtn.addEventListener('click', () => this.closePrintModal());
        }
        
        const cancelPrintBtn = document.getElementById('cancelPrintBtn');
        if (cancelPrintBtn) {
            cancelPrintBtn.addEventListener('click', () => this.closePrintModal());
        }
        
        const generatePrintBtn = document.getElementById('generatePrintBtn');
        if (generatePrintBtn) {
            generatePrintBtn.addEventListener('click', () => this.generatePrintDocument());
        }
    }

    populateInitialFilters() {
        // Populate with predefined options without scanning files
        
        // Populate subjects
        const subjectSelect = document.getElementById('subject');
        const predefinedSubjects = ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'Engineering'];
        subjectSelect.innerHTML = '<option value="">📚 Select Subject (Required)</option>';
        predefinedSubjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
        
        // Populate years
        const yearSelect = document.getElementById('year');
        const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
        yearSelect.innerHTML = '<option value="">📅 Select Year (Required)</option>';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
        
        // Populate topics based on subject (will be populated when subject is selected)
        const topicSelect = document.getElementById('topic');
        topicSelect.innerHTML = '<option value="">📖 All Topics (Optional)</option>';
        
        // Difficulty is static
        const difficultySelect = document.getElementById('difficulty');
        difficultySelect.innerHTML = '<option value="">⚡ All Difficulties (Optional)</option><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option>';
    }

    showInitialMessage() {
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('errorMessage').innerHTML = `
            <strong>Welcome to the Question Bank!</strong><br><br>
            Select <strong>Subject</strong> and <strong>Year</strong> above to start loading questions.<br>
            <small>Ultra-fast scanning will find questions in: questions/[Subject]/[Year]/</small>
        `;
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('continuousQuestionsContainer').style.display = 'none';
        this.updateStats();
    }

    async loadQuestionsForCurrentFilters() {
        // Ultra-Fast Cached Scanning
        // Only scan when BOTH Subject AND Year are selected
        if (!this.filters.subject || !this.filters.year) {
            this.showSelectionMessage();
            return;
        }

        const cacheKey = `${this.filters.subject}_${this.filters.year}_${this.filters.topic}_${this.filters.difficulty}`;
        
        // Check cache first for instant loading
        if (this.questionCache.has(cacheKey)) {
            const cachedTime = this.lastScanTime.get(cacheKey);
            const cacheAge = Date.now() - cachedTime;
            
            // Use cache if less than 5 minutes old
            if (cacheAge < 300000) {
                console.log(`⚡ Loading from cache: ${cacheKey}`);
                this.questions = this.questionCache.get(cacheKey);
                this.filterQuestions();
                return;
            }
        }

        // Show loading with progress
        this.showLoading();
        
        try {
            // Update topic dropdown based on selected subject
            this.updateTopicOptions();
            
            // Scan with optimized batch processing
            const newQuestions = await this.scanMinimalCombination();
            
            // Cache the results for future use
            this.questionCache.set(cacheKey, [...this.questions, ...newQuestions]);
            this.lastScanTime.set(cacheKey, Date.now());
            
            // Add new questions to our collection (avoid duplicates)
            newQuestions.forEach(question => {
                const existingIndex = this.questions.findIndex(q => q.id === question.id);
                if (existingIndex === -1) {
                    this.questions.push(question);
                }
            });
            
            this.filterQuestions();
            
        } catch (error) {
            console.error('Error loading questions:', error);
            this.showError();
        }
    }

    showSelectionMessage() {
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('errorMessage').innerHTML = `
            <strong>⚡ Ultra-Fast Question Bank Ready!</strong><br><br>
            Please select both <strong>Subject</strong> and <strong>Year</strong> to load questions.<br>
            <small>🚀 <strong>Performance Optimizations:</strong><br>
            • Batch scanning (300ms timeout)<br>
            • Smart caching (5-min expiry)<br>
            • Limited to 10 questions per topic for speed<br>
            • Instant subsequent loads from cache</small>
        `;
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('continuousQuestionsContainer').style.display = 'none';
        this.updateStats();
    }

    updateTopicOptions() {
        const topicSelect = document.getElementById('topic');
        const topics = this.getTopicsForSubject(this.filters.subject);
        
        topicSelect.innerHTML = '<option value="">📖 All Topics (Optional)</option>';
        topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicSelect.appendChild(option);
        });
    }

    getTopicsForSubject(subject) {
        const topicsMap = {
            'Mathematics': ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry', 'Probability'],
            'Computer Science': ['UML Diagrams', 'Algorithms', 'Data Structures', 'Programming', 'Databases', 'Networks'],
            'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Quantum', 'Waves'],
            'Chemistry': ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry', 'Thermochemistry'],
            'Biology': ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Anatomy', 'Physiology'],
            'Engineering': ['Structural', 'Electrical', 'Mechanical', 'Civil', 'Software', 'Chemical']
        };
        
        return topicsMap[subject] || ['General'];
    }

    async scanMinimalCombination() {
        const questions = [];
        
        // Create a unique key for this Subject+Year combination
        const combinationKey = `${this.filters.subject}_${this.filters.year}`;
        
        // Skip if we've already scanned this exact combination
        if (this.scannedCombinations.has(combinationKey)) {
            return [];
        }
        
        // Mark this combination as scanned
        this.scannedCombinations.add(combinationKey);
        
        // Determine what to scan - only for selected Subject+Year
        const subject = this.filters.subject;
        const year = this.filters.year;
        const topicsToScan = this.filters.topic ? [this.filters.topic] : this.getTopicsForSubject(subject);
        const difficultiestoScan = this.filters.difficulty ? [this.filters.difficulty] : ['Easy', 'Medium', 'Hard'];
        
        // Only JPEG format for ultra-fast scanning
        const imageExtension = 'jpeg';
        
        console.log(`🔍 Optimized scanning: ${subject}/${year} for JPEG questions...`);
        
        // Pre-generate all possible paths for batch checking
        const candidatePaths = [];
        const pathToQuestionMap = new Map();
        
        for (const topic of topicsToScan) {
            for (const difficulty of difficultiestoScan) {
                // Reduced to first 10 questions for faster scanning
                for (let i = 1; i <= 10; i++) {
                    const patterns = [`q${i}.${imageExtension}`]; // Only check most common pattern first
                    
                    for (const pattern of patterns) {
                        const questionPath = `questions/${subject}/${year}/${topic}/${difficulty}/${pattern}`;
                        const markSchemePath = `mark-schemes/${subject}/${year}/${topic}/${difficulty}/${pattern}`;
                        
                        candidatePaths.push(questionPath);
                        pathToQuestionMap.set(questionPath, {
                            id: `${subject}_${year}_${topic}_${difficulty}_${i}`,
                            subject: subject,
                            year: year,
                            topic: topic,
                            difficulty: difficulty,
                            number: i,
                            filename: pattern,
                            questionPath: questionPath,
                            markSchemePath: markSchemePath,
                            title: `Question ${i}`,
                            hasMarkScheme: false // Will be checked separately if needed
                        });
                    }
                }
            }
        }
        
        // Batch check all paths at once for much faster performance
        console.log(`🚀 Batch checking ${candidatePaths.length} potential questions...`);
        const results = await this.batchImageExists(candidatePaths);
        
        // Process results and build final questions array
        for (let i = 0; i < candidatePaths.length; i++) {
            const path = candidatePaths[i];
            const result = results[i];
            
            if (result.status === 'fulfilled' && result.value === true) {
                const questionData = pathToQuestionMap.get(path);
                questions.push(questionData);
                console.log(`✅ Found: ${path}`);
            }
        }

        console.log(`📊 Optimized scan complete: Found ${questions.length} questions in batch mode`);
        return questions;
    }

    showLoading() {
        document.getElementById('loadingMessage').innerHTML = `
            ⚡ <strong>Ultra-Fast Batch Scanning...</strong><br>
            <small>Optimized scanning: questions/${this.filters.subject}/${this.filters.year}/ (300ms timeout)</small>
        `;
        document.getElementById('loadingMessage').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
        document.getElementById('continuousQuestionsContainer').style.display = 'none';
        this.isLoading = true;
    }

    async imageExists(path) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            // Ultra-fast timeout for quick scanning
            setTimeout(() => resolve(false), 300);
            img.src = path;
        });
    }

    // Batch image existence checking for better performance
    async batchImageExists(paths) {
        const promises = paths.map(path => this.imageExists(path));
        return await Promise.allSettled(promises);
    }

    // Clear cache for fresh scanning
    clearCache() {
        this.questionCache.clear();
        this.lastScanTime.clear();
        this.scannedCombinations.clear();
        console.log('🧹 Cache cleared - next scan will be fresh');
    }

    // Get cache statistics
    getCacheInfo() {
        return {
            cacheSize: this.questionCache.size,
            lastScans: Array.from(this.lastScanTime.entries())
        };
    }

    populateFilters() {
        // This method is no longer used - we populate initially with predefined lists
        // and update dynamically as needed
    }

    filterQuestions() {
        this.filteredQuestions = this.questions.filter(question => {
            return (!this.filters.subject || question.subject === this.filters.subject) &&
                   (!this.filters.year || question.year === this.filters.year) &&
                   (!this.filters.topic || question.topic === this.filters.topic) &&
                   (!this.filters.difficulty || question.difficulty === this.filters.difficulty);
        });
        
        this.isLoading = false;
        this.updateDisplay();
        this.updateStats();
    }

    updateDisplay() {
        const loadingMessage = document.getElementById('loadingMessage');
        const errorMessage = document.getElementById('errorMessage');
        const continuousContainer = document.getElementById('continuousQuestionsContainer');
        
        if (this.isLoading) {
            return; // Don't update display while loading
        }
        
        if (this.filteredQuestions.length === 0) {
            loadingMessage.style.display = 'none';
            
            // Show different messages based on filter state
            if (!this.filters.subject || !this.filters.year) {
                errorMessage.innerHTML = `
                    <strong>Selection Required</strong><br><br>
                    Please select both <strong>Subject</strong> and <strong>Year</strong> to scan for questions.<br>
                    <small>Ultra-fast scanning requires both filters for optimal performance.</small>
                `;
            } else {
                errorMessage.innerHTML = `
                    <strong>No JPEG questions found</strong><br><br>
                    No questions found in: <code>questions/${this.filters.subject}/${this.filters.year}/</code><br><br>
                    <strong>Make sure you have:</strong><br>
                    • JPEG files named q1.jpeg, q2.jpeg, etc.<br>
                    • Proper folder structure: Subject/Year/Topic/Difficulty/<br>
                    • At least one topic folder (${this.getTopicsForSubject(this.filters.subject).join(', ')})<br>
                    • At least one difficulty folder (Easy, Medium, Hard)
                `;
            }
            
            errorMessage.style.display = 'block';
            continuousContainer.style.display = 'none';
            return;
        }
        
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        continuousContainer.style.display = 'block';
        
        // Always render continuous view
        this.renderContinuousView();
        this.updateStats();
    }

    updateStats() {
        document.getElementById('totalQuestions').textContent = this.questions.length;
        document.getElementById('filteredCount').textContent = this.filteredQuestions.length;
        document.getElementById('selectedQuestions').textContent = this.selectedQuestions.size;
        document.getElementById('currentQuestion').textContent = this.currentIndex + 1;
        document.getElementById('selectedCount').textContent = `${this.selectedQuestions.size} selected`;
    }

    selectQuestion(question) {
        this.selectedQuestions.add(question.id);
        this.updateStats();
    }

    deselectQuestion(question) {
        this.selectedQuestions.delete(question.id);
        this.updateDisplay();
    }

    selectAllFiltered() {
        this.filteredQuestions.forEach(question => {
            this.selectedQuestions.add(question.questionPath);
        });
        this.updateStats();
    }

    clearAllSelection() {
        this.selectedQuestions.clear();
        this.updateStats();
        
        // Update checkboxes in continuous view
        document.querySelectorAll('.continuous-question-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    showPrintModal() {
        if (this.selectedQuestions.size === 0) {
            alert('Please select some questions first.');
            return;
        }
        const modal = document.getElementById('printModal');
        if (modal) {
            modal.style.display = 'flex';
        } else {
            console.error('Print modal not found');
        }
    }

    closePrintModal() {
        const modal = document.getElementById('printModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    generatePrintDocument() {
        const printTypeElement = document.querySelector('input[name="printType"]:checked');
        const includeMetadataElement = document.getElementById('includeMetadata');
        
        if (!printTypeElement) {
            alert('Please select a print type.');
            return;
        }
        
        const printType = printTypeElement.value;
        const includeMetadata = includeMetadataElement ? includeMetadataElement.checked : true;
        
        const selectedQuestionData = this.questions.filter(q => 
            this.selectedQuestions.has(q.questionPath)
        );
        
        if (selectedQuestionData.length === 0) {
            alert('No questions found to print. Please make sure you have selected questions.');
            return;
        }
        
        console.log(`Printing ${selectedQuestionData.length} questions with type: ${printType}`);
        this.createPrintWindow(selectedQuestionData, printType, includeMetadata);
        this.closePrintModal();
    }

    createPrintWindow(questions, printType, includeMetadata) {
        if (questions.length === 0) {
            alert('No questions to print.');
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Unable to open print window. Please check if pop-ups are blocked.');
            return;
        }

        let html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Question Bank - Print (${questions.length} questions)</title>
                <style>
                    body { font-family: 'Times New Roman', serif; margin: 20px; line-height: 1.4; }
                    .question { page-break-inside: avoid; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
                    .question:last-child { border-bottom: none; margin-bottom: 0; }
                    .question-header { margin-bottom: 15px; }
                    .question-title { font-size: 16pt; font-weight: bold; margin-bottom: 10px; color: #000; }
                    .metadata { font-size: 10pt; color: #666; margin-bottom: 10px; }
                    .content-section { margin-bottom: 20px; }
                    .content-section h3 { font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px; }
                    img { max-width: 100%; height: auto; border: 1px solid #ccc; margin: 10px 0; }
                    .no-markscheme { font-style: italic; color: #666; padding: 10px; background-color: #f5f5f5; }
                    @media print { 
                        .question { page-break-after: always; } 
                        .question:last-child { page-break-after: avoid; }
                        body { margin: 10px; }
                    }
                </style>
            </head>
            <body>
                <h1>Question Bank Print - ${new Date().toLocaleDateString()}</h1>
                <p>Total Questions: ${questions.length} | Print Type: ${printType}</p>
                <hr>
        `;
        
        questions.forEach((question, index) => {
            html += `<div class="question">`;
            html += `<div class="question-header">`;
            html += `<div class="question-title">Question ${index + 1}: ${question.title || `Q${question.number}`}</div>`;
            
            if (includeMetadata) {
                html += `<div class="metadata">
                    Subject: ${question.subject} | 
                    Year: ${question.year} | 
                    Topic: ${question.topic} | 
                    Difficulty: ${question.difficulty}
                </div>`;
            }
            
            html += `</div>`;
            
            // Add question image
            if (printType === 'questions' || printType === 'both') {
                html += `<div class="content-section">`;
                html += `<h3>Question</h3>`;
                if (question.questionPath) {
                    html += `<img src="${question.questionPath}" alt="Question ${question.number}" onerror="this.style.display='none'; this.nextSibling.style.display='block';">`;
                    html += `<div class="no-markscheme" style="display: none;">Question image could not be loaded: ${question.questionPath}</div>`;
                } else {
                    html += `<div class="no-markscheme">No question image available</div>`;
                }
                html += `</div>`;
            }
            
            // Add mark scheme image
            if (printType === 'markschemes' || printType === 'both') {
                html += `<div class="content-section">`;
                html += `<h3>Mark Scheme</h3>`;
                if (question.hasMarkScheme && question.markSchemePath) {
                    html += `<img src="${question.markSchemePath}" alt="Mark Scheme ${question.number}" onerror="this.style.display='none'; this.nextSibling.style.display='block';">`;
                    html += `<div class="no-markscheme" style="display: none;">Mark scheme image could not be loaded: ${question.markSchemePath}</div>`;
                } else {
                    html += `<div class="no-markscheme">No mark scheme available for this question</div>`;
                }
                html += `</div>`;
            }
            
            html += `</div>`;
        });
        
        html += `</body></html>`;
        
        printWindow.document.write(html);
        printWindow.document.close();
        
        // Wait for images to load before printing
        setTimeout(() => {
            printWindow.print();
        }, 2000); // Increased timeout for better image loading
    }

    showError() {
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('errorMessage').innerHTML = 'Error loading questions. Please check your folder structure and try again.';
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('continuousQuestionsContainer').style.display = 'none';
        this.isLoading = false;
    }

    renderContinuousView() {
        const container = document.getElementById('continuousQuestionsContainer');
        container.innerHTML = '';

        if (this.filteredQuestions.length === 0) {
            container.innerHTML = '<div class="no-questions">No questions found matching the current filters.</div>';
            return;
        }

        // Create header with selection controls
        const header = document.createElement('div');
        header.className = 'continuous-header';
        header.innerHTML = `
            <div class="selection-controls">
                <button onclick="questionBank.selectAllVisible()" class="select-btn">Select All</button>
                <button onclick="questionBank.deselectAllVisible()" class="select-btn">Deselect All</button>
                <button onclick="questionBank.showPrintModal()" class="print-btn">Print Selected</button>
            </div>
            <div class="question-count">${this.filteredQuestions.length} questions found</div>
        `;
        container.appendChild(header);

        // Create questions grid
        const questionsGrid = document.createElement('div');
        questionsGrid.className = 'continuous-questions-grid';

        this.filteredQuestions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'continuous-question-item';
            questionItem.innerHTML = `
                <div class="question-header">
                    <label class="question-checkbox">
                        <input type="checkbox" ${this.selectedQuestions.has(question.questionPath) ? 'checked' : ''} 
                               onchange="questionBank.toggleQuestionSelection('${question.questionPath}')">
                        <span class="checkmark"></span>
                    </label>
                    <div class="question-info">
                        <span class="question-number">Q${index + 1}</span>
                        <span class="question-details">${question.subject} | ${question.year} | ${question.topic} | ${question.difficulty}</span>
                    </div>
                    <button class="view-markscheme-btn" onclick="questionBank.toggleMarkScheme('markscheme-${index}')">
                        Show Mark Scheme
                    </button>
                </div>
                <div class="question-images">
                    <div class="question-image-container">
                        <img src="${question.questionPath}" alt="Question ${index + 1}" onclick="questionBank.openImageModal('${question.questionPath}')" loading="lazy">
                    </div>
                    <div id="markscheme-${index}" class="markscheme-container" style="display: none;">
                        ${question.hasMarkScheme ? `<img src="${question.markSchemePath}" alt="Mark Scheme ${index + 1}" onclick="questionBank.openImageModal('${question.markSchemePath}')" loading="lazy">` : '<p>No mark scheme available</p>'}
                    </div>
                </div>
            `;
            questionsGrid.appendChild(questionItem);
        });

        container.appendChild(questionsGrid);
    }

    selectAllVisible() {
        this.filteredQuestions.forEach(question => {
            this.selectedQuestions.add(question.questionPath);
        });
        this.updateSelectionCount();
        
        // Update checkboxes in continuous view
        document.querySelectorAll('.continuous-question-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    }

    deselectAllVisible() {
        this.filteredQuestions.forEach(question => {
            this.selectedQuestions.delete(question.questionPath);
        });
        this.updateSelectionCount();
        
        // Update checkboxes in continuous view
        document.querySelectorAll('.continuous-question-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    toggleQuestionSelection(questionPath) {
        if (this.selectedQuestions.has(questionPath)) {
            this.selectedQuestions.delete(questionPath);
        } else {
            this.selectedQuestions.add(questionPath);
        }
        this.updateSelectionCount();
    }

    updateSelectionCount() {
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            selectedCount.textContent = `${this.selectedQuestions.size} selected`;
        }
    }

    toggleMarkScheme(markschemeId) {
        const markschemeContainer = document.getElementById(markschemeId);
        const button = event.target;
        
        if (markschemeContainer.style.display === 'none') {
            markschemeContainer.style.display = 'block';
            button.textContent = 'Hide Mark Scheme';
        } else {
            markschemeContainer.style.display = 'none';
            button.textContent = 'Show Mark Scheme';
        }
    }

    openImageModal(imageSrc) {
        if (!imageSrc) return; // Don't open modal for empty src
        
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        modalImg.src = imageSrc;
        modalImg.style.display = 'block';
        modal.style.display = 'block';
    }

    closeImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        modal.style.display = 'none';
        modalImg.src = '';
        modalImg.style.display = 'none';
    }

    // Performance monitoring and debugging
    getPerformanceStats() {
        const cacheInfo = this.getCacheInfo();
        const stats = {
            totalQuestions: this.questions.length,
            filteredQuestions: this.filteredQuestions.length,
            selectedQuestions: this.selectedQuestions.size,
            cacheEntries: cacheInfo.cacheSize,
            scannedCombinations: this.scannedCombinations.size,
            filters: this.filters
        };
        
        console.table(stats);
        return stats;
    }

    // Force refresh - clears cache and rescans
    async forceRefresh() {
        console.log('🔄 Force refresh initiated...');
        this.clearCache();
        this.questions = [];
        this.filteredQuestions = [];
        await this.loadQuestionsForCurrentFilters();
        console.log('✅ Force refresh completed');
    }
}

// Initialize the application
let questionBank;
document.addEventListener('DOMContentLoaded', () => {
    questionBank = new AdvancedQuestionBank();
    
    // Add performance shortcuts for development
    window.qb = questionBank; // Quick access
    window.qbStats = () => questionBank.getPerformanceStats();
    window.qbRefresh = () => questionBank.forceRefresh();
    window.qbClearCache = () => questionBank.clearCache();
    
    console.log('🚀 Question Bank initialized with performance optimizations');
    console.log('💡 Dev tools: qbStats(), qbRefresh(), qbClearCache()');
});
