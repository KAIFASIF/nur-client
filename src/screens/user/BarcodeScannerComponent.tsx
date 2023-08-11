import React, { useEffect } from 'react';

function BarcodeScannerComponent() {
  useEffect(() => {
    const handleBarcodeScan = (event) => {
      // Check if the event came from the barcode scanner
      if (event.target.nodeName === 'INPUT') {
        const barcodeValue = event.target.value;
        // Call your function with the barcode value
        handleBarcodeScanResult(barcodeValue);
        // Clear the input value if needed
        event.target.value = '';
      }
    };

    document.addEventListener('keydown', handleBarcodeScan);

    return () => {
      document.removeEventListener('keydown', handleBarcodeScan);
    };
  }, []);

  const handleBarcodeScanResult = (barcodeValue) => {
    // Perform actions with the scanned barcode value

    
    console.log('Scanned barcode:', barcodeValue);
    // Call your function or update state as needed
  };

  return (
    <div>
      {/* Other components */}
      <input type="text" autoFocus />
      {/* Other components */}
    </div>
  );
}

export default BarcodeScannerComponent;
