import jsPDF from "jspdf";
import "./certificate.css";
import html2canvas from "html2canvas";
import { useRef } from "react";
const Certificate = ({ name, nameCompetition, top }) => {
  const certificateRef = useRef(null);
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });

    const certificateElement = document.querySelector(".certificate");

    if (certificateElement) {
      try {
        // Sử dụng html2canvas để chuyển đổi nội dung thành hình ảnh
        const canvas = await html2canvas(certificateElement);

        // Tính toán kích thước hợp lý để vẽ lên PDF
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Thêm hình ảnh vào PDF với kích thước tính toán
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          pdfWidth,
          pdfHeight
        );

        // Tải xuống PDF
        pdf.save("certificate.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  //   image
  //   const handleDownloadPDF = async () => {
  //     const certificateElement = certificateRef.current;

  //     if (certificateElement) {
  //       try {
  //         // Sử dụng html2canvas để chuyển đổi nội dung thành hình ảnh
  //         const canvas = await html2canvas(certificateElement);

  //         // Tạo một hình ảnh có thể tải xuống
  //         const imageData = canvas.toDataURL("image/png");

  //         // Tạo một thẻ a để tải xuống hình ảnh
  //         const downloadLink = document.createElement("a");
  //         downloadLink.href = imageData;
  //         downloadLink.download = "certificate.png";
  //         downloadLink.click();
  //       } catch (error) {
  //         console.error("Error generating image:", error);
  //       }
  //     }
  //   };

  const handlePrint = async () => {
    const certificateElement = certificateRef.current;

    if (certificateElement) {
      try {
        // Sử dụng html2canvas để chuyển đổi nội dung thành hình ảnh
        const canvas = await html2canvas(certificateElement);

        // Tạo một đối tượng jsPDF với kích thước A4
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Tính toán kích thước hợp lý để vẽ hình ảnh lên trang A4
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Thêm hình ảnh từ canvas vào PDF
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          pdfWidth,
          pdfHeight
        );

        // Auto print the PDF
        pdf.autoPrint();
        window.open(pdf.output("bloburl"), "_blank");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <>
      <div className="text-center mt-1">
        <button className="btn btn-primary mr-2" onClick={handleDownloadPDF}>
          Download PDF
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="certificate-container">
        <div className="certificate" ref={certificateRef}>
          <div className="water-mark-overlay"></div>
          {/* <div className="certificate-header">
            <img src="https://rnmastersreview.com/img/logo.png" className="logo" alt="">
        </div> */}
          <div className="certificate-body">
            <p className="certificate-title">
              <strong>CODEGYM TRAINING CENTER</strong>
            </p>
            <h1>Certificate of Achievement</h1>
            <p className="student-name mb-4">{name}</p>
            <div className="certificate-content">
              <div className="about-certificate mb-4">
                <p>
                  has achieved the Top {top} in the {nameCompetition}
                </p>
              </div>

              <div className="text-center mt-3">
                <p className="topic-description text-muted">
                  Awarded on this day to honor your outstanding performance and
                  commendable commitment to excellence in the field of coding.
                  Your remarkable skills, dedication, and innovative thinking
                  have set you apart, making you one of the top performers in
                  this {nameCompetition}.
                </p>
              </div>
            </div>
            {/* <div className="certificate-footer text-muted">
            <div className="row">
              <div className="col-md-6">
                <p>Principal: ______________________</p>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <p>Accredited by</p>
                  </div>
                  <div className="col-md-6">
                    <p>Endorsed by</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;
