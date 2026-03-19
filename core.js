/**
 * ============================================================================
 * CORE.JS - UI CONTROLLER & EVENT MANAGER
 * ============================================================================
 * Yeh script DOM interactions, event listeners, smooth transitions, aur 
 * showcase logic ko handle karti hai. No backend calls, strictly UI/UX logic.
 */

class UIController {
    constructor() {
        this.manifest = AppManifest;
        this.typewriterInterval = null;
        this.initDOM();
        this.bindEvents();
        this.startTypewriter();
    }

    // 1. Initialize DOM Elements
    initDOM() {
        this.elements = {
            offlineBanner: document.getElementById("offline-banner"),
            toastContainer: document.getElementById("toast-container"),
            heroSection: document.getElementById("hero-section"),
            messagesContainer: document.getElementById("messages-container"),
            loadingIndicator: document.getElementById("loading-indicator"),
            chatCanvas: document.getElementById("chat-canvas"),
            searchBarTrigger: document.getElementById("search-bar-trigger"),
            inputPopupBackdrop: document.getElementById("input-popup-backdrop"),
            mainTextarea: document.getElementById("main-textarea"),
            charCounter: document.getElementById("char-counter"),
            sendBtn: document.getElementById("send-btn"),
            attachBtn: document.getElementById("popup-attach-btn"),
            fileInput: document.getElementById("image-upload-input"),
            previewContainer: document.getElementById("image-preview-container"),
            previewImg: document.getElementById("image-preview"),
            removeImgBtn: document.getElementById("remove-image-btn"),
            sidebar: document.getElementById("sidebar"),
            sidebarBackdrop: document.getElementById("sidebar-backdrop"),
            homeLogo: document.getElementById("home-logo"),
            themeToggle: document.getElementById("theme-toggle"),
            historyToggle: document.getElementById("history-toggle"),
            closeSidebar: document.getElementById("close-sidebar"),
            closePopupBtn: document.getElementById("close-popup-btn"),
            aiChips: document.querySelectorAll(".ai-chip")
        };
    }

    // 2. Bind All Event Listeners
    bindEvents() {
        // Theme Toggle
        this.elements.themeToggle.addEventListener("click", () => this.toggleTheme());

        // Sidebar Navigation
        this.elements.historyToggle.addEventListener("click", () => this.toggleSidebar(true));
        this.elements.closeSidebar.addEventListener("click", () => this.toggleSidebar(false));
        this.elements.sidebarBackdrop.addEventListener("click", () => this.toggleSidebar(false));

        // Home Navigation
        this.elements.homeLogo.addEventListener("click", () => this.resetToHome());

        // Input Popup Logic
        this.elements.searchBarTrigger.addEventListener("click", () => this.toggleInputPopup(true));
        this.elements.closePopupBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleInputPopup(false);
        });
        this.elements.inputPopupBackdrop.addEventListener("click", (e) => {
            if (e.target === this.elements.inputPopupBackdrop) this.toggleInputPopup(false);
        });

        // Textarea Character Counter
        this.elements.mainTextarea.addEventListener("input", () => this.updateCharCount());

        // Image Attachment UI Logic
        this.elements.attachBtn.addEventListener("click", () => this.elements.fileInput.click());
        this.elements.fileInput.addEventListener("change", (e) => this.handleImageUpload(e));
        this.elements.removeImgBtn.addEventListener("click", () => this.removeImage());

        // Submit Logic
        this.elements.sendBtn.addEventListener("click", () => this.handleMessageSubmit());
        this.elements.mainTextarea.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this.elements.sendBtn.click();
            }
        });

        // AI Chips Logic (Showcase Mode)
        this.elements.aiChips.forEach(chip => {
            chip.addEventListener("click", (e) => this.handleChipClick(e));
        });

        // Network Status
        window.addEventListener("offline", () => this.elements.offlineBanner.classList.remove("hidden"));
        window.addEventListener("online", () => {
            this.elements.offlineBanner.classList.add("hidden");
            this.showToast(this.manifest.uiText.offlineMsg, "wifi");
        });
    }

    // 3. UI Utility Functions
    showToast(message, icon = "info") {
        const toast = document.createElement("div");
        toast.className = "premium-toast";
        // Sharp edges forced via inline style just in case
        toast.style.borderRadius = "0px"; 
        toast.innerHTML = `<i data-lucide="${icon}" size="18"></i> <span>${message}</span>`;
        this.elements.toastContainer.appendChild(toast);
        lucide.createIcons();
        
        if (navigator.vibrate) navigator.vibrate(50);
        
        setTimeout(() => {
            toast.classList.add("toast-fade-out");
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    startTypewriter() {
        const text = this.manifest.uiText.typewriter;
        let i = 0;
        const twText = document.getElementById("typewriter-text");
        if (this.typewriterInterval) clearInterval(this.typewriterInterval);
        
        this.typewriterInterval = setInterval(() => {
            if (twText && text) {
                twText.innerText = text.substring(0, i + 1);
                i = (i + 1) % text.length;
            }
        }, 150);
    }

    toggleTheme() {
        document.body.classList.toggle("dark-mode");
        this.manifest.state.currentTheme = document.body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
    }

    toggleSidebar(show) {
        if (show) {
            this.elements.sidebar.classList.remove("hidden");
            this.elements.sidebarBackdrop.classList.remove("hidden");
            setTimeout(() => this.elements.sidebar.classList.add("active"), 10);
        } else {
            this.elements.sidebar.classList.remove("active");
            setTimeout(() => {
                this.elements.sidebar.classList.add("hidden");
                this.elements.sidebarBackdrop.classList.add("hidden");
            }, 400);
        }
    }

    toggleInputPopup(show) {
        if (show) {
            this.elements.inputPopupBackdrop.classList.remove("hidden");
            setTimeout(() => this.elements.mainTextarea.focus(), 300);
        } else {
            this.elements.inputPopupBackdrop.classList.add("hidden");
        }
    }

    resetToHome() {
        this.elements.messagesContainer.classList.add("hidden");
        this.elements.messagesContainer.innerHTML = "";
        this.elements.heroSection.classList.remove("hidden");
        this.manifest.state.chatMemory = [];
    }

    // 4. Input & Upload Handlers
    updateCharCount() {
        const len = this.elements.mainTextarea.value.length;
        this.elements.charCounter.innerText = `${len}/${this.manifest.uiText.charLimit}`;
        this.elements.charCounter.classList.toggle("limit-reached", len >= this.manifest.uiText.charLimit);
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) return this.showToast("Image is too large! (Max 5MB)", "alert-circle");
            
            const reader = new FileReader();
            reader.onload = (re) => {
                this.manifest.state.uploadedImage.base64 = re.target.result;
                this.manifest.state.uploadedImage.mimeType = file.type;
                this.elements.previewImg.src = re.target.result;
                this.elements.previewContainer.classList.remove("hidden");
                this.elements.attachBtn.classList.add("active-attachment");
                this.showToast("Image attached successfully", "image");
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage() {
        this.manifest.state.uploadedImage = { base64: null, mimeType: null };
        this.elements.fileInput.value = "";
        this.elements.previewContainer.classList.add("hidden");
        this.elements.attachBtn.classList.remove("active-attachment");
    }

    // 5. Showcase Simulation Logic (No Backend)
    handleChipClick(e) {
        // Extract exact text from the chip, removing any icon text
        const chipText = e.currentTarget.innerText.trim();
        this.processShowcaseMessage(chipText, true);
    }

    handleMessageSubmit() {
        const text = this.elements.mainTextarea.value.trim();
        const hasImage = this.manifest.state.uploadedImage.base64 !== null;
        
        if (text || hasImage) {
            this.processShowcaseMessage(text || "Please review this document/image.", false);
            this.elements.mainTextarea.value = "";
            this.updateCharCount();
            this.removeImage();
            this.toggleInputPopup(false);
        }
    }

    processShowcaseMessage(userText, isFromChip) {
        if (this.manifest.state.isGenerating) return;
        this.manifest.state.isGenerating = true;

        // UI Transitions
        this.elements.heroSection.classList.add("hidden");
        this.elements.messagesContainer.classList.remove("hidden");

        // 1. Render User Message
        const userDiv = document.createElement("div");
        userDiv.className = "user-msg-block";
        
        // Check if there was an uploaded image
        const imgState = this.manifest.state.uploadedImage.base64;
        const imageHtml = imgState ? `<img src="${imgState}" style="max-width:200px; border-radius:0px; margin-bottom:10px; display:block;">` : "";
        
        userDiv.innerHTML = `${imageHtml}<div class="user-text">${userText}</div>`;
        this.elements.messagesContainer.appendChild(userDiv);
        
        this.elements.chatCanvas.scrollTop = this.elements.chatCanvas.scrollHeight;
        this.elements.loadingIndicator.classList.remove("hidden");

        // 2. Simulate Network/AI Delay
        setTimeout(() => {
            this.elements.loadingIndicator.classList.add("hidden");
            
            // Determine mock response based on chip or general input
            let mockAiText = "";
            if (isFromChip && this.manifest.mockResponses[userText]) {
                mockAiText = this.manifest.mockResponses[userText];
            } else {
                mockAiText = "This is a frontend showcase. In the final product, your query regarding **'" + userText.substring(0, 30) + "...'** will be processed by the AI backend connected to the school's database.";
            }

            // 3. Render AI Response
            const aiDiv = document.createElement("div");
            aiDiv.className = "ai-msg-block";
            
            // Adding a sharp-edged action bar to maintain the Apple-style aesthetic
            const actionBarHtml = `
                <div class="action-bar" style="border-radius:0;">
                    <button title="Copy"><i data-lucide="copy"></i> Copy</button>
                    <button title="Share"><i data-lucide="share-2"></i> Share</button>
                </div>
            `;

            aiDiv.innerHTML = `<div class="ai-text"><p>${mockAiText}</p></div>${actionBarHtml}`;
            this.elements.messagesContainer.appendChild(aiDiv);
            lucide.createIcons();
            
            this.elements.chatCanvas.scrollTop = this.elements.chatCanvas.scrollHeight;
            this.manifest.state.isGenerating = false;
            
        }, 1500); // 1.5 second simulated delay
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Instantiate the UI Controller once the DOM is ready
    window.AppUIController = new UIController();
});