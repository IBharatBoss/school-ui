/**
 * ============================================================================
 * MANIFEST.JS - CORE CONFIGURATION & STATE MANAGEMENT
 * ============================================================================
 */

const AppManifest = {
    // 1. App Metadata
    metadata: {
        appName: "School Help Desk AI",
        version: "1.1.0-flexible-architecture",
        environment: "development"
    },

    // 2. Advanced System Configuration (Ready for Future Integrations)
    systemConfig: {
        // AI Integration Logic
        aiEngine: {
            activeProvider: "gemini",
            providers: {
                gemini: {
                    modelId: "gemini-2.5-flash",
                    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/",
                    apiKeys: ["YOUR_KEY_1", "YOUR_KEY_2"], // Array for multiple keys rotation
                    currentKeyIndex: 0
                },
                // Future ready for other AIs
                openai: {
                    modelId: "gpt-4o-mini",
                    endpoint: "https://api.openai.com/v1/chat/completions",
                    apiKeys: []
                }
            }
        },
        // Rate Limiting Logic
        rateLimits: {
            enabled: true,
            maxRequestsPerDay: 50,
            cooldownSeconds: 3 // Prevent spam
        },
        // Database Connection (Easy toggle when backend is ready)
        database: {
            enabled: false,
            provider: "supabase", // or "firebase"
            credentials: {
                url: "YOUR_DB_URL",
                anonKey: "YOUR_DB_KEY"
            }
        }
    },

    // 3. Global App State
    state: {
        isAutoMode: true,
        isWebSearchEnabled: false,
        isGenerating: false,
        currentTheme: "light-mode",
        activeChatId: null,
        chatMemory: [],
        uploadedImage: { base64: null, mimeType: null }
    },

    // 4. UI Text & Localization
    uiText: {
        typewriter: "HOW CAN I HELP YOU TODAY? ",
        charLimit: 2000,
        loadingStatus: "Processing your request...",
        offlineMsg: "Connection restored! 🚀 Ready to assist.",
    },

    // 5. Mock Data (Remains same for UI showcase)
    mockResponses: {
        "Admission Process": "Our admission process is completely online. You need to submit the birth certificate...",
        "Exam Schedules": "The mid-term examinations are scheduled to begin on October 15th.",
        "Fee & Payment": "Tuition fees are payable quarterly via our secure portal.",
        "Study Materials": "The updated syllabus is available in the student portal.",
        "Transport Routes": "We operate 25 bus routes with GPS tracking.",
        "Sports & Clubs": "We offer Cricket, Basketball, Swimming, and Robotics.",
        "Faculty Directory": "Schedule a PTM through the portal to meet our faculty.",
        "Announcements": "Latest: Tomorrow is a declared holiday.",
        "Canteen Menu": "Canteen operates 8 AM - 3 PM with nutritious meals.",
        "General Help": "I am here to help! Type your question below."
    }
};

Object.freeze(AppManifest.uiText);