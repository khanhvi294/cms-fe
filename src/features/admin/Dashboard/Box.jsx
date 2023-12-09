import { useQuery } from 'react-query';
import BoxOverview from '../../../components/BoxOverview/BoxOverview';
import { getOverviewAll } from '../../../services/dashboardService';


const Box = () => {

  const {data} = useQuery(
    {
      queryKey: ["overviewAll"],
      queryFn: getOverviewAll,
     
    }
  )

  console.log("dataaa ", data)

  return (
   <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6 text-white'>
     <BoxOverview className={"bg-red-400"} title={"Students"} data={data?.data?.student} />
     <BoxOverview className={"bg-blue-400"} title={"Teachers"} data={data?.data?.teacher} />
     <BoxOverview className={"bg-green-400"} title={"Employees"} data={data?.data?.employee} />
     <BoxOverview className={"bg-purple-400"} title={"Courses"} data={data?.data?.course} /> 
     <BoxOverview className={"bg-gray-400"} title={"Classes"}  data={data?.data?.class}/>
     <BoxOverview className={"bg-orange-400"} title={"Competitions"} data={data?.data?.competition} />
   </div>
  )
}

export default Box;