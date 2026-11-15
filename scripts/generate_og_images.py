import os
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "public", "assets", "og")
os.makedirs(OUT_DIR, exist_ok=True)

# Color constants
BG_COLOR = (7, 7, 10)           # #07070a obsidian dark
BORDER_COLOR = (99, 102, 241, 60) # Indigo border
ACCENT_COLOR = (99, 102, 241)     # Indigo #6366f1
EMERALD_COLOR = (52, 211, 153)    # Emerald #34d399
TEXT_WHITE = (248, 250, 252)     # Slate-50
TEXT_MUTED = (148, 163, 184)     # Slate-400
TEXT_SUBTLE = (100, 116, 139)    # Slate-500

cards = [
    {
        "filename": "og-about.png",
        "badge": "ACADEMIC & RESEARCH PROFILE",
        "title": "About Soham Vyas",
        "subtitle": "Data Science & Artificial Intelligence at IIT Jodhpur",
        "footer": "Symbolic Computing · Upstream SymPy Contributor · Systems Engineer"
    },
    {
        "filename": "og-projects.png",
        "badge": "FEATURED ENGINEERING PROJECTS",
        "title": "Production AI & Systems",
        "subtitle": "Atomic Redis Lua Limiters, Entropy Engines & Speech Models",
        "footer": "Test-Backed · Zero Fluff · Open Source on GitHub"
    },
    {
        "filename": "og-blog.png",
        "badge": "TECHNICAL PUBLICATIONS",
        "title": "Engineering Deep-Dives",
        "subtitle": "Computer Algebra, Distributed Concurrency & Cryptography",
        "footer": "Authentic Math, Source Code & Performance Benchmarks"
    },
    {
        "filename": "og-sympy.png",
        "badge": "SYMPY UPSTREAM MERGE · PR #31011",
        "title": "Kronecker Trace Optimization",
        "subtitle": "Eliminating O(n³) Matrix Expansion in Computer Algebra",
        "footer": "tr(A ⊗ B) = tr(A) · tr(B) · O(1) Symbolic Rewrite in SymPy"
    },
    {
        "filename": "og-rate-limiter.png",
        "badge": "DISTRIBUTED SYSTEMS ARCHITECTURE",
        "title": "AI Rate Limiter Shield",
        "subtitle": "Atomic Redis Lua Scripts & Isolation Forest ML Anomaly Detection",
        "footer": "Race-Condition Free · Sliding Window · Sub-Millisecond Latency"
    },
    {
        "filename": "og-entropy.png",
        "badge": "CRYPTOGRAPHIC INFORMATION THEORY",
        "title": "Shannon Entropy Engine",
        "subtitle": "Quantifying Cryptographic Keyspace & NIST SP 800-63B Defense",
        "footer": "Claude Shannon (1948) · 100 GH/s GPU Exhaustion Modeling"
    },
    {
        "filename": "og-opensource.png",
        "badge": "OPEN SOURCE & GSOC 2027",
        "title": "SymPy Contributions",
        "subtitle": "Officially Merged Core Pull Requests: PR #31010 & PR #31011",
        "footer": "Symbolic Matrices · Linear Algebra · Tensor Simplifications"
    },
    {
        "filename": "og-labs.png",
        "badge": "INTERACTIVE ENGINEERING SIMULATORS",
        "title": "In-Browser Systems Labs",
        "subtitle": "Real-Time Shannon Entropy Calculator & Sliding-Window Sandbox",
        "footer": "Live Client-Side Simulation · 60 FPS Canvas Architecture"
    },
    {
        "filename": "og-contact.png",
        "badge": "DIRECT CHANNELS",
        "title": "Contact & Collaboration",
        "subtitle": "Open for GSoC '27 Mentorship, AI Roles & Research Collabs",
        "footer": "hello@soham.lol · GitHub: @vyassoham · LinkedIn: in/vyassoham"
    },
    {
        "filename": "og-crypto-tracker.png",
        "badge": "FINANCIAL SYSTEMS & TIME SERIES",
        "title": "Soham Crypto Tracker",
        "subtitle": "Real-Time WebSocket Streams & Technical Market Analytics",
        "footer": "High-Throughput Ingestion · Sub-Second UI Updates · React / Next.js"
    },
    {
        "filename": "og-sociallogger.png",
        "badge": "DISTRIBUTED AUDIT TELEMETRY",
        "title": "SocialLogger Analytics",
        "subtitle": "High-Throughput Social Interaction Logger & Telemetry Pipeline",
        "footer": "Structured Event Logging · Audit Trails · Scalable Backend"
    }
]

def generate_card(card):
    w, h = 1200, 630
    img = Image.new("RGBA", (w, h), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # 1. Subtle Radial / Gradient Glow in background
    for r in range(400, 0, -10):
        alpha = int(18 * (1 - r / 400))
        draw.ellipse([800 - r, 150 - r, 800 + r, 150 + r], fill=(99, 102, 241, alpha))

    # 2. Sleek Rounded Border
    draw.rounded_rectangle([20, 20, w - 20, h - 20], radius=32, outline=(99, 102, 241, 100), width=2)
    draw.rounded_rectangle([28, 28, w - 28, h - 28], radius=24, outline=(255, 255, 255, 15), width=1)

    # 3. Load Fonts (fallback to default if ttf not accessible)
    try:
        font_badge = ImageFont.truetype("arial.ttf", 20)
        font_title = ImageFont.truetype("arialbd.ttf", 60)
        font_sub = ImageFont.truetype("arial.ttf", 30)
        font_foot = ImageFont.truetype("arial.ttf", 22)
        font_brand = ImageFont.truetype("arialbd.ttf", 26)
    except Exception:
        font_badge = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_foot = ImageFont.load_default()
        font_brand = ImageFont.load_default()

    # 4. Brand Watermark (Top Left)
    draw.text((80, 75), "SOHAM VYAS", fill=TEXT_WHITE, font=font_brand)
    draw.text((280, 78), "·  IIT JODHPUR", fill=EMERALD_COLOR, font=font_badge)

    # 5. Badge Pill
    badge_text = card["badge"]
    draw.rounded_rectangle([80, 150, 80 + len(badge_text) * 12 + 30, 192], radius=12, fill=(99, 102, 241, 35), outline=(99, 102, 241, 80), width=1)
    draw.text((95, 160), badge_text, fill=(165, 180, 252), font=font_badge)

    # 6. Main Title & Subtitle
    draw.text((80, 225), card["title"], fill=TEXT_WHITE, font=font_title)
    draw.text((80, 315), card["subtitle"], fill=TEXT_MUTED, font=font_sub)

    # 7. Divider Line
    draw.line([(80, 470), (w - 80, 470)], fill=(255, 255, 255, 30), width=1)

    # 8. Footer Meta
    draw.text((80, 505), card["footer"], fill=EMERALD_COLOR, font=font_foot)
    draw.text((w - 280, 505), "https://www.soham.lol", fill=TEXT_SUBTLE, font=font_foot)

    dest = os.path.join(OUT_DIR, card["filename"])
    img.convert("RGB").save(dest, "PNG", optimize=True)
    print(f"Generated: {dest}")

if __name__ == "__main__":
    for c in cards:
        generate_card(c)
    print("✓ All 9 distinct Open Graph images generated successfully!")
