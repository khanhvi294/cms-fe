import "./certificate.css";
const Certificate = () => {
  return (
    <div className="certificate-container">
      <div className="certificate">
        <div className="water-mark-overlay"></div>
        {/* <div className="certificate-header">
            <img src="https://rnmastersreview.com/img/logo.png" className="logo" alt="">
        </div> */}
        <div className="certificate-body">
          <p className="certificate-title">
            <strong>CODEGYM TRAINING CENTER</strong>
          </p>
          <h1>Certificate of Achievement</h1>
          <p className="student-name mb-4">Matthew Taylor</p>
          <div className="certificate-content">
            <div className="about-certificate mb-4">
              <p>has achieved the [Top Position] in the [Competition Name]</p>
            </div>

            <div className="text-center mt-3">
              <p className="topic-description text-muted">
                Awarded on this day to honor your outstanding performance and
                commendable commitment to excellence in the field of coding.
                Your remarkable skills, dedication, and innovative thinking have
                set you apart, making you one of the top performers in this
                [Competition Name].
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
  );
};

export default Certificate;
