import { checkAuth } from "../backend/backend.js";

async function confirmAuthentication() {
  const data = await checkAuth();

  if (data.session == null) {
    window.location.href = "auth.html";
  }
}

confirmAuthentication();

// DOM Elements
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const textarea = document.querySelector(".message-input");
const sendButton = document.querySelector(".send-button");
const conversation = document.getElementById("conversation");
const welcomeContainer = document.querySelector(".welcome-container");
const newChatBtn = document.querySelector(".new-chat-btn");
const historyItems = document.querySelectorAll(
  ".history-item:not(:first-child):not(:nth-child(5))"
);

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
  }
});

// Auto-resize textarea
textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// Send message functionality
sendButton.addEventListener("click", sendMessage);
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Your Gemini API key - replace with your actual key
const geminiKey = "AIzaSyBpJcj1uJiw2xlVRqo545KzfXER2c2bBJs";

async function sendMessage() {
  const message = textarea.value.trim();
  if (message === "") return;

  // Hide welcome message and show conversation
  if (welcomeContainer.style.display !== "none") {
    welcomeContainer.style.display = "none";
    conversation.style.display = "block";
  }

  // Add user message to conversation
  addMessage(message, "user");

  // Clear input
  textarea.value = "";
  textarea.style.height = "auto";

  // Disable send button while processing
  sendButton.disabled = true;

  // Show typing indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "message assistant";
  typingIndicator.innerHTML = `
                <div class="message-avatar assistant-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            `;
  conversation.appendChild(typingIndicator);
  conversation.scrollTop = conversation.scrollHeight;

  try {
    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a startup pitch assistant.

Your task:
- If the user provides a **business idea**, generate:
  1. A **creative and catchy Startup Name**  
  2. A **short, memorable Tagline**  
  3. A **professional and clear 1–2 line Pitch** that explains the concept  
  4. A **Landing Page Hero Section** (2–3 sentences of engaging website copy that could go on the homepage, like a real startup site)

- Keep the language clear, concise, and inspiring — like real startup copy.
- Do not add extra explanations or text outside the required format.

Use this exact response format:

Name: [Startup Name]  

Tagline: [Tagline]  

Short Pitch: [1–2 line pitch here]  

Landing Page: [2–3 sentence landing page content here]

If the user input does **not** sound like a business idea (e.g., greetings, questions, random text), respond in a friendly, natural tone in one line and end with: "Please provide your business idea."

Business Idea: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Remove typing indicator
    conversation.removeChild(typingIndicator);

    // Extract AI response text
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Add AI response to conversation
    addMessage(aiResponse, "assistant");
  } catch (error) {
    // Remove typing indicator
    conversation.removeChild(typingIndicator);

    // Show error message
    addMessage(
      "I'm sorry, I encountered an error processing your request. Please check your API key and try again.",
      "assistant"
    );
    console.error("API Error:", error);
  } finally {
    // Re-enable send button
    sendButton.disabled = false;
  }
}

function addMessage(content, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  const avatarDiv = document.createElement("div");
  avatarDiv.className = `message-avatar ${
    sender === "user" ? "user-avatar" : "assistant-avatar"
  }`;
  avatarDiv.innerHTML =
    sender === "user" ? "U" : '<i class="fas fa-robot"></i>';

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  // Format response with markdown-like syntax
  const formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/# (.*?)(?=\n|$)/g, "<h4>$1</h4>")
    .replace(/- (.*?)(?=\n|$)/g, "<li>$1</li>")
    .replace(/(\d+\. .*?(?=\n|$))/g, "<li>$1</li>");

  // Check if content has list items
  if (formattedContent.includes("<li>")) {
    contentDiv.innerHTML = `<p>${formattedContent.replace(
      /(<li>.*?<\/li>)/g,
      "<ul>$1</ul>"
    )}</p>`;
  } else {
    contentDiv.innerHTML = `<p>${formattedContent}</p>`;
  }

  document.getElementById("download-pdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;

    // Create a new PDF document
    const doc = new jsPDF();

    // Get text from textarea
    const text = aiResponse;

    // Add text to PDF
    doc.text(text, 10, 10);

    // Save the PDF
    doc.save("text-file.pdf");
  });
  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  conversation.appendChild(messageDiv);

  // Scroll to bottom
  conversation.scrollTop = conversation.scrollHeight;
}

// History item click
historyItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all items
    historyItems.forEach((i) => i.classList.remove("active"));
    // Add active class to clicked item
    item.classList.add("active");

    // In a real app, this would load the conversation
    welcomeContainer.style.display = "none";
    conversation.style.display = "block";

    // Clear existing conversation
    conversation.innerHTML = "";

    // Add sample conversation based on history item
    const title = item.querySelector("span").textContent;
    addMessage(
      `I'd like to work on my ${title} pitch. Can you help me refine it?`,
      "user"
    );

    // Simulate AI response
    setTimeout(() => {
      addMessage(
        `Of course! Let's work on your ${title} pitch. What specific aspect would you like to focus on - the problem statement, solution, target market, or competitive advantage?`,
        "assistant"
      );
    }, 500);

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("open");
    }
  });
});

// New chat button
newChatBtn.addEventListener("click", () => {
  // Remove active class from all history items
  historyItems.forEach((i) => i.classList.remove("active"));
  // Show welcome message
  welcomeContainer.style.display = "block";
  conversation.style.display = "none";
  conversation.innerHTML = "";

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    sidebar.classList.remove("open");
  }
});
