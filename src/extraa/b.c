import JsBarcode from "jsbarcode";
import jsPDF from "jspdf";

const BarcodeGenerator = () => {
  const barcodes = [
    "SU1001SM",
    "SU1002SM",
    "SU1003SM",
    "SU1004SM",
    "SU1005SM",
    "SU1006SM",
    "SU1007SM",
    "SU1008SM",
    "SU1009SM",
    "SU10010SM",
    "SU10011SM",
    "SU10012SM",
    "SU10013SM",
    "SU10014SM",
    "SU10015SM",
    "SU10016SM",
    "SU10017SM",
    "SU10018SM",
    "SU10019SM",
    "SU10020SM",
    "SU10021SM",
    "SU10022SM",
    "SU10023SM",
    "SU10024SM",
    "SU10025SM",
    "SU10026SM",
    "SU10027SM",
    "SU10028SM",
    "SU10029SM",
    "SU10030SM",
    "SU10031SM",
    "SU10031SM",
    "SU10031SM",
    "SU10031SM",
    "SU10031SM",
    "SU10031SM",
  ];




  const generateBarcodePDF = () => {
    const pageWidth = 210; // A4 page width in mm
    const pageHeight = 297; // A4 page height in mm
    const margin = 10; // Margin in mm
    const imageWidth =2*25.4 // Assuming 3 images per row
    const imageHeight = 1*25.4 // Assuming 10 images per column
    // const imageWidth = (pageWidth - 2 * margin) / 3; // Assuming 3 images per row
    // const imageHeight = (pageHeight - 2 * margin) / 10; // Assuming 10 images per column
    const imagesPerPage = 30; // Number of images per page

    const doc = new jsPDF("p", "mm", "a4");
    let currentX = margin;
    let currentY = margin;
    let imageCount = 0;
    let pageCount = 1;

    for (let i = 0; i < barcodes.length; i++) {
      const barcodeValue = barcodes[i];
      const canvas = document.createElement("canvas");
      
      JsBarcode(canvas, barcodeValue, {
        format: "CODE128", // Specify the barcode format if required
        displayValue: true, // Show the barcode value
        text: barcodeValue + " " + "Mrp:Rs 400", // Replace with the desired barcode value
        width: 1.5, // 2 inches width
        height:40, // 1 inch height
        margin: 5,
        background:"RED"

      });

     

      const dataUrl = canvas.toDataURL("image/png");
      doc.addImage(dataUrl, "PNG", currentX, currentY, imageWidth, imageHeight);

      // doc.text("", currentX, currentY + imageHeight + 5); // Display barcode value below the barcode image

      currentX += imageWidth + margin;
      imageCount++;

      if (imageCount % 3 === 0) {
        currentX = margin;
        currentY += imageHeight + margin;
      }

      if (imageCount === imagesPerPage) {
        if (i !== barcodes.length - 1) {
          doc.addPage();
          currentX = margin;
          currentY = margin;
          imageCount = 0;
          pageCount++;
        }
      }
    }

    doc.save(`barcodes_page_${pageCount}.pdf`);
  };

  return (
    <div className="m-10">
      <button onClick={generateBarcodePDF}>Generate Barcode PDF</button>
     
    </div>
  );
};

export default BarcodeGenerator;
