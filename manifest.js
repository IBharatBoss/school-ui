/**
 * ============================================================================
 * MANIFEST.JS - CORE CONFIGURATION & STATE MANAGEMENT
 * ============================================================================
 * Yeh file app ke global variables, configuration constants, aur mock data
 * ko store karti hai. Future mein AI APIs aur Database endpoints yahan aayenge.
 */

const AppManifest = {
    // 1. App Metadata
    metadata: {
        appName: "School Help Desk AI",
        version: "1.0.0-ui-showcase",
        author: "Independent Developer",
        environment: "development",
        buildDate: new Date().toISOString()
    },

    // 2. Future API Configurations (Placeholder for future use)
    apiConfig: {
        geminiEndpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent",
        apiKey: null, // To be added later
        databaseUrl: null // To be connected later
    },

    // 3. Global App State
    state: {
        isAutoMode: true,
        isWebSearchEnabled: false,
        isGenerating: false,
        currentTheme: "light-mode",
        activeChatId: null,
        chatMemory: [],
        uploadedImage: {
            base64: null,
            mimeType: null
        }
    },

    // 4. UI Text & Localization
    uiText: {
        typewriter: "HOW CAN I HELP YOU TODAY? ",
        charLimit: 2000,
        loadingStatus: "Processing your request...",
        offlineMsg: "Connection restored! 🚀 Ready to assist.",
        networkError: "Network issue detected. Please check your connection."
    },

    // 5. Mock Data for UI Showcase (Since Backend is not connected yet)
    mockResponses: {
        "Admission Process & Criteria": "Our admission process is completely online. You need to submit the birth certificate, previous academic records, and proof of residence. The minimum age for Grade 1 is 6 years as of March 31st.",
        "Exam Schedules & Results": "The mid-term examinations are scheduled to begin on October 15th. Detailed datesheets will be published on the notice board next week.",
        "Fee Structure & Online Payment": "Tuition fees are payable quarterly. You can use our secure online payment portal via Credit Card, UPI, or Net Banking. The last date for this quarter is the 10th.",
        "Syllabus & Study Materials": "The updated syllabus for the current academic year is available in the student portal. Let me know which grade you need it for!",
        "Transport & Bus Routes": "We operate 25 bus routes across the city. All buses are equipped with GPS tracking and female attendants. Please share your sector/area for specific route details.",
        "Sports & Extracurriculars": "We offer Cricket, Basketball, Swimming, and Football. We also have active clubs for Robotics, Drama, and Debating. Registrations open next month.",
        "Faculty & Staff Directory": "Our faculty comprises highly qualified professionals. You can schedule a parent-teacher meeting through the portal by selecting the respective subject teacher.",
        "Notice Board & Announcements": "Latest Announcement: Tomorrow is a declared holiday on account of the state festival. Normal classes will resume the day after.",
        "Canteen Menu & Timings": "The canteen operates from 8:00 AM to 3:00 PM. We focus on nutritious, balanced meals. The monthly meal plan subscription is available at the counter.",
        "General Help & Support": "I am here to help! Whether you need technical support with the school portal or general administrative queries, just type your question below."
    }
};

// Freeze the configuration so it cannot be accidentally modified
Object.freeze(AppManifest.uiText);
Object.freeze(AppManifest.mockResponses);
console.log(`[Manifest Loaded] ${AppManifest.metadata.appName} v${AppManifest.metadata.version}`);