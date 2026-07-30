# Pandas Learning 3D — Assessment Questions by Day

## Overview

Each day's assessment is structured as a series of stages within the 3D narrative. The learner interacts with Dr. Amara Nwosu and the Redrock team, answering questions through two modalities:

- **Multiple Choice** — Conceptual understanding, syntax recall, predict-the-output
- **Code Sandbox** — Live pandas code execution via Pyodide (in-browser)

Questions are ordered from foundational to advanced within each day. Each stage includes dialogue context, the question, expected answer, and explanation.

---

# DAY 1 — Introduction to pandas

## Stage 1.1 — The Name (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Before we dive in — a quick warm-up. The tool we're about to use has an unusual name. Any idea what 'pandas' actually stands for?"

**Question:** What does the name "pandas" stand for?

| Option | Text |
|--------|------|
| A | Python Analytical Data System |
| B | Panel Data — an econometrics term for measurements on the same subjects repeated over time |
| C | Portable Analysis and Data Application Software |
| D | Python and NumPy Data Analysis Suite |

**Correct:** B

**Explanation:** "Pandas" is short for "panel data" — an econometrics term for measurements on the same subjects repeated over time (e.g., 47 counties measured monthly for five years). It also reads as "Python data analysis," which is the meaning most people use today.

---

## Stage 1.2 — Why Pandas Exists (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Excel is everywhere. So why did someone bother building something new? What problem was Wes McKinney actually solving?"

**Question:** In 2008, Wes McKinney was a quantitative analyst at AQR Capital Management. What was the core problem that led him to create pandas?

| Option | Text |
|--------|------|
| A | Excel was too expensive for his team |
| B | Excel broke on large files, had no record of what you did, and formulas could fail silently — he needed something reproducible and fast |
| C | He wanted to build a programming language from scratch |
| D | Python did not have any data analysis libraries at all |

**Correct:** B

**Explanation:** Excel breaks on large files (~1 million rows), provides no record of what you clicked, and formulas can fail silently. Wes needed a tool that was reproducible (the code is the record), fast enough for real financial data, and integrated with Python.

---

## Stage 1.3 — Vectorization Speed (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Here's the key performance trick. Pandas doesn't check every cell one by one like Python does. It hands the whole column to compiled C code. Let's see how much faster that actually is."

**Question:** You have a pandas Series with 1,000,000 numbers. You compare a Python for-loop multiplying each element by 1.16 versus the vectorized `s * 1.16`. How much faster is the vectorized version?

| Option | Text |
|--------|------|
| A | Same speed |
| B | About 2x faster |
| C | About 10x faster |
| D | Over 50x faster |

**Correct:** D

**Explanation:** Python checks the type of every value one at a time and creates a new Python object for each result. NumPy/pandas sees one block of memory, all the same type, and hands it to compiled C code. The C loop does no type checking and no object creation — it just multiplies. The vectorized version is typically 50-100x faster.

---

## Stage 1.4 — Series Basics (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Let's get your hands dirty. Create a Series of populations for three Kenyan counties and look up one by name."

**Starter Code:**
```python
import pandas as pd

# Create a Series with county populations
pop = pd.Series({
    "Nairobi": 4397073,
    "Mombasa": 1208333,
    "Nakuru": 2162202
})

# Look up Nakuru's population by name
print(pop["Nakuru"])
```

**Expected Output:** `2162202`

**Validation:** Output contains `2162202`

---

## Stage 1.5 — DataFrame from Dict (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Now build a DataFrame. A DataFrame is just several Series sharing the same index — like columns in a spreadsheet."

**Starter Code:**
```python
import pandas as pd

# Create a DataFrame from a dictionary of lists
df = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Nakuru"],
    "population": [4397073, 1208333, 2162202],
    "rainfall_mm": [869.0, 1040.0, 950.5]
})

# Print the DataFrame
print(df)
```

**Expected Output:** A DataFrame with 3 rows and 3 columns (county, population, rainfall_mm)

**Validation:** Output contains `Nairobi` and `4397073` and `869.0`

---

## Stage 1.6 — Loading Data (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Nobody types data by hand. Let's load a real dataset from a URL — pandas can fetch it directly."

**Starter Code:**
```python
import pandas as pd

# Load dataset from URL
url = "https://raw.githubusercontent.com/iLabAfrica/pandas_datasets/main/kenya_counties.csv"
df = pd.read_csv(url)

# How many rows and columns?
print("Shape:", df.shape)

# First look
print(df.head())
```

**Expected Output:** Shape tuple (47, 3) or similar, followed by first 5 rows

**Validation:** Output contains `Shape:` and a tuple with numbers

---

## Stage 1.7 — First Look Ritual (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Someone hands you a file with 50,000 rows. What do you run first? Think about what order makes sense."

**Question:** You receive a new dataset with 50,000 rows. Which is the correct order of inspection commands to run first?

| Option | Text |
|--------|------|
| A | `df.describe()` → `df.head()` → `df.info()` |
| B | `df.head()` → `df.tail()` → `df.shape` → `df.info()` → `df.describe()` |
| C | `df.info()` → `df.plot()` → `df.head()` |
| D | `df.groupby()` → `df.mean()` → `df.head()` |

**Correct:** B

**Explanation:** Always start with `head()` to see the first rows, then `tail()` (totals and junk rows hide at the bottom), then `shape` (how big), then `info()` (types and missing values), then `describe()` (summary statistics). This is the "first look ritual" — run it before touching anything.

---

## Stage 1.8 — info() Output (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Here's what `info()` gave us. Tell me what you see."

**Question:** You run `df.info()` and get this output:
```
RangeIndex: 47 entries, 0 to 46
Data columns (total 3 columns):
 #   Column       Non-Null Count  Dtype
---  ------       --------------  -----
 0   county       47 non-null     object
 1   population   47 non-null     int64
 2   rainfall_mm  44 non-null     float64
```
What can you conclude?

| Option | Text |
|--------|------|
| A | The dataset has 47 columns and 3 rows |
| B | The `rainfall_mm` column has 3 missing values, and the `county` column is stored as text |
| C | All columns are numeric and complete |
| D | The dataset has 47 rows and 3 columns, all with no missing values |

**Correct:** B

**Explanation:** `info()` answers three questions at once: how big (47 rows, 3 columns), what type each column is (object=int64=float64), and where missing values are. `rainfall_mm` has 44 non-null out of 47, meaning 3 values are missing. `county` is `object` (text).

---

## Stage 1.9 — Single vs Double Brackets (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Quick syntax check. These two look almost identical. Are they the same thing?"

**Question:** What is the difference between `df["population"]` and `df[["population"]]`?

| Option | Text |
|--------|------|
| A | Both return a Series |
| B | Both return a DataFrame |
| C | `df["population"]` returns a Series; `df[["population"]]` returns a DataFrame |
| D | `df["population"]` returns a DataFrame; `df[["population"]]` returns a Series |

**Correct:** C

**Explanation:** One pair of brackets gives you a Series (one column). Two pairs — a list of names inside the brackets — gives you a DataFrame. Count the brackets: one pair = Series, two pairs = DataFrame.

---

## Stage 1.10 — loc vs iloc (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "This is the one thing beginners mix up the most. Let's get it right from the start."

**Question:** What is the difference between `.loc` and `.iloc`?

| Option | Text |
|--------|------|
| A | `.loc` selects by position; `.iloc` selects by label |
| B | `.loc` selects by label; `.iloc` selects by integer position |
| C | They are identical — just two names for the same thing |
| D | `.loc` is for rows only; `.iloc` is for columns only |

**Correct:** B

**Explanation:** `.loc` (l for LABEL) selects by the names you can see — row labels and column names. `.iloc` (i for INTEGER) selects by position — counting from 0, exactly like a Python list. Remember: L=label, I=integer.

---

# DAY 2 — Filtering & Cleaning Data

## Stage 2.1 — What Makes Data Dirty (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Before we clean anything, we need to know what 'dirty' looks like. A junior researcher just loaded a CSV and something's wrong."

**Question:** Which of the following is NOT a sign that data is "dirty"?

| Option | Text |
|--------|------|
| A | Missing values (blank cells or NaN) |
| B | Duplicate rows |
| C | Consistent column names across all data sources |
| D | Numbers stored as text (dtype: object) |

**Correct:** C

**Explanation:** Dirty data includes missing values, duplicates, inconsistent categories (e.g., "nairobi" vs "Nairobi" vs "NAIROBI"), invalid values, wrong data types, inconsistent formats, outliers, and structural inconsistencies. Consistent column names is a sign of CLEAN data.

---

## Stage 2.2 — NaN is Not Zero (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "This catches almost everybody. What happens when you have NaN in a Series?"

**Question:** You have `s = pd.Series([10, np.nan, 30])`. What do `s.sum()` and `s.mean()` return?

| Option | Text |
|--------|------|
| A | 40 and 13.3 |
| B | 40 and 20 |
| C | NaN and NaN |

**Correct:** A

**Explanation:** By default, pandas skip NaN in calculations. `sum()` adds 10 + 30 = 40. `mean()` divides 40 by 2 (not 3) = 20... wait, actually `mean()` = 40/2 = 20. Let me recalculate: sum=40, mean=40/2=20. Actually the answer should be B. Let me correct: `s.sum()` = 40 (skips NaN), `s.mean()` = 40/2 = 20. So the answer is B.

**Corrected Answer:** B (40 and 20)

**Explanation:** `s.sum()` adds the non-NaN values: 10 + 30 = 40. `s.mean()` divides by the count of non-NaN values: 40 / 2 = 20. NaN is skipped entirely — it is not zero, it is "we do not know." Replacing NaN with 0 would change your mean to 13.3, which is a different claim about the world.

---

## Stage 2.3 — Finding Missing Values (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "First, let's count how many missing values we have. This is the line you will type on every dataset you ever load."

**Starter Code:**
```python
import pandas as pd
import numpy as np

# Create a sample dataset
df = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Eldoret"],
    "amount": [1200, np.nan, 3400, np.nan, 800],
    "status": ["paid", "paid", None, "unpaid", "paid"]
})

# Count missing values per column
print(df.isna().sum())
```

**Expected Output:**
```
county    0
amount    2
status    1
dtype: int64
```

**Validation:** Output shows `amount    2` and `status    1`

---

## Stage 2.4 — Drop vs Fill Decisions (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "You've found the missing values. Now the hard part — what do you do about them?"

**Question:** When should you lean towards DELETING rows with missing values rather than filling them?

| Option | Text |
|--------|------|
| A | When the column is secondary to your question and has an honest default |
| B | When only a small share of rows are affected, the gap is in the column you're studying, and you cannot justify any invented number |
| C | When you would lose too much data by deleting |
| D | When the gaps have a pattern you understand |

**Correct:** B

**Explanation:** Lean towards deleting when: only a small share of rows are affected, the gap is in the column you are studying, you cannot justify any invented number, or the rows look broken in several columns at once. Lean towards filling when you would lose too much data, the column is secondary, there is an honest default, or the gaps have a pattern you understand.

---

## Stage 2.5 — dropna Variations (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Let's see how `dropna()` behaves with different arguments. Check the shape before and after every time."

**Starter Code:**
```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Eldoret"],
    "amount": [1200, np.nan, 3400, np.nan, 800],
    "status": ["paid", "paid", None, "unpaid", "paid"]
})

print("Original shape:", df.shape)

# Drop rows where 'amount' is missing
df_clean = df.dropna(subset=["amount"])
print("After dropna on amount:", df_clean.shape)
print(df_clean)
```

**Expected Output:** Original shape (5, 3), after dropna (3, 3) — only rows with non-null amounts remain

**Validation:** Output contains `(5, 3)` and `(3, 3)`

---

## Stage 2.6 — fillna Strategy (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "You have a `rainfall_mm` column with some missing values. Which fillna approach makes the most sense?"

**Question:** You have a `rainfall_mm` column where some sensor readings are missing. Which is the most defensible fillna strategy?

| Option | Text |
|--------|------|
| A | `fillna(0)` — missing means zero rainfall |
| B | `fillna(df["rainfall_mm"].mean())` — fill with the average |
| C | It depends on WHY the values are missing — sensor failure might warrant a different approach than genuinely no rainfall |
| D | `fillna(9999)` — use a large number so you can find them later |

**Correct:** C

**Explanation:** The method must match the meaning. `fillna(0)` claims it did not rain — that's a claim about the world. `fillna(mean)` is reasonable if data is missing randomly. The key insight: never delete or fill silently. Write down what you did and why.

---

## Stage 2.7 — Duplicates (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "You find the same row twice. Is that always a mistake? Let's investigate before we delete."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "txn_id": ["T001", "T002", "T001", "T003", "T002"],
    "county": ["Nairobi", "Mombasa", "Nairobi", "Kisumu", "Mombasa"],
    "amount": [1200, 800, 1200, 3400, 800]
})

# How many duplicate txn_ids?
print("Duplicate count:", df.duplicated(subset=["txn_id"]).sum())

# Remove duplicates, keeping first occurrence
df_unique = df.drop_duplicates(subset=["txn_id"], keep="first")
print("After dedup:", df_unique.shape)
print(df_unique)
```

**Expected Output:** Duplicate count: 2, After dedup: (3, 3)

**Validation:** Output contains `Duplicate count: 2` and shape `(3, 3)`

---

## Stage 2.8 — Column Names (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "A column called ' Amount Paid ' is a trap. The invisible spaces cause a KeyError you cannot see on screen."

**Question:** You have a column named `" Amount Paid "` (with spaces). Which code correctly fixes ALL column names at once?

| Option | Text |
|--------|------|
| A | `df.columns = df.columns.lower()` |
| B | `df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")` |
| C | `df = df.rename(columns={" Amount Paid ": "amount_paid"})` |
| D | `df.columns = df.columns.strip()` |

**Correct:** B

**Explanation:** The professional approach is to fix every name at once: strip whitespace, lowercase everything, and replace spaces with underscores. This handles all columns systematically, not just one at a time. Option C works for one column but doesn't fix others. Option A and D are missing the method syntax (need `.str.` accessor on the Index).

---

## Stage 2.9 — to_numeric with errors='coerce' (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Your amount column has numbers, but `info()` says it's dtype `object`. Something went wrong."

**Question:** You have `s = pd.Series(["100", "250", "N/A", "400"])`. What does `pd.to_numeric(s, errors="coerce")` produce?

| Option | Text |
|--------|------|
| A | It becomes `[100, 250, 0, 400]` |
| B | It becomes `[100, 250, NaN, 400]` |
| C | The whole line raises an error |
| D | It stays as `["100", "250", "N/A", "400"]` |

**Correct:** B

**Explanation:** `errors="coerce"` turns anything it cannot convert into NaN — which you already know how to find and handle. Without `errors="coerce"`, the entire line would raise a ValueError because of the "N/A" string.

---

## Stage 2.10 — The SettingWithCopyWarning (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "You will definitely see this warning. Let's understand what it means before it bites you."

**Question:** You filter a DataFrame with `nairobi = df[df["county"] == "Nairobi"]` and then try `nairobi["amount"] = nairobi["amount"] * 1.16`. You get a `SettingWithCopyWarning`. What is the fix?

| Option | Text |
|--------|------|
| A | Ignore the warning — it's just a suggestion |
| B | Add `.copy()` after the filter: `nairobi = df[df["county"] == "Nairobi"].copy()` |
| C | Use `df.at[0, "amount"]` instead |
| D | Restart Python and try again |

**Correct:** B

**Explanation:** pandas is saying: "I cannot tell whether you meant to change the small table or the big one." Adding `.copy()` creates an independent copy, so pandas knows you're modifying the filtered result, not the original. Never ignore this warning — it can cause silent data corruption.

---

## Stage 2.11 — The Full Cleaning Workflow (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Now let's put it all together. Nine lines. Re-runnable tomorrow on a new file. That is the thing a spreadsheet can never give you."

**Starter Code:**
```python
import pandas as pd

# Load the messy file
raw = pd.read_csv("https://raw.githubusercontent.com/iLabAfrica/pandas_datasets/main/messy_transactions.csv")
print("Original shape:", raw.shape)

# Step 1: Keep original
df = raw.copy()

# Step 2: Fix column names
df.columns = df.columns.str.strip().str.lower()

# Step 3: Fix types
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

# Step 4: Remove duplicates
df = df.drop_duplicates(subset=["txn_id"])

# Step 5: Handle missing values
df = df.dropna(subset=["amount"])

# Step 6: Verify
print("Clean shape:", df.shape)
df.info()
```

**Expected Output:** Two shape prints and info() output

**Validation:** Output contains `Original shape:` and `Clean shape:`

---

# DAY 3 — Text, Dates & New Columns

## Stage 3.1 — File Types (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Your data arrives as a file. Does the bit after the dot actually matter? Let's make sure you know the difference."

**Question:** What is the key difference between a CSV file and an Excel (.xlsx) file?

| Option | Text |
|--------|------|
| A | CSV is binary and needs special software; Excel is plain text |
| B | CSV is plain text (readable by anything), one table per file; Excel is binary, can hold multiple sheets with formatting |
| C | They are identical — just different extensions |
| D | Excel files are smaller and faster to load |

**Correct:** B

**Explanation:** CSV (Comma Separated Values) is plain text — you can open it in Notepad. It holds one table, no formatting, no formulas. Excel (.xlsx) is binary (actually a zipped folder of XML files), can hold multiple sheets, formatting, formulas, and charts. For data pipelines, CSV is preferred because it will "still open in 20 years."

---

## Stage 3.2 — Wrong Separator (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "You load a file and `df.shape` says `(5000, 1)`. One giant column when you expected eight. What happened?"

**Question:** You load a CSV and get `(5000, 1)` — one column instead of many. What is the most likely cause?

| Option | Text |
|--------|------|
| A | The file is corrupted |
| B | The file uses semicolons or tabs as separators, not commas |
| C | You forgot to import pandas |
| D | The file is too large for pandas |

**Correct:** B

**Explanation:** Much of Europe uses semicolons because commas are decimal points there. Tab-separated files are named `.tsv` but not always. The symptom of one giant column means pandas couldn't split on commas. Fix: `pd.read_csv("data.csv", sep=";")` or `sep="\t"`.

---

## Stage 3.3 — The Four Nairobis (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Remember the four Nairobis? Let's kill them in one line, as promised."

**Starter Code:**
```python
import pandas as pd

# Simulating the four Nairobis problem
df = pd.DataFrame({
    "county": ["Nairobi", "nairobi", "NAIROBI", " Nairobi ", "Mombasa", "mombasa"],
    "amount": [1200, 800, 3400, 600, 2100, 900]
})

print("Before cleaning:")
print(df["county"].value_counts())

# Kill the four Nairobis in one line
df["county"] = df["county"].str.strip().str.title()

print("\nAfter cleaning:")
print(df["county"].value_counts())
```

**Expected Output:** Before: 4 variations of Nairobi + 2 of Mombasa. After: Nairobi (4) + Mombasa (2)

**Validation:** Output shows `Nairobi` with count `4` after cleaning

---

## Stage 3.4 — Text Methods (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "The `.str` accessor is your Swiss Army knife for text. Which method removes spaces from both ends of a string?"

**Question:** Which `.str` method removes leading and trailing whitespace from every value in a column?

| Option | Text |
|--------|------|
| A | `.str.lower()` |
| B | `.str.replace()` |
| C | `.str.strip()` |
| D | `.str.split()` |

**Correct:** C

**Explanation:** `.str.strip()` removes spaces from both ends of each string in the column. `.str.lower()` converts to lowercase. `.str.replace(a, b)` swaps one piece of text for another. `.str.split(x)` breaks each value into pieces.

---

## Stage 3.5 — Filtering with Text (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "`.str.contains()` makes a boolean mask, exactly like number comparisons. But watch out for missing values."

**Starter Code:**
```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Nyeri", None],
    "amount": [1200, 800, 3400, 600, 2100, 900]
})

# Filter counties containing 'a' (case-insensitive)
# Note: na=False handles None values
result = df[df["county"].str.contains("a", case=False, na=False)]
print(result)
```

**Expected Output:** All rows except Nyeri (which has no 'a')

**Validation:** Output contains `Nairobi`, `Mombasa`, `Kisumu`, `Nakuru` but not `Nyeri`

---

## Stage 3.6 — Rescuing Numbers from Text (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Your amount column has values like '1,200' and '3,000 KES'. These are text, not numbers. Let's rescue them."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "amount_raw": ["1,200", "3,000 KES", "500", "N/A", "2,500 KES"]
})

# Step 1: Remove commas and " KES" using .str methods
clean = df["amount_raw"].str.replace(",", "").str.replace(" KES", "")

# Step 2: Convert to numeric (N/A becomes NaN)
df["amount"] = pd.to_numeric(clean, errors="coerce")

print(df[["amount_raw", "amount"]])
```

**Expected Output:** amount_raw with original text, amount with numeric values (NaN for N/A)

**Validation:** Output shows `NaN` for the N/A row and numeric values for others

---

## Stage 3.7 — Date Conversion (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Your date column reads '2026-01-04'. Can you ask pandas which day of the week that was? Not yet — first you need to convert it."

**Question:** Your date column has dtype `object` (text). What must you do before you can use `.dt.day_name()`?

| Option | Text |
|--------|------|
| A | Nothing — `.dt` works on text dates |
| B | Convert with `pd.to_datetime()` first |
| C | Convert with `.astype(str)` first |
| D | Load the file with a special argument |

**Correct:** B

**Explanation:** Text that looks like a date is not a date. As text, "2026-01-10" sorts before "2026-01-9" (character comparison). You must convert with `pd.to_datetime()` first, then `.dt` accessor works: `.dt.year`, `.dt.month`, `.dt.day_name()`, etc.

---

## Stage 3.8 — The .dt Accessor (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Once you have real dates, the `.dt` accessor lets you pull out year, month, weekday — just like `.str` for text."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "date": ["2026-01-15", "2026-03-22", "2026-07-04", "2026-12-25"]
})

# Convert to datetime
df["date"] = pd.to_datetime(df["date"])

# Extract components
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month_name()
df["weekday"] = df["date"].dt.day_name()

print(df[["date", "year", "month", "weekday"]])
```

**Expected Output:** DataFrame with date, year (2026), month names, and weekday names

**Validation:** Output contains `January`, `March`, `July`, `December`

---

## Stage 3.9 — np.where vs apply (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Building new columns. When should you use `np.where` versus `apply`?"

**Question:** You want to create a 'size' column: "big" if amount > 1000, else "small". Which approach is fastest and most idiomatic?

| Option | Text |
|--------|------|
| A | `df["size"] = df["amount"].apply(lambda x: "big" if x > 1000 else "small")` |
| B | `df["size"] = np.where(df["amount"] > 1000, "big", "small")` |
| C | `df["size"] = df["amount"].map({"big": 1000, "small": 0})` |
| D | Write a for-loop to iterate through each row |

**Correct:** B

**Explanation:** For two outcomes, `np.where` is fastest and most readable. `apply` uses a real Python loop and is 10-100x slower on large datasets. Work down the list: maths → `np.where` → `np.select` → `.str`/`.dt` → `apply` (last resort).

---

## Stage 3.10 — Building Columns with np.select (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "When you have three or more conditions, `np.select` is your tool. Let's build a size category."

**Starter Code:**
```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "product": ["Widget", "Gadget", "Doohickey", "Thingamajig", "Whatchamacallit"],
    "amount": [500, 5500, 1200, 800, 3000]
})

# Three categories using np.select
conditions = [
    df["amount"] > 5000,
    df["amount"] > 1000
]
choices = ["huge", "big"]

df["size"] = np.select(conditions, choices, default="small")

print(df[["product", "amount", "size"]])
```

**Expected Output:** Gadget=huge, Doohickey=big, Whatchamacallit=big, Widget=small, Thingamajig=small

**Validation:** Output shows `huge`, `big`, and `small` categories

---

## Stage 3.11 — Complete Text & Date Cleaning (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Five lines, five skills from this week. Each one makes a column say what you actually mean. That is the whole craft."

**Starter Code:**
```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "county": [" nairobi", "MOMBASA ", "  Nakuru", "kisumu", " Nyeri "],
    "date": ["2026-01-15", "not-a-date", "2026-03-22", "2026/07/04", "2026-12-25"],
    "amount": ["1,200 KES", "3,000", "N/A", "500 KES", "2,500"]
})

# 1. Fix column names
df.columns = df.columns.str.strip().str.lower()

# 2. Fix text (county)
df["county"] = df["county"].str.strip().str.title()

# 3. Fix dates
df["date"] = pd.to_datetime(df["date"], errors="coerce")

# 4. Extract month
df["month"] = df["date"].dt.month_name()

# 5. Fix amounts (text → number)
df["amount_clean"] = df["amount"].str.replace(",", "").str.replace(" KES", "")
df["amount_clean"] = pd.to_numeric(df["amount_clean"], errors="coerce")

print(df[["county", "date", "month", "amount_clean"]])
```

**Expected Output:** Cleaned DataFrame with proper county names, datetime dates, month names, and numeric amounts

**Validation:** Output shows `Nairobi`, `Mombasa`, etc. with correct casing, and numeric amounts

---

# DAY 4 — Grouping & Combining

## Stage 4.1 — The Groupby Concept (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "You have a clean table of 834 sales. Which county sold the most? You could scroll 834 rows and add them up by hand. Or you could use one line."

**Question:** What does `df.groupby("county")["amount"].sum()` actually do, step by step?

| Option | Text |
|--------|------|
| A | It sorts the DataFrame by county and shows the total |
| B | It splits the table into groups (one per county), applies `.sum()` to the amount column in each group, then combines the results into one small table |
| C | It counts how many rows each county has |
| D | It creates a new column called "sum" |

**Correct:** B

**Explanation:** The "split-apply-combine" pattern: Split the table into groups (one per county), apply a calculation to each group (here, sum), then combine the answers into one small table. pandas does all three in a single line.

---

## Stage 4.2 — Basic Groupby (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Let's see it in action. Total sales per county, one line."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "county": ["Nairobi", "Nairobi", "Mombasa", "Mombasa", "Kisumu", "Nakuru", "Nakuru", "Nairobi"],
    "amount": [1200, 800, 2100, 900, 3400, 600, 1100, 1500]
})

# Total sales per county
sales = df.groupby("county")["amount"].sum()
print(sales)
```

**Expected Output:**
```
county
Kisumu     3400
Mombasa    3000
Nairobi    3500
Nakuru     1700
```

**Validation:** Output shows `Nairobi    3500`

---

## Stage 4.3 — Multiple Aggregations (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "One calculation is good. But sometimes you need count, sum, and mean — all at once. That's what `.agg()` is for."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "county": ["Nairobi", "Nairobi", "Mombasa", "Mombasa", "Kisumu", "Nakuru", "Nakuru", "Nairobi"],
    "amount": [1200, 800, 2100, 900, 3400, 600, 1100, 1500]
})

# Count, sum, and mean per county
summary = df.groupby("county")["amount"].agg(["count", "sum", "mean"])
print(summary)
```

**Expected Output:** DataFrame with count, sum, mean columns for each county

**Validation:** Output contains `count`, `sum`, `mean` columns

---

## Stage 4.4 — Sorting Results (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "A groupby result is just a Series — so everything you know still works. Sort it, take the head, filter it."

**Question:** You have `sales = df.groupby("county")["amount"].sum()`. How do you get the top 3 counties by total sales?

| Option | Text |
|--------|------|
| A | `sales.head(3)` |
| B | `sales.sort_values(ascending=False).head(3)` |
| C | `sales.nlargest(3)` |
| D | Both B and C |

**Correct:** D

**Explanation:** Both `sort_values(ascending=False).head(3)` and `nlargest(3)` give you the top 3. `nlargest()` is a shortcut that does the same thing. `sales.head(3)` just gives you the first 3 in whatever order they're in — not necessarily the biggest.

---

## Stage 4.5 — Pivot Tables (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "A pivot table is groupby in two dimensions — like an Excel pivot, but written down so it re-runs on new data."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "county": ["Nairobi", "Nairobi", "Mombasa", "Mombasa", "Kisumu", "Kisumu"],
    "status": ["paid", "unpaid", "paid", "unpaid", "paid", "unpaid"],
    "amount": [340000, 180500, 210000, 98000, 120400, 71300]
})

# Create a pivot table
pivot = df.pivot_table(
    index="county",
    columns="status",
    values="amount",
    aggfunc="sum"
)
print(pivot)
```

**Expected Output:** A grid with counties as rows, paid/unpaid as columns, and summed amounts in cells

**Validation:** Output shows `Nairobi` row with `paid` and `unpaid` columns

---

## Stage 4.6 — Merging Datasets (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "You know sales per county. You want sales per PERSON in each county. What are you missing? The population. Which is in a different file."

**Question:** You merge transactions with a counties population dataset using `how="left"`. What does "left" mean?

| Option | Text |
|--------|------|
| A | Keep only rows that match in both tables |
| B | Keep every row from the left (transactions) table; add population where it matches |
| C | Keep every row from the right (counties) table |
| D | Keep everything from both tables, filling gaps with NaN |

**Correct:** B

**Explanation:** `how="left"` means keep every row of the LEFT table (your transactions), and add matching data from the right table (population) where the key matches. This is the safe default — you keep all your data and add what you can. Use `how="inner"` when you only want rows that match in both.

---

## Stage 4.7 — Merge in Code (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Let's bring two tables together. Both have a `county` column — that's our key."

**Starter Code:**
```python
import pandas as pd

# Sales data
sales = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    "total_sales": [589609, 355173, 191199, 219837]
})

# Population data (slightly different county names to test matching)
population = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    "population": [4397073, 1208333, 1155574, 2162202]
})

# Merge on county
merged = sales.merge(population, on="county", how="left")
print(merged)

# Calculate sales per person
merged["sales_per_person"] = merged["total_sales"] / merged["population"]
print("\nSales per person:")
print(merged[["county", "sales_per_person"]].sort_values("sales_per_person", ascending=False))
```

**Expected Output:** Merged DataFrame with county, total_sales, population, and sales_per_person columns

**Validation:** Output contains `sales_per_person` column with values

---

## Stage 4.8 — Concat vs Merge (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Quick check — `merge` and `concat` are not the same thing. Don't mix them up."

**Question:** What is the difference between `pd.merge()` and `pd.concat()`?

| Option | Text |
|--------|------|
| A | They are identical |
| B | `merge` adds columns (more about each row); `concat` adds rows (more rows, same columns) |
| C | `merge` is for CSV files; `concat` is for Excel files |
| D | `merge` requires a key column; `concat` does not |

**Correct:** B

**Explanation:** `merge` joins two tables on a shared column (adds more information about each row). `concat` stacks tables with the same columns on top of each other (adds more rows). Two different jobs — merge for width, concat for height.

---

## Stage 4.9 — Grouping by Two Columns (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "What if you want to group by county AND status? Put the keys in a list."

**Starter Code:**
```python
import pandas as pd

df = pd.DataFrame({
    "county": ["Nairobi", "Nairobi", "Nairobi", "Mombasa", "Mombasa", "Kisumu", "Kisumu"],
    "status": ["paid", "paid", "unpaid", "paid", "unpaid", "paid", "unpaid"],
    "amount": [1200, 800, 1500, 2100, 900, 3400, 600]
})

# Group by county AND status
result = df.groupby(["county", "status"])["amount"].sum()
print(result)
```

**Expected Output:** A Series with MultiIndex (county, status) showing totals for each combination

**Validation:** Output contains tuples like `("Nairobi", "paid")` with amounts

---

## Stage 4.10 — Complete Analysis Workflow (Code Sandbox)

**Dialogue:**
> Dr. Nwosu: "Load, merge, group, sort — four steps, one clear table of answers. This is data analysis."

**Starter Code:**
```python
import pandas as pd

# Step 1: Load transactions
transactions = pd.DataFrame({
    "county": ["Nairobi", "Nairobi", "Mombasa", "Mombasa", "Kisumu", "Nakuru", "Nakuru", "Nairobi"],
    "amount": [1200, 800, 2100, 900, 3400, 600, 1100, 1500],
    "status": ["paid", "paid", "paid", "unpaid", "paid", "paid", "unpaid", "paid"]
})

# Step 2: Load population data
population = pd.DataFrame({
    "county": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    "population": [4397073, 1208333, 1155574, 2162202]
})

# Step 3: Merge
merged = transactions.merge(population, on="county", how="left")

# Step 4: Group and aggregate
summary = (merged.groupby("county")
    .agg(
        total_sales=("amount", "sum"),
        transaction_count=("amount", "count"),
        population=("population", "first")
    )
    .sort_values("total_sales", ascending=False))

# Step 5: Calculate per-capita
summary["sales_per_person"] = summary["total_sales"] / summary["population"]

print(summary)
```

**Expected Output:** Summary table with total_sales, transaction_count, population, sales_per_person per county, sorted by total_sales descending

**Validation:** Output contains `total_sales`, `transaction_count`, `population`, `sales_per_person` columns

---

## Stage 4.11 — The Cleaning Order (Multiple Choice)

**Dialogue:**
> Dr. Nwosu: "Last question. What's the correct order for a professional cleaning workflow?"

**Question:** What is the correct order for a professional data cleaning workflow?

| Option | Text |
|--------|------|
| A | Load → Analyze → Clean → Save |
| B | Look (shape, head, info) → Fix names → Fix types → Remove duplicates → Handle missing → Check again |
| C | Fix missing values → Fix types → Fix names → Save |
| D | It doesn't matter — just fix things as you find them |

**Correct:** B

**Explanation:** The professional order: (1) Look at shape, head, tail, info, describe — before touching anything. (2) Fix column names first. (3) Fix types — junk becomes NaN on purpose. (4) Inspect and remove duplicates. (5) Handle missing values — count, decide, act, and write down why. (6) Re-run info() and describe() to verify. Look → Change → Check → Explain.

---

# Summary: Question Count by Day

| Day | Topic | Multiple Choice | Code Sandbox | Total |
|-----|-------|----------------|--------------|-------|
| 1 | Introduction to pandas | 6 | 4 | 10 |
| 2 | Filtering & Cleaning | 6 | 5 | 11 |
| 3 | Text, Dates & New Columns | 5 | 6 | 11 |
| 4 | Grouping & Combining | 5 | 6 | 11 |
| **Total** | | **22** | **21** | **43** |

---

# Technical Notes for Implementation

## Datasets Required

All datasets should be stored as CSV strings in `src/data/datasets.ts` or loaded from a public GitHub repo URL. Minimum required:

1. `kenya_counties.csv` — 47 rows, columns: county, population, rainfall_mm
2. `messy_transactions.csv` — 20-30 rows with dirty data (wrong types, missing values, duplicates, inconsistent names)
3. `clean_transactions.csv` — Same data after cleaning
4. `kenya_counties_population.csv` — County population data for merge exercises

## Validation Strategy

- **Multiple Choice:** Compare selected option ID against `correctOptionId`
- **Code Sandbox:** Validate output against expected patterns (regex or string contains)
- **Flexible validation:** Allow minor formatting differences (whitespace, decimal places)

## Difficulty Progression

Each day progresses from:
1. Conceptual recall (multiple choice) → 2. Syntax understanding (predict output) → 3. Hands-on execution (code sandbox) → 4. Integration (complete workflow sandbox)
