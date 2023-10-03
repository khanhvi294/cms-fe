function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white h-[70px] sticky top-0 bg-[#313a46]">hhh</div>
      <div className="flex-1">
        <div className="bg-slate-400 h-14">
          <ul className="flex h-full">
            <li
              className="px-3 "
              style={{ paddingTop: "auto", paddingBottom: "auto" }}
            >
              Cuộc thi
            </li>
            <li>Bài kiểm tra</li>
            <li>Bảng xếp hạng</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
