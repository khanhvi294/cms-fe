import React, { useState } from 'react'
import Table from '../../../../components/Table/Table';
import { TextField } from '@mui/material';
import { formatDate } from '../../../../utils/formatDate';
import { useQuery } from 'react-query';
import { filterStudentByDate } from '../../../../services/dashboardService';

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const StudentFilter = () => {
    const [fromDate, setFromDate] = useState(today.toISOString().split('T')[0])
    const [toDate, setToDate] = useState(today.toISOString().split('T')[0])

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
            valueGetter: (params) => formatDate(params.row.createdAt),
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

    const {data} = useQuery({
        queryKey: ['filter', `${fromDate}-${toDate}`],
        queryFn: () => filterStudentByDate({from:fromDate, to:toDate})
    })


  return (
    <div className='w-full'>
        <div className='flex gap-4 '>
            <TextField type="date" 
            InputProps={{inputProps: { max: fromDate} }}
            label="From" onChange={(e) => setFromDate(e.target.value)}
                    defaultValue={today.toISOString().split('T')[0]}
                />
            <TextField type="date" label="To"
            InputProps={{inputProps: { min: toDate} }}
            onChange={(e) =>  setToDate(e.target.value)}
                defaultValue={tomorrow.toISOString().split('T')[0]}
            />
        </div>
      <Table columns={columns} rows={data?.data?.data||[]} />
        
    </div>
    )
}

export default StudentFilter