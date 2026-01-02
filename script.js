// script.js - clean implementation: click an option -> it turns green, re-selectable
document.addEventListener('DOMContentLoaded', () => {
// sample single question for testing
const questions = [
{
  q: "What is phishing?", a: ["(A) Tricking people into giving personal information", "(B) Fixing computers", "(C) Strong password tool", "(D) Firewall upgrade"], c: 0 },

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
const nextBtn = document.getElementById('nextBtn');
const resultBox = document.getElementById('result-box');
const scoreEl = document.getElementById('score');

let index = 0;
let score = 0;

function renderQuestion() {
const q = questions[index];
questionEl.textContent = `Q${index + 1}. ${q.q}`;
optionsEl.innerHTML = '';

// create option buttons
q.a.forEach((text, i) => {
const btn = document.createElement('button');
btn.type = 'button';
btn.className = 'option-btn';
btn.dataset.index = i;
btn.textContent = text;
optionsEl.appendChild(btn);
});
}

// Event delegation: clicking ANY button inside #options handled here
optionsEl.addEventListener('click', (evt) => {
const btn = evt.target.closest('button');
if (!btn) return; // clicked outside a button
console.log('Clicked option:', btn.textContent);

// Remove selected from all; ensure buttons are not disabled
const all = optionsEl.querySelectorAll('button');
all.forEach(b => {
b.classList.remove('selected');
b.disabled = false; // ensure re-selectable
});

// Add 'selected' to the clicked one
btn.classList.add('selected');
// optional: if you want to record selection (but not lock), you can:
// selectedIndex = parseInt(btn.dataset.index, 10);
});

// Next handler (example of scoring using selected choice)
nextBtn.addEventListener('click', () => {

  // find selected (if any)
const selectedBtn = optionsEl.querySelector('button.selected');
if (!selectedBtn) {
alert('Select an answer first (or select any to proceed).');
return;
}
const chosen = parseInt(selectedBtn.dataset.index, 10);
const correct = questions[index].c;
if (chosen === correct) score++;
index++;
if (index < questions.length) {
renderQuestion();
} else {
// show result
document.getElementById('quiz-box').classList.add('hidden');
resultBox.classList.remove('hidden');
scoreEl.textContent = `${score} / ${questions.length}`;
}
});

// initial render
renderQuestion();
});