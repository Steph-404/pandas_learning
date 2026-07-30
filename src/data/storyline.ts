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
  dialogue: string[];
  question: Question;
};

export const STORYLINE: Stage[] = [
  {
    id: 1,
    title: "The Tool Problem",
    dialogue: [
      "Welcome! I'm Dr. Amara Nwosu. Glad you made it to Redrock Field Station.",
      "We have a situation. A junior researcher on the team just pulled in a dataset — 50,000 retail transactions — and loaded it straight into Excel.",
      "They've been waiting 10 minutes. It keeps freezing, crashing, and the formulas won't calculate.",
      "They're asking you directly: why on earth should they switch to pandas instead?",
    ],
    question: {
      id: "q1",
      text: "The junior researcher is frustrated. In your own words, what's the best explanation for why pandas is the right tool here compared to Excel?",
      options: [
        { id: "a", text: "Pandas has better charts and visualisations than Excel does by default." },
        { id: "b", text: "Excel struggles badly with datasets over ~10,000 rows — it loads into RAM cell by cell. Pandas uses NumPy arrays under the hood, so it can filter, sort and compute 50,000+ rows in milliseconds." },
        { id: "c", text: "Pandas stores data in the cloud so it never slows your machine down." },
      ],
      correctOptionId: "b",
      explanation: "Exactly right. Excel's row-by-row model simply was not built for this scale. Pandas processes the entire column as a vectorised NumPy array — no looping, no freezing.",
    },
  },
  {
    id: 2,
    title: "First Look at the Data",
    dialogue: [
      "Great explanation! The researcher is now converted. They've loaded the CSV into a DataFrame.",
      "But before we do anything — filter, clean, analyse — we always take a first look.",
      "The researcher turns to you again: 'OK it's loaded. What's the very first thing I should do?'",
    ],
    question: {
      id: "q2",
      text: "The DataFrame is freshly loaded. What is the standard first command a data scientist runs to get a quick snapshot of the data — shape, column names, dtypes, and null counts all at once?",
      options: [
        { id: "a", text: "df.head() — to see the first 5 rows." },
        { id: "b", text: "df.describe() — to get summary statistics for numeric columns." },
        { id: "c", text: "df.info() — to see column names, non-null counts, and dtypes in a single output." },
      ],
      correctOptionId: "c",
      explanation: "df.info() is the gold standard first call. It shows you column names, how many values are non-null (revealing missing data instantly), and the dtype of every column — all in one place. df.head() and df.describe() are useful too, but info() gives the structural overview first.",
    },
  },
  {
    id: 3,
    title: "Fixing the Date Column",
    dialogue: [
      "The info() output confirms a problem — the 'transaction_date' column has dtype 'object', not datetime.",
      "That means pandas is treating dates as plain text strings. You can't sort by time, extract weekdays, or do date arithmetic.",
      "The researcher asks: 'How do I fix this so pandas actually understands it's a date?'",
    ],
    question: {
      id: "q3",
      text: "The 'transaction_date' column is currently a string. What is the correct pandas method to convert it to a proper datetime type so you can do time-based operations?",
      options: [
        { id: "a", text: "df['transaction_date'] = df['transaction_date'].astype('date')" },
        { id: "b", text: "df['transaction_date'] = pd.to_datetime(df['transaction_date'])" },
        { id: "c", text: "df['transaction_date'] = df['transaction_date'].convert_dates()" },
      ],
      correctOptionId: "b",
      explanation: "pd.to_datetime() is the correct function. It's smart enough to parse most date string formats automatically. After this, pandas knows this column is time-based, and you can call .dt.day_name(), .dt.month, sort chronologically, and much more.",
    },
  },
  {
    id: 4,
    title: "Engineering a New Feature",
    dialogue: [
      "Brilliant. Dates are now fixed. The team lead has a final request before you leave.",
      "They need a new 'profit' column. The dataset already has 'revenue' and 'cost' columns.",
      "A colleague suggests writing a Python for-loop to go row by row. You immediately know that's the wrong call.",
      "How do you explain the better approach — and actually do it?",
    ],
    question: {
      id: "q4",
      text: "Your colleague wants to use a for-loop to compute profit row by row. What is the correct, vectorised pandas approach — and why is it dramatically faster?",
      options: [
        { id: "a", text: "df['profit'] = df.apply(lambda row: row['revenue'] - row['cost'], axis=1)  — apply() is the fastest method in pandas." },
        { id: "b", text: "df['profit'] = df['revenue'] - df['cost']  — direct column arithmetic is vectorised via NumPy and processes all 50k rows simultaneously, not one at a time." },
        { id: "c", text: "for i in range(len(df)):  df.loc[i,'profit'] = df.loc[i,'revenue'] - df.loc[i,'cost']  — loops give you the most control." },
      ],
      correctOptionId: "b",
      explanation: "Direct column arithmetic like df['revenue'] - df['cost'] is vectorised — NumPy operates on the entire array in compiled C code at once. A for-loop or apply() is 10x–100x slower on large datasets. Always prefer vectorised operations.",
    },
  },
];
