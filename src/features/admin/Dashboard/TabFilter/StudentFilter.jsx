import React from 'react'
import Table from '../../../../components/Table/Table';

const StudentFilter = () => {
    const columns = [
        {
          field: "id",
          headerName: "ID",
          width: 150,
        },
    
        { field: "fullName", headerName: "fullName", width: 300 },
        {
          field: "accountStudent", // Thêm cột mới cho tên của courseClass
          headerName: "email ",
          width: 300,
          valueGetter: (params) => params.row.accountStudent.email,
        },
        {
            field: "createdAt", // Thêm cột mới cho tên của courseClass
            headerName: "created Date",
            width: 200,
            valueGetter: (params) => params.row.createdAt,
          },
        // {
        //   field: "active",
        //   headerName: "Active",
        //   width: 200,
        //   renderCell: (params) => {
        //     return params.row.active ? (
        //       <Chip
        //         label="Active"
        //         color="success"
        //         variant="outlined"
        //         className="w-20 !h-7"
        //       />
        //     ) : (
        //       <Chip
        //         label="Active"
        //         color="success"
        //         variant="outlined"
        //         className="w-20 !h-7"
        //       />
        //     );
        //   },
        // },
       
      ];

  return (
    <div>
      <Table columns={columns} rows={[]} />
        
    </div>
    )
}

export default StudentFilter