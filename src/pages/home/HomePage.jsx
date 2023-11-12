import CompetitionListFetch from "../../features/user/competitionListFetch/CompetitionListFetch";

const HomePage = () => {
  return (
    <div>
      <h1 className="font-semibold text-[#f9bd28] text-2xl">Competition</h1>
      <p className="mb-10 mt-6">
        Hệ thống được xây dựng để giúp tổ chức các cuộc thi lập trình trực
        tuyến, dành cho sinh viên, nhà phát triển và các chuyên gia trên khắp
        thế giới. Các cuộc thi của chúng tôi tập trung vào giải quyết vấn đề, tư
        duy tính toán, suy luận logic và tối ưu thuật toán, vì vậy chúng tôi
        chọn C#, Javascript, Python làm các ngôn ngữ lập trình chính để bạn giải
        quyết các bài toán phức tạp do các kỹ sư của chúng tôi thiết kế. Tham
        gia một cuộc thi lập trình như thế này cần có thời gian và năng lượng,
        ngoài điểm số và giải thưởng, đây là một vài lý do tại sao nỗ lực của
        bạn sẽ xứng đáng: Cơ hội kiểm tra và phát triển khả năng lập trình Cơ
        hội học hỏi và cọ xát cùng các tài năng lập trình Giúp các công ty tìm
        kiếm các tài năng lập trình
      </p>
      <div className="flex flex-col items-center mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          id="Cup"
          width={50}
          height={50}
        >
          <path
            d="M21,4H18V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V4H3A1,1,0,0,0,2,5V8a4,4,0,0,0,4,4H7.54A6,6,0,0,0,11,13.91V16H10a3,3,0,0,0-3,3v2a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V19a3,3,0,0,0-3-3H13V13.91A6,6,0,0,0,16.46,12H18a4,4,0,0,0,4-4V5A1,1,0,0,0,21,4ZM6,10A2,2,0,0,1,4,8V6H6V8a6,6,0,0,0,.35,2Zm8,8a1,1,0,0,1,1,1v1H9V19a1,1,0,0,1,1-1ZM16,8A4,4,0,0,1,8,8V4h8Zm4,0a2,2,0,0,1-2,2h-.35A6,6,0,0,0,18,8V6h2Z"
            fill="#f9bd28"
            className="color000000 svgShape"
          ></path>
        </svg>
        <h1 className="font-semibold  text-xl">List Competition</h1>
      </div>
      <CompetitionListFetch />
    </div>
  );
};

export default HomePage;
