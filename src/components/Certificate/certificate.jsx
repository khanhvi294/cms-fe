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
        <button
          className="btn bg-blue-500 p-2 rounded-md min-w-28 text-white btn-primary mr-2"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
        <button
          className="btn bg-yellow-500 p-2 rounded-md w-28 btn-secondary"
          onClick={handlePrint}
        >
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
            <p className="mb-4 italic text-5xl">{name}</p>
            <div className="certificate-content">
              <div className="  mb-4">
                <p className="text-2xl font-bold">
                  Has achieved the Top {top} in the {nameCompetition}
                </p>
              </div>

              <div className="text-center mt-8 font-semibold text-gray-600">
                <p className="topic-description text-muted">
                  Awarded on this day to honor your outstanding performance and
                  commendable commitment to excellence in the field of coding.
                  Your remarkable skills, dedication, and innovative thinking
                  have set you apart, making you one of the top performers in
                  this {nameCompetition}.
                </p>
              </div>
              <div className="flex px-16 justify-between items-center mt-20">
                <div>
                  <p className="italic text-lg d-block border-b-2 border-gray-700">
                    {name}
                  </p>
                  <p className=" text-xl">Signature</p>
                </div>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    id="Award"
                    width={70}
                  >
                    <g fill="#9ea8b4" class="color134563 svgShape">
                      <path
                        d="M37 38.2c4.2-3.2 10.5-8.1 10.5-25.9v-1.4H16.4v1.4c0 17.9 6.3 22.7 10.5 25.9 2.4 1.9 3.6 2.9 3.6 5.1v4.3c-2.3.2-4.5 1.1-5.3 2.8H22c-1.6 0-2.8 1.3-2.8 2.8h25.4c0-1.6-1.3-2.8-2.8-2.8h-3.2c-.8-1.7-3-2.5-5.3-2.8v-4.3c.1-2.3 1.3-3.3 3.7-5.1zm-5 .8c-.9-1.2-2.1-2.1-3.3-3-3.8-3-9.1-7-9.4-22.3h25.4C44.4 29 39.2 33 35.3 36c-1.2.9-2.4 1.8-3.3 3z"
                        fill="#000000"
                        class="color000000 svgShape"
                      ></path>
                      <path
                        d="M23.3 34.8C23.1 34.8 8 31.6 8 15.1v-1.4h9.9v2.8h-7c.8 13 12.8 15.5 12.9 15.6l-.5 2.7m17.4 0-.6-2.8c.5-.1 12.1-2.6 12.9-15.6h-7v-2.8h10V15c0 16.6-15.1 19.8-15.3 19.8"
                        fill="#000000"
                        class="color000000 svgShape"
                      ></path>
                    </g>
                  </svg>
                </p>
                <div>
                  <p className="italic text-lg d-block border-b-2 border-gray-700">
                    CodeGym
                  </p>
                  <p className="text-xl">Signature</p>
                </div>
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
