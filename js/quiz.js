/**
 * QUIZ MODULE
 * Gestisce la generazione e l'interazione con i quiz
 */

class QuizEngine {
    constructor() {
        this.quizSection = document.getElementById('quizSection');
        this.quizContainer = document.getElementById('quizContainer');
        this.quizScore = document.getElementById('quizScore');
        
        this.currentQuiz = [];
        this.userAnswers = [];
        this.quizTopic = '';
        
        this.init();
    }

    init() {
        // Event delegation per le opzioni del quiz
        this.quizContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.quiz-option');
            if (option && !option.classList.contains('disabled')) {
                this.handleOptionClick(option);
            }
        });
    }

    /**
     * Genera quiz basato sui risultati della ricerca
     */
    generateQuiz(searchResults, topic) {
        if (searchResults.length === 0) {
            this.quizSection.style.display = 'none';
            return;
        }

        this.quizTopic = topic;
        this.currentQuiz = this.createQuestionsFromResults(searchResults, topic);
        this.userAnswers = new Array(this.currentQuiz.length).fill(null);
        
        this.renderQuiz();
        this.quizSection.style.display = 'block';
    }

    /**
     * Crea domande dai risultati di ricerca
     */
    createQuestionsFromResults(results, topic) {
        const questions = [];
        
        // Domanda 1: Comprensione generale
        questions.push({
            id: 1,
            question: `Quale delle seguenti affermazioni meglio descrive il tema "${topic}" secondo gli articoli trovati?`,
            options: [
                {
                    text: `${topic} è un argomento che integra aspetti tecnologici, etici e sociali`,
                    correct: true,
                    explanation: 'Corretto! L\'approccio dell\'Umanesimo Digitale integra sempre multiple dimensioni per una comprensione completa.'
                },
                {
                    text: `${topic} è puramente un argomento tecnico senza implicazioni sociali`,
                    correct: false,
                    explanation: 'Non esatto. L\'Umanesimo Digitale enfatizza sempre la dimensione umana e sociale della tecnologia.'
                },
                {
                    text: `${topic} è rilevante solo per professionisti del settore IT`,
                    correct: false,
                    explanation: 'Non corretto. Gli argomenti trattati hanno sempre un impatto trasversale su tutta la società.'
                },
                {
                    text: `${topic} è un trend passeggero senza impatto duraturo`,
                    correct: false,
                    explanation: 'Non è così. Gli argomenti trattati nel blog affrontano trasformazioni strutturali della nostra epoca.'
                }
            ]
        });

        // Domanda 2: Valori dell'Umanesimo Digitale
        questions.push({
            id: 2,
            question: 'Secondo la prospettiva dell\'Umanesimo Digitale, quale dovrebbe essere il principio guida nello sviluppo tecnologico?',
            options: [
                {
                    text: 'Mettere l\'essere umano al centro di ogni innovazione',
                    correct: true,
                    explanation: 'Esatto! L\'Umanesimo Digitale crede fermamente che la tecnologia debba servire l\'umanità, non viceversa.'
                },
                {
                    text: 'Massimizzare il profitto economico ad ogni costo',
                    correct: false,
                    explanation: 'Non corretto. L\'etica e il benessere umano vengono prima del profitto nella visione umanistica.'
                },
                {
                    text: 'Accelerare il progresso tecnologico senza considerazioni etiche',
                    correct: false,
                    explanation: 'Non è così. L\'etica è fondamentale in ogni sviluppo tecnologico secondo l\'Umanesimo Digitale.'
                },
                {
                    text: 'Limitare l\'accesso alla tecnologia solo agli esperti',
                    correct: false,
                    explanation: 'Sbagliato. La democratizzazione del sapere è un valore fondamentale dell\'Umanesimo Digitale.'
                }
            ]
        });

        // Domanda 3: Applicazione pratica
        if (results.length > 0) {
            const firstPost = results[0];
            questions.push({
                id: 3,
                question: `Secondo l'articolo "${firstPost.title}", qual è l'approccio più appropriato?`,
                options: [
                    {
                        text: 'Un approccio critico e consapevole che bilancia innovazione ed etica',
                        correct: true,
                        explanation: 'Corretto! L\'approccio critico e bilanciato è sempre centrale negli articoli del blog.'
                    },
                    {
                        text: 'Un approccio puramente tecnologico senza considerazioni etiche',
                        correct: false,
                        explanation: 'Non esatto. L\'etica è sempre integrata nella riflessione tecnologica.'
                    },
                    {
                        text: 'Un rifiuto totale della tecnologia e del progresso',
                        correct: false,
                        explanation: 'Non corretto. L\'Umanesimo Digitale non rifiuta la tecnologia, ma la guida eticamente.'
                    },
                    {
                        text: 'Un\'accettazione acritica di qualsiasi innovazione',
                        correct: false,
                        explanation: 'Sbagliato. Il pensiero critico è fondamentale nella visione dell\'Umanesimo Digitale.'
                    }
                ]
            });
        }

        // Domanda 4: Democratizzazione
        questions.push({
            id: 4,
            question: 'Cosa significa "democratizzazione del sapere" nel contesto dell\'Umanesimo Digitale?',
            options: [
                {
                    text: 'Rendere la conoscenza accessibile a tutti attraverso la tecnologia',
                    correct: true,
                    explanation: 'Esatto! La democratizzazione del sapere è un pilastro fondamentale: rendere la conoscenza accessibile abbattendo barriere.'
                },
                {
                    text: 'Limitare l\'informazione solo a chi può permettersela economicamente',
                    correct: false,
                    explanation: 'Non corretto. Questo contraddice completamente il principio di democratizzazione.'
                },
                {
                    text: 'Semplificare eccessivamente i contenuti eliminando la complessità',
                    correct: false,
                    explanation: 'Non è così. Democratizzare non significa banalizzare, ma rendere accessibile mantenendo rigore.'
                },
                {
                    text: 'Creare contenuti solo per esperti del settore',
                    correct: false,
                    explanation: 'Sbagliato. L\'obiettivo è proprio l\'opposto: allargare l\'accesso alla conoscenza.'
                }
            ]
        });

        // Domanda 5: Pensiero critico
        questions.push({
            id: 5,
            question: 'Nel contesto dell\'intelligenza artificiale e dell\'etica digitale, qual è il ruolo del cittadino consapevole?',
            options: [
                {
                    text: 'Essere protagonista attivo, non spettatore passivo della rivoluzione digitale',
                    correct: true,
                    explanation: 'Perfetto! La consapevolezza critica e l\'azione informata sono essenziali per guidare il cambiamento tecnologico.'
                },
                {
                    text: 'Delegare completamente le decisioni tecnologiche alle aziende tech',
                    correct: false,
                    explanation: 'Non corretto. Ogni cittadino deve essere protagonista delle scelte che riguardano il futuro digitale.'
                },
                {
                    text: 'Ignorare gli sviluppi tecnologici perché troppo complessi',
                    correct: false,
                    explanation: 'Sbagliato. L\'alfabetizzazione digitale è un diritto e una responsabilità di tutti.'
                },
                {
                    text: 'Accettare passivamente qualsiasi innovazione proposta',
                    correct: false,
                    explanation: 'Non è così. Il pensiero critico e la partecipazione attiva sono fondamentali.'
                }
            ]
        });

        return questions;
    }

    /**
     * Renderizza il quiz
     */
    renderQuiz() {
        const html = this.currentQuiz.map((question, index) => `
            <div class="quiz-question" data-question-id="${question.id}">
                <div class="question-header">
                    <div class="question-number">${index + 1}</div>
                    <div class="question-text">${this.escapeHtml(question.question)}</div>
                </div>
                <div class="quiz-options">
                    ${question.options.map((option, optIndex) => `
                        <div class="quiz-option" data-question-index="${index}" data-option-index="${optIndex}">
                            <div class="option-label">
                                <span class="option-letter">${String.fromCharCode(65 + optIndex)}</span>
                                <span class="option-text">${this.escapeHtml(option.text)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="question-feedback" data-question-index="${index}"></div>
            </div>
        `).join('');

        this.quizContainer.innerHTML = html;
        this.quizScore.style.display = 'none';
    }

    /**
     * Gestisce il click su un'opzione
     */
    handleOptionClick(optionElement) {
        const questionIndex = parseInt(optionElement.dataset.questionIndex);
        const optionIndex = parseInt(optionElement.dataset.optionIndex);
        
        const question = this.currentQuiz[questionIndex];
        const selectedOption = question.options[optionIndex];
        
        // Salva la risposta
        this.userAnswers[questionIndex] = optionIndex;
        
        // Ottieni tutti gli elementi della domanda
        const questionElement = optionElement.closest('.quiz-question');
        const allOptions = questionElement.querySelectorAll('.quiz-option');
        const feedbackElement = questionElement.querySelector('.question-feedback');
        
        // Disabilita tutte le opzioni
        allOptions.forEach(opt => {
            opt.classList.add('disabled');
        });
        
        // Marca la risposta selezionata
        optionElement.classList.add('selected');
        
        // Marca corretto/sbagliato
        if (selectedOption.correct) {
            optionElement.classList.add('correct');
            feedbackElement.className = 'question-feedback correct show';
            feedbackElement.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>Corretto!</strong> ${this.escapeHtml(selectedOption.explanation)}
            `;
        } else {
            optionElement.classList.add('incorrect');
            
            // Evidenzia anche la risposta corretta
            const correctIndex = question.options.findIndex(opt => opt.correct);
            allOptions[correctIndex].classList.add('correct');
            
            feedbackElement.className = 'question-feedback incorrect show';
            feedbackElement.innerHTML = `
                <i class="fas fa-times-circle"></i>
                <strong>Non esatto.</strong> ${this.escapeHtml(selectedOption.explanation)}
            `;
        }
        
        // Controlla se tutte le domande hanno una risposta
        if (this.userAnswers.every(answer => answer !== null)) {
            setTimeout(() => {
                this.showFinalScore();
            }, 1000);
        }
    }

    /**
     * Mostra il punteggio finale
     */
    showFinalScore() {
        const correctAnswers = this.userAnswers.filter((answer, index) => {
            return this.currentQuiz[index].options[answer].correct;
        }).length;
        
        const totalQuestions = this.currentQuiz.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        let message = '';
        let emoji = '';
        
        if (percentage === 100) {
            message = 'Eccellente! Hai una comprensione perfetta dell\'argomento! 🎯';
            emoji = '🏆';
        } else if (percentage >= 80) {
            message = 'Ottimo lavoro! Hai una buona padronanza dell\'argomento. 👏';
            emoji = '⭐';
        } else if (percentage >= 60) {
            message = 'Buon risultato! Continua ad approfondire per migliorare. 📚';
            emoji = '👍';
        } else {
            message = 'Hai bisogno di approfondire. Rileggi gli articoli e riprova! 💪';
            emoji = '📖';
        }
        
        this.quizScore.innerHTML = `
            <div class="score-number">${emoji}</div>
            <h3>Quiz Completato!</h3>
            <div class="score-number">${correctAnswers}/${totalQuestions}</div>
            <div class="score-message">${message}</div>
            <p style="margin-top: 20px; opacity: 0.9;">
                Hai risposto correttamente a ${correctAnswers} domand${correctAnswers === 1 ? 'a' : 'e'} 
                su ${totalQuestions} (${percentage}%)
            </p>
        `;
        
        this.quizScore.style.display = 'block';
        
        // Smooth scroll al punteggio
        setTimeout(() => {
            this.quizScore.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Esporta per uso globale
window.QuizEngine = QuizEngine;
