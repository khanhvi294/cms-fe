import { ArrowRightIcon, MenuIcon } from '../../../components/icons';
import { Button, Chip, IconButton, Tooltip } from '@mui/material';
import {
	getAllCompetitionByStudentId,
	registerCompetition,
	unRegisterCompetition,
} from '../../../services/registerService';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getCompetitionsForStudent } from '../../../services/studentService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CompetitionListFetch = () => {
	const user = useSelector((state) => state.user?.data?.info);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: competitionsData } = useQuery({
		queryKey: ['competitions', user?.accountStudent?.id],
		queryFn: () => getCompetitionsForStudent(user?.accountStudent?.id),
		enabled: !!user?.id,
		onError: (err) => console.log(err),
	});

	const competitions = competitionsData?.data || [];

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

	const handleShowResult = (id) => {
		navigate(`/competitions/${id}/result`);
	};

	return (
		<>
			<p className="text-xl font-semibold mb-5">List competitions</p>
			<div className="flex flex-wrap gap-5">
				{competitions.map((competition, index) => {
					const isRegister = competitionIds?.includes(competition.id);
					const status = competition.status;
					const canSeeResult =
						(status === 2 || status === 1) && isRegister;
					const { label, className } = getChipPropsObject(status);

					return (
						<div
							key={index}
							className="bg-white w-[416px] h-[350px] p-5 flex flex-col gap-8 drop-shadow-md rounded-lg"
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="font-semibold mb-3">
										{competition.name}
									</p>
									<Chip label={label} className={className} />
								</div>
								{status === 0 && (
									<>
										{isRegister ? (
											<Button
												className="!bg-[#f09b5e] !text-white"
												onClick={() =>
													unRegisterCompetitionMutation.mutate(
														competition.id,
													)
												}
											>
												UnRegister
											</Button>
										) : (
											<Button
												className="!bg-[#44badc] !text-white"
												onClick={() =>
													registerCompetitionMutation.mutate(
														competition.id,
													)
												}
											>
												Register
											</Button>
										)}
									</>
								)}
								{canSeeResult && (
									<Button
										onClick={() =>
											handleShowResult(competition.id)
										}
										className="!bg-[#ec4848] !text-white"
									>
										Results
									</Button>
								)}
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500 flex gap-1 items-center hover:underline">
									<MenuIcon />
									<span>
										{competition.people} participants
									</span>
								</span>
								<Tooltip title="Go to detail" placement="top">
									<IconButton
										aria-label="fingerprint"
										color="secondary"
										className="!bg-[#e3faf1]"
										onClick={() =>
											navigate(
												`/competition/${competition.id}`,
											)
										}
									>
										<ArrowRightIcon />
									</IconButton>
								</Tooltip>
							</div>
							<p className="text-xs uppercase font-medium ">
								DURATION
							</p>
							<div>
								<div className="flex w-[95%] justify-between mb-2">
									<p>{competition.timeStart}</p>
									<p>{competition.timeEnd}</p>
								</div>
								<div className="w-[95%] h-[6px] bg-slate-400 rounded-3xl"></div>
							</div>

							<p>{competition.numberOfRound} rounds</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default CompetitionListFetch;

const getChipPropsObject = (status) => {
	let label = '';
	let className = '';
	switch (status) {
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
};
