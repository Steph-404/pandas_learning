import { retail_50k_csv } from '../data/datasets';

let pyodideInstance: any = null;
let isLoading = false;
let initPromise: Promise<any> | null = null;

// Initialize Pyodide and install Pandas
export const loadPyodide = async () => {
  if (pyodideInstance) return pyodideInstance;
  if (isLoading && initPromise) return initPromise;

  isLoading = true;
  initPromise = new Promise(async (resolve, reject) => {
    try {
      // Load pyodide script via a dynamic script tag if not present
      if (!(window as any).loadPyodide) {
        await new Promise((res, rej) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
          script.onload = res;
          script.onerror = rej;
          document.head.appendChild(script);
        });
      }

      pyodideInstance = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      });

      // Load micropip to install pandas
      await pyodideInstance.loadPackage('micropip');
      const micropip = pyodideInstance.pyimport('micropip');
      await micropip.install('pandas');

      // Create a virtual filesystem and write our dataset
      pyodideInstance.FS.mkdir('/data');
      pyodideInstance.FS.writeFile('/data/retail.csv', retail_50k_csv);

      // Define a custom stdout handler
      pyodideInstance.setStdout({
        batched: (str: string) => {
          if ((window as any).onPyodideStdout) {
            (window as any).onPyodideStdout(str);
          }
        }
      });

      isLoading = false;
      resolve(pyodideInstance);
    } catch (err) {
      isLoading = false;
      reject(err);
    }
  });

  return initPromise;
};

export const executePython = async (code: string) => {
  const pyodide = await loadPyodide();
  try {
    const result = await pyodide.runPythonAsync(code);
    return { success: true, result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
