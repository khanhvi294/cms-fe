import { Button } from "@mui/material";
import Table from "../../components/Table/Table";

const Temp = () => {
  //admin

  return (
    /* admin */
    <>
      <div className="flex gap-2  justify-end">
        <Button variant="contained flex-end">Add</Button>
      </div>
      <Table />
    </>
  );
};

export default Temp;
