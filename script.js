let isUserStopped = false;
let isRecognitionRunning = false;
let userInteracted = false;
const transcriptOutput = document.getElementById("transcriptOutput");
const heardText = document.getElementById("heardText");

function logToUI(message, icon = "") {
  const timestamp = new Date().toLocaleTimeString();
  heardText.innerHTML += `<br>${icon} ${message}`;
}

localStorage.clear();
sessionStorage.clear();

window.onload = () => {
  document.body.addEventListener("click", () => {}, {
    once: true,
    passive: true
  });

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = true;

  const voiceBtn = document.getElementById("voiceBtn");

  const qaList = [
    {
      questionKeywords: [
        "what is stem racing all about",
        "one",
        "Question one",
        "Ask question number one",
        "First question please",
        "Question one please",
        "First question",
        "Can I ask question one",
        "1",
        "what's stem racing",
        "stem racing",
        "what is stem racing",
        "what does stem racing mean",
        "what is the meaning of stem racing",
        "can you explain stem racing",
        "stem racing meaning",
        "define stem racing",
        "how does stem racing work",
        "what is involved in stem racing",
        "what is stem racing program",
        "what is stem racing project",
        "what do you do in stem racing",
        "stem racing explanation",
        "tell me about stem racing",
        "learn about stem racing",
        "intro to stem racing",
        "stem racing for beginners",
        "what is stem racing about",
        "stem racing definition",
        "what is the goal of stem racing",
        "how to get started in stem racing",
        "what’s stem racing about"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/Q1-modified.mp3"
    },
    {
      questionKeywords: [
        "two",
        "question two",
        "ask question number two",
        "second question please",
        "question two please",
        "second question",
        "can I ask question two",
        "2",
        "who is velora racing",
        "who is vellora racing",
        "who is valora racing",
        "who is bilora racing",
        "who is velore racing",
        "who is billora racing",
        "who is vlora racing",
        "who is velura racing",
        "who is velora recent",
        "who is the elaboration",
        "who is vilora racing",
        "who is valura racing",
        "who is vylora racing",
        "who is velorra racing",
        "who is velor racing",
        "who is veloura racing",
        "who is veloorah racing",
        "who is felora racing",
        "who is pelora racing",
        "who is delora racing",
        "who is belora racing",
        "who is melora racing",
        "who is celora racing",
        "who is elora racing",
        "who is alora racing",
        "who is walora racing",
        "who is the lora racing",
        "who is lora racing",
        "who is the laura racing",
        "who is laura racing",
        "who is viloura racing",
        "who is velorra raisin",
        "who is velora raisin",
        "who is valorah racing",
        "who is valor racing",
        "racing"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/Q2.mp3"
    },
    {
      questionKeywords: [
        "three",
        "question three",
        "ask question number three",
        "third question please",
        "question three please",
        "third question",
        "can I ask question three",
        "3",
        "what makes velora’s car special",
        "what makes veloras car special",
        "what makes velora car special",
        "what makes velora’s car so special",
        "what makes the car special",
        "what makes velora's car special",
        "what makes veloras car so special",
        "what is special about velora’s car",
        "car",
        "why is velora’s car special",
        "why is velora car so special",
        "what makes velora car so unique",
        "why is velora’s car different",
        "what makes velora's car stand out",
        "what’s so special about velora's car",
        "what is velora’s special car",
        "velora’s car special features",
        "velora car unique traits",
        "what’s unique about velora’s car",
        "how is velora’s car different",
        "velora’s car features",
        "special things about velora’s car",
        "velora vehicle unique",
        "what makes valora's car special",
        "what makes velore's car special",
        "what makes vlora's car special",
        "what is so special about veloras car",
        "velora car what's special"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/Q3.mp3"
    },
    {
      questionKeywords: [
        "four",
        "question four",
        "ask question number four",
        "fourth question please",
        "question four please",
        "fourth question",
        "can I ask question four",
        "4",
        "what are the highlights of velora’s pit display",
        "what are the highlights of veloras pit display",
        "what are the highlights of velora pit display",
        "what are the highlights of the pit display",
        "what are velora’s pit display highlights",
        "what are veloras pit display highlights",
        "what is special about velora’s pit display",
        "what's special about velora's pit display",
        "what makes velora's pit display special",
        "highlights of velora’s pit display",
        "highlights of velora pit display",
        "velora pit display highlights",
        "velora’s pit display highlights",
        "what’s in velora’s pit display",
        "what is in velora’s pit display",
        "what are the main features of velora’s pit display",
        "what stands out in velora’s pit display",
        "velora pit setup highlights",
        "why is velora’s pit display special",
        "what's shown in velora’s pit display",
        "velora’s pit area highlights",
        "velora garage display highlights",
        "what does velora’s pit look like",
        "what can you see in velora’s pit display",
        "the best parts of velora’s pit display",
        "special things in velora’s pit display",
        "display"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/Q4.mp3"
    },
    {
      questionKeywords: [
        "five",
        "question five",
        "ask question number five",
        "fifth question please",
        "question five please",
        "fifth question",
        "can I ask question five",
        "5",
        "what’s your advice for future stem competitors",
        "what is your advice for future stem competitors",
        "what's your advice for future stem competitors",
        "advice for future stem competitors",
        "what advice do you have for future stem competitors",
        "what advice would you give to future stem competitors",
        "any advice for future stem competitors",
        "tips for future stem competitors",
        "your advice to future stem students",
        "what’s your advice to upcoming stem competitors",
        "what advice for stem competition participants",
        "what’s your tip for future stem competitors",
        "do you have advice for stem competitors",
        "how to succeed in stem competitions",
        "stem competition tips for beginners",
        "guidance for future stem competitors",
        "recommendations for stem students",
        "what would you tell future stem competitors",
        "suggestions for future stem challengers",
        "how to prepare for stem competitions",
        "stem advice for new competitors",
        "words of wisdom for stem competitors",
        "mentor advice for future stem participants"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/Q5.mp3"
    },
    {
      questionKeywords: [
        "six",
        "question six",
        "ask question number six",
        "sixth question please",
        "question six please",
        "sixth question",
        "can I ask question six",
        "6",
        "who is behind siraj",
        "who created siraj",
        "who made siraj",
        "who developed siraj",
        "who built siraj",
        "who designed siraj",
        "who are the creators of siraj",
        "tell me about the team behind siraj",
        "who is the team behind siraj",
        "who invented siraj",
        "who started siraj",
        "about siraj team",
        "siraj creators",
        "siraj developers",
        "who is siraj",
        "siraj project team",
        "information about siraj creators",
        "who is responsible for siraj",
        "siraj development team",
        "siraj background",
        "siraj origin",
        "siraj team info",
        "who built you",
        "who created you",
        "who developed you",
        "who is behind you",
        "who programmed you",
        "who made you",
        "who designed you",
        "who is your creator",
        "who is your developer",
        "who is your maker",
        "who built siraj",
        "who created siraj",
        "who developed siraj ai",
        "who made siraj",
        "who is behind siraj ai",
        "who is the team behind siraj",
        "who coded you",
        "who engineered you",
        "who is responsible for your creation",
        "who designed siraj",
        "tell me about your creators",
        "who invented you",
        "what is your origin",
        "who assembled you",
        "who helped build you",
        "who started siraj project",
        "who worked on siraj ai",
        "who is the developer of siraj",
        "who is the creator of siraj ai",
        "who is siraj ai",
        "Interested about who is behind siraj aI"
      ],
      audioSrc:
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/about-us.mp3"
    }
  ];

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }

  function restartRecognition() {
    try {
      if (recognition) {
        recognition.stop();
        recognition.start();
        logToUI("🔄 Recognition restarted");
        console.log("🔄 Recognition restarted");
      }
    } catch (error) {
      logToUI("❌ Failed to restart recognition:", error);
      console.error("❌ Failed to restart recognition:", error);
    }
  }
  recognition.onresult = (event) => {
    const text = event.results[event.resultIndex][0].transcript.toLowerCase();
    document.getElementById("heardText").textContent = text;
    console.log("🎧 Heard:", text);
    logToUI("🎧 Heard: " + text);

    let matchedQA = null;
    for (const qa of qaList) {
      if (qa.questionKeywords.some((kw) => text.includes(kw))) {
        matchedQA = qa;
        break;
      }
    }

    if (matchedQA) {
      const audio = new Audio(matchedQA.audioSrc);

      if (!userInteracted) {
        logToUI("⛔️ iOS won’t allow audio before user interaction.");
        console.warn("⛔️ iOS won’t allow audio before user interaction.");
        return;
      }

      // أوقف التعرف مؤقتًا عشان ما يتعارض مع الصوت
      recognition.stop();

      // لما يخلص الصوت، يرجع يبدأ الاستماع
      audio.onended = () => {
        if (!isUserStopped) {
          setTimeout(() => {
            recognition.start();
            logToUI("✅ بدأ التعرف الصوتي");
          }, 300);
        }
      };

      audio.play().catch((err) => {
        logToUI("❌ Audio play failed: " + err.message);
        console.error("❌ Audio play failed:", err);
        // لو فشل الصوت حاول تعيد التشغيل
        if (!isUserStopped) {
          recognition.start();
          logToUI("✅ بدأ التعرف الصوتي");
        }
      });
    } else {
      const notFoundAudio = new Audio(
        "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/repeat_request.mp3"
      );

      if (!userInteracted) {
        logToUI("⛔️ iOS won’t allow audio before user interaction.");
        console.warn("⛔️ iOS won’t allow audio before user interaction.");
        return;
      }

      recognition.stop();

      notFoundAudio.onended = () => {
        if (!isUserStopped) {
          setTimeout(() => {
            recognition.start();
            logToUI("✅ بدأ التعرف الصوتي");
          }, 300);
        }
      };

      notFoundAudio.play().catch((err) => {
        logToUI("❌ Not found audio failed: " + err.message);
        console.error("❌ Not found audio failed:", err);
        if (!isUserStopped) {
          recognition.start();
          logToUI("✅ بدأ التعرف الصوتي");
        }
      });
    }
  };

  recognition.onerror = (event) => {
    logToUI("❌ Error: " + event.error);
    console.error("❌ Error:", event.error);
    document.getElementById("heardText").textContent =
      "⚠️ Error: " + event.error;
    voiceBtn.classList.add("error");

    const errorAudio = new Audio(
      "https://raw.githubusercontent.com/shahadAlmohammadi/3d-voice-assistant/main/assets/repeat_request.mp3"
    );
    if (!userInteracted) {
      logToUI("⛔️ iOS won’t allow audio before user interaction.");
      console.warn("⛔️ iOS won’t allow audio before user interaction.");
      return;
    }
    errorAudio.play().catch((err) => {
      logToUI("❌ Could not play fallback audio: " + err.message);
      console.error("❌ Could not play fallback audio:", err);
      restartRecognition();
    });
  };

  recognition.onend = () => {
    console.log("🔁 Recognition ended");
    heardText.textContent = "⏹️ Recognition ended";
    if (isUserStopped) {
      logToUI("🛑 User stopped listening. Not restarting.");
      console.log("🛑 User stopped listening. Not restarting.");
      return;
    }

    if (isRecognitionRunning) {
      logToUI("🔄 Restarted via onend");
      console.log("🔄 Restarted via onend");
      setTimeout(() => {
        try {
          recognition.start();
          logToUI("✅ بدأ التعرف الصوتي");
          console.log("Start recognition");
        } catch (e) {
          logToUI("❌ Could not restart: " + e.message);
          console.error("❌ Could not restart:", e);
        }
      }, 200);
    }
  };

  voiceBtn.addEventListener("click", () => {
    userInteracted = true; // ⬅️ نعلّم أن المستخدم تفاعل
    if (!isRecognitionRunning) {
      // حالة التشغيل
      voiceBtn.textContent = "🎧 Listening...";
      voiceBtn.classList.add("listening");
      isUserStopped = false;
      isRecognitionRunning = true;

      try {
        recognition.start();
        logToUI("✅ بدأ التعرف الصوتي");
        console.log("✅ بدأ التعرف الصوتي");
      } catch (error) {
        logToUI("❌ فشل التشغيل: " + error.message);
        console.error("❌ فشل التشغيل:", error);
        voiceBtn.textContent = "🎤 Talk to me";
        voiceBtn.classList.remove("listening");
        isRecognitionRunning = false;
      }
    } else {
      // حالة الإيقاف
      voiceBtn.textContent = "🎤 Talk to me";
      voiceBtn.classList.remove("listening");
      isUserStopped = true;
      isRecognitionRunning = false;

      recognition.stop();
      recognition.abort();
      logToUI("🛑 توقف التعرف الصوتي");
      console.log("🛑 توقف التعرف الصوتي");
    }
  });
};
