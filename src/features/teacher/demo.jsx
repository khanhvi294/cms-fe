import { Box, Button, Checkbox, FormControlLabel, Modal } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllRoundByJudge } from "../../services/judgeService";

import { uploadFile } from "../../utils/cloundinaryFns";

const Demo = () => {
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    // ...Thêm các phần tử khác nếu cần
  ];

  // State để lưu trữ các checkbox đã chọn
  const [checkedItems, setCheckedItems] = useState([]);

  // Hàm xử lý khi checkbox thay đổi
  const handleCheckboxChange = (id) => {
    const isChecked = checkedItems.includes(id);

    if (isChecked) {
      // Nếu đã chọn thì loại bỏ khỏi danh sách
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    } else {
      // Nếu chưa chọn thì thêm vào danh sách
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  // Hàm để lấy các phần tử đã chọn
  const getCheckedItems = () => {
    console.log(
      "Các phần tử đã chọn:",
      checkedItems.map((id) => data.find((item) => item.id === id))
    );
  };
  return (
    <div>
      {data.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              checked={checkedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
          }
          label={item.name}
        />
      ))}
      <Button variant="contained" onClick={getCheckedItems}>
        Lấy các phần tử đã chọn
      </Button>
    </div>
  );
};

export default Demo;
