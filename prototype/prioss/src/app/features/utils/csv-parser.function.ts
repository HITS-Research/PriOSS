import Papa from "papaparse";
import JSZip from "jszip";

export async function parseCSVData(file: JSZip.JSZipObject, nestedKeys: string = ''): Promise<any[]> {
  const csvData = await file.async('string');
  const keysToParse = nestedKeys.split(',').map(key => key.trim());
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data as any[];
        if(keysToParse.length){
          for (const row of parsedData) {
            for (const key of keysToParse) {
              if (row[key]) {
                try {
                  row[key] = JSON.parse(row[key]);
                } catch (e) {
                  console.error(`Error parsing ${key} as JSON:`, e);
                }
              }
            }
          }
        }
        resolve(parsedData);
      },
      error: function (error: any) {
        console.error("Error parsing CSV:", error);
        reject(error);
      }
    });
  });
}
