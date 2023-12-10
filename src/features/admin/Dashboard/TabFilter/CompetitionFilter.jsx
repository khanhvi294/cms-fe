import React, { useState } from 'react'
import Table from '../../../../components/Table/Table';
import { Chip, TextField } from '@mui/material';
import { formatDate } from '../../../../utils/formatDate';
import { useQuery } from 'react-query';
import { filterCompetitionByDate } from '../../../../services/dashboardService';
import { STATUS_COMPETITION } from '../../../../configs/competitionStatus';

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const CompetitionFilter = () => {
    const [fromDate, setFromDate] = useState(today.toISOString().split('T')[0])
    const [toDate, setToDate] = useState(today.toISOString().split('T')[0])

    const columns = [
        {
          field: "id",
          headerName: "ID",
          width: 100,
        },
        { field: "name", headerName: "name", width: 250 },
        { field: "employeeId", headerName: "employeeid", width: 200 },
        { field: "timeStart", headerName: "timeStart", width: 200 },
        {
          field: "status",
          headerName: "status",
          width: 200,
          renderCell: (params) => {
            return (
              <div>
                {params.row.status === STATUS_COMPETITION.CREATED && (
                  <Chip
                    label="Upcoming"
                    color="info"
                    variant="outlined"
                    className="w-32 h-7"
                  />
                )}
                {params.row.status === STATUS_COMPETITION.STARTED && (
                  <Chip
                    label="In progress"
                    color="success"
                    variant="outlined"
                    className="w-32 h-7"
                  />
                )}
    
                {params.row.status === STATUS_COMPETITION.ENDED && (
                  <Chip
                    label="Completed"
                    color="secondary"
                    variant="outlined"
                    className="w-32 h-7"
                  />
                )}
                {params.row.status === STATUS_COMPETITION.CANCEL && (
                  <Chip
                    label="Canceled"
                    color="error"
                    variant="outlined"
                    className="w-32 h-7"
                  />
                )}
              </div>
            );
          },
        },
        
      ];

    const {data} = useQuery({
        queryKey: ['filter', `${fromDate}-${toDate}`],
        queryFn: () => filterCompetitionByDate({from:fromDate, to:toDate})
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

export default CompetitionFilter