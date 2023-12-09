import { Chip } from '@mui/material';
import { RoundResult } from '../../features/user/components';
import { getCompetitionById } from '../../services/competitionService';
import { getRoundByCompetition } from '../../services/roundService';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const CompetitionResultPage = () => {
	const { id } = useParams();

	const { data: competitionData } = useQuery({
		queryKey: ['competition', id],
		queryFn: () => getCompetitionById(id),
	});

	const competition = competitionData?.data;

	const { data: roundsData } = useQuery({
		queryKey: ['rounds', id],
		queryFn: () => getRoundByCompetition(id),
	});

	const rounds = roundsData?.data?.data;
	const statusObj = useMemo(() => {
		let label = '';
		let className = '';
		switch (competition?.status) {
			case 0:
				label = 'Upcoming';
				className = '!bg-[#ddf3f9] !text-[#38c0e6] !font-medium';
				break;
			case 1:
				label = 'In progress';
				className = '!bg-[#ddf7ed] !text-[#28f2a5] !font-medium';
				break;
			case 2:
				label = 'Completed';
				className = '!bg-[#e8fbbb] !text-[#c3ed4f] !font-medium';
				break;
			case 3:
				label = 'Canceled';
				className = '!bg-[#f6b2a6] !text-[#f54323] !font-medium';
				break;
			default:
				break;
		}
		return { label, className };
	}, [competition?.status]);

	if (!rounds) return null;

	return (
		<div>
			<div className="bg-white mb-4 p-3 shadow rounded-md flex">
				<h1 className="text-2xl font-bold text-gray-800">
					{competition?.name}
				</h1>
				<div className="ml-auto">
					<span className="text-2xl font-bold text-gray-800">
						<Chip
							label={statusObj?.label}
							className={statusObj?.className}
						/>
					</span>
				</div>
			</div>
			{rounds.map((round) => {
				return <RoundResult key={round.id} round={round} />;
			})}
		</div>
	);
};

export default CompetitionResultPage;
