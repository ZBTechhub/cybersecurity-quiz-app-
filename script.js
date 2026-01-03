document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { q: "What is phishing?", a: ["(A) Tricking people into giving personal information", "(B) Fixing computers", "(C) Strong password tool", "(D) Firewall upgrade"], c: 0 },
        { q: "Which of the following is a strong password?", a: ["(A) 123456", "(B) yourname", "(C) P@ssw0rd!2025", "(D) qwerty"], c: 2 },
        { q: "What does VPN do?", a: ["(A) Speeds internet", "(B) Encrypts connection", "(C) Deletes files", "(D) Blocks ads"], c: 1 },
        { q: "Ransomware is:", a: ["(A) A type of malware that demands payment", "(B) An antivirus", "(C) A browser", "(D) A router"], c: 0 },
        { q: "What is two-factor authentication?", a: ["(A) Two passwords", "(B) Password and extra verification", "(C) Two usernames", "(D) No login"], c: 1 },
        { q: "What is a firewall?", a: ["(A) Network security tool", "(B) Food heater", "(C) Keyboard", "(D) Printer"], c: 0 },
        { q: "What does HTTPS show?", a: ["(A) Secure website", "(B) Slow site", "(C) A file type", "(D) A virus"], c: 0 },
        { q: "What is malware?", a: ["(A) Harmful software", "(B) Useful app", "(C) Hardware", "(D) Cable"], c: 0 },
        { q: "Public Wi-Fi is often:", a: ["(A) Always safe", "(B) Potentially risky", "(C) Always encrypted", "(D) Faster"], c: 1 },
        { q: "A keylogger records:", a: ["(A) Keystrokes", "(B) Microphone sound", "(C) Battery status", "(D) Screen size"], c: 0 },
        { q: "What is a strong password practice?", a: ["(A) Use same password everywhere", "(B) Use long mixed characters", "(C) Use birthdate", "(D) Share it"], c: 1 },
        { q: "What is social engineering?", a: ["(A) Tricking people to give data", "(B) Coding website", "(C) Fixing routers", "(D) Designing UI"], c: 0 },
        { q: "Backups are for:", a: ["(A) Saving copies of data", "(B) Deleting files", "(C) Hiding data", "(D) Speeding internet"], c: 0 },
        { q: "Antivirus software is for:", a: ["(A) Protecting devices", "(B) Watching movies", "(C) Designing apps", "(D) Printing documents"], c: 0 },
        { q: "What is a DDoS attack?", a: ["(A) Overloading a server with traffic", "(B) Stealing passwords", "(C) Encrypting files", "(D) Fixing bugs"], c: 0 },
        { q: "Cookies in browser are:", a: ["(A) Snacks", "(B) Small data files", "(C) Viruses", "(D) A type of malware"], c: 1 },
        { q: "Encrypting data makes it:", a: ["(A) Readable to anyone", "(B) Unreadable without key", "(C) Slower", "(D) Deleted"], c: 1 },
        { q: "Which of the following practice is safe online?", a: ["(A) Clicking unknown links", "(B) Using 2FA", "(C) Sharing password", "(D) Using weak password"], c: 1 },
        { q: "Why is software update important?", a: ["(A) It fixes security weakness", "(B) It change the color of the app", "(C) It reduces storage", "(D) It add games"], c: 0 },
        { q: "What should you do before clicking links?", a: ["(A) Click immediately", "(B) Verify sender and hover link", "(C) Share it", "(D) Ignore all emails"], c: 1 }
    ];

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('result-box');
    const scoreEl = document.getElementById('score');
    const retryBtn = document.getElementById('retryBtn');

    let index = 0;
    const answers = Array(questions.length).fill(null);

    function renderQuestion() {
        const q = questions[index];
        questionEl.textContent = `Q${index + 1}. ${q.q}`;
        optionsEl.innerHTML = '';
        q.a.forEach((text, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn';
            btn.dataset.index = i;
            btn.textContent = text;
            if (answers[index] === i) btn.classList.add('selected');
            optionsEl.appendChild(btn);
        });
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === questions.length - 1;
    }

    optionsEl.addEventListener('click', evt => {
        const btn = evt.target.closest('button');
        if (!btn) return;
        optionsEl.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers[index] = parseInt(btn.dataset.index, 10);
    });

    nextBtn.addEventListener('click', () => {
        if (index < questions.length - 1) { index++; renderQuestion(); }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) { index--; renderQuestion(); }
    });

    submitBtn.addEventListener('click', () => {
        let score = 0;
        questions.forEach((q,i) => {
            if (answers[i] === q.c) score++;
        });

        // Highlight correct/incorrect answers on each question
        renderQuestion(); // render last question first
        optionsEl.querySelectorAll('button').forEach((btn, i) => {
            btn.disabled = true;
            if (i === questions[index].c) btn.style.background = '#28a745'; // correct green
            else if (answers[index] === i) btn.style.background = '#dc3545'; // wrong red
            btn.style.color = '#fff';
        });

        document.getElementById('quiz-box').classList.add('hidden');
        resultBox.classList.remove('hidden');
        scoreEl.textContent = `${score} / ${questions.length}`;
    });

    retryBtn.addEventListener('click', () => {
        index = 0;
        answers.fill(null);
        resultBox.classList.add('hidden');
        document.getElementById('quiz-box').classList.remove('hidden');
        renderQuestion();
    });

    renderQuestion();
});