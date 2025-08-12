class PersonalityTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.selectedMode = 'complex'; // 默认复杂模式
        this.scores = {
            E: 0, I: 0,
            S: 0, N: 0, 
            T: 0, F: 0,
            J: 0, P: 0
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showWelcomeScreen();
    }

    bindEvents() {
        document.getElementById('start-test').addEventListener('click', () => {
            this.startTest();
        });

        document.getElementById('restart-test').addEventListener('click', () => {
            this.restartTest();
        });

        const optionButtons = document.querySelectorAll('.option-circle');
        optionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectAnswer(e.target);
            });
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // 绑定模式选择事件
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectMode(e.currentTarget);
            });
        });
    }

    selectMode(card) {
        // 移除所有卡片的激活状态
        document.querySelectorAll('.mode-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // 激活选中的卡片
        card.classList.add('active');
        
        // 保存选择的模式
        this.selectedMode = card.dataset.mode;
    }

    showWelcomeScreen() {
        this.hideAllScreens();
        document.getElementById('welcome-screen').classList.add('active');
    }

    startTest() {
        // 根据选择的模式设置题库
        setQuestionMode(this.selectedMode);
        
        this.hideAllScreens();
        document.getElementById('test-screen').classList.add('active');
        document.getElementById('total-questions').textContent = questions.length;
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        
        // Update progress bar
        const progress = ((this.currentQuestion) / questions.length) * 100;
        document.getElementById('progress').style.width = progress + '%';
        
        // Show/hide previous button
        const prevBtn = document.getElementById('prev-btn');
        if (this.currentQuestion === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }
        
        // Clear previous selection and restore previous answer if exists
        document.querySelectorAll('.option-circle').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // If this question was already answered, show the previous selection
        if (this.answers[this.currentQuestion]) {
            const previousValue = this.answers[this.currentQuestion].value;
            const previousButton = document.querySelector(`[data-value="${previousValue}"]`);
            if (previousButton) {
                previousButton.classList.add('selected');
            }
        }
    }

    selectAnswer(button) {
        // Remove selection from all buttons
        document.querySelectorAll('.option-circle').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current button
        button.classList.add('selected');
        
        const value = parseInt(button.dataset.value);
        this.recordAnswer(value);
        
        // Auto advance after a short delay
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
    }

    recordAnswer(value) {
        const question = questions[this.currentQuestion];
        
        // If this question was already answered, remove its previous score contribution
        if (this.answers[this.currentQuestion]) {
            this.removeScore(question, this.answers[this.currentQuestion].value);
        }
        
        this.answers[this.currentQuestion] = {
            question: this.currentQuestion,
            value: value,
            dimension: question.dimension,
            direction: question.direction
        };
        
        // Calculate score contribution
        this.calculateScore(question, value);
    }

    removeScore(question, value) {
        const dimension = question.dimension;
        const direction = question.direction;
        
        // Convert 1-7 scale to -3 to +3 scale for easier calculation
        const score = value - 4;
        
        // Remove the previous score contribution
        if (dimension === 'EI') {
            if (direction === 'E') {
                this.scores.E -= score;
            } else {
                this.scores.I += score;
            }
        } else if (dimension === 'SN') {
            if (direction === 'S') {
                this.scores.S -= score;
            } else {
                this.scores.N += score;
            }
        } else if (dimension === 'TF') {
            if (direction === 'T') {
                this.scores.T -= score;
            } else {
                this.scores.F += score;
            }
        } else if (dimension === 'JP') {
            if (direction === 'J') {
                this.scores.J -= score;
            } else {
                this.scores.P += score;
            }
        }
    }

    calculateScore(question, value) {
        const dimension = question.dimension;
        const direction = question.direction;
        
        // Convert 1-7 scale to -3 to +3 scale for easier calculation
        const score = value - 4;
        
        if (dimension === 'EI') {
            if (direction === 'E') {
                this.scores.E += score;
            } else {
                this.scores.I -= score; // Reverse scoring for I
            }
        } else if (dimension === 'SN') {
            if (direction === 'S') {
                this.scores.S += score;
            } else {
                this.scores.N -= score;
            }
        } else if (dimension === 'TF') {
            if (direction === 'T') {
                this.scores.T += score;
            } else {
                this.scores.F -= score;
            }
        } else if (dimension === 'JP') {
            if (direction === 'J') {
                this.scores.J += score;
            } else {
                this.scores.P -= score;
            }
        }
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= questions.length) {
            this.showResults();
        } else {
            this.showQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    showResults() {
        this.hideAllScreens();
        document.getElementById('result-screen').classList.add('active');
        
        // Determine personality type
        const personalityType = this.determinePersonalityType();
        this.displayResults(personalityType);
    }

    determinePersonalityType() {
        let type = '';
        
        // E vs I
        type += this.scores.E > this.scores.I ? 'E' : 'I';
        
        // S vs N  
        type += this.scores.S > this.scores.N ? 'S' : 'N';
        
        // T vs F
        type += this.scores.T > this.scores.F ? 'T' : 'F';
        
        // J vs P
        type += this.scores.J > this.scores.P ? 'J' : 'P';
        
        return type;
    }

    displayResults(personalityType) {
        const personality = personalities[personalityType];
        
        // Display personality type and name
        document.getElementById('personality-code').textContent = personalityType;
        document.getElementById('personality-name').textContent = personality.name;
        document.getElementById('personality-desc').textContent = personality.description;
        
        // Display dimension scores
        this.displayDimensionScores();
    }

    displayDimensionScores() {
        // Calculate percentages for each dimension
        const eiTotal = Math.abs(this.scores.E) + Math.abs(this.scores.I);
        const snTotal = Math.abs(this.scores.S) + Math.abs(this.scores.N);
        const tfTotal = Math.abs(this.scores.T) + Math.abs(this.scores.F);
        const jpTotal = Math.abs(this.scores.J) + Math.abs(this.scores.P);
        
        // E/I dimension
        const ePercentage = eiTotal > 0 ? (Math.abs(this.scores.E) / eiTotal) * 100 : 50;
        const eDominant = this.scores.E > this.scores.I;
        this.updateDimensionBar('ei', ePercentage, eDominant ? 'E' : 'I', 
                               eDominant ? Math.round(ePercentage) + '% 外向' : Math.round(100-ePercentage) + '% 内向');
        
        // S/N dimension
        const sPercentage = snTotal > 0 ? (Math.abs(this.scores.S) / snTotal) * 100 : 50;
        const sDominant = this.scores.S > this.scores.N;
        this.updateDimensionBar('sn', sPercentage, sDominant ? 'S' : 'N',
                               sDominant ? Math.round(sPercentage) + '% 实感' : Math.round(100-sPercentage) + '% 直觉');
        
        // T/F dimension
        const tPercentage = tfTotal > 0 ? (Math.abs(this.scores.T) / tfTotal) * 100 : 50;
        const tDominant = this.scores.T > this.scores.F;
        this.updateDimensionBar('tf', tPercentage, tDominant ? 'T' : 'F',
                               tDominant ? Math.round(tPercentage) + '% 思考' : Math.round(100-tPercentage) + '% 情感');
        
        // J/P dimension
        const jPercentage = jpTotal > 0 ? (Math.abs(this.scores.J) / jpTotal) * 100 : 50;
        const jDominant = this.scores.J > this.scores.P;
        this.updateDimensionBar('jp', jPercentage, jDominant ? 'J' : 'P',
                               jDominant ? Math.round(jPercentage) + '% 判断' : Math.round(100-jPercentage) + '% 知觉');
    }

    updateDimensionBar(dimension, percentage, dominantType, label) {
        const bar = document.getElementById(`${dimension}-bar`);
        const labelElement = document.getElementById(`${dimension}-label`);
        
        // If the second type is dominant, show from the right
        if (dimension === 'ei' && dominantType === 'I') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else if (dimension === 'sn' && dominantType === 'N') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else if (dimension === 'tf' && dominantType === 'F') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else if (dimension === 'jp' && dominantType === 'P') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else {
            bar.style.width = percentage + '%';
            bar.style.marginLeft = '0';
            bar.style.marginRight = 'auto';
        }
        
        labelElement.textContent = label;
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    restartTest() {
        this.currentQuestion = 0;
        this.answers = [];
        this.selectedMode = 'complex'; // 重置为默认模式
        this.scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };
        
        // 重置模式选择卡片状态
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.mode === 'complex') {
                card.classList.add('active');
            }
        });
        
        this.showWelcomeScreen();
    }
}

// Initialize the test when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PersonalityTest();
});