webar-project/
│
├── frontend/                 # Vite + React (WebAR lives here)
│   ├── public/               # Static assets (served as-is)
│   │   ├── models/           # 3D models (.glb, .gltf)
│   │   ├── markers/          # Marker images (for marker-based AR)
│   │   ├── images/           # UI images
│   │   └── qr/               # Generated QR codes
│   │
│   ├── src/
│   │   ├── ar/               # AR-specific logic (very important)
│   │   │   ├── scenes/       # AR scenes
│   │   │   ├── components/   # AR objects / helpers
│   │   │   └── loaders/      # Model / texture loaders
│   │   │
│   │   ├── pages/            # Page-level components (ARPage, Home)
│   │   ├── services/         # API calls to backend
│   │   ├── utils/            # Helpers (device check, permissions)
│   │   ├── styles/           # CSS / global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── core/             # Config, settings
│   │   ├── models/           # Data models
│   │   ├── services/         # Business logic
│   │   └── main.py           # FastAPI entry point
│   │
│   ├── requirements.txt
│   └── README.md
│
├── docs/                     # Learning & theory (Phase 0)
├── roadmap.md
└── README.md
