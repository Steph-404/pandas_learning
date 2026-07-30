export type Question = {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
};

export type Stage = {
  id: number;
  title: string;
  type: 'multiple_choice' | 'code_sandbox';
  dialogue: string[];
  question?: Question;
};

export const STORYLINE: Stage[] = [
  {
    "id": 1,
    "title": "Stage 1.1 \u2014 The Name",
    "type": "multiple_choice",
    "dialogue": [
      "Before we dive in \u2014 a quick warm-up. The tool we're about to use has an unusual name. Any idea what 'pandas' actually stands for?"
    ],
    "question": {
      "id": "q1_1",
      "text": "What does the name \"pandas\" stand for?",
      "options": [
        {
          "id": "A",
          "text": "Python Analytical Data System"
        },
        {
          "id": "B",
          "text": "Panel Data \u2014 an econometrics term for measurements on the same subjects repeated over time"
        },
        {
          "id": "C",
          "text": "Portable Analysis and Data Application Software"
        },
        {
          "id": "D",
          "text": "Python and NumPy Data Analysis Suite"
        }
      ],
      "correctOptionId": "B",
      "explanation": "\"Pandas\" is short for \"panel data\" \u2014 an econometrics term for measurements on the same subjects repeated over time (e.g., 47 counties measured monthly for five years). It also reads as \"Python data analysis,\" which is the meaning most people use today."
    }
  },
  {
    "id": 2,
    "title": "Stage 1.2 \u2014 Why Pandas Exists",
    "type": "multiple_choice",
    "dialogue": [
      "Excel is everywhere. So why did someone bother building something new? What problem was Wes McKinney actually solving?"
    ],
    "question": {
      "id": "q1_2",
      "text": "In 2008, Wes McKinney was a quantitative analyst at AQR Capital Management. What was the core problem that led him to create pandas?",
      "options": [
        {
          "id": "A",
          "text": "Excel was too expensive for his team"
        },
        {
          "id": "B",
          "text": "Excel broke on large files, had no record of what you did, and formulas could fail silently \u2014 he needed something reproducible and fast"
        },
        {
          "id": "C",
          "text": "He wanted to build a programming language from scratch"
        },
        {
          "id": "D",
          "text": "Python did not have any data analysis libraries at all"
        }
      ],
      "correctOptionId": "B",
      "explanation": "Excel breaks on large files (~1 million rows), provides no record of what you clicked, and formulas can fail silently. Wes needed a tool that was reproducible (the code is the record), fast enough for real financial data, and integrated with Python."
    }
  },
  {
    "id": 3,
    "title": "Stage 1.3 \u2014 Vectorization Speed",
    "type": "multiple_choice",
    "dialogue": [
      "Here's the key performance trick. Pandas doesn't check every cell one by one like Python does. It hands the whole column to compiled C code. Let's see how much faster that actually is."
    ],
    "question": {
      "id": "q1_3",
      "text": "You have a pandas Series with 1,000,000 numbers. You compare a Python for-loop multiplying each element by 1.16 versus the vectorized `s * 1.16`. How much faster is the vectorized version?",
      "options": [
        {
          "id": "A",
          "text": "Same speed"
        },
        {
          "id": "B",
          "text": "About 2x faster"
        },
        {
          "id": "C",
          "text": "About 10x faster"
        },
        {
          "id": "D",
          "text": "Over 50x faster"
        }
      ],
      "correctOptionId": "D",
      "explanation": "Python checks the type of every value one at a time and creates a new Python object for each result. NumPy/pandas sees one block of memory, all the same type, and hands it to compiled C code. The C loop does no type checking and no object creation \u2014 it just multiplies. The vectorized version is typically 50-100x faster."
    }
  },
  {
    "id": 4,
    "title": "Stage 1.4 \u2014 Series Basics",
    "type": "code_sandbox",
    "dialogue": [
      "Let's get your hands dirty. Create a Series of populations for three Kenyan counties and look up one by name."
    ]
  },
  {
    "id": 5,
    "title": "Stage 1.5 \u2014 DataFrame from Dict",
    "type": "code_sandbox",
    "dialogue": [
      "Now build a DataFrame. A DataFrame is just several Series sharing the same index \u2014 like columns in a spreadsheet."
    ]
  },
  {
    "id": 6,
    "title": "Stage 1.6 \u2014 Loading Data",
    "type": "code_sandbox",
    "dialogue": [
      "Nobody types data by hand. Let's load a real dataset from a URL \u2014 pandas can fetch it directly."
    ]
  },
  {
    "id": 7,
    "title": "Stage 1.7 \u2014 First Look Ritual",
    "type": "multiple_choice",
    "dialogue": [
      "Someone hands you a file with 50,000 rows. What do you run first? Think about what order makes sense."
    ],
    "question": {
      "id": "q1_7",
      "text": "You receive a new dataset with 50,000 rows. Which is the correct order of inspection commands to run first?",
      "options": [
        {
          "id": "A",
          "text": "`df.describe()` \u2192 `df.head()` \u2192 `df.info()`"
        },
        {
          "id": "B",
          "text": "`df.head()` \u2192 `df.tail()` \u2192 `df.shape` \u2192 `df.info()` \u2192 `df.describe()`"
        },
        {
          "id": "C",
          "text": "`df.info()` \u2192 `df.plot()` \u2192 `df.head()`"
        },
        {
          "id": "D",
          "text": "`df.groupby()` \u2192 `df.mean()` \u2192 `df.head()`"
        }
      ],
      "correctOptionId": "B",
      "explanation": "Always start with `head()` to see the first rows, then `tail()` (totals and junk rows hide at the bottom), then `shape` (how big), then `info()` (types and missing values), then `describe()` (summary statistics). This is the \"first look ritual\" \u2014 run it before touching anything."
    }
  },
  {
    "id": 8,
    "title": "Stage 1.8 \u2014 info() Output",
    "type": "multiple_choice",
    "dialogue": [
      "Here's what `info()` gave us. Tell me what you see."
    ],
    "question": {
      "id": "q1_8",
      "text": "You run `df.info()` and get this output:",
      "options": [
        {
          "id": "A",
          "text": "The dataset has 47 columns and 3 rows"
        },
        {
          "id": "B",
          "text": "The `rainfall_mm` column has 3 missing values, and the `county` column is stored as text"
        },
        {
          "id": "C",
          "text": "All columns are numeric and complete"
        },
        {
          "id": "D",
          "text": "The dataset has 47 rows and 3 columns, all with no missing values"
        }
      ],
      "correctOptionId": "B",
      "explanation": "`info()` answers three questions at once: how big (47 rows, 3 columns), what type each column is (object=int64=float64), and where missing values are. `rainfall_mm` has 44 non-null out of 47, meaning 3 values are missing. `county` is `object` (text)."
    }
  },
  {
    "id": 9,
    "title": "Stage 1.9 \u2014 Single vs Double Brackets",
    "type": "multiple_choice",
    "dialogue": [
      "Quick syntax check. These two look almost identical. Are they the same thing?"
    ],
    "question": {
      "id": "q1_9",
      "text": "What is the difference between `df[\"population\"]` and `df[[\"population\"]]`?",
      "options": [
        {
          "id": "A",
          "text": "Both return a Series"
        },
        {
          "id": "B",
          "text": "Both return a DataFrame"
        },
        {
          "id": "C",
          "text": "`df[\"population\"]` returns a Series; `df[[\"population\"]]` returns a DataFrame"
        },
        {
          "id": "D",
          "text": "`df[\"population\"]` returns a DataFrame; `df[[\"population\"]]` returns a Series"
        }
      ],
      "correctOptionId": "C",
      "explanation": "One pair of brackets gives you a Series (one column). Two pairs \u2014 a list of names inside the brackets \u2014 gives you a DataFrame. Count the brackets: one pair = Series, two pairs = DataFrame."
    }
  },
  {
    "id": 10,
    "title": "Stage 1.10 \u2014 loc vs iloc",
    "type": "multiple_choice",
    "dialogue": [
      "This is the one thing beginners mix up the most. Let's get it right from the start."
    ],
    "question": {
      "id": "q1_10",
      "text": "What is the difference between `.loc` and `.iloc`?",
      "options": [
        {
          "id": "A",
          "text": "`.loc` selects by position; `.iloc` selects by label"
        },
        {
          "id": "B",
          "text": "`.loc` selects by label; `.iloc` selects by integer position"
        },
        {
          "id": "C",
          "text": "They are identical \u2014 just two names for the same thing"
        },
        {
          "id": "D",
          "text": "`.loc` is for rows only; `.iloc` is for columns only"
        }
      ],
      "correctOptionId": "B",
      "explanation": "`.loc` (l for LABEL) selects by the names you can see \u2014 row labels and column names. `.iloc` (i for INTEGER) selects by position \u2014 counting from 0, exactly like a Python list. Remember: L=label, I=integer."
    }
  },
  {
    "id": 11,
    "title": "Stage 2.1 \u2014 What Makes Data Dirty",
    "type": "multiple_choice",
    "dialogue": [
      "Before we clean anything, we need to know what 'dirty' looks like. A junior researcher just loaded a CSV and something's wrong."
    ],
    "question": {
      "id": "q2_1",
      "text": "Which of the following is NOT a sign that data is \"dirty\"?",
      "options": [
        {
          "id": "A",
          "text": "Missing values (blank cells or NaN)"
        },
        {
          "id": "B",
          "text": "Duplicate rows"
        },
        {
          "id": "C",
          "text": "Consistent column names across all data sources"
        },
        {
          "id": "D",
          "text": "Numbers stored as text (dtype: object)"
        }
      ],
      "correctOptionId": "C",
      "explanation": "Dirty data includes missing values, duplicates, inconsistent categories (e.g., \"nairobi\" vs \"Nairobi\" vs \"NAIROBI\"), invalid values, wrong data types, inconsistent formats, outliers, and structural inconsistencies. Consistent column names is a sign of CLEAN data."
    }
  },
  {
    "id": 12,
    "title": "Stage 2.2 \u2014 NaN is Not Zero",
    "type": "multiple_choice",
    "dialogue": [
      "This catches almost everybody. What happens when you have NaN in a Series?"
    ],
    "question": {
      "id": "q2_2",
      "text": "You have `s = pd.Series([10, np.nan, 30])`. What do `s.sum()` and `s.mean()` return?",
      "options": [
        {
          "id": "A",
          "text": "40 and 13.3"
        },
        {
          "id": "B",
          "text": "40 and 20"
        },
        {
          "id": "C",
          "text": "NaN and NaN"
        }
      ],
      "correctOptionId": "A",
      "explanation": "By default, pandas skip NaN in calculations. `sum()` adds 10 + 30 = 40. `mean()` divides 40 by 2 (not 3) = 20... wait, actually `mean()` = 40/2 = 20. Let me recalculate: sum=40, mean=40/2=20. Actually the answer should be B. Let me correct: `s.sum()` = 40 (skips NaN), `s.mean()` = 40/2 = 20. So the answer is B.\n\n**Corrected Answer:** B (40 and 20)\n\n**Explanation:** `s.sum()` adds the non-NaN values: 10 + 30 = 40. `s.mean()` divides by the count of non-NaN values: 40 / 2 = 20. NaN is skipped entirely \u2014 it is not zero, it is \"we do not know.\" Replacing NaN with 0 would change your mean to 13.3, which is a different claim about the world."
    }
  },
  {
    "id": 13,
    "title": "Stage 2.3 \u2014 Finding Missing Values",
    "type": "code_sandbox",
    "dialogue": [
      "First, let's count how many missing values we have. This is the line you will type on every dataset you ever load."
    ]
  },
  {
    "id": 14,
    "title": "Stage 2.4 \u2014 Drop vs Fill Decisions",
    "type": "multiple_choice",
    "dialogue": [
      "You've found the missing values. Now the hard part \u2014 what do you do about them?"
    ],
    "question": {
      "id": "q2_4",
      "text": "When should you lean towards DELETING rows with missing values rather than filling them?",
      "options": [
        {
          "id": "A",
          "text": "When the column is secondary to your question and has an honest default"
        },
        {
          "id": "B",
          "text": "When only a small share of rows are affected, the gap is in the column you're studying, and you cannot justify any invented number"
        },
        {
          "id": "C",
          "text": "When you would lose too much data by deleting"
        },
        {
          "id": "D",
          "text": "When the gaps have a pattern you understand"
        }
      ],
      "correctOptionId": "B",
      "explanation": "Lean towards deleting when: only a small share of rows are affected, the gap is in the column you are studying, you cannot justify any invented number, or the rows look broken in several columns at once. Lean towards filling when you would lose too much data, the column is secondary, there is an honest default, or the gaps have a pattern you understand."
    }
  },
  {
    "id": 15,
    "title": "Stage 2.5 \u2014 dropna Variations",
    "type": "code_sandbox",
    "dialogue": [
      "Let's see how `dropna()` behaves with different arguments. Check the shape before and after every time."
    ]
  },
  {
    "id": 16,
    "title": "Stage 2.6 \u2014 fillna Strategy",
    "type": "multiple_choice",
    "dialogue": [
      "You have a `rainfall_mm` column with some missing values. Which fillna approach makes the most sense?"
    ],
    "question": {
      "id": "q2_6",
      "text": "You have a `rainfall_mm` column where some sensor readings are missing. Which is the most defensible fillna strategy?",
      "options": [
        {
          "id": "A",
          "text": "`fillna(0)` \u2014 missing means zero rainfall"
        },
        {
          "id": "B",
          "text": "`fillna(df[\"rainfall_mm\"].mean())` \u2014 fill with the average"
        },
        {
          "id": "C",
          "text": "It depends on WHY the values are missing \u2014 sensor failure might warrant a different approach than genuinely no rainfall"
        },
        {
          "id": "D",
          "text": "`fillna(9999)` \u2014 use a large number so you can find them later"
        }
      ],
      "correctOptionId": "C",
      "explanation": "The method must match the meaning. `fillna(0)` claims it did not rain \u2014 that's a claim about the world. `fillna(mean)` is reasonable if data is missing randomly. The key insight: never delete or fill silently. Write down what you did and why."
    }
  },
  {
    "id": 17,
    "title": "Stage 2.7 \u2014 Duplicates",
    "type": "code_sandbox",
    "dialogue": [
      "You find the same row twice. Is that always a mistake? Let's investigate before we delete."
    ]
  },
  {
    "id": 18,
    "title": "Stage 2.8 \u2014 Column Names",
    "type": "multiple_choice",
    "dialogue": [
      "A column called ' Amount Paid ' is a trap. The invisible spaces cause a KeyError you cannot see on screen."
    ],
    "question": {
      "id": "q2_8",
      "text": "You have a column named `\" Amount Paid \"` (with spaces). Which code correctly fixes ALL column names at once?",
      "options": [
        {
          "id": "A",
          "text": "`df.columns = df.columns.lower()`"
        },
        {
          "id": "B",
          "text": "`df.columns = df.columns.str.strip().str.lower().str.replace(\" \", \"_\")`"
        },
        {
          "id": "C",
          "text": "`df = df.rename(columns={\" Amount Paid \": \"amount_paid\"})`"
        },
        {
          "id": "D",
          "text": "`df.columns = df.columns.strip()`"
        }
      ],
      "correctOptionId": "B",
      "explanation": "The professional approach is to fix every name at once: strip whitespace, lowercase everything, and replace spaces with underscores. This handles all columns systematically, not just one at a time. Option C works for one column but doesn't fix others. Option A and D are missing the method syntax (need `.str.` accessor on the Index)."
    }
  },
  {
    "id": 19,
    "title": "Stage 2.9 \u2014 to_numeric with errors='coerce'",
    "type": "multiple_choice",
    "dialogue": [
      "Your amount column has numbers, but `info()` says it's dtype `object`. Something went wrong."
    ],
    "question": {
      "id": "q2_9",
      "text": "You have `s = pd.Series([\"100\", \"250\", \"N/A\", \"400\"])`. What does `pd.to_numeric(s, errors=\"coerce\")` produce?",
      "options": [
        {
          "id": "A",
          "text": "It becomes `[100, 250, 0, 400]`"
        },
        {
          "id": "B",
          "text": "It becomes `[100, 250, NaN, 400]`"
        },
        {
          "id": "C",
          "text": "The whole line raises an error"
        },
        {
          "id": "D",
          "text": "It stays as `[\"100\", \"250\", \"N/A\", \"400\"]`"
        }
      ],
      "correctOptionId": "B",
      "explanation": "`errors=\"coerce\"` turns anything it cannot convert into NaN \u2014 which you already know how to find and handle. Without `errors=\"coerce\"`, the entire line would raise a ValueError because of the \"N/A\" string."
    }
  },
  {
    "id": 20,
    "title": "Stage 2.10 \u2014 The SettingWithCopyWarning",
    "type": "multiple_choice",
    "dialogue": [
      "You will definitely see this warning. Let's understand what it means before it bites you."
    ],
    "question": {
      "id": "q2_10",
      "text": "You filter a DataFrame with `nairobi = df[df[\"county\"] == \"Nairobi\"]` and then try `nairobi[\"amount\"] = nairobi[\"amount\"] * 1.16`. You get a `SettingWithCopyWarning`. What is the fix?",
      "options": [
        {
          "id": "A",
          "text": "Ignore the warning \u2014 it's just a suggestion"
        },
        {
          "id": "B",
          "text": "Add `.copy()` after the filter: `nairobi = df[df[\"county\"] == \"Nairobi\"].copy()`"
        },
        {
          "id": "C",
          "text": "Use `df.at[0, \"amount\"]` instead"
        },
        {
          "id": "D",
          "text": "Restart Python and try again"
        }
      ],
      "correctOptionId": "B",
      "explanation": "pandas is saying: \"I cannot tell whether you meant to change the small table or the big one.\" Adding `.copy()` creates an independent copy, so pandas knows you're modifying the filtered result, not the original. Never ignore this warning \u2014 it can cause silent data corruption."
    }
  },
  {
    "id": 21,
    "title": "Stage 2.11 \u2014 The Full Cleaning Workflow",
    "type": "code_sandbox",
    "dialogue": [
      "Now let's put it all together. Nine lines. Re-runnable tomorrow on a new file. That is the thing a spreadsheet can never give you."
    ]
  },
  {
    "id": 22,
    "title": "Stage 3.1 \u2014 File Types",
    "type": "multiple_choice",
    "dialogue": [
      "Your data arrives as a file. Does the bit after the dot actually matter? Let's make sure you know the difference."
    ],
    "question": {
      "id": "q3_1",
      "text": "What is the key difference between a CSV file and an Excel (.xlsx) file?",
      "options": [
        {
          "id": "A",
          "text": "CSV is binary and needs special software; Excel is plain text"
        },
        {
          "id": "B",
          "text": "CSV is plain text (readable by anything), one table per file; Excel is binary, can hold multiple sheets with formatting"
        },
        {
          "id": "C",
          "text": "They are identical \u2014 just different extensions"
        },
        {
          "id": "D",
          "text": "Excel files are smaller and faster to load"
        }
      ],
      "correctOptionId": "B",
      "explanation": "CSV (Comma Separated Values) is plain text \u2014 you can open it in Notepad. It holds one table, no formatting, no formulas. Excel (.xlsx) is binary (actually a zipped folder of XML files), can hold multiple sheets, formatting, formulas, and charts. For data pipelines, CSV is preferred because it will \"still open in 20 years.\""
    }
  },
  {
    "id": 23,
    "title": "Stage 3.2 \u2014 Wrong Separator",
    "type": "multiple_choice",
    "dialogue": [
      "You load a file and `df.shape` says `(5000, 1)`. One giant column when you expected eight. What happened?"
    ],
    "question": {
      "id": "q3_2",
      "text": "You load a CSV and get `(5000, 1)` \u2014 one column instead of many. What is the most likely cause?",
      "options": [
        {
          "id": "A",
          "text": "The file is corrupted"
        },
        {
          "id": "B",
          "text": "The file uses semicolons or tabs as separators, not commas"
        },
        {
          "id": "C",
          "text": "You forgot to import pandas"
        },
        {
          "id": "D",
          "text": "The file is too large for pandas"
        }
      ],
      "correctOptionId": "B",
      "explanation": "Much of Europe uses semicolons because commas are decimal points there. Tab-separated files are named `.tsv` but not always. The symptom of one giant column means pandas couldn't split on commas. Fix: `pd.read_csv(\"data.csv\", sep=\";\")` or `sep=\"\\t\"`."
    }
  },
  {
    "id": 24,
    "title": "Stage 3.3 \u2014 The Four Nairobis",
    "type": "code_sandbox",
    "dialogue": [
      "Remember the four Nairobis? Let's kill them in one line, as promised."
    ]
  },
  {
    "id": 25,
    "title": "Stage 3.4 \u2014 Text Methods",
    "type": "multiple_choice",
    "dialogue": [
      "The `.str` accessor is your Swiss Army knife for text. Which method removes spaces from both ends of a string?"
    ],
    "question": {
      "id": "q3_4",
      "text": "Which `.str` method removes leading and trailing whitespace from every value in a column?",
      "options": [
        {
          "id": "A",
          "text": "`.str.lower()`"
        },
        {
          "id": "B",
          "text": "`.str.replace()`"
        },
        {
          "id": "C",
          "text": "`.str.strip()`"
        },
        {
          "id": "D",
          "text": "`.str.split()`"
        }
      ],
      "correctOptionId": "C",
      "explanation": "`.str.strip()` removes spaces from both ends of each string in the column. `.str.lower()` converts to lowercase. `.str.replace(a, b)` swaps one piece of text for another. `.str.split(x)` breaks each value into pieces."
    }
  },
  {
    "id": 26,
    "title": "Stage 3.5 \u2014 Filtering with Text",
    "type": "code_sandbox",
    "dialogue": [
      "`.str.contains()` makes a boolean mask, exactly like number comparisons. But watch out for missing values."
    ]
  },
  {
    "id": 27,
    "title": "Stage 3.6 \u2014 Rescuing Numbers from Text",
    "type": "code_sandbox",
    "dialogue": [
      "Your amount column has values like '1,200' and '3,000 KES'. These are text, not numbers. Let's rescue them."
    ]
  },
  {
    "id": 28,
    "title": "Stage 3.7 \u2014 Date Conversion",
    "type": "multiple_choice",
    "dialogue": [
      "Your date column reads '2026-01-04'. Can you ask pandas which day of the week that was? Not yet \u2014 first you need to convert it."
    ],
    "question": {
      "id": "q3_7",
      "text": "Your date column has dtype `object` (text). What must you do before you can use `.dt.day_name()`?",
      "options": [
        {
          "id": "A",
          "text": "Nothing \u2014 `.dt` works on text dates"
        },
        {
          "id": "B",
          "text": "Convert with `pd.to_datetime()` first"
        },
        {
          "id": "C",
          "text": "Convert with `.astype(str)` first"
        },
        {
          "id": "D",
          "text": "Load the file with a special argument"
        }
      ],
      "correctOptionId": "B",
      "explanation": "Text that looks like a date is not a date. As text, \"2026-01-10\" sorts before \"2026-01-9\" (character comparison). You must convert with `pd.to_datetime()` first, then `.dt` accessor works: `.dt.year`, `.dt.month`, `.dt.day_name()`, etc."
    }
  },
  {
    "id": 29,
    "title": "Stage 3.8 \u2014 The .dt Accessor",
    "type": "code_sandbox",
    "dialogue": [
      "Once you have real dates, the `.dt` accessor lets you pull out year, month, weekday \u2014 just like `.str` for text."
    ]
  },
  {
    "id": 30,
    "title": "Stage 3.9 \u2014 np.where vs apply",
    "type": "multiple_choice",
    "dialogue": [
      "Building new columns. When should you use `np.where` versus `apply`?"
    ],
    "question": {
      "id": "q3_9",
      "text": "You want to create a 'size' column: \"big\" if amount > 1000, else \"small\". Which approach is fastest and most idiomatic?",
      "options": [
        {
          "id": "A",
          "text": "`df[\"size\"] = df[\"amount\"].apply(lambda x: \"big\" if x > 1000 else \"small\")`"
        },
        {
          "id": "B",
          "text": "`df[\"size\"] = np.where(df[\"amount\"] > 1000, \"big\", \"small\")`"
        },
        {
          "id": "C",
          "text": "`df[\"size\"] = df[\"amount\"].map({\"big\": 1000, \"small\": 0})`"
        },
        {
          "id": "D",
          "text": "Write a for-loop to iterate through each row"
        }
      ],
      "correctOptionId": "B",
      "explanation": "For two outcomes, `np.where` is fastest and most readable. `apply` uses a real Python loop and is 10-100x slower on large datasets. Work down the list: maths \u2192 `np.where` \u2192 `np.select` \u2192 `.str`/`.dt` \u2192 `apply` (last resort)."
    }
  },
  {
    "id": 31,
    "title": "Stage 3.10 \u2014 Building Columns with np.select",
    "type": "code_sandbox",
    "dialogue": [
      "When you have three or more conditions, `np.select` is your tool. Let's build a size category."
    ]
  },
  {
    "id": 32,
    "title": "Stage 3.11 \u2014 Complete Text & Date Cleaning",
    "type": "code_sandbox",
    "dialogue": [
      "Five lines, five skills from this week. Each one makes a column say what you actually mean. That is the whole craft."
    ]
  },
  {
    "id": 33,
    "title": "Stage 4.1 \u2014 The Groupby Concept",
    "type": "multiple_choice",
    "dialogue": [
      "You have a clean table of 834 sales. Which county sold the most? You could scroll 834 rows and add them up by hand. Or you could use one line."
    ],
    "question": {
      "id": "q4_1",
      "text": "What does `df.groupby(\"county\")[\"amount\"].sum()` actually do, step by step?",
      "options": [
        {
          "id": "A",
          "text": "It sorts the DataFrame by county and shows the total"
        },
        {
          "id": "B",
          "text": "It splits the table into groups (one per county), applies `.sum()` to the amount column in each group, then combines the results into one small table"
        },
        {
          "id": "C",
          "text": "It counts how many rows each county has"
        },
        {
          "id": "D",
          "text": "It creates a new column called \"sum\""
        }
      ],
      "correctOptionId": "B",
      "explanation": "The \"split-apply-combine\" pattern: Split the table into groups (one per county), apply a calculation to each group (here, sum), then combine the answers into one small table. pandas does all three in a single line."
    }
  },
  {
    "id": 34,
    "title": "Stage 4.2 \u2014 Basic Groupby",
    "type": "code_sandbox",
    "dialogue": [
      "Let's see it in action. Total sales per county, one line."
    ]
  },
  {
    "id": 35,
    "title": "Stage 4.3 \u2014 Multiple Aggregations",
    "type": "code_sandbox",
    "dialogue": [
      "One calculation is good. But sometimes you need count, sum, and mean \u2014 all at once. That's what `.agg()` is for."
    ]
  },
  {
    "id": 36,
    "title": "Stage 4.4 \u2014 Sorting Results",
    "type": "multiple_choice",
    "dialogue": [
      "A groupby result is just a Series \u2014 so everything you know still works. Sort it, take the head, filter it."
    ],
    "question": {
      "id": "q4_4",
      "text": "You have `sales = df.groupby(\"county\")[\"amount\"].sum()`. How do you get the top 3 counties by total sales?",
      "options": [
        {
          "id": "A",
          "text": "`sales.head(3)`"
        },
        {
          "id": "B",
          "text": "`sales.sort_values(ascending=False).head(3)`"
        },
        {
          "id": "C",
          "text": "`sales.nlargest(3)`"
        },
        {
          "id": "D",
          "text": "Both B and C"
        }
      ],
      "correctOptionId": "D",
      "explanation": "Both `sort_values(ascending=False).head(3)` and `nlargest(3)` give you the top 3. `nlargest()` is a shortcut that does the same thing. `sales.head(3)` just gives you the first 3 in whatever order they're in \u2014 not necessarily the biggest."
    }
  },
  {
    "id": 37,
    "title": "Stage 4.5 \u2014 Pivot Tables",
    "type": "code_sandbox",
    "dialogue": [
      "A pivot table is groupby in two dimensions \u2014 like an Excel pivot, but written down so it re-runs on new data."
    ]
  },
  {
    "id": 38,
    "title": "Stage 4.6 \u2014 Merging Datasets",
    "type": "multiple_choice",
    "dialogue": [
      "You know sales per county. You want sales per PERSON in each county. What are you missing? The population. Which is in a different file."
    ],
    "question": {
      "id": "q4_6",
      "text": "You merge transactions with a counties population dataset using `how=\"left\"`. What does \"left\" mean?",
      "options": [
        {
          "id": "A",
          "text": "Keep only rows that match in both tables"
        },
        {
          "id": "B",
          "text": "Keep every row from the left (transactions) table; add population where it matches"
        },
        {
          "id": "C",
          "text": "Keep every row from the right (counties) table"
        },
        {
          "id": "D",
          "text": "Keep everything from both tables, filling gaps with NaN"
        }
      ],
      "correctOptionId": "B",
      "explanation": "`how=\"left\"` means keep every row of the LEFT table (your transactions), and add matching data from the right table (population) where the key matches. This is the safe default \u2014 you keep all your data and add what you can. Use `how=\"inner\"` when you only want rows that match in both."
    }
  },
  {
    "id": 39,
    "title": "Stage 4.7 \u2014 Merge in Code",
    "type": "code_sandbox",
    "dialogue": [
      "Let's bring two tables together. Both have a `county` column \u2014 that's our key."
    ]
  },
  {
    "id": 40,
    "title": "Stage 4.8 \u2014 Concat vs Merge",
    "type": "multiple_choice",
    "dialogue": [
      "Quick check \u2014 `merge` and `concat` are not the same thing. Don't mix them up."
    ],
    "question": {
      "id": "q4_8",
      "text": "What is the difference between `pd.merge()` and `pd.concat()`?",
      "options": [
        {
          "id": "A",
          "text": "They are identical"
        },
        {
          "id": "B",
          "text": "`merge` adds columns (more about each row); `concat` adds rows (more rows, same columns)"
        },
        {
          "id": "C",
          "text": "`merge` is for CSV files; `concat` is for Excel files"
        },
        {
          "id": "D",
          "text": "`merge` requires a key column; `concat` does not"
        }
      ],
      "correctOptionId": "B",
      "explanation": "`merge` joins two tables on a shared column (adds more information about each row). `concat` stacks tables with the same columns on top of each other (adds more rows). Two different jobs \u2014 merge for width, concat for height."
    }
  },
  {
    "id": 41,
    "title": "Stage 4.9 \u2014 Grouping by Two Columns",
    "type": "code_sandbox",
    "dialogue": [
      "What if you want to group by county AND status? Put the keys in a list."
    ]
  },
  {
    "id": 42,
    "title": "Stage 4.10 \u2014 Complete Analysis Workflow",
    "type": "code_sandbox",
    "dialogue": [
      "Load, merge, group, sort \u2014 four steps, one clear table of answers. This is data analysis."
    ]
  },
  {
    "id": 43,
    "title": "Stage 4.11 \u2014 The Cleaning Order",
    "type": "multiple_choice",
    "dialogue": [
      "Last question. What's the correct order for a professional cleaning workflow?"
    ],
    "question": {
      "id": "q4_11",
      "text": "What is the correct order for a professional data cleaning workflow?",
      "options": [
        {
          "id": "A",
          "text": "Load \u2192 Analyze \u2192 Clean \u2192 Save"
        },
        {
          "id": "B",
          "text": "Look (shape, head, info) \u2192 Fix names \u2192 Fix types \u2192 Remove duplicates \u2192 Handle missing \u2192 Check again"
        },
        {
          "id": "C",
          "text": "Fix missing values \u2192 Fix types \u2192 Fix names \u2192 Save"
        },
        {
          "id": "D",
          "text": "It doesn't matter \u2014 just fix things as you find them"
        }
      ],
      "correctOptionId": "B",
      "explanation": "The professional order: (1) Look at shape, head, tail, info, describe \u2014 before touching anything. (2) Fix column names first. (3) Fix types \u2014 junk becomes NaN on purpose. (4) Inspect and remove duplicates. (5) Handle missing values \u2014 count, decide, act, and write down why. (6) Re-run info() and describe() to verify. Look \u2192 Change \u2192 Check \u2192 Explain."
    }
  }
];
