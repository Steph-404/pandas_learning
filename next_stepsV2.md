# Next Steps V2 — Pandas Learning 3D: Immersion, Sandbox & Environmental Storytelling

## Executive Summary

This document specifies three interconnected feature pillars for **Phase 3** of the Pandas Learning 3D application. Building on Phase 1 (procedural 3D scene, camera waypoints, question UI) and Phase 2 (skeletal character, procedural grass, desk approach), Phase 3 transforms the experience from a guided tour into a fully **immersive, hands-on educational environment**.

1. **Pre-Arrival Tutorial Briefing (In-Car Briefing)**: A cinematic onboarding sequence that runs *while the transport vehicle is still driving toward the station*. The learner reads a classified mission dossier about their identity, the remote field project, and their team — all rendered as an interactive document overlay atop the moving car interior. This replaces the abrupt "car arrives, door opens" with a narrative-first immersion.

2. **In-Browser Code Execution Sandbox (Pyodide)**: A W3Schools Tryit-style split-panel editor embedded directly into the terminal assessment UI. Learners write and execute real pandas code against real DataFrames *inside the 3D scene*, seeing live output, DataFrame renders, and error messages — all without leaving the browser.

3. **Environmental Storytelling & Lab Artifacts**: The office lab and exterior scene are populated with data-driven environmental storytelling props — whiteboard equations, printed charts, sticky notes, coffee-stained reports, a junior researcher's desk clutter — that collectively tell the story of the Redrock Field Station's mission and the people who work there.

---

## Table of Contents

1. [Pre-Arrival Tutorial Briefing (In-Car Briefing)](#1-pre-arrival-tutorial-briefing-in-car-briefing)
2. [In-Browser Code Execution Sandbox](#2-in-browser-code-execution-sandbox-pyodide)
3. [Environmental Storytelling & Lab Artifacts](#3-environmental-storytelling--lab-artifacts)
4. [Game Sequence State Machine Updates](#4-game-sequence-state-machine-updates)
5. [File Inventory & Modification Directives](#5-file-inventory--modification-directives)
6. [Execution & Verification](#6-execution--verification)

---

## 1. Pre-Arrival Tutorial Briefing (In-Car Briefing)

### 1.1 Concept & Narrative Context

The learner does not simply "appear" at the station. They are a **Data Science Field Specialist** — a role they must understand before stepping out of the vehicle. As the transport car drives down the desert highway toward Redrock Field Station, the interior of the car becomes a briefing room. A holographic tablet screen activates, displaying:

- **Mission dossier** with the learner's identity
- **Project overview** (the 50,000-row retail dataset crisis)
- **Team roster** with photographs and roles
- **Objectives** for the assessment ahead

This creates narrative buy-in *before* the interactive scene begins. The learner knows who they are, where they are going, and why they matter — all while the landscape scrolls past the car windows.

### 1.2 Sequence Flow

```
CAR_ARRIVING State (z: 70 → z: 22)
  │
  ├─ Camera: Exterior chase cam behind car (existing behavior)
  ├─ Car: Driving with deceleration toward entrance
  │
  │   ┌──────────────────────────────────────────────────────┐
  │   │  BRIEFING OVERLAY (HTML/CSS, not 3D)                 │
  │   │  Activates at z: 65 (shortly after car starts)       │
  │   │  Fades out at z: 25 (just before car stops)          │
  │   │                                                      │
  │   │  Page 1: CLASSIFIED — Your Identity                  │
  │   │  Page 2: The Situation at Redrock                    │
  │   │  Page 3: Meet Your Team                              │
  │   │  Page 4: Your Objectives                             │
  │   │                                                      │
  │   │  User clicks [Next →] to advance pages               │
  │   │  Auto-advances if user doesn't click in 12s          │
  │   │  Dot pagination indicator at bottom                  │
  │   └──────────────────────────────────────────────────────┘
  │
  ├─ Car stops at z: 22 → onArrived callback fires
  ├─ Briefing overlay fades to black (200ms)
  └─ Transition to ALIGHTING state (existing behavior)
```

### 1.3 Briefing Pages — Content Specification

#### Page 1: "CLASSIFIED — Field Assignment Dossier"

```yaml
Header:   CLASSIFIED // FIELD ASSIGNMENT DOSSIER
Subhead:  Redrock Field Station — Remote Data Operations Unit
Identity:
  Name:         [Learner's codename placeholder — "Field Specialist"]
  Clearance:    Level 3 — Data Operations
  Division:     iLab Africa · Applied Analytics Division
  Assignment:   Redrock Field Station, Sector 7
Body: |
  You are a Senior Data Science Field Specialist assigned to
  Redrock Field Station — a remote research outpost operated by
  iLab Africa's Applied Analytics Division.

  Your expertise in high-performance data processing has been
  specifically requested for an urgent field consultation.
Visual: Holographic ID card with glowing border, subtle scan-line animation
```

#### Page 2: "The Situation"

```yaml
Header:   THE SITUATION
Subhead:  Redrock Station — 48 Hours Ago
Body: |
  A junior researcher at Redrock Station loaded a 50,000-row
  retail transaction dataset into Microsoft Excel.

  The spreadsheet froze within seconds. Formulas stopped
  calculating. The file is now 43 MB and takes 10 minutes
  to open on their workstation.

  The research team's weekly deliverable is due tomorrow.
  They need your help — now.

  Your mission: demonstrate why pandas is the right tool,
  and guide the team through proper data workflows.
Visual: Animated bar chart showing Excel load time vs pandas load time
  - Excel:  ████████████████████████ 43 MB / 10.2s
  - Pandas: ██ 1.2 MB / 0.08s
```

#### Page 3: "Meet Your Team"

```yaml
Header:   MEET YOUR TEAM
Subhead:  Redrock Field Station — Data Operations Unit

Team Members:
  - Name:   Dr. Amara Nwosu
    Role:   Senior Data Scientist (Your Point of Contact)
    Detail: "She'll greet you at the entrance and walk you
             through the situation firsthand."
    Avatar: 👩‍🔬 (glowing badge)

  - Name:   James Okafor
    Role:   Junior Researcher (Dataset Owner)
    Detail: "Well-meaning but Excel-pilled. He loaded the
             CSV into Excel and now nothing works."
    Avatar: 👨‍💻

  - Name:   Priya Sharma
    Role:   Lab Technician
    Detail: "Maintains the Redrock data infrastructure.
             She set up the pandas environment for you."
    Avatar: 🔬

  - Name:   You
    Role:   Data Science Field Specialist
    Detail: "You are here to consult, demonstrate, and
             deliver the team's weekly analysis."
    Avatar: 🎯

Visual: Grid of 4 team cards with subtle pulse animation on each
```

#### Page 4: "Your Objectives"

```yaml
Header:   YOUR OBJECTIVES
Subhead:  What You Will Demonstrate

Objectives:
  1. Explain why pandas outperforms Excel for large datasets
  2. Perform first-look data inspection (df.info(), df.describe())
  3. Fix data type issues (string → datetime conversion)
  4. Engineer new features using vectorized operations

Closing: |
  Dr. Nwosu is waiting at the entrance. The car is almost
  at the station. Review these objectives — your assessment
  begins the moment you step out.

Visual: Checkbox list with glowing green checkmarks appearing one by one
CTA: "→ Proceed to Station" (final page button)
```

### 1.4 Visual Design — Briefing Overlay

The briefing overlay is a **full-screen semi-transparent HTML layer** rendered *on top of* the Three.js canvas. It must feel like a high-tech holographic tablet — not a plain modal.

```
┌─────────────────────────────────────────────────────────────┐
│ ◻ ◻ ◻                          CLASSIFIED            🔒   │
│─────────────────────────────────────────────────────────────│
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │            [ BRIEFING PAGE CONTENT ]                │   │
│   │                                                     │   │
│   │   Header in uppercase, monospace, blue (#64c8ff)   │   │
│   │   Body text in Segoe UI, light gray (#d8eaff)      │   │
│   │   Visual elements animated on page entry            │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      │
│   │  ●   │ │  ○   │ │  ○   │ │  ○   │   ← pagination dots │
│   └──────┘ └──────┘ └──────┘ └──────┘                      │
│                                                             │
│                          [ Next → ]                         │
│                                                             │
│─────────────────────────────────────────────────────────────│
│  ETA TO REDROCK: ████████░░ 72%  |  TIME ELAPSED: 0:42     │
└─────────────────────────────────────────────────────────────┘
```

**Styling specifications:**

| Property | Value |
|---|---|
| Background | `rgba(4, 10, 24, 0.88)` — near-black with transparency to see car/landscape behind |
| Border | `1px solid rgba(40, 160, 255, 0.2)` — faint blue glow |
| Border-radius | `12px` |
| Backdrop-filter | `blur(16px)` — frosted glass over 3D scene |
| Header font | `"Fira Code", "Cascadia Code", monospace` — uppercase, `letter-spacing: 0.15em` |
| Body font | `"Segoe UI", system-ui, sans-serif` — `line-height: 1.7` |
| Primary accent | `#64c8ff` (cyan-blue) |
| Secondary accent | `#1a6aaa` (deep blue) |
| Card background | `rgba(12, 28, 56, 0.7)` |
| Card border | `1px solid rgba(40, 120, 220, 0.25)` |
| Entrance animation | `translateY(20px) → 0`, `opacity: 0 → 1`, 600ms `easeOutExpo` |
| Exit animation | `opacity: 1 → 0`, 400ms `easeInQuad` |

### 1.5 Progress Bar — "ETA to Redrock"

At the bottom of the briefing overlay, a thin progress bar shows the car's journey progress. This connects the briefing to the physical world — as the learner reads, they can see the car getting closer.

```typescript
// In BriefingOverlay.tsx
const carProgress = useGameStore(state => state.carProgress); // 0.0 → 1.0
const etaPercent = Math.round(carProgress * 100);
```

- Bar fill: `linear-gradient(90deg, #1a6aaa, #64c8ff)`
- Bar track: `rgba(20, 40, 80, 0.5)`
- Updates in real-time as car position changes
- When car reaches z:25 (near stop), bar hits 100% and overlay fades out

### 1.6 Auto-Advance Timer

Each page has a 12-second auto-advance timer. If the user doesn't click "Next" within 12 seconds, the page advances automatically. This prevents the briefing from blocking the experience if the user walks away.

- Timer resets on each page entry
- Timer pauses on hover over the overlay
- Visual countdown: subtle circular indicator next to the page dots
- On final page (Page 4), no auto-advance — user must click "Proceed to Station"

### 1.7 Camera Behavior During Briefing

The camera remains in its **existing exterior chase position** during the briefing. The briefing overlay is an HTML layer, not a 3D camera change. This means:

- The car continues driving in the background (visible through the semi-transparent overlay)
- The landscape scrolls past (visible through blur)
- When the briefing fades out, the camera seamlessly continues to ALIGHTING

**No camera behavior changes are required** for the briefing feature. The only change is the overlay appearing and disappearing.

### 1.8 Timing Integration with Car Arrival

```typescript
// ProceduralCar.tsx — modified arrival logic
useFrame(() => {
  if (!groupRef.current) return;
  if (sequence !== 'CAR_ARRIVING') return;

  const currentZ = groupRef.current.position.z;

  // Briefing activates when car is at z:65 (just started)
  if (currentZ < 65 && !briefingActive) {
    setBriefingActive(true);
  }

  // Briefing fades when car is at z:25 (almost stopped)
  if (currentZ < 25 && briefingActive) {
    setBriefingActive(false);
  }

  // Existing arrival logic continues...
  if (distLeft <= 0.05) {
    arrivedRef.current = true;
    groupRef.current.position.z = stopZ;
    onArrived?.();
  }
});
```

### 1.9 New GameStore Properties

```typescript
// gameStore.ts additions
interface GameState {
  // ... existing properties ...
  briefingActive: boolean;
  briefingPage: number;
  setBriefingActive: (active: boolean) => void;
  setBriefingPage: (page: number) => void;
  carProgress: number;           // 0.0 → 1.0 based on car position
  setCarProgress: (progress: number) => void;
}
```

---

## 2. In-Browser Code Execution Sandbox (Pyodide)

### 2.1 Concept

The existing `QuestionPanel.tsx` presents multiple-choice questions in a terminal-styled UI. Phase 3 adds a **live code execution environment** where learners can write and run real pandas code. This is modeled after the [W3Schools Tryit Editor](https://www.w3schools.com/python/pandas/trypandas.asp) but embedded directly into the 3D scene's terminal interface.

The sandbox uses **Pyodide** — a CPython port compiled to WebAssembly — running entirely in the browser. No server required. No data leaves the user's machine.

### 2.2 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CODE SANDBOX UI                          │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │                     │  │                             │   │
│  │   CODE EDITOR       │  │   OUTPUT PANEL              │   │
│  │   (Monaco Editor)   │  │   (Rendered DataFrame /     │   │
│  │                     │  │    Text output / Errors)    │   │
│  │   - Python syntax   │  │                             │   │
│  │   - Line numbers    │  │   - df.to_html() rendered   │   │
│  │   - Auto-complete   │  │   - print() output          │   │
│  │   - Error highlight │  │   - Traceback on errors     │   │
│  │                     │  │                             │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [▶ Run Code]  Stage: 2/4  │  Dataset: retail.csv   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  HINT: Try df.info() to see column names and types   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Pyodide Integration

#### Installation

```bash
npm install pyodide
```

#### Loader Utility (`src/utils/pyodideLoader.ts`)

```typescript
import { loadPyodide, PyodideInterface } from 'pyodide';

let pyodideInstance: PyodideInterface | null = null;

export const initPyodide = async (): Promise<PyodideInterface> => {
  if (pyodideInstance) return pyodideInstance;

  pyodideInstance = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
  });

  // Install pandas into the Pyodide environment
  await pyodideInstance.loadPackage('pandas');

  // Mount a virtual filesystem for datasets
  pyodideInstance.FS.mkdir('/workspace');
  pyodideInstance.FS.mount(pyodideInstance.FS.filesystems.NODEFS, {
    root: '/workspace',
  }, '/workspace');

  return pyodideInstance;
};

export const runPythonCode = async (
  code: string,
  datasetCSV?: string
): Promise<{ output: string; dataframeHTML?: string; error?: string }> => {
  const pyodide = await initPyodide();

  try {
    // Inject dataset if provided
    if (datasetCSV) {
      pyodide.globals.set('DATASET_CSV', datasetCSV);
      pyodide.runPython(`
import pandas as pd
import io
df = pd.read_csv(io.StringIO(DATASET_CSV))
      `);
    }

    // Capture stdout
    pyodide.runPython(`
import sys
from io import StringIO
_stdout = sys.stdout
sys.stdout = StringIO()
    `);

    // Execute user code
    pyodide.runPython(code);

    // Retrieve stdout
    const output = pyodide.runPython(`
output = sys.stdout.getvalue()
sys.stdout = _stdout
output
    `);

    // Check if df exists and render to HTML
    let dataframeHTML: string | undefined;
    try {
      dataframeHTML = pyodide.runPython(`
if 'df' in dir() or 'df' in globals():
    df.head(20).to_html(classes='pandas-table', index=False, border=0)
else:
    ""
      `);
    } catch {
      // df doesn't exist — that's fine
    }

    return { output: output || '', dataframeHTML };
  } catch (err) {
    return { output: '', error: String(err) };
  }
};
```

### 2.4 Dataset Injection

Each assessment stage provides a pre-loaded dataset that the learner operates on. The datasets are stored as CSV strings in the storyline data:

```typescript
// src/data/datasets.ts
export const DATASETS: Record<string, string> = {
  'retail_50k': `transaction_id,transaction_date,product_name,category,quantity,unit_price,revenue,cost,region,salesperson
TX-00001,2024-03-15,Wireless Mouse,Electronics,3,29.99,89.97,45.00,North,James Okafor
TX-00002,2024-03-15,USB-C Cable,Electronics,12,8.99,107.88,36.00,South,Priya Sharma
TX-00003,2024-03-16,Ergonomic Chair,Office,1,449.99,449.99,280.00,East,James Okafor
...`,
  // Additional rows would be generated or loaded dynamically
};
```

For the full 50,000-row dataset, use a **generated CSV** or load from a public CDN endpoint. The initial sandbox experience uses a smaller sample (100-200 rows) for faster loading, with an option to load the full dataset.

### 2.5 Code Editor Component (`src/components/ui/CodeSandbox.tsx`)

```typescript
interface CodeSandboxProps {
  stageId: number;
  starterCode: string;
  expectedPattern?: string;    // regex pattern to validate output
  datasetKey: string;
  onComplete: () => void;
  hint: string;
}

// Component structure:
// - Split panel: editor (left 50%) | output (right 50%)
// - Top bar: "Run Code" button, stage indicator, dataset name
// - Bottom bar: hint text, optional "Show Solution" toggle
// - Responsive: stacks vertically on narrow screens
```

**Editor Features:**
- Monaco Editor (VS Code's editor) with Python syntax highlighting
- Line numbers, auto-indent, bracket matching
- Error highlighting in the output panel with traceback
- Ctrl+Enter keyboard shortcut to run
- Code is persisted to localStorage per stage (so refresh doesn't lose work)

**Output Panel Features:**
- `print()` output rendered as monospace text
- DataFrame rendered as styled HTML table (via `df.to_html()`)
- Error tracebacks with syntax coloring
- Execution time display ("Executed in 0.34s")

### 2.6 Integration with Assessment Flow

The sandbox replaces or augments the existing multiple-choice `QuestionPanel`. The new flow:

```
QUESTION_ACTIVE State
  │
  ├─ Stage starts → DialogueBox shows Dr. Nwosu's prompt
  │
  ├─ After dialogue ends:
  │   ├─ CodeSandbox appears (not QuestionPanel)
  │   ├─ Pre-loaded with starter code and dataset
  │   ├─ Learner writes and runs code
  │   ├─ Output is validated against expected pattern
  │   └─ On success → feedback + "Next Stage" button
  │
  ├─ Alternative path (for simpler questions):
  │   └─ QuestionPanel (multiple choice) still available
  │       for non-coding conceptual questions
  │
  └─ On final stage completion:
      └─ setSequence('FAREWELL_TRANSIT')
```

### 2.7 Stage-Specific Sandbox Configurations

```typescript
// src/data/sandboxStages.ts
export const SANDBOX_STAGES = [
  {
    stageId: 1,
    title: "Why Pandas?",
    type: "multiple_choice",  // conceptual — no code needed
    // ... existing QuestionPanel config
  },
  {
    stageId: 2,
    title: "First Look at the Data",
    type: "code_sandbox",
    datasetKey: "retail_50k",
    starterCode: `import pandas as pd

# The dataset is loaded as 'df'
# Try running df.info() to see the structure
print(df.info())`,
    expectedPattern: /column.*non-null.*dtypes/i,
    hint: "df.info() shows column names, non-null counts, and data types all at once.",
    validation: (output: string, dfHTML: string) => {
      return output.includes('info') || dfHTML.includes('transaction_date');
    },
  },
  {
    stageId: 3,
    title: "Fixing the Date Column",
    type: "code_sandbox",
    datasetKey: "retail_50k",
    starterCode: `import pandas as pd

# 'transaction_date' is currently dtype 'object' (string)
# Convert it to datetime using pd.to_datetime()

df['transaction_date'] = pd.to_datetime(df['transaction_date'])

# Verify the conversion
print(df['transaction_date'].dtype)`,
    expectedPattern: /datetime64/,
    hint: "Use pd.to_datetime() to convert a string column to datetime type.",
    validation: (output: string) => {
      return output.includes('datetime64');
    },
  },
  {
    stageId: 4,
    title: "Vectorized Feature Engineering",
    type: "code_sandbox",
    datasetKey: "retail_50k",
    starterCode: `import pandas as pd

# Create a 'profit' column from 'revenue' and 'cost'
# Use vectorized operations (NOT a for-loop!)

df['profit'] = df['revenue'] - df['cost']

# Display the result
print(df[['revenue', 'cost', 'profit']].head(10))`,
    expectedPattern: /profit/,
    hint: "Direct column arithmetic (df['revenue'] - df['cost']) is vectorized and fast.",
    validation: (output: string, dfHTML: string) => {
      return dfHTML.includes('profit');
    },
  },
];
```

### 2.8 Sandbox UI Styling

The sandbox must match the existing terminal aesthetic of `QuestionPanel.tsx`:

```css
/* Code Sandbox Styles */
.sandbox-container {
  background: linear-gradient(180deg, rgba(2,8,20,0.97), rgba(4,12,28,0.97));
  border: 1px solid rgba(40,100,200,0.35);
  border-radius: 10px;
  font-family: "Fira Code", "Cascadia Code", monospace;
  overflow: hidden;
}

.sandbox-topbar {
  background: rgba(20,40,80,0.85);
  border-bottom: 1px solid rgba(40,100,200,0.25);
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sandbox-editor {
  background: #0d1117;
  color: #c9d1d9;
  font-size: 14px;
  line-height: 1.6;
  padding: 16px;
  border-right: 1px solid rgba(40,100,200,0.2);
}

.sandbox-output {
  background: #010409;
  color: #c9d1d9;
  font-size: 13px;
  padding: 16px;
  overflow: auto;
}

.pandas-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}
.pandas-table th {
  background: rgba(20,40,80,0.6);
  color: #64c8ff;
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid rgba(40,100,200,0.4);
}
.pandas-table td {
  padding: 6px 12px;
  border-bottom: 1px solid rgba(40,100,200,0.15);
  color: #d0e8ff;
}
.pandas-table tr:hover td {
  background: rgba(40,100,200,0.08);
}
```

### 2.9 Performance Considerations

- **Pyodide initialization**: ~2-4 seconds on first load. Show a loading spinner ("Initializing Python environment..."). Cache the Pyodide instance after first load.
- **pandas package**: ~7MB download. Pre-load during the briefing stage (while the user reads the dossier). By the time they reach the code sandbox, pandas is ready.
- **Execution timeout**: 10-second limit per execution to prevent infinite loops. Display "Execution timed out (10s limit)" if exceeded.
- **Memory**: Each execution creates a fresh Python scope. Previous outputs are cleared.

---

## 3. Environmental Storytelling & Lab Artifacts

### 3.1 Concept

The Redrock Field Station is not an empty building. It is a **lived-in workspace** where real people do real work. Environmental storytelling uses visual props scattered throughout the scene to communicate:

- The station's history and purpose
- The characters' personalities and concerns
- The urgency of the current situation
- Easter eggs that reward attentive learners

These props are **not interactive** — they exist purely as visual worldbuilding. They are 3D geometry primitives placed in the scene, similar to how the existing office lab is constructed.

### 3.2 Exterior Artifacts

#### 3.2.1 Parking Lot & Approach

| Artifact | Position | Description |
|---|---|---|
| **Parked SUV** | `[-8, 0, -6]` | A second vehicle (static, no animation). Suggests other team members are already at the station. Box primitives: dark green body, tinted windows, roof rack. |
| **Bicycle** | `[6, 0, -10]` | Leaning against the entrance pillar. Suggests Priya bikes to work. Simple frame geometry (cylinders) with two wheel toruses. |
| **Planters** | `[[-4, -12], [4, -12]]` | Concrete planters flanking the entrance path. Low cylinders with green sphere bushes. Adds life to the forecourt. |
| **Station Sign** | `[0, 2.5, -13]` | Illuminated sign on a pole: "REDROCK FIELD STATION — iLab Africa". Emissive text material. |
| **Welcome Mat** | `[0, 0.02, -13.5]` | Textured plane with "WELCOME" — subtle detail for the approach sequence. |

#### 3.2.2 Building Exterior Details

| Artifact | Position | Description |
|---|---|---|
| **Satellite Dish** | `[10, 12, -22]` | On the roof. Cylinder + sphere. Communicates "remote research outpost". |
| **HVAC Unit** | `[-10, 8, -22]` | Box on the roof. Industrial feel. |
| **Security Camera** | `[-3, 3.5, -14]` | Small sphere on the entrance overhang. Glowing red dot (emissive). |
| **Delivery Boxes** | `[8, 0.4, -10]` | Stack of 3 cardboard-colored boxes near the side wing. Recent equipment delivery. |

### 3.3 Office Lab Interior — Artifacts

#### 3.3.1 Whiteboard (`OfficeLab.tsx` additions)

Position: Back wall, left side `[-4, 2.2, -5.7]`

The whiteboard contains **static text/lines** rendered as thin box geometries mimicking handwriting:

```
┌─────────────────────────────────────────┐
│  WEEKLY DELIVERABLE — OVERDUE           │
│                                         │
│  ✓ Dataset loaded (50k rows)            │
│  ✗ Excel crashed (again)                │
│  ✗ Formulas not calculating             │
│  ? Switch to pandas                     │
│                                         │
│  deadline: FRIDAY 5PM                   │
│                                         │
│  todo:                                  │
│  - clean date column                    │
│  - calculate profit margins             │
│  - groupby region summary               │
│                                         │
│  ┌────────┐                             │
│  │ CHART  │  ← printed matplotlib plot  │
│  │ (tape) │    taped to board           │
│  └────────┘                             │
└─────────────────────────────────────────┘
```

**Implementation:** Each line is a thin `boxGeometry` with `meshStandardMaterial`. Colors: dark blue marker `#1a3a6a`, red marker `#aa2020`, green marker `#20aa40`. The "chart" is a small plane with a gradient material mimicking a bar chart.

#### 3.3.2 Sticky Notes (Wall & Monitor Bezel)

Scattered sticky notes on the back wall and monitor bezel, each a small colored plane with text:

| Note | Color | Position | Text |
|---|---|---|---|
| Yellow | `#ffe066` | Wall `[2, 2.8, -5.7]` | "ASK AMARA ABOUT pd.merge()" |
| Pink | `#ff6b8a` | Wall `[3, 2.4, -5.7]` | "DON'T USE EXCEL!!! 🗑️" |
| Green | `#88ee88` | Monitor bezel `[-0.8, 1.9, -3.05]` | "df.info() first!!" |
| Blue | `#88ccff` | Wall `[-2, 3.0, -5.7]` | "James: deadline FRIDAY" |

#### 3.3.3 Junior Researcher's Desk Clutter

A secondary desk surface (or shelf extension) with props suggesting James's failed Excel attempt:

| Prop | Position | Description |
|---|---|---|
| **Crumpled paper balls** | `[2, 0.82, -2.0]` | 3-4 small spheres, off-white. Frustration. |
| **Empty coffee cups** | `[2.3, 0.82, -1.8]` | 2 stacked cylinders. Late nights. |
| **Printed spreadsheet** | `[1.8, 0.82, -2.4]` | A plane with grid lines — the frozen Excel sheet, printed out in defeat. |
| **"I <3 EXCEL" mug** | `[-1.2, 0.96, -2.6]` | Cylinder with red heart shape. Ironic. |

#### 3.3.4 Bookshelf Enhancements

The existing bookshelf at `[-5.5, 1.5, -3]` gets additional detail:

| Prop | Description |
|---|---|
| **"Python for Data Analysis" book** | Prominent blue spine, slightly pulled out from the shelf. The team's reference. |
| **Stacked lab reports** | 3-4 thin boxes on top of the bookshelf. "REDROCK Q3 REPORT" on the spine. |
| **Small trophy** | "iLab ANALYTICS AWARD 2023" — the station has a history of excellence. |

#### 3.3.5 Wall Display / Monitor

The existing wall screen at `[0, 2.4, -5.69]` can display a **static dashboard graphic**:

- A simple bar chart (4 colored bars) representing regional sales data
- A small line graph showing "Monthly Revenue Trend"
- Rendered as colored box primitives arranged in a chart pattern
- Emissive materials so it glows subtly in the dim lab

### 3.3.6 Desk Items — Additional

| Prop | Position | Description |
|---|---|---|
| **Headphones** | `[1.2, 0.88, -2.0]` | Over-ear headphones lying on the desk. James listens to music while debugging. Curved geometry (torus segment). |
| **Water bottle** | `[-0.6, 0.92, -1.7]` | Tall cylinder, blue-tinted transparent material. |
| **Sticky note pad** | `[0.5, 0.84, -1.7]` | Small yellow block — the source of all those wall notes. |

### 3.4 Ambient Storytelling — Lighting & Atmosphere

| Element | Description |
|---|---|
| **Time of day** | Late afternoon. Warm golden sunlight from the west (sun position angled). Long shadows. |
| **Interior warmth** | Ceiling lights cast cool blue-white, but the monitor glow adds warmth to the desk area. |
| **Steam from mug** | The existing coffee mug steam (`OfficeLab.tsx`) now uses a slightly larger, slower particle — the coffee is fresh, someone just poured it. |
| **Screen flicker** | The monitor's emissive intensity subtly flickers (already implemented). Adds life. |
| **Dust motes** | Optional: tiny floating particles in the sunbeams near the entrance. `Points` geometry with small sprites. Very subtle. |

### 3.5 Implementation Pattern

All artifacts follow the existing `OfficeLab.tsx` pattern — procedural box/cylinder/sphere geometry with `meshStandardMaterial`:

```typescript
// Example: Sticky note on wall
<mesh position={[2, 2.8, -5.7]}>
  <boxGeometry args={[0.4, 0.4, 0.005]} />
  <meshStandardMaterial color="#ffe066" roughness={0.9} />
</mesh>
{/* Note text — using Text from drei */}
<Text
  position={[2, 2.8, -5.69]}
  fontSize={0.035}
  color="#333"
  anchorX="center"
  anchorY="middle"
  maxWidth={0.35}
>
  ASK AMARA ABOUT pd.merge()
</Text>
```

For charts on the whiteboard/wall screen, use **arranged box primitives**:

```typescript
// Simple bar chart — 4 bars
{[
  { x: -1.2, h: 1.2, color: '#1a88ff' },
  { x: -0.4, h: 0.8, color: '#44ee88' },
  { x: 0.4, h: 1.5, color: '#ff6b6b' },
  { x: 1.2, h: 0.6, color: '#ffe066' },
].map((bar, i) => (
  <mesh key={i} position={[bar.x, 2.0 + bar.h / 2, -5.68]}>
    <boxGeometry args={[0.5, bar.h, 0.02]} />
    <meshStandardMaterial
      color={bar.color}
      emissive={bar.color}
      emissiveIntensity={0.3}
    />
  </mesh>
))}
```

---

## 4. Game Sequence State Machine Updates

### 4.1 Updated GameSequence Type

```typescript
export type GameSequence =
  | 'CAR_ARRIVING'         // Briefing overlay active, car drives to z:22
  | 'ALIGHTING'            // Briefing faded, camera steps out of car
  | 'GREETING'             // Dr. Nwosu greeting dialogue
  | 'TRANSITION_LAB'       // Walk into office
  | 'IN_LAB'               // Inside office, settled
  | 'APPROACHING_SCREEN'   // Camera zooms to monitor
  | 'QUESTION_ACTIVE'      // Code Sandbox OR QuestionPanel active
  | 'FAREWELL_TRANSIT'     // Walk back to entrance
  | 'FAREWELL'             // Dr. Nwosu farewell
  | 'COMPLETED';           // Final score card
```

### 4.2 Updated Sequence Flow

```
CAR_ARRIVING
  │ briefingActive = true (at z:65)
  │ briefingActive = false (at z:25)
  │ Car stops at z:22
  └─→ ALIGHTING

ALIGHTING
  │ Camera walks forward (5s easeInOutSine)
  └─→ GREETING

GREETING
  │ DialogueBox: Dr. Nwosu introduces herself
  │ After dialogue: setDialogueActive(false)
  └─→ TRANSITION_LAB

TRANSITION_LAB
  │ Camera walks through entrance (4s easeInOutSine)
  └─→ IN_LAB

IN_LAB
  │ Pause 1.8s, then auto-advance
  └─→ APPROACHING_SCREEN

APPROACHING_SCREEN
  │ Camera lowers to chair (y: 1.25), narrows FOV (58°→45°)
  │ 3s cubicBezier animation
  └─→ QUESTION_ACTIVE

QUESTION_ACTIVE
  │ For Stage 1: DialogueBox → QuestionPanel (multiple choice)
  │ For Stages 2-4: DialogueBox → CodeSandbox (live code)
  │ On final stage completion:
  └─→ FAREWELL_TRANSIT

FAREWELL_TRANSIT
  │ Camera walks back to entrance (4s easeInOutSine)
  └─→ FAREWELL

FAREWELL
  │ DialogueBox: Dr. Nwosu farewell + final score
  │ After dialogue:
  └─→ COMPLETED

COMPLETED
  │ Full-screen celebration card
  │ Score display + restart button
  └─ (end)
```

### 4.3 Camera Waypoint Table (Updated)

| Sequence | Camera Pos `[x,y,z]` | LookAt `[x,y,z]` | FOV | Duration | Easing |
|---|---|---|---|---|---|
| `CAR_ARRIVING` | `[0, 1.5, 50]` | `[0, 1.5, 22]` | 58° | 0 (instant) | — |
| `ALIGHTING` | `[0, 1.5, 8]` | `[0, 1.6, -12]` | 58° | 5000ms | easeInOutSine |
| `GREETING` | `[0, 1.5, 8]` | `[0, 1.6, -12]` | 58° | 0 | — |
| `TRANSITION_LAB` | `[0, 1.5, -10]` | `[0, 1.2, -28]` | 58° | 4000ms | easeInOutSine |
| `IN_LAB` | `[0, 1.5, -10]` | `[0, 1.5, -28]` | 58° | 0 | — |
| `APPROACHING_SCREEN` | `[0, 1.25, -22]` | `[0, 1.62, -35]` | **45°** | 3000ms | cubicBezier(0.4,0,0.2,1) |
| `FAREWELL_TRANSIT` | `[0, 1.5, 5]` | `[0, 1.6, -12]` | 58° | 4000ms | easeInOutSine |
| `FAREWELL` | `[0, 1.5, 5]` | `[0, 1.6, -12]` | 58° | 0 | — |

---

## 5. File Inventory & Modification Directives

### 5.1 New Files

| File Path | Purpose |
|---|---|
| `src/components/ui/BriefingOverlay.tsx` | In-car tutorial briefing UI overlay |
| `src/components/ui/CodeSandbox.tsx` | Pyodide-based live code execution panel |
| `src/utils/pyodideLoader.ts` | Pyodide initialization and Python execution utility |
| `src/data/datasets.ts` | CSV dataset strings for sandbox stages |
| `src/data/sandboxStages.ts` | Code sandbox configuration per stage |
| `src/components/3d/EnvironmentalArtifacts.tsx` | All exterior + interior storytelling props |

### 5.2 Modified Files

| File Path | Changes |
|---|---|
| `src/store/gameStore.ts` | Add `briefingActive`, `briefingPage`, `carProgress` properties and setters |
| `src/components/3d/ProceduralCar.tsx` | Emit `carProgress` updates; trigger briefing activation at z:65 and deactivation at z:25 |
| `src/components/3d/Scene.tsx` | Import and render `<EnvironmentalArtifacts />` inside the Canvas; add carProgress tracking |
| `src/components/3d/CameraController.tsx` | Add FOV animation for APPROACHING_SCREEN (58° → 45°); restore FOV on FAREWELL |
| `src/components/3d/OfficeLab.tsx` | Add whiteboard, sticky notes, desk clutter, wall chart elements |
| `src/components/ui/DialogueBox.tsx` | Minor: support for tutorial briefing dialogue lines (optional) |
| `src/components/ui/QuestionPanel.tsx` | Refactor: only render for `multiple_choice` stages; defer to CodeSandbox for `code_sandbox` stages |
| `src/components/ui/HUD.tsx` | Update stage count from "3" to "4"; add briefing indicator |
| `src/data/storyline.ts` | Add stage 4 (vectorized operations); add `type` field to each stage (`multiple_choice` or `code_sandbox`) |
| `src/App.tsx` | Import `BriefingOverlay`; conditionally render based on `briefingActive`; orchestrate sandbox vs question panel |
| `index.html` | Add Pyodide CDN preload link; add Monaco Editor CSS (or bundle via npm) |
| `package.json` | Add `pyodide`, `monaco-editor` (or `@monaco-editor/react`) dependencies |

### 5.3 Deleted Files

None. All existing components remain functional. The briefing overlay and code sandbox are additive.

---

## 6. Execution & Verification

### 6.1 Build & Dev Commands

```bash
# Install new dependencies
npm install pyodide @monaco-editor/react

# Verify build integrity
npm run build

# Start dev server
npm run dev

# Lint check
npm run lint
```

### 6.2 Verification Checklist

#### Pre-Arrival Tutorial Briefing
- [ ] Briefing overlay appears when car reaches z:65
- [ ] All 4 pages render with correct content
- [ ] "Next" button advances pages
- [ ] Pagination dots update correctly
- [ ] Auto-advance triggers after 12 seconds on each page
- [ ] Auto-advance pauses on hover
- [ ] Progress bar shows car journey percentage
- [ ] Overlay fades out when car reaches z:25
- [ ] Car continues driving smoothly behind the overlay
- [ ] Briefing does not block car arrival at z:22

#### Code Execution Sandbox
- [ ] Pyodide initializes within 4 seconds
- [ ] pandas loads successfully in Pyodide
- [ ] Dataset CSV is injected into Python scope
- [ ] Starter code executes without errors
- [ ] `print()` output displays in output panel
- [ ] DataFrame renders as styled HTML table
- [ ] Syntax errors show traceback in output
- [ ] Ctrl+Enter runs the code
- [ ] Code persists to localStorage on refresh
- [ ] "Run Code" button shows loading state during execution
- [ ] Execution timeout (10s) displays error message
- [ ] Successful validation triggers "Next Stage" button
- [ ] Sandbox matches terminal aesthetic of QuestionPanel

#### Environmental Storytelling
- [ ] Exterior artifacts visible: parked SUV, bicycle, planters, station sign
- [ ] Satellite dish visible on building roof
- [ ] Whiteboard content readable from desk distance
- [ ] Sticky notes visible on wall and monitor bezel
- [ ] Desk clutter props render correctly (paper balls, coffee cups, spreadsheet printout)
- [ ] Wall screen shows dashboard chart graphic
- [ ] Bookshelf has "Python for Data Analysis" book突出
- [ ] All artifacts use consistent material style with existing scene
- [ ] No performance regression (check FPS with artifacts enabled)

#### State Machine
- [ ] `briefingActive` state toggles correctly during CAR_ARRIVING
- [ ] Camera FOV animates 58° → 45° during APPROACHING_SCREEN
- [ ] Camera FOV restores to 58° during FAREWELL_TRANSIT
- [ ] All 8 waypoints function as before
- [ ] Score increments correctly across all 4 stages
- [ ] COMPLETED state shows final score card

---

> [!NOTE]
> This document supersedes `next_steps.md` (Phase 2 specification). Phase 2 features (skeletal character, procedural grass, desk approach) remain valid and should be implemented alongside or before Phase 3 features as needed.
