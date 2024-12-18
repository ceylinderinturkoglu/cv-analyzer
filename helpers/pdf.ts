import * as pdfjsLib from "pdfjs-dist";

export const extractTextFromPDF = async (file: File): Promise<string> => {
  if (file.type !== "application/pdf") {
    return Promise.reject("Yalnızca PDF dosyaları kabul edilir.");
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

  const fileReader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        if (!(fileReader.result instanceof ArrayBuffer)) {
          reject("Dosya işlenirken bir hata oluştu.");
          return;
        }

        const pdf = await pdfjsLib.getDocument({ data: fileReader.result })
          .promise;
        const totalPageCount = pdf.numPages;

        const textPromises: string[] = [];
        for (
          let currentPage = 1;
          currentPage <= totalPageCount;
          currentPage++
        ) {
          const page = await pdf.getPage(currentPage);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");
          textPromises.push(pageText);
        }

        const extractedText = textPromises
          .join("\n\n")
          .replace(/ \u0000 /g, "i")
          .replace(/\s{2,}/g, " ");

        resolve(extractedText);
      } catch (error) {
        reject("PDF işlenirken bir hata oluştu.");
      }
    };

    fileReader.onerror = () => reject("Dosya okunurken bir hata oluştu.");
    fileReader.readAsArrayBuffer(file);
  });
};
