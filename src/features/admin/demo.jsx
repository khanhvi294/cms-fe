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

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    const isChecked = checkedItems.includes(id);

    if (isChecked) {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);
    }
  };

  const handleCheckAll = () => {
    const allChecked = data.every((item) => checkedItems.includes(item.id));

    if (allChecked) {
      // Nếu tất cả các phần tử đã được chọn, bỏ chọn tất cả
      setCheckedItems([]);
    } else {
      // Nếu có ít nhất một phần tử chưa được chọn, chọn tất cả
      setCheckedItems(data.map((item) => item.id));
    }
  };

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
      <Button variant="contained" onClick={handleCheckAll}>
        {checkedItems.length === data.length ? "Bỏ chọn hết" : "Chọn hết"}
      </Button>
      <Button variant="contained" onClick={getCheckedItems}>
        Lấy các phần tử đã chọn
      </Button>
    </div>
  );
};

export default Demo;
