// src/components/CertificateGenerator.js (React)
import React from "react";
import Certificate from "../../components/Certificate/certificate";

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

  return <Certificate />;
};

export default CertificateGenerator;
