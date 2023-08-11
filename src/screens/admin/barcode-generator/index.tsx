
// import React from 'react';
// import Barcode from 'react-barcode';
// import htmlToImage from 'html-to-image';

// interface BarcodeGeneratorProps {
//     barcodeArray: string[];
//     width: number;
//     height: number;
//   }
  
//   const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ barcodeArray, width, height }) => {
//     const generateBarcodes = async () => {
//       for (let i = 0; i < barcodeArray.length; i++) {
//         const barcodeValue = barcodeArray[i];
  
//         const barcodeElement = (
//           <div style={{ width: `${width}px`, height: `${height}px` }}>
//             <Barcode value={barcodeValue} />
//           </div>
//         );
  
//         const dataURL = await htmlToImage.toPng(barcodeElement);
  
//         const downloadLink = document.createElement('a');
//         downloadLink.href = dataURL;
//         downloadLink.download = `barcode_${barcodeValue}.png`;
  
//         downloadLink.click();
//       }
//     };
  
//     return (
//       <button onClick={generateBarcodes}>Generate Barcodes</button>
//     );
//   };
  
//   export default BarcodeGenerator;