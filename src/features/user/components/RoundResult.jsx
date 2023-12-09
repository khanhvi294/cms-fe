import { getRoundResultByIdAndStudentId } from '../../../services/roundResultService';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export const RoundResult = ({ round }) => {
	const userId = useSelector(
		(state) => state.user?.data?.info?.accountStudent?.id,
	);
	const { data } = useQuery({
		queryKey: ['roundResult', round?.id],
		enabled: true,
		queryFn: () =>
			getRoundResultByIdAndStudentId({
				id: round?.id,
				studentId: userId,
			}),
	});

	const roundResult = data?.data;

	if (!roundResult) return null;

	const score = roundResult?.score;
	const roundResultScore = roundResult?.roundResultScore;

	return (
		<div className="rounded-md w-[250px] shadow-md bg-white">
			<div className="relative flex items-center p-3 justify-between ">
				<p className="text-blue-500 font-medium text-lg">
					{round?.name}
				</p>

				<div className="flex justify-center border  rounded-full w-10 h-10  items-center">
					<p>{score ? score : 'N/A'}</p>
				</div>
			</div>
			{roundResultScore?.map((item, index) => {
				return (
					<div key={index} className="justify-between flex h-12 p-3">
						<span>{item?.scoreJudge?.employeeJudge?.fullName}</span>
						<span>{item?.score}</span>
					</div>
				);
			})}
		</div>
	);
};
