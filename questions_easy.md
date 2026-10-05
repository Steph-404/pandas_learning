# Pandas Learning 3D — Easy Multiple Choice Questions

## Overview

These are **easy-difficulty** multiple choice questions designed for quick recall and recognition. They test basic vocabulary, syntax, and concept identification — not deep problem-solving.

Each question has **one correct answer**. Questions are grouped by the day they were taught.

---

# DAY 1 — Introduction to pandas

### Q1.1
What does the name "pandas" stand for?

- A) Python Analytical Data System
- B) Panel Data — an econometrics term for repeated measurements on the same subjects
- C) Portable Analysis and Data Application Software
- D) Python and NumPy Data Analysis Suite

**Answer: B**

---

### Q1.2
Who created pandas and in what year?

- A) Guido van Rossum, 2005
- B) Wes McKinney, 2008
- C) Travis Oliphant, 2010
- D) Fernando Pérez, 2012

**Answer: B**

---

### Q1.3
What does `import pandas as pd` do?

- A) Downloads pandas from the internet
- B) Imports pandas and gives it the short alias `pd`
- C) Creates a new pandas DataFrame
- D) Checks if pandas is installed

**Answer: B**

---

### Q1.4
What is a pandas Series?

- A) A 2D table with rows and columns
- B) A single column of data with labels (an index)
- C) A Python list with no index
- D) A type of chart

**Answer: B**

---

### Q1.5
What is a pandas DataFrame?

- A) A single column of data
- B) A collection of Series sharing the same index — like a table
- C) A Python dictionary
- D) A type of file format

**Answer: B**

---

### Q1.6
How do you create a Series from a list?

- A) `pd.Series("a", "b", "c")`
- B) `pd.Series(["a", "b", "c"])`
- C) `pd.array(["a", "b", "c"])`
- D) `pd.list(["a", "b", "c"])`

**Answer: B**

---

### Q1.7
How do you load a CSV file into a DataFrame?

- A) `pd.load_csv("file.csv")`
- B) `pd.read_csv("file.csv")`
- C) `pd.open_csv("file.csv")`
- D) `pd.import_csv("file.csv")`

**Answer: B**

---

### Q1.8
What does `df.head()` do?

- A) Shows the last 5 rows
- B) Shows the first 5 rows
- C) Shows the column names
- D) Shows the shape of the DataFrame

**Answer: B**

---

### Q1.9
What does `df.shape` return?

- A) The column names
- B) The data types of each column
- C) A tuple of (number of rows, number of columns)
- D) The first 5 rows

**Answer: C**

---

### Q1.10
What does `df.info()` show?

- A) Only the column names
- B) Column names, data types, non-null counts, and memory usage
- C) Summary statistics for numeric columns
- D) The first 10 rows

**Answer: B**

---

### Q1.11
What does `df.describe()` do?

- A) Shows the first 5 rows
- B) Shows column names and types
- C) Shows count, mean, std, min, quartiles, and max for numeric columns
- D) Shows the total number of rows

**Answer: C**

---

### Q1.12
How do you select a single column named "county" from a DataFrame?

- A) `df.county`
- B) `df["county"]`
- C) Both A and B
- D) `df.select("county")`

**Answer: C**

---

### Q1.13
What does `df["county"]` return — a Series or a DataFrame?

- A) A DataFrame
- B) A Series
- C) A Python list
- D) A dictionary

**Answer: B**

---

### Q1.14
What does `df[["county", "population"]]` return?

- A) A Series
- B) A DataFrame
- C) A list
- D) A dictionary

**Answer: B**

---

### Q1.15
What is the difference between `.loc` and `.iloc`?

- A) `.loc` uses labels, `.iloc` uses integer positions
- B) `.loc` is faster than `.iloc`
- C) `.loc` is for rows only, `.iloc` for columns only
- D) They are the same thing

**Answer: A**

---

### Q1.16
What does `df.dtypes` return?

- A) The first 5 rows
- B) The data type of each column
- C) The shape of the DataFrame
- D) The column names only

**Answer: B**

---

### Q1.17
What does `df.columns` return?

- A) The first row of data
- B) The data types
- C) A list of column names
- D) The number of rows

**Answer: C**

---

### Q1.18
Why is pandas faster than Python for-loops on large data?

- A) Pandas uses JavaScript under the hood
- B) Pandas stores data in the cloud
- C) Pandas uses vectorized operations via NumPy, running compiled C code instead of Python loops
- D) Pandas only works on small files

**Answer: C**

---

### Q1.19
What is the advantage of pandas over Excel for large datasets?

- A) pandas has better charts
- B) pandas can handle millions of rows without freezing, and every step is recorded in code
- C) pandas is always faster to learn
- D) pandas has no limitations

**Answer: B**

---

### Q1.20
What does `df.tail(3)` do?

- A) Shows the first 3 rows
- B) Shows the last 3 rows
- C) Shows 3 random rows
- D) Removes the last 3 rows

**Answer: B**

---

### Q1.21
How do you create a DataFrame from a dictionary of lists?

- A) `pd.DataFrame({"col1": [1,2], "col2": [3,4]})`
- B) `pd.DataFrame([{"col1": 1, "col2": 3}, {"col1": 2, "col2": 4}])`
- C) `pd.create({"col1": [1,2], "col2": [3,4]})`
- D) `pd.from_dict({"col1": [1,2], "col2": [3,4]})`

**Answer: A**

---

### Q1.22
What does `df["county"].unique()` return?

- A) The count of each value
- B) The number of unique values
- C) An array of the unique values in the column
- D) The first 5 unique values

**Answer: C**

---

### Q1.23
What does `df["county"].nunique()` return?

- A) The array of unique values
- B) The number of unique values in the column
- C) The total number of rows
- D) The number of null values

**Answer: B**

---

### Q1.24
How do you load data from a URL?

- A) `pd.read_url("https://...")`
- B) `pd.read_csv("https://...")`
- C) `pd.download("https://...")`
- D) `pd.fetch("https://...")`

**Answer: B**

---

### Q1.25
How do you load an Excel file?

- A) `pd.read_csv("file.xlsx")`
- B) `pd.read_excel("file.xlsx")`
- C) `pd.load_excel("file.xlsx")`
- D) `pd.open_excel("file.xlsx")`

**Answer: B**

---

# DAY 2 — Filtering & Cleaning Data

### Q2.1
Which of the following is a sign that data is "dirty"?

- A) Consistent column names
- B) Missing values (NaN)
- C) All columns have correct data types
- D) No duplicate rows

**Answer: B**

---

### Q2.2
What does `NaN` stand for in pandas?

- A) Not a Number
- B) Null and None
- C) Name Notation
- D) No Available Number

**Answer: A**

---

### Q2.3
Is `NaN` the same as zero?

- A) Yes — they are identical
- B) No — NaN means "we do not know," while zero means the value is 0
- C) Yes, but only in Python
- D) No — NaN means the value is negative

**Answer: B**

---

### Q2.4
What does `df.isna().sum()` return?

- A) The total number of rows
- B) The count of missing values in each column
- C) The first 5 rows with missing values
- D) The percentage of missing values

**Answer: B**

---

### Q2.5
What does `df.dropna()` do?

- A) Fills missing values with zero
- B) Removes rows that contain any missing values
- C) Removes duplicate rows
- D) Sorts the DataFrame

**Answer: B**

---

### Q2.6
What does `df.dropna(subset=["amount"])` do?

- A) Drops all rows
- B) Drops only rows where the "amount" column is missing
- C) Drops the "amount" column
- D) Fills "amount" with NaN

**Answer: B**

---

### Q2.7
What does `df["rainfall"].fillna(0)` do?

- A) Removes rows where rainfall is missing
- B) Replaces missing rainfall values with 0
- C) Converts rainfall to float
- D) Counts the missing values

**Answer: B**

---

### Q2.8
What does `df.duplicated().sum()` return?

- A) The total number of rows
- B) The number of duplicate rows
- C) The number of unique rows
- D) The first duplicate row

**Answer: B**

---

### Q2.9
How do you remove duplicate rows based on a specific column?

- A) `df.drop_duplicates(subset=["txn_id"])`
- B) `df.remove_duplicates("txn_id")`
- C) `df.drop("txn_id").duplicates()`
- D) `df.unique(subset=["txn_id"])`

**Answer: A**

---

### Q2.10
What does `df.rename(columns={"amnt": "amount"})` do?

- A) Renames the DataFrame
- B) Renames the "amnt" column to "amount"
- C) Creates a new column called "amount"
- D) Removes the "amnt" column

**Answer: B**

---

### Q2.11
Why should you strip whitespace from column names?

- A) It makes the DataFrame smaller
- B) Columns with hidden spaces cause KeyError when you try to access them
- C) It changes the data types
- D) It is required by pandas

**Answer: B**

---

### Q2.12
What does `df["amount"] = df["amount"].astype(float)` do?

- A) Creates a new DataFrame
- B) Converts the "amount" column to floating-point numbers
- C) Removes the "amount" column
- D) Sorts the "amount" column

**Answer: B**

---

### Q2.13
What does `pd.to_numeric(s, errors="coerce")` do when it encounters a value it cannot convert?

- A) Raises an error
- B) Converts it to NaN
- C) Skips it silently
- D) Converts it to 0

**Answer: B**

---

### Q2.14
What is the `SettingWithCopyWarning`?

- A) A warning that you're trying to modify a copy of a slice instead of the original
- B) A warning that your DataFrame is too large
- C) A warning that you have duplicate values
- D) A warning that a column has wrong data types

**Answer: A**

---

### Q2.15
How do you fix the `SettingWithCopyWarning`?

- A) Ignore it
- B) Add `.copy()` after filtering: `df[df["col"] == "x"].copy()`
- C) Restart Python
- D) Use `df.reset_index()`

**Answer: B**

---

### Q2.16
What is the correct order for a data cleaning workflow?

- A) Fix types → Fix names → Handle missing → Check
- B) Look (head, info) → Fix names → Fix types → Remove duplicates → Handle missing → Check
- C) Handle missing → Remove duplicates → Fix names → Save
- D) It doesn't matter

**Answer: B**

---

### Q2.17
What does `df.drop(columns=["notes"])` do?

- A) Removes the "notes" column
- B) Removes rows where "notes" is missing
- C) Renames the "notes" column
- D) Creates a copy without "notes"

**Answer: A**

---

### Q2.18
What does `df.drop(columns=["notes"])` return?

- A) The original DataFrame unchanged
- B) A new DataFrame without the "notes" column (original unchanged unless reassigned)
- C) Nothing — it modifies in place
- D) A list of remaining columns

**Answer: B**

---

### Q2.19
Why should you always check `df.shape` before and after cleaning?

- A) It's required by pandas
- B) To make sure you didn't accidentally lose more rows than intended
- C) To see the column names
- D) To check data types

**Answer: B**

---

### Q2.20
What does `df.to_csv("clean.csv", index=False)` do?

- A) Loads the CSV file
- B) Saves the DataFrame to a CSV file without the row index
- C) Creates a backup
- D) Prints the DataFrame

**Answer: B**

---

### Q2.21
What does `index=False` prevent in `to_csv()`?

- A) Saving the column names
- B) Saving the row index as an extra column called "Unnamed: 0"
- C) Overwriting the file
- D) Saving NaN values

**Answer: B**

---

### Q2.22
What does `df["is_large"] = df["amount"] > 1000` create?

- A) A filter
- B) A new boolean column where True means amount is over 1000
- C) A new DataFrame
- D) A summary table

**Answer: B**

---

### Q2.23
What does `df.loc[df["amount"] < 0, "amount"] = None` do?

- A) Removes all negative amounts
- B) Sets negative amounts to NaN (missing)
- C) Converts amounts to text
- D) Sorts by amount

**Answer: B**

---

### Q2.24
What is the `category` data type useful for?

- A) Storing numbers faster
- B) Columns with repeated text values — saves memory by storing each label once
- C) Storing dates
- D) Storing images

**Answer: B**

---

### Q2.25
How do you verify that a type conversion actually worked?

- A) Just trust it
- B) Run `df.dtypes` and `df.describe()` to check
- C) Run `df.head()` only
- D) Restart the kernel

**Answer: B**

---

# DAY 3 — Text, Dates & New Columns

### Q3.1
What is the difference between a CSV file and an Excel file?

- A) CSV is binary; Excel is plain text
- B) CSV is plain text, one table per file; Excel is binary, can hold multiple sheets
- C) They are identical
- D) Excel files are always smaller

**Answer: B**

---

### Q3.2
What does it mean if `df.shape` returns `(5000, 1)` when you expected 8 columns?

- A) The file is corrupted
- B) The file uses a different separator (like semicolons instead of commas)
- C) The file is too large
- D) You forgot to import pandas

**Answer: B**

---

### Q3.3
How do you fix a wrong separator when reading a CSV?

- A) `pd.read_csv("data.csv", encoding="utf-8")`
- B) `pd.read_csv("data.csv", sep=";")`
- C) `pd.read_csv("data.csv", header=None)`
- D) `pd.read_csv("data.csv", nrows=100)`

**Answer: B**

---

### Q3.4
What does the `.str` accessor do?

- A) Converts a column to string type
- B) Lets you apply string methods to every value in a column at once
- C) Splits a string into multiple DataFrames
- D) Removes all strings from a column

**Answer: B**

---

### Q3.5
What does `.str.strip()` do?

- A) Removes all spaces inside a string
- B) Removes leading and trailing whitespace from each value
- C) Converts to lowercase
- D) Replaces spaces with underscores

**Answer: B**

---

### Q3.6
What does `.str.title()` do?

- A) Converts everything to lowercase
- B) Converts to Title Case (first letter of each word capitalized)
- C) Adds a title to the column
- D) Removes punctuation

**Answer: B**

---

### Q3.7
How do you fix "the four Nairobis" (Nairobi, nairobi, NAIROBI, " Nairobi ") in one line?

- A) `df["county"] = df["county"].str.strip().str.title()`
- B) `df["county"] = df["county"].str.lower()`
- C) `df["county"] = df["county"].str.replace("nairobi", "Nairobi")`
- D) `df["county"] = df["county"].str.upper()`

**Answer: A**

---

### Q3.8
What does `.str.contains("a", case=False)` return?

- A) A list of strings containing "a"
- B) A boolean Series — True where the value contains "a" (case-insensitive)
- C) The count of "a" in each string
- D) The position of "a" in each string

**Answer: B**

---

### Q3.9
What does `.str.split(",", expand=True)` do?

- A) Joins two columns together
- B) Splits each value on the comma and creates separate columns for each piece
- C) Removes commas from the values
- D) Counts the commas

**Answer: B**

---

### Q3.10
What is the correct order to rescue a number trapped as text (e.g., "1,200 KES")?

- A) Convert to numeric first, then strip text
- B) Strip commas and " KES" with `.str.replace()`, then convert with `pd.to_numeric()`
- C) Use `astype(int)` directly
- D) It cannot be done

**Answer: B**

---

### Q3.11
Why are text dates (dtype: object) problematic?

- A) They look ugly
- B) You can't do date arithmetic, sorting is wrong, and you can't extract month/weekday
- C) They take too much memory
- D) pandas doesn't support them

**Answer: B**

---

### Q3.12
How do you convert a text column to datetime?

- A) `df["date"].astype("datetime")`
- B) `pd.to_datetime(df["date"])`
- C) `df["date"].to_date()`
- D) `df["date"].convert("datetime")`

**Answer: B**

---

### Q3.13
What does `pd.to_datetime(df["date"], errors="coerce")` do with an invalid date?

- A) Raises an error
- B) Converts it to NaT (Not a Time)
- C) Skips the row
- D) Converts it to today's date

**Answer: B**

---

### Q3.14
What does `.dt.day_name()` return?

- A) The day of the month
- B) The name of the weekday (e.g., "Monday")
- C) The month name
- D) The year

**Answer: B**

---

### Q3.15
What does `.dt.month` return?

- A) The month name (e.g., "January")
- B) The month as a number (1-12)
- C) The number of months since 2000
- D) The quarter

**Answer: B**

---

### Q3.16
What does `.dt.year` return?

- A) The day of the year
- B) The year as a four-digit number
- C) The month
- D) The weekday

**Answer: B**

---

### Q3.17
What is `np.where()` used for?

- A) Filtering rows
- B) Choosing between two values based on a condition
- C) Grouping data
- D) Plotting charts

**Answer: B**

---

### Q3.18
What is `np.select()` used for?

- A) Selecting columns
- B) Choosing between multiple values based on multiple conditions
- C) Selecting random rows
- D) Selecting duplicates

**Answer: B**

---

### Q3.19
When should you use `.apply()` instead of vectorized operations?

- A) Always — it's the fastest
- B) Only when the logic is too complicated for maths, np.where, or np.select
- C) Never — it's always slower
- D) Only for text columns

**Answer: B**

---

### Q3.20
What does `df["profit"] = df["revenue"] - df["cost"]` do?

- A) Filters rows where revenue > cost
- B) Creates a new column called "profit" by subtracting cost from revenue for each row
- C) Sorts by profit
- D) Removes the cost column

**Answer: B**

---

### Q3.21
Which function reads a JSON file into a DataFrame?

- A) `pd.read_json("data.json")`
- B) `pd.load_json("data.json")`
- C) `pd.open_json("data.json")`
- D) `pd.import_json("data.json")`

**Answer: A**

---

### Q3.22
What does `df.to_json("clean.json", orient="records")` do?

- A) Loads a JSON file
- B) Saves the DataFrame as a JSON file in record format
- C) Prints the JSON
- D) Converts JSON to CSV

**Answer: B**

---

### Q3.23
What does `.str.len()` return?

- A) The length of the DataFrame
- B) The number of characters in each string value
- C) The number of words
- D) The memory size

**Answer: B**

---

### Q3.24
What is the purpose of `skiprows` when reading an Excel file?

- A) To skip rows with missing values
- B) To skip header rows, logos, or merged cells at the top of the file
- C) To skip the last rows
- D) To skip duplicate rows

**Answer: B**

---

### Q3.25
What does `df["date"] >= "2026-01-01"` do after converting to datetime?

- A) Returns a text comparison
- B) Returns a boolean Series — True where the date is on or after January 1, 2026
- C) Filters the DataFrame
- D) Creates a new column

**Answer: B**

---

# DAY 4 — Grouping & Combining

### Q4.1
What does `df.groupby("county")["amount"].sum()` do?

- A) Sorts the DataFrame by county
- B) Calculates the total amount for each county
- C) Counts the number of counties
- D) Removes duplicates

**Answer: B**

---

### Q4.2
What is the "split-apply-combine" pattern?

- A) Split a file, apply formulas, combine into Excel
- B) Split data into groups, apply a calculation to each, combine results into one table
- C) Split columns, apply filters, combine rows
- D) Split into train/test, apply model, combine predictions

**Answer: B**

---

### Q4.3
What does `df.groupby("county")["amount"].mean()` calculate?

- A) Total per county
- B) Average amount per county
- C) Count per county
- D) Maximum per county

**Answer: B**

---

### Q4.4
What does `df.groupby("county")["amount"].count()` return?

- A) The sum of amounts per county
- B) The number of non-null values per county
- C) The average per county
- D) The total number of rows

**Answer: B**

---

### Q4.5
What does `.agg(["count", "sum", "mean"])` do?

- A) Runs three separate groupby operations
- B) Calculates multiple statistics at once, returning a column for each
- C) Filters by count, sum, and mean
- D) Creates three new DataFrames

**Answer: B**

---

### Q4.6
How do you sort a groupby result from largest to smallest?

- A) `df.groupby("col")["val"].sum().sort_values(ascending=False)`
- B) `df.groupby("col")["val].sort()`
- C) `df.sort("groupby")`
- D) `df.groupby("col").sort()`

**Answer: A**

---

### Q4.7
What does `df.groupby("county")["amount"].nlargest(3)` return?

- A) The 3 smallest values
- B) The top 3 largest values per county
- C) The first 3 rows
- D) The last 3 rows

**Answer: B**

---

### Q4.8
What does `df.pivot_table(index="county", columns="status", values="amount", aggfunc="sum")` create?

- A) A bar chart
- B) A grid with counties as rows, status as columns, and summed amounts in cells
- C) A list of counties
- D) A new CSV file

**Answer: B**

---

### Q4.9
What is the difference between `merge` and `concat`?

- A) They are identical
- B) `merge` joins two tables on a shared column (adds columns); `concat` stacks tables (adds rows)
- C) `merge` is for CSV; `concat` is for Excel
- D) `merge` is faster

**Answer: B**

---

### Q4.10
What does `how="left"` mean in `df.merge(other, on="county", how="left")`?

- A) Keep only matching rows
- B) Keep every row from the left (df) table; add matches from the right where available
- C) Keep every row from the right table
- D) Keep everything from both tables

**Answer: B**

---

### Q4.11
What does `how="inner"` mean in a merge?

- A) Keep all rows from both tables
- B) Keep only rows that match in both tables
- C) Keep all rows from the left table
- D) Keep all rows from the right table

**Answer: B**

---

### Q4.12
What does `pd.concat([jan, feb])` do?

- A) Merges on a key column
- B) Stacks jan and feb on top of each other (adds more rows, same columns)
- C) Joins them side by side
- D) Creates a new index

**Answer: B**

---

### Q4.13
What is the shared column called in a merge?

- A) The foreign key
- B) The key
- C) The index
- D) The label

**Answer: B**

---

### Q4.14
What does `df.groupby(["county", "status"])["amount"].sum()` return?

- A) A single column per county
- B) A Series with a MultiIndex — one value per county-status combination
- C) A flat table
- D) A pivot table

**Answer: B**

---

### Q4.15
How do you get the top 3 counties by total sales?

- A) `sales.head(3)`
- B) `sales.sort_values(ascending=False).head(3)` or `sales.nlargest(3)`
- C) `sales.top(3)`
- D) `sales.max(3)`

**Answer: B**

---

### Q4.16
What does `df.groupby("county").size()` return?

- A) The memory size of each group
- B) The number of rows per group
- C) The number of columns
- D) The total number of cells

**Answer: B**

---

### Q4.17
What happens if you merge and get `_x` and `_y` columns?

- A) It's normal
- B) Both tables had the same column name — pandas added suffixes to distinguish them
- C) The merge failed
- D) You have duplicate rows

**Answer: B**

---

### Q4.18
What does `pd.read_excel("file.xlsx", sheet_name=None)` return?

- A) The first sheet only
- B) A dictionary of DataFrames, one per sheet
- C) A single DataFrame with all sheets combined
- D) An error

**Answer: B**

---

### Q4.19
What does `df.groupby("month")["amount"].sum()` require first?

- A) Nothing — it works directly
- B) A "month" column must exist (usually extracted from a date column using `.dt.month`)
- C) The data must be sorted
- D) The file must be CSV

**Answer: B**

---

### Q4.20
What is the purpose of `pivot_table`?

- A) To create a bar chart
- B) To create a summary table with rows, columns, values, and aggregation function — like an Excel pivot table
- C) To filter data
- D) To save data

**Answer: B**

---

# DAY 5 — Charts & Visualization

### Q5.1
What library does pandas use for plotting by default?

- A) seaborn
- B) matplotlib
- C) plotly
- D) bokeh

**Answer: B**

---

### Q5.2
What does `df.groupby("county")["amount"].sum().plot(kind="bar")` create?

- A) A line chart
- B) A bar chart showing total sales per county
- C) A histogram
- D) A scatter plot

**Answer: B**

---

### Q5.3
Which chart type is best for showing change over time?

- A) Bar chart
- B) Line chart
- C) Histogram
- D) Scatter plot

**Answer: B**

---

### Q5.4
Which chart type is best for comparing categories?

- A) Line chart
- B) Histogram
- C) Bar chart
- D) Scatter plot

**Answer: C**

---

### Q5.5
Which chart type shows the spread (distribution) of a single numerical column?

- A) Bar chart
- B) Line chart
- C) Scatter plot
- D) Histogram

**Answer: D**

---

### Q5.6
Which chart type shows the relationship between two numerical columns?

- A) Bar chart
- B) Line chart
- C) Scatter plot
- D) Pie chart

**Answer: C**

---

### Q5.7
What does `plt.show()` do?

- A) Saves the chart to a file
- B) Displays the chart on screen
- C) Creates a new figure
- D) Clears the current chart

**Answer: B**

---

### Q5.8
What does `plt.title("Sales by County")` do?

- A) Saves the chart
- B) Adds a title to the current chart
- C) Changes the axis labels
- D) Creates a new chart

**Answer: B**

---

### Q5.9
What does `plt.ylabel("Amount (KES)")` do?

- A) Sets the title
- B) Adds a label to the Y-axis
- C) Saves the chart
- D) Changes the chart type

**Answer: B**

---

### Q5.10
What does `plt.tight_layout()` do?

- A) Makes the chart smaller
- B) Adjusts spacing so labels don't get cut off
- C) Removes the chart
- D) Changes the colors

**Answer: B**

---

### Q5.11
What does `plt.savefig("chart.png", dpi=150, bbox_inches="tight")` do?

- A) Loads an image
- B) Saves the current chart as a PNG file
- C) Displays the chart
- D) Creates a new figure

**Answer: B**

---

### Q5.12
What does `kind="barh"` create?

- A) A vertical bar chart
- B) A horizontal bar chart
- C) A histogram
- D) A line chart

**Answer: B**

---

### Q5.13
What does `kind="hist"` create?

- A) A bar chart
- B) A line chart
- C) A histogram — shows the distribution of a numerical column
- D) A scatter plot

**Answer: C**

---

### Q5.14
What does `kind="scatter"` require?

- A) Only a y-axis
- B) Both x and y column names
- C) Only an x-axis
- D) No parameters

**Answer: B**

---

### Q5.15
Why should bar and line chart axes start at zero?

- A) It looks better
- B) Starting at a non-zero value exaggerates small differences and can be misleading
- C) pandas requires it
- D) It's faster

**Answer: B**

---

### Q5.16
What does seaborn do differently from pandas `.plot()`?

- A) Nothing — they are identical
- B) seaborn provides nicer defaults, grouped charts, and works directly from DataFrames with column names
- C) seaborn is slower
- D) seaborn only makes pie charts

**Answer: B**

---

### Q5.17
What does `sns.countplot(data=df, x="county")` create?

- A) A bar chart of total amounts per county
- B) A bar chart showing the count of transactions per county
- C) A line chart
- D) A histogram

**Answer: B**

---

### Q5.18
What does a heatmap show?

- A) Temperature data only
- B) Two dimensions of colour — e.g., counties down the side, months across the top, colour for sales
- C) A single column's distribution
- D) A scatter of two variables

**Answer: B**

---

### Q5.19
What is the first thing to determine before choosing a chart type?

- A) The color scheme
- B) The type of column(s) — categorical or numerical
- C) The file format
- D) The font size

**Answer: B**

---

### Q5.20
What type of chart should you use for one categorical column?

- A) Histogram
- B) Scatter plot
- C) Bar chart / count plot
- D) Line chart

**Answer: C**

---

### Q5.21
What type of chart should you use for two numerical columns?

- A) Bar chart
- B) Pie chart
- C) Scatter plot
- D) Count plot

**Answer: C**

---

### Q5.22
What type of chart should you use for one numerical column?

- A) Bar chart
- B) Line chart
- C) Scatter plot
- D) Histogram / box plot

**Answer: D**

---

### Q5.23
What does `df.boxplot(column="amount", by="county")` create?

- A) A bar chart split by county
- B) A box plot showing the spread and outliers of amount for each county
- C) A histogram
- D) A line chart

**Answer: B**

---

### Q5.24
What does a box plot show?

- A) Only the mean
- B) The median, quartiles, range, and outliers
- C) Only the maximum
- D) Only the minimum

**Answer: B**

---

### Q5.25
What should you do if months appear out of order on a line chart?

- A) Nothing — it's correct
- B) Reindex to a month-ordered list before plotting
- C) Use a bar chart instead
- D) Sort the DataFrame alphabetically

**Answer: B**

---

# Summary

| Day | Topic | Questions |
|-----|-------|-----------|
| 1 | Introduction to pandas | 25 |
| 2 | Filtering & Cleaning | 25 |
| 3 | Text, Dates & New Columns | 25 |
| 4 | Grouping & Combining | 20 |
| 5 | Charts & Visualization | 25 |
| **Total** | | **120** |

---

# Difficulty Notes

All questions in this file are **easy** difficulty:
- **Recall-based**: "What does X do?" / "Which function does Y?"
- **Single-fact answers**: No multi-step reasoning required
- **No code execution**: Pure conceptual recognition
- **Familiar context**: All questions match content directly from the lecture slides

These are suitable for early-stage assessment, warm-up quizzes, or confidence-building before harder questions.
