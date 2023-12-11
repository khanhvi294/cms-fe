import {
	getAllCompetitionByStudentId,
	registerCompetition,
	unRegisterCompetition,
} from '../../../services/registerService';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Chip } from '@mui/material';
import { Competition } from '../components/Competition';
import { getCompetitionsForStudent } from '../../../services/studentService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CompetitionListFetch = () => {
	const user = useSelector((state) => state.user?.data?.info);
	const queryClient = useQueryClient();
	const { data: competitionsData } = useQuery({
		queryKey: ['competitions', user?.accountStudent?.id],
		queryFn: () => getCompetitionsForStudent(user?.accountStudent?.id),
		enabled: !!user?.id,
		onError: (err) => console.log(err),
	});

	const competitions = useMemo(
		() => competitionsData?.data || [],
		[competitionsData],
	);

	const registerCompetitionMutation = useMutation({
		mutationFn: registerCompetition,
		onSuccess: (data) => {
			//setRows((state) => [data.data, ...state]);
			queryClient.invalidateQueries(['competition', user?.id]);
			toast.success('Register successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const unRegisterCompetitionMutation = useMutation({
		mutationFn: unRegisterCompetition,
		onSuccess: (data) => {
			//setRows((state) => [data.data, ...state]);
			queryClient.invalidateQueries(['competition', user?.id]);

			toast.success('Unregister successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const { data: competitionUser } = useQuery({
		queryKey: ['competition', user?.id],
		enabled: !!user?.id,
		queryFn: getAllCompetitionByStudentId,
	});

	const competitionIds = useMemo(() => {
		return competitionUser?.data?.data.map(
			(item) => item.competitionRegister?.id,
		);
	}, [competitionUser?.data?.data]);

	const [currentStatus, setCurrentStatus] = useState(statusList[0]);
	const [currentRegister, setCurrentRegister] = useState(registerList[0]);

	const competitionsFilter = useMemo(() => {
		let result = competitions;
		if (currentStatus.value !== -1) {
			result = result.filter(
				(item) => item.status === currentStatus.value,
			);
		}
		if (currentRegister.value !== -1) {
			result = result.filter((item) => {
				const isRegister = competitionIds?.includes(item.id);
				if (currentRegister.value === 0) return isRegister;
				return !isRegister;
			});
		}
		return result;
	}, [competitions, currentStatus, currentRegister, competitionIds]);

	return (
		<>
			<p className="text-xl font-semibold mb-5">List competitions</p>
			<Filter
				onStatusChange={setCurrentStatus}
				onRegisterChange={setCurrentRegister}
			/>

			<div className="flex flex-wrap gap-5">
				{competitionsFilter.map((competition) => {
					return (
						<Competition
							key={competition.id}
							competition={competition}
							competitionIds={competitionIds}
							onRegister={() =>
								registerCompetitionMutation.mutate(
									competition.id,
								)
							}
							onUnregister={() =>
								unRegisterCompetitionMutation.mutate(
									competition.id,
								)
							}
						/>
					);
				})}
			</div>
		</>
	);
};

export default CompetitionListFetch;

const statusList = [
	{
		label: 'All',
		value: -1,
	},
	{
		label: 'Upcoming',
		value: 0,
	},
	{
		label: 'In progress',
		value: 1,
	},
	{
		label: 'Completed',
		value: 2,
	},
	{
		label: 'Canceled',
		value: 3,
	},
];

const registerList = [
	{
		label: 'All',
		value: -1,
	},
	{
		label: 'Registered',
		value: 0,
	},
	{
		label: 'Not registered',
		value: 1,
	},
];

const Filter = ({ onStatusChange, onRegisterChange }) => {
	const [status, setStatus] = useState(statusList[0]);
	const [register, setRegister] = useState(registerList[0]);

	const handleStatusChange = (value) => {
		setStatus(value);
		onStatusChange(value);
	};

	const handleRegisterChange = (value) => {
		setRegister(value);
		onRegisterChange(value);
	};

	return (
		<div className="flex gap-5 mb-4">
			<div className="flex flex-col gap-2">
				<p className="text-lg font-semibold">Status</p>

				<div className="flex gap-2">
					{statusList.map((item, index) => (
						<Chip
							key={index}
							label={item.label}
							onClick={() => handleStatusChange(item)}
							className={`${
								status.value === item.value
									? '!bg-[#38c0e6] !text-white'
									: '!bg-[#ddf3f9] !text-[#38c0e6]'
							} !font-medium`}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-lg font-semibold">Register</p>
				<div className="flex gap-2">
					{registerList.map((item, index) => (
						<Chip
							key={index}
							label={item.label}
							onClick={() => handleRegisterChange(item)}
							className={`${
								register.value === item.value
									? '!bg-[#38c0e6] !text-white'
									: '!bg-[#ddf3f9] !text-[#38c0e6]'
							} !font-medium`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
