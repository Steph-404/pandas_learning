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
    title: "Stage 1: The Investigation",
    dialogue: [
      "Welcome to the Redrock Field Station.",
      "Our team is prepping the toolkit to analyze a massive dataset of 50,000 retail transactions.",
      "One of the junior researchers just said: 'I've loaded the 50,000-row dataset into Excel, but it keeps freezing.'",
      "We need a better tool for this scale."
    ],
    question: {
      id: "q1",
      text: "Why is pandas a better choice than Excel for this task?",
      options: [
        { id: "a", text: "Pandas provides better default graphs than Excel." },
        { id: "b", text: "Excel struggles with large datasets and can freeze on 50,000+ rows, while pandas can process them in fractions of a second." },
        { id: "c", text: "Pandas uses less memory by storing data in the cloud." }
      ],
      correctOptionId: "b",
      explanation: "Correct! Excel can freeze on large files, but pandas handles 50,000+ rows effortlessly and extremely fast."
    }
  },
  {
    id: 2,
    title: "Stage 2: Data Cleaning",
    dialogue: [
      "Great choice! The data is now loaded into a pandas DataFrame.",
      "However, we've noticed a problem. The 'date' column is currently stored as plain text.",
      "We need to clean this up before analysis."
    ],
    question: {
      id: "q2",
      text: "Why is it critical to convert this text into a datetime64 object using pd.to_datetime()?",
      options: [
        { id: "a", text: "It allows us to perform date arithmetic, extract the day of the week, and sort in true time order." },
        { id: "b", text: "It compresses the text to save memory." },
        { id: "c", text: "It automatically translates dates into different time zones." }
      ],
      correctOptionId: "a",
      explanation: "Correct! Converting to datetime64 allows pandas to understand the data chronologically."
    }
  },
  {
    id: 3,
    title: "Stage 3: Feature Engineering",
    dialogue: [
      "The dates are fixed! Now, the final step for our report.",
      "We need to calculate a new 'profit' column based on the existing 'revenue' and 'cost' columns.",
      "There are several ways to do this in pandas, but some are much faster than others."
    ],
    question: {
      id: "q3",
      text: "According to pandas best practices, what is the fastest and clearest way to create this new column?",
      options: [
        { id: "a", text: "Use df.apply() with a custom lambda function." },
        { id: "b", text: "Write a standard Python for loop to iterate over each row." },
        { id: "c", text: "Use direct column math: df['profit'] = df['revenue'] - df['cost']." }
      ],
      correctOptionId: "c",
      explanation: "Correct! Direct column math (vectorized operations) is the fastest and clearest method in pandas. Avoid loops and apply() unless absolutely necessary."
    }
  }
];
