export type StageType = 'multiple_choice' | 'code_sandbox';

export interface SandboxStage {
  id: number;
  title: string;
  type: StageType;
  prompt: string;
  starterCode?: string;
  validationScript?: string;
  successMessage?: string;
}

export const sandboxStages: Record<number, SandboxStage> = {
  4: {
    id: 4,
    title: "Stage 1.4 \u2014 Series Basics",
    type: "code_sandbox",
    prompt: "Let's get your hands dirty. Create a Series of populations for three Kenyan counties and look up one by name.",
    starterCode: "import pandas as pd\n\n# Create a Series with county populations\npop = pd.Series({\n    \"Nairobi\": 4397073,\n    \"Mombasa\": 1208333,\n    \"Nakuru\": 2162202\n})\n\n# Look up Nakuru's population by name\nprint(pop[\"Nakuru\"])",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  5: {
    id: 5,
    title: "Stage 1.5 \u2014 DataFrame from Dict",
    type: "code_sandbox",
    prompt: "Now build a DataFrame. A DataFrame is just several Series sharing the same index \u2014 like columns in a spreadsheet.",
    starterCode: "import pandas as pd\n\n# Create a DataFrame from a dictionary of lists\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Nakuru\"],\n    \"population\": [4397073, 1208333, 2162202],\n    \"rainfall_mm\": [869.0, 1040.0, 950.5]\n})\n\n# Print the DataFrame\nprint(df)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  6: {
    id: 6,
    title: "Stage 1.6 \u2014 Loading Data",
    type: "code_sandbox",
    prompt: "Nobody types data by hand. Let's load a real dataset from a URL \u2014 pandas can fetch it directly.",
    starterCode: "import pandas as pd\n\n# Load dataset from URL\nurl = \"https://raw.githubusercontent.com/iLabAfrica/pandas_datasets/main/kenya_counties.csv\"\ndf = pd.read_csv(url)\n\n# How many rows and columns?\nprint(\"Shape:\", df.shape)\n\n# First look\nprint(df.head())",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  13: {
    id: 13,
    title: "Stage 2.3 \u2014 Finding Missing Values",
    type: "code_sandbox",
    prompt: "First, let's count how many missing values we have. This is the line you will type on every dataset you ever load.",
    starterCode: "import pandas as pd\nimport numpy as np\n\n# Create a sample dataset\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Nakuru\", \"Kisumu\", \"Eldoret\"],\n    \"amount\": [1200, np.nan, 3400, np.nan, 800],\n    \"status\": [\"paid\", \"paid\", None, \"unpaid\", \"paid\"]\n})\n\n# Count missing values per column\nprint(df.isna().sum())",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  15: {
    id: 15,
    title: "Stage 2.5 \u2014 dropna Variations",
    type: "code_sandbox",
    prompt: "Let's see how `dropna()` behaves with different arguments. Check the shape before and after every time.",
    starterCode: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Nakuru\", \"Kisumu\", \"Eldoret\"],\n    \"amount\": [1200, np.nan, 3400, np.nan, 800],\n    \"status\": [\"paid\", \"paid\", None, \"unpaid\", \"paid\"]\n})\n\nprint(\"Original shape:\", df.shape)\n\n# Drop rows where 'amount' is missing\ndf_clean = df.dropna(subset=[\"amount\"])\nprint(\"After dropna on amount:\", df_clean.shape)\nprint(df_clean)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  17: {
    id: 17,
    title: "Stage 2.7 \u2014 Duplicates",
    type: "code_sandbox",
    prompt: "You find the same row twice. Is that always a mistake? Let's investigate before we delete.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"txn_id\": [\"T001\", \"T002\", \"T001\", \"T003\", \"T002\"],\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Nairobi\", \"Kisumu\", \"Mombasa\"],\n    \"amount\": [1200, 800, 1200, 3400, 800]\n})\n\n# How many duplicate txn_ids?\nprint(\"Duplicate count:\", df.duplicated(subset=[\"txn_id\"]).sum())\n\n# Remove duplicates, keeping first occurrence\ndf_unique = df.drop_duplicates(subset=[\"txn_id\"], keep=\"first\")\nprint(\"After dedup:\", df_unique.shape)\nprint(df_unique)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  21: {
    id: 21,
    title: "Stage 2.11 \u2014 The Full Cleaning Workflow",
    type: "code_sandbox",
    prompt: "Now let's put it all together. Nine lines. Re-runnable tomorrow on a new file. That is the thing a spreadsheet can never give you.",
    starterCode: "import pandas as pd\n\n# Load the messy file\nraw = pd.read_csv(\"https://raw.githubusercontent.com/iLabAfrica/pandas_datasets/main/messy_transactions.csv\")\nprint(\"Original shape:\", raw.shape)\n\n# Step 1: Keep original\ndf = raw.copy()\n\n# Step 2: Fix column names\ndf.columns = df.columns.str.strip().str.lower()\n\n# Step 3: Fix types\ndf[\"amount\"] = pd.to_numeric(df[\"amount\"], errors=\"coerce\")\n\n# Step 4: Remove duplicates\ndf = df.drop_duplicates(subset=[\"txn_id\"])\n\n# Step 5: Handle missing values\ndf = df.dropna(subset=[\"amount\"])\n\n# Step 6: Verify\nprint(\"Clean shape:\", df.shape)\ndf.info()",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  24: {
    id: 24,
    title: "Stage 3.3 \u2014 The Four Nairobis",
    type: "code_sandbox",
    prompt: "Remember the four Nairobis? Let's kill them in one line, as promised.",
    starterCode: "import pandas as pd\n\n# Simulating the four Nairobis problem\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"nairobi\", \"NAIROBI\", \" Nairobi \", \"Mombasa\", \"mombasa\"],\n    \"amount\": [1200, 800, 3400, 600, 2100, 900]\n})\n\nprint(\"Before cleaning:\")\nprint(df[\"county\"].value_counts())\n\n# Kill the four Nairobis in one line\ndf[\"county\"] = df[\"county\"].str.strip().str.title()\n\nprint(\"\\nAfter cleaning:\")\nprint(df[\"county\"].value_counts())",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  26: {
    id: 26,
    title: "Stage 3.5 \u2014 Filtering with Text",
    type: "code_sandbox",
    prompt: "`.str.contains()` makes a boolean mask, exactly like number comparisons. But watch out for missing values.",
    starterCode: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Kisumu\", \"Nakuru\", \"Nyeri\", None],\n    \"amount\": [1200, 800, 3400, 600, 2100, 900]\n})\n\n# Filter counties containing 'a' (case-insensitive)\n# Note: na=False handles None values\nresult = df[df[\"county\"].str.contains(\"a\", case=False, na=False)]\nprint(result)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  27: {
    id: 27,
    title: "Stage 3.6 \u2014 Rescuing Numbers from Text",
    type: "code_sandbox",
    prompt: "Your amount column has values like '1,200' and '3,000 KES'. These are text, not numbers. Let's rescue them.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"amount_raw\": [\"1,200\", \"3,000 KES\", \"500\", \"N/A\", \"2,500 KES\"]\n})\n\n# Step 1: Remove commas and \" KES\" using .str methods\nclean = df[\"amount_raw\"].str.replace(\",\", \"\").str.replace(\" KES\", \"\")\n\n# Step 2: Convert to numeric (N/A becomes NaN)\ndf[\"amount\"] = pd.to_numeric(clean, errors=\"coerce\")\n\nprint(df[[\"amount_raw\", \"amount\"]])",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  29: {
    id: 29,
    title: "Stage 3.8 \u2014 The .dt Accessor",
    type: "code_sandbox",
    prompt: "Once you have real dates, the `.dt` accessor lets you pull out year, month, weekday \u2014 just like `.str` for text.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"date\": [\"2026-01-15\", \"2026-03-22\", \"2026-07-04\", \"2026-12-25\"]\n})\n\n# Convert to datetime\ndf[\"date\"] = pd.to_datetime(df[\"date\"])\n\n# Extract components\ndf[\"year\"] = df[\"date\"].dt.year\ndf[\"month\"] = df[\"date\"].dt.month_name()\ndf[\"weekday\"] = df[\"date\"].dt.day_name()\n\nprint(df[[\"date\", \"year\", \"month\", \"weekday\"]])",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  31: {
    id: 31,
    title: "Stage 3.10 \u2014 Building Columns with np.select",
    type: "code_sandbox",
    prompt: "When you have three or more conditions, `np.select` is your tool. Let's build a size category.",
    starterCode: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"product\": [\"Widget\", \"Gadget\", \"Doohickey\", \"Thingamajig\", \"Whatchamacallit\"],\n    \"amount\": [500, 5500, 1200, 800, 3000]\n})\n\n# Three categories using np.select\nconditions = [\n    df[\"amount\"] > 5000,\n    df[\"amount\"] > 1000\n]\nchoices = [\"huge\", \"big\"]\n\ndf[\"size\"] = np.select(conditions, choices, default=\"small\")\n\nprint(df[[\"product\", \"amount\", \"size\"]])",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  32: {
    id: 32,
    title: "Stage 3.11 \u2014 Complete Text & Date Cleaning",
    type: "code_sandbox",
    prompt: "Five lines, five skills from this week. Each one makes a column say what you actually mean. That is the whole craft.",
    starterCode: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"county\": [\" nairobi\", \"MOMBASA \", \"  Nakuru\", \"kisumu\", \" Nyeri \"],\n    \"date\": [\"2026-01-15\", \"not-a-date\", \"2026-03-22\", \"2026/07/04\", \"2026-12-25\"],\n    \"amount\": [\"1,200 KES\", \"3,000\", \"N/A\", \"500 KES\", \"2,500\"]\n})\n\n# 1. Fix column names\ndf.columns = df.columns.str.strip().str.lower()\n\n# 2. Fix text (county)\ndf[\"county\"] = df[\"county\"].str.strip().str.title()\n\n# 3. Fix dates\ndf[\"date\"] = pd.to_datetime(df[\"date\"], errors=\"coerce\")\n\n# 4. Extract month\ndf[\"month\"] = df[\"date\"].dt.month_name()\n\n# 5. Fix amounts (text \u2192 number)\ndf[\"amount_clean\"] = df[\"amount\"].str.replace(\",\", \"\").str.replace(\" KES\", \"\")\ndf[\"amount_clean\"] = pd.to_numeric(df[\"amount_clean\"], errors=\"coerce\")\n\nprint(df[[\"county\", \"date\", \"month\", \"amount_clean\"]])",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  34: {
    id: 34,
    title: "Stage 4.2 \u2014 Basic Groupby",
    type: "code_sandbox",
    prompt: "Let's see it in action. Total sales per county, one line.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Nairobi\", \"Mombasa\", \"Mombasa\", \"Kisumu\", \"Nakuru\", \"Nakuru\", \"Nairobi\"],\n    \"amount\": [1200, 800, 2100, 900, 3400, 600, 1100, 1500]\n})\n\n# Total sales per county\nsales = df.groupby(\"county\")[\"amount\"].sum()\nprint(sales)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  35: {
    id: 35,
    title: "Stage 4.3 \u2014 Multiple Aggregations",
    type: "code_sandbox",
    prompt: "One calculation is good. But sometimes you need count, sum, and mean \u2014 all at once. That's what `.agg()` is for.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Nairobi\", \"Mombasa\", \"Mombasa\", \"Kisumu\", \"Nakuru\", \"Nakuru\", \"Nairobi\"],\n    \"amount\": [1200, 800, 2100, 900, 3400, 600, 1100, 1500]\n})\n\n# Count, sum, and mean per county\nsummary = df.groupby(\"county\")[\"amount\"].agg([\"count\", \"sum\", \"mean\"])\nprint(summary)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  37: {
    id: 37,
    title: "Stage 4.5 \u2014 Pivot Tables",
    type: "code_sandbox",
    prompt: "A pivot table is groupby in two dimensions \u2014 like an Excel pivot, but written down so it re-runs on new data.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Nairobi\", \"Mombasa\", \"Mombasa\", \"Kisumu\", \"Kisumu\"],\n    \"status\": [\"paid\", \"unpaid\", \"paid\", \"unpaid\", \"paid\", \"unpaid\"],\n    \"amount\": [340000, 180500, 210000, 98000, 120400, 71300]\n})\n\n# Create a pivot table\npivot = df.pivot_table(\n    index=\"county\",\n    columns=\"status\",\n    values=\"amount\",\n    aggfunc=\"sum\"\n)\nprint(pivot)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  39: {
    id: 39,
    title: "Stage 4.7 \u2014 Merge in Code",
    type: "code_sandbox",
    prompt: "Let's bring two tables together. Both have a `county` column \u2014 that's our key.",
    starterCode: "import pandas as pd\n\n# Sales data\nsales = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Kisumu\", \"Nakuru\"],\n    \"total_sales\": [589609, 355173, 191199, 219837]\n})\n\n# Population data (slightly different county names to test matching)\npopulation = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Kisumu\", \"Nakuru\"],\n    \"population\": [4397073, 1208333, 1155574, 2162202]\n})\n\n# Merge on county\nmerged = sales.merge(population, on=\"county\", how=\"left\")\nprint(merged)\n\n# Calculate sales per person\nmerged[\"sales_per_person\"] = merged[\"total_sales\"] / merged[\"population\"]\nprint(\"\\nSales per person:\")\nprint(merged[[\"county\", \"sales_per_person\"]].sort_values(\"sales_per_person\", ascending=False))",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  41: {
    id: 41,
    title: "Stage 4.9 \u2014 Grouping by Two Columns",
    type: "code_sandbox",
    prompt: "What if you want to group by county AND status? Put the keys in a list.",
    starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Nairobi\", \"Nairobi\", \"Mombasa\", \"Mombasa\", \"Kisumu\", \"Kisumu\"],\n    \"status\": [\"paid\", \"paid\", \"unpaid\", \"paid\", \"unpaid\", \"paid\", \"unpaid\"],\n    \"amount\": [1200, 800, 1500, 2100, 900, 3400, 600]\n})\n\n# Group by county AND status\nresult = df.groupby([\"county\", \"status\"])[\"amount\"].sum()\nprint(result)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
  42: {
    id: 42,
    title: "Stage 4.10 \u2014 Complete Analysis Workflow",
    type: "code_sandbox",
    prompt: "Load, merge, group, sort \u2014 four steps, one clear table of answers. This is data analysis.",
    starterCode: "import pandas as pd\n\n# Step 1: Load transactions\ntransactions = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Nairobi\", \"Mombasa\", \"Mombasa\", \"Kisumu\", \"Nakuru\", \"Nakuru\", \"Nairobi\"],\n    \"amount\": [1200, 800, 2100, 900, 3400, 600, 1100, 1500],\n    \"status\": [\"paid\", \"paid\", \"paid\", \"unpaid\", \"paid\", \"paid\", \"unpaid\", \"paid\"]\n})\n\n# Step 2: Load population data\npopulation = pd.DataFrame({\n    \"county\": [\"Nairobi\", \"Mombasa\", \"Kisumu\", \"Nakuru\"],\n    \"population\": [4397073, 1208333, 1155574, 2162202]\n})\n\n# Step 3: Merge\nmerged = transactions.merge(population, on=\"county\", how=\"left\")\n\n# Step 4: Group and aggregate\nsummary = (merged.groupby(\"county\")\n    .agg(\n        total_sales=(\"amount\", \"sum\"),\n        transaction_count=(\"amount\", \"count\"),\n        population=(\"population\", \"first\")\n    )\n    .sort_values(\"total_sales\", ascending=False))\n\n# Step 5: Calculate per-capita\nsummary[\"sales_per_person\"] = summary[\"total_sales\"] / summary[\"population\"]\n\nprint(summary)",
    validationScript: "valid = True\nerror = ''",
    successMessage: "Task completed successfully."
  },
};
