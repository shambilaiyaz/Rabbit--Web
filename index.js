let lang = "en",
                userName = "",
                voiceOn = false,
                voices = [];
            let currentScore = 0,
                currentTotal = 5,
                currentMessage = "";
            let isValidated = false;
            let isLoggedIn = false;
            let canEnter = false;
            let learnAnswer = "";
            let passwordAttempts = 0;
 
            // Correct Answers: 1:b, 2:b, 3:c, 4:c, 5:a
            const QUIZ_ANSWERS = {
                q1: "b",
                q2: "b",
                q3: "c",
                q4: "c",
                q5: "a",
            };
 
            const T = {
                en: {
                    welcome: "Welcome,",
                    voiceOn: "Stop Reading",
                    voiceOff: "Read for me",
                    voiceStatusOn: "Reading for you",
                    voiceStatusOff: "Reading is off",
                    videoBtn: "Rabbit Videos",
                    quizBtn: "Take Quiz",
                    logout: "Logout",
                    vidTitle: "🎬 Rabbit Videos",
                    vidSub: "Choose a topic to watch",
                    v1: "🥕 What Rabbits Eat",
                    v1sub: "Diet, food & feeding habits",
                    v2: "🌾 Rabbit Farming",
                    v2sub: "Farming tips & techniques",
                    v3: "🍼 Feeding Baby Rabbits",
                    v3sub: "What to feed your baby bunny",
                    back: "Back to Home",
                    quizTitle: "❓ Rabbit Quiz",
                    quizSub: "Test your knowledge! (Medium Difficulty)",
                    dietTitle: "🥕 Diet & Behavior",
                    bioTitle: "🧬 Biology",
                    breedTitle: "🍼 Breeding",
                    habTitle: "🏠 Habitat",
                    distTitle: "🐇 Rabbit vs Hare",
                    diet: 'Rabbits are herbivores that eat grass, hay, leafy greens, and vegetables. They eat most actively at dawn and dusk. When very happy, they leap and twist in the air — this joyful move is called a "binky"!',
                    bio: "Rabbits have incredibly powerful hearing and nearly 360° vision. Their ears swivel independently to detect sounds from all directions. Uniquely, they cannot vomit, so they must always eat safe, clean food.",
                    breed: "A female rabbit is called a doe, a male is a buck, and baby rabbits are called kits. Rabbits can give birth to litters of 4–12 kits, making them among nature's most prolific parents.",
                    hab: "Wild rabbits live in forests, grasslands, meadows, and deserts. They dig underground tunnel networks called burrows or warrens, which protect them from predators and weather.",
                    dist: "Rabbits are smaller than hares and have shorter ears. Baby rabbits (kits) are born blind, deaf, and furless, while baby hares are born fully furred, with open eyes — ready to run!",
                    hint: "Hint: 3 letters, starting with <span>w 😎</span>",
                },
                bn: {
                    welcome: "স্বাগতম,",
                    voiceOn: "পড়া বন্ধ করুন",
                    voiceOff: "আমার জন্য পড়ুন",
                    voiceStatusOn: "পড়া হচ্ছে",
                    voiceStatusOff: "পড়া বন্ধ",
                    videoBtn: "খরগোশের ভিডিও",
                    quizBtn: "কুইজ দিন",
                    logout: "লগআউট",
                    vidTitle: "🎬 খরগোশের ভিডিও",
                    vidSub: "একটি বিষয় বেছে নিন",
                    v1: "🥕 খরগোশ কী খায়",
                    v1sub: "খাদ্য ও খাওয়ার অভ্যাস",
                    v2: "🌾 খরগোশ চাষ",
                    v2sub: "চাষের টিপস ও কৌশল",
                    v3: "🍼 বাচ্চা খরগোশকে কী খাওয়াবেন",
                    v3sub: "শিশু খরগোশের খাবার",
                    back: "হোমে ফিরুন",
                    quizTitle: "❓ খরগোশ কুইজ",
                    quizSub: "আপনার জ্ঞান পরীক্ষা করুন!",
                    dietTitle: "🥕 খাদ্য ও আচরণ",
                    bioTitle: "🧬 জীববিজ্ঞান",
                    breedTitle: "🍼 প্রজনন",
                    habTitle: "🏠 বাসস্থান",
                    distTitle: "🐇 খরগোশ বনাম হেয়ার",
                    diet: 'খরগোশ তৃণভোজী প্রাণী। এরা ঘাস, খড়, সবুজ পাতা ও সবজি খায়। সকাল ও সন্ধ্যায় সবচেয়ে বেশি সক্রিয় থাকে। আনন্দিত হলে লাফিয়ে বাতাসে মোচড় দেয় — এই মজার আন্দোলনকে "বিংকি" বলা হয়!',
                    bio: "খরগোশের শ্রবণশক্তি অসাধারণ এবং প্রায় ৩৬০° দৃষ্টিশক্তি রয়েছে। এদের কান স্বাধীনভাবে ঘুরতে পারে। বিশেষভাবে, এরা বমি করতে পারে না।",
                    breed: "মেয়ে খরগোশকে ডো, ছেলে খরগোশকে বাক এবং বাচ্চা খরগোশকে কিট বলা হয়। এক বারে ৪–১২টি বাচ্চা দিতে পারে।",
                    hab: "বন্য খরগোশ বন, ঘাসভূমি, মাঠ ও মরুভূমিতে বাস করে। মাটির নিচে সুড়ঙ্গ খুঁড়ে বাস করে।",
                    dist: "খরগোশ সাধারণ হেয়ারের চেয়ে ছোট এবং কান ছোট। বাচ্চা খরগোশ অন্ধ, বধির ও লোমহীন জন্মায়।",
                    hint: "ইঙ্গিত: ৩ অক্ষর, <span>w 😎</span> দিয়ে শুরু",
                },
            };
 
            /* ---- DARK MODE ---- */
            function toggleTheme() {
                const html = document.documentElement;
                const currentTheme = html.getAttribute("data-theme");
                const newTheme = currentTheme === "dark" ? "light" : "dark";
                html.setAttribute("data-theme", newTheme);
 
                const toggle = document.getElementById("themeToggle");
                toggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
 
                localStorage.setItem("theme", newTheme);
                toast(
                    newTheme === "dark"
                        ? "🌙 Dark mode enabled"
                        : "☀️ Light mode enabled",
                );
            }
 
            function loadTheme() {
                const savedTheme = localStorage.getItem("theme") || "light";
                document.documentElement.setAttribute("data-theme", savedTheme);
                const toggle = document.getElementById("themeToggle");
                if (toggle) {
                    toggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
                }
            }
 
            /* ---- PAGES ---- */
            function showPage(id) {
                [
                    "page-login",
                    "page-home",
                    "page-videos",
                    "page-quiz",
                    "page-ai",
                ].forEach((p) => {
                    document.getElementById(p).style.display =
                        p === id ? "block" : "none";
                });
                if (id === "page-quiz") resetQuiz();
            }
 
            /* ---- LANG ---- */
            function setLang(l, button) {
                lang = l;
                document
                    .querySelectorAll(".lang-btn")
                    .forEach((b) => b.classList.remove("active"));
                if (button && button.classList) {
                    button.classList.add("active");
                }
                applyTexts();
            }
 
            function applyTexts() {
                const t = T[lang];
                setText("t-voice-btnx", voiceOn ? t.voiceOn : t.voiceOff);
                setText("t-video-btn", t.videoBtn);
                setText("t-quiz-btn", t.quizBtn);
                setText("t-logout", t.logout);
                setText("t-vid-title", t.vidTitle);
                setText("t-vid-sub", t.vidSub);
                setText("t-v1", t.v1);
                setText("t-v1-sub", t.v1sub);
                setText("t-v2", t.v2);
                setText("t-v2-sub", t.v2sub);
                setText("t-v3", t.v3);
                setText("t-v3-sub", t.v3sub);
                setText("t-back", t.back);
                setText("t-quiz-title", t.quizTitle);
                setText("t-quiz-sub", t.quizSub);
                setText("t-diet-title", t.dietTitle);
                setText("t-diet", t.diet);
                setText("t-bio-title", t.bioTitle);
                setText("t-bio", t.bio);
                setText("t-breed-title", t.breedTitle);
                setText("t-breed", t.breed);
                setText("t-hab-title", t.habTitle);
                setText("t-hab", t.hab);
                setText("t-dist-title", t.distTitle);
                setText("t-dist", t.dist);
                document.getElementById("t-hint").innerHTML = t.hint;
                if (userName) setText("t-welcome", t.welcome + " ");
                setText(
                    "t-voice-status",
                    voiceOn ? t.voiceStatusOn : t.voiceStatusOff,
                );
                document.getElementById("voice-bar").className =
                    "voice-bar" + (voiceOn ? "" : " off");
            }
 
            function setText(id, val) {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            }
 
            /* ---- LOGIN SYSTEM ---- */
            function validateLogin() {
                const username = document
                    .getElementById("inp-username")
                    .value.trim();
                const email = document.getElementById("inp-email").value.trim();
                const errorMsg = document.getElementById("login-error");
                const successMsg = document.getElementById("login-success");
                const enterBtnContainer = document.getElementById(
                    "enter-btn-container",
                );
                const learnSection = document.getElementById("learn-section");
                const learnResponse = document.getElementById("learn-response");
                const learnOkButton = document.getElementById("learn-ok-button");
 
                // Hide previous messages and buttons
                errorMsg.style.display = "none";
                successMsg.style.display = "none";
                enterBtnContainer.style.display = "none";
                learnSection.style.display = "none";
                learnResponse.style.display = "none";
                learnOkButton.style.display = "none";
                canEnter = false;
                learnAnswer = "";
 
                if (!username || !email) {
                    errorMsg.textContent =
                        "Please give your Name and Email to continue.";
                    errorMsg.style.display = "block";
                    isValidated = false;
                    return;
                }
 
                if (!email.includes("@") || !email.includes(".")) {
                    errorMsg.textContent =
                        "Please give a valid email address.";
                    errorMsg.style.display = "block";
                    isValidated = false;
                    return;
                }
 
                isValidated = true;
                successMsg.textContent =
                    "✅ Name and Email accepted. Are you here to learn about Rabbit?";
                successMsg.style.display = "block";
                learnSection.style.display = "block";
                toast("✅ Details accepted. Choose Yes or No.");
            }
 
            function chooseLearnAnswer(answer) {
                const learnResponse = document.getElementById("learn-response");
                const learnResponseText = document.getElementById(
                    "learn-response-text",
                );
                const learnOkButton = document.getElementById("learn-ok-button");
                const enterBtnContainer = document.getElementById(
                    "enter-btn-container",
                );
 
                learnResponse.style.display = "block";
                enterBtnContainer.style.display = "none";
                canEnter = false;
                learnAnswer = answer;
 
                if (answer === "yes") {
                    learnResponseText.textContent =
                        "Great! Click OK to continue.";
                    learnOkButton.style.display = "inline-block";
                } else {
                    learnResponseText.textContent =
                        "No, no, no. Then go to another Rabbit website. My website is only for learners.";
                    learnOkButton.style.display = "none";
                }
            }
 
            function confirmLearnAnswer() {
                if (learnAnswer !== "yes") {
                    toast("❌ Please choose Yes to proceed.");
                    return;
                }
                const learnResponseText = document.getElementById(
                    "learn-response-text",
                );
                const learnOkButton = document.getElementById("learn-ok-button");
                const enterBtnContainer = document.getElementById(
                    "enter-btn-container",
                );
 
                learnResponseText.textContent = "OK! Click ENTER to proceed.";
                learnOkButton.style.display = "none";
                enterBtnContainer.style.display = "block";
                canEnter = true;
            }
 
            function performLogin() {
                if (!isValidated) {
                    toast("❌ Please validate your Name and Email first!");
                    return;
                }
                if (!canEnter) {
                    toast("❌ Please answer Yes and click OK to enter.");
                    return;
                }
 
                const username = document
                    .getElementById("inp-username")
                    .value.trim();
                const email = document.getElementById("inp-email").value.trim();
                const rememberMe =
                    document.getElementById("remember-me").checked;
 
                // Save to session (always remember you're logged in during this session)
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", username);
 
                // Save to localStorage if "Remember Me" is checked
                if (rememberMe) {
                    localStorage.setItem("rememberedUsername", username);
                    localStorage.setItem("rememberedEmail", email);
                    toast("🐰 You will be remembered!");
                } else {
                    // Clear remembered data if unchecked
                    localStorage.removeItem("rememberedUsername");
                    localStorage.removeItem("rememberedEmail");
                }
 
                // Set user as logged in
                isLoggedIn = true;
                userName = username;
                document.getElementById("display-name").textContent = userName;
 
                // Go to home page
                showPage("page-home");
                applyTexts();
                toast("🎉 Welcome to Rabbit World, " + username + "!");
            }
 
            function doLogout() {
                speechSynthesis.cancel();
                voiceOn = false;
                userName = "";
                isLoggedIn = false;
                isValidated = false;
 
                // Clear session
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
 
                // Clear input fields
                document.getElementById("inp-username").value = "";
                document.getElementById("inp-email").value = "";
                document.getElementById("remember-me").checked = false;
                document.getElementById("login-error").style.display = "none";
                document.getElementById("login-success").style.display = "none";
                document.getElementById("learn-section").style.display = "none";
                document.getElementById("learn-response").style.display = "none";
                document.getElementById("learn-ok-button").style.display = "none";
                canEnter = false;
                learnAnswer = "";
                document.getElementById("enter-btn-container").style.display =
                    "none";
 
                showPage("page-login");
                loadRememberedData();
                toast("🚪 Logged out!");
            }
 
            function loadRememberedData() {
                const rememberedUsername =
                    localStorage.getItem("rememberedUsername");
                const rememberedEmail = localStorage.getItem("rememberedEmail");
 
                if (rememberedUsername) {
                    document.getElementById("inp-username").value =
                        rememberedUsername;
                }
                if (rememberedEmail) {
                    document.getElementById("inp-email").value =
                        rememberedEmail;
                }
                // Password is NEVER remembered for security
            }
 
            function checkLoginStatus() {
                // Check if user is logged in (session-based)
                const loggedIn = localStorage.getItem("isLoggedIn");
                const savedUsername = localStorage.getItem("username");
 
                if (loggedIn === "true" && savedUsername) {
                    // User is still logged in
                    isLoggedIn = true;
                    userName = savedUsername;
                    document.getElementById("display-name").textContent =
                        userName;
                    showPage("page-home");
                    applyTexts();
                } else {
                    // Not logged in, show login page
                    showPage("page-login");
                    loadRememberedData();
                }
            }
 
            /* ---- VOICE ---- */
            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices();
            };
            function getBestVoice() {
                voices = speechSynthesis.getVoices();
                if (lang === "bn")
                    return (
                        voices.find((v) => v.lang.startsWith("bn")) || voices[0]
                    );
                return (
                    voices.find((v) =>
                        v.name.includes("Google UK English Male"),
                    ) ||
                    voices.find((v) => v.name.includes("Daniel")) ||
                    voices.find((v) => v.name.includes("Alex")) ||
                    voices.find((v) => v.name.includes("Fred")) ||
                    voices.find((v) => v.name.includes("Tom")) ||
                    voices.find((v) =>
                        /male|david|mark|james|oliver/i.test(v.name),
                    ) ||
                    voices.find(
                        (v) => v.name.includes("Google") || v.lang === "en-US",
                    ) ||
                    voices[0]
                );
            }
 
            function toggleVoice() {
                const t = T[lang];
                const voiceBar = document.getElementById("voice-bar");
                const voiceStatus = document.getElementById("t-voice-status");

                if (voiceOn) {
                    speechSynthesis.cancel();
                    voiceOn = false;
                    if (voiceStatus) voiceStatus.textContent = t.voiceStatusOff;
                    if (voiceBar) voiceBar.className = "voice-bar off";
                    applyTexts();
                    toast("🔇 Voice stopped");
                    return;
                }

                const fullText = [t.diet, t.bio, t.breed, t.hab, t.dist].join(
                    ". ",
                );
                const msg = new SpeechSynthesisUtterance(fullText);
                const v = getBestVoice();
                if (v) msg.voice = v;
                msg.rate = 0.7;
                msg.pitch = 1.8;
                msg.lang = lang === "bn" ? "bn-BD" : "en-US";
                msg.onstart = () => {
                    if (!voiceOn) {
                        voiceOn = true;
                        if (voiceStatus) voiceStatus.textContent = t.voiceStatusOn;
                        if (voiceBar) voiceBar.className = "voice-bar";
                        applyTexts();
                    }
                };
                msg.onend = () => {
                    voiceOn = false;
                    if (voiceStatus) voiceStatus.textContent = t.voiceStatusOff;
                    if (voiceBar) voiceBar.className = "voice-bar off";
                    applyTexts();
                };
                speechSynthesis.speak(msg);
                voiceOn = true;
                if (voiceStatus) voiceStatus.textContent = t.voiceStatusOn;
                if (voiceBar) voiceBar.className = "voice-bar";
                applyTexts();
                toast("🔊 Voice started!");
            }
 
            /* ---- QUIZ LOGIC ---- */
            function checkQuiz() {
                let score = 0;
                let total = 5;
 
                for (let i = 1; i <= total; i++) {
                    const selected = document.querySelector(
                        `input[name="q${i}"]:checked`,
                    );
                    if (selected && selected.value === QUIZ_ANSWERS[`q${i}`]) {
                        score++;
                    }
                }
 
                currentScore = score;
                currentTotal = total;
 
                document.getElementById("quiz-form").style.display = "none";
                document.getElementById("quiz-result").style.display = "block";
                document.getElementById("score-display").textContent =
                    `${score}/${total}`;
 
                let msg = "";
                if (score === 5) msg = "Perfect! You are a Rabbit Expert! 🏆🐰";
                else if (score >= 3)
                    msg = "Great job! You know your bunnies well! 🥕";
                else
                    msg =
                        "Keep learning! Rabbits are fascinating creatures. 📚";
 
                currentMessage = msg;
                document.getElementById("score-message").textContent = msg;
                toast(`Quiz Score: ${score}/${total}`);
            }
 
            function resetQuiz() {
                document.getElementById("quiz-form").style.display = "block";
                document.getElementById("quiz-result").style.display = "none";
                document
                    .querySelectorAll('input[type="radio"]')
                    .forEach((el) => (el.checked = false));
            }
 
            /* ---- SHARE FUNCTIONALITY ---- */
            function openShareModal() {
                document.getElementById("shareScore").textContent =
                    `${currentScore}/${currentTotal}`;
                document.getElementById("shareMessage").textContent =
                    currentMessage;
                document.getElementById("shareModal").classList.add("show");
                toast("📤 Share your results!");
            }
 
            function closeShareModal() {
                document.getElementById("shareModal").classList.remove("show");
            }
 
            function getShareText() {
                return `🐰 I scored ${currentScore}/${currentTotal} on the Rabbit Quiz! ${currentMessage}\n\nTry it yourself at Rabbit World! 🎯`;
            }
 
            function shareToTwitter() {
                const text = encodeURIComponent(getShareText());
                const url = `https://twitter.com/intent/tweet?text=${text}`;
                window.open(url, "_blank");
                toast("🐦 Opening Twitter...");
            }
 
            function shareToFacebook() {
                const text = encodeURIComponent(getShareText());
                const url = `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
                window.open(url, "_blank");
                toast("📘 Opening Facebook...");
            }
 
            function shareToWhatsApp() {
                const text = encodeURIComponent(getShareText());
                const url = `https://wa.me/?text=${text}`;
                window.open(url, "_blank");
                toast("💬 Opening WhatsApp...");
            }
 
            function copyShareText() {
                const text = getShareText();
                navigator.clipboard
                    .writeText(text)
                    .then(() => {
                        toast("📋 Copied to clipboard!");
                    })
                    .catch(() => {
                        const textarea = document.createElement("textarea");
                        textarea.value = text;
                        textarea.style.position = "fixed";
                        textarea.style.opacity = "0";
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textarea);
                        toast("📋 Copied to clipboard!");
                    });
            }
 
            /* ---- AI ---- */
            function askAI() {
                const input = document
                    .getElementById("ai-input")
                    .value.trim()
                    .toLowerCase();
                const responseEl = document.getElementById("ai-response");
 
                if (!input) {
                    responseEl.textContent =
                        "Please ask a question about rabbits or this website.";
                    return;
                }
 
                let response = "";
                if (input.includes("rabbit") || input.includes("খরগোশ")) {
                    response =
                        "Rabbits are amazing creatures! They are herbivores that eat grass, hay, and vegetables. They have powerful hearing and can see almost 360 degrees. Baby rabbits are called kits and are born blind. Rabbits can't vomit, so they need clean food. They live in burrows and are most active at dawn and dusk. When happy, they do 'binkies' - joyful leaps in the air!";
                } else if (
                    input.includes("website") ||
                    input.includes("site") ||
                    input.includes("tamim") ||
                    input.includes("ওয়েবসাইট")
                ) {
                    response =
                        "This website is Tamim Ashraf's Rabbit World! It's a fun educational site about rabbits with videos, quizzes, and information. Created by Tamim Ashraf to share knowledge about these adorable animals. Features include rabbit facts, videos, quizzes, and an AI assistant that knows about rabbits and the site.";
                } else {
                    response =
                        "Sorry, I only know about rabbits and this website. Please ask about Rabbit or this website.";
                }
 
                responseEl.textContent = response;
            }
 
            /* ---- TOAST ---- */
            let toastTimer;
            function toast(msg) {
                const el = document.getElementById("scToast");
                el.textContent = msg;
                el.classList.add("show");
                clearTimeout(toastTimer);
                toastTimer = setTimeout(
                    () => el.classList.remove("show"),
                    2000,
                );
            }
 
            /* ---- SHORTCUT PANEL ---- */
            function hideShortcuts() {
                document.getElementById("scPanel").classList.add("hidden");
                document.getElementById("scToggleBtn").style.display = "block";
            }
            function showShortcuts() {
                document.getElementById("scPanel").classList.remove("hidden");
                document.getElementById("scToggleBtn").style.display = "none";
            }
 
            /* ---- KEYBOARD SHORTCUTS ---- */
            document.addEventListener("keydown", function (e) {
                const tag = document.activeElement.tagName.toLowerCase();
                if (tag === "input" || tag === "textarea") {
                    return;
                }
 
                // Only allow shortcuts if logged in
                if (!isLoggedIn) return;
 
                switch (e.key.toLowerCase()) {
                    case "r":
                        if (
                            document.getElementById("page-home").style
                                .display === "block"
                        )
                            toggleVoice();
                        break;
                    case "v":
                        if (
                            document.getElementById("page-home").style
                                .display === "block"
                        ) {
                            showPage("page-videos");
                            toast("🎬 Videos page!");
                        }
                        break;
                    case "q":
                        if (
                            document.getElementById("page-home").style
                                .display === "block"
                        ) {
                            showPage("page-quiz");
                            toast("❓ Quiz Time!");
                        }
                        break;
                    case "a":
                        if (
                            document.getElementById("page-home").style
                                .display === "block"
                        ) {
                            showPage("page-ai");
                            toast("🤖 AI Assistant!");
                        }
                        break;
                    case "h":
                        if (
                            document.getElementById("page-home").style
                                .display !== "block"
                        ) {
                            showPage("page-home");
                            applyTexts();
                            toast("🏠 Home!");
                        }
                        break;
                    case "l":
                        doLogout();
                        break;
                    case "d":
                        toggleTheme();
                        break;
                }
            });
 
            // Close modal on outside click
            document
                .getElementById("shareModal")
                .addEventListener("click", function (e) {
                    if (e.target === this) {
                        closeShareModal();
                    }
                });
 
            /* ---- SECRET CODE MODAL ---- */
            function openSecretCodeModal() {
                document.getElementById("secret-code-modal").style.display =
                    "flex";
                document.getElementById("secret-code-input").value = "";
                document.getElementById("secret-error").style.display = "none";
                document.getElementById("secret-code-input").focus();
            }
 
            function closeSecretCodeModal() {
                document.getElementById("secret-code-modal").style.display =
                    "none";
                document.getElementById("secret-code-input").value = "";
                document.getElementById("secret-error").style.display = "none";
            }
 
            function validateSecretCode() {
                const secretCode = document
                    .getElementById("secret-code-input")
                    .value.trim();
                const errorEl = document.getElementById("secret-error");
 
                if (secretCode.toLowerCase() === "tamim123") {
                    // Automatically log in
                    closeSecretCodeModal();
 
                    // Set default values
                    const username = "Tamim Ashraf";
                    const email = "tamim@gmail.com";
 
                    // Set to session/localStorage
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", username);
 
                    isLoggedIn = true;
                    userName = username;
                    document.getElementById("display-name").textContent =
                        userName;
 
                    // Go to home page
                    showPage("page-home");
                    applyTexts();
                    toast("🎉 Welcome to Rabbit World, " + userName + "!");
                } else {
                    errorEl.textContent = "❌ Wrong secret code!";
                    errorEl.style.display = "block";
                    document.getElementById("secret-code-input").value = "";
                }
            }
 
            // Close modal on outside click
            document
                .getElementById("secret-code-modal")
                .addEventListener("click", function (e) {
                    if (e.target === this) {
                        closeSecretCodeModal();
                    }
                });
 
            // INIT
            loadTheme();
            checkLoginStatus();
            applyTexts();
