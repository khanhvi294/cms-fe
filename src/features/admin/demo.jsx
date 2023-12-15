// src/components/CertificateGenerator.js (React)
import React from "react";

const CertificateGenerator = () => {
  const generateCertificate = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/generate-certificate"
      );
      console.log(response);
      const blob = await response.blob();

      // Tạo một liên kết để tải về file PDF
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = "certificate.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Mở hộp thoại in sau khi tải xong
      window.print();
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Certificate Generator</h1>
      <button
        onClick={generateCertificate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate and Print Certificate
      </button>
    </div>
  );
};

export default CertificateGenerator;
