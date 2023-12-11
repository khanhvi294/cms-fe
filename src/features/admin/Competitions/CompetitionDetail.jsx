import {
	Box,
	Button,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
	addClassToCompetition,
	deleteClassCompetition,
	getAllClassCanJoinCompetitionUpdate,
	getAllClassJoinCompetition,
	getCompetitionById,
} from '../../../services/competitionService';
import {
	createRound,
	getRoundByCompetition,
} from '../../../services/roundService';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FinalResult } from '../../user/components/FinalResult';
import { GridActionsCellItem } from '@mui/x-data-grid';
import ModalAddRound from '../../../components/admin/rounds/modalAddRound';
import ModalConfirmDelete from '../../../components/Modal/modalConfirmDelete';
import PropTypes from 'prop-types';
import RoundTable from '../../../components/admin/rounds/tableCollapRound';
import { STATUS_COMPETITION } from '../../../configs/competitionStatus';
import Table from '../../../components/Table/Table';
import { toast } from 'react-toastify';
import { useModal } from '../../../hooks/use-modal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const CompetitionDetail = () => {
	const { id } = useParams();
	const [competition, setCompetition] = useState();
	const {
		close: closeFinal,
		isOpen: isOpenFinal,
		open: OpenFinal,
	} = useModal();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		reset();
		setOpen(false);
	};

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	const [rows, setRows] = useState([]);
	// const queryClient = useQueryClient();

	const onSubmit = (data) => {
		console.log(data);
		addClassToCompetitionMutate.mutate({ ...data, id: id });
		setOpenAddClass(false);
		reset();
	};

	useQuery({
		queryKey: ['competition', id],
		enabled: !!id,
		queryFn: () => getCompetitionById(id),
		onSuccess: (data) => {
			console.log(data);
			setCompetition(data.data);
		},
	});

	useQuery({
		queryKey: ['rounds', id],
		enabled: !!id,
		queryFn: () => getRoundByCompetition(id),
		onSuccess: (data) => {
			setRows(data.data.data);
		},
	});

	useQuery({
		queryKey: ['classes', id],
		enabled: !!id,
		queryFn: () => getAllClassJoinCompetition(id),
		onSuccess: (data) => {
			console.log('class', data);
		},
	});

	const createRoundMutation = useMutation({
		mutationFn: (data) => createRound(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['rounds', id]);

			toast.success('Create successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	// class

	const columnsClass = [
		{
			field: 'id',
			headerName: 'ID',
			width: 450,
		},
		{ field: 'name', headerName: 'name', width: 450 },
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			getActions: (params) => [
				<GridActionsCellItem
					key={params.row.id}
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							id="Delete"
							x="0"
							y="0"
							version="1.1"
							viewBox="0 0 29 29"
							xmlSpace="preserve"
							width={15}
							onClick={() => {
								setClassDelete({
									classId: params?.row?.id,
									competitionId: competition?.id,
								});
								setOpenDeleteClass(true);
							}}
						>
							<path
								d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8 8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z"
								fill="#151515"
								className="color000000 svgShape"
							></path>
							<path
								d="M26 8H3a1 1 0 1 1 0-2h23a1 1 0 1 1 0 2zM14.5 23a1 1 0 0 1-1-1V11a1 1 0 1 1 2 0v11a1 1 0 0 1-1 1zM10.999 23a1 1 0 0 1-.995-.91l-1-11a1 1 0 0 1 .905-1.086 1.003 1.003 0 0 1 1.087.906l1 11a1 1 0 0 1-.997 1.09zM18.001 23a1 1 0 0 1-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 0 1 .905 1.086l-1 11a1 1 0 0 1-.995.91z"
								fill="#151515"
								className="color000000 svgShape"
							></path>
							<path
								d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z"
								fill="#151515"
								className="color000000 svgShape"
							></path>
						</svg>
					}
					label="Delete"
				/>,
			],
		},
	];
	const [rowsClass, setRowsClass] = useState([]);
	const [openAddClass, setOpenAddClass] = useState(false);
	const [openDeleteClass, setOpenDeleteClass] = useState(false);
	const [classDelete, setClassDelete] = useState(false);
	const queryClient = useQueryClient();

	useQuery({
		queryKey: ['classCompetition', id],
		enabled: !!id,
		queryFn: () => getAllClassJoinCompetition(id),
		onSuccess: (data) => {
			setRowsClass(data.data.data);
		},
	});
	//ds class để chọn
	const { data: classesJoin } = useQuery({
		queryKey: ['classesJoin', competition?.timeStart],
		enabled: !!competition?.timeStart,
		queryFn: () => getAllClassCanJoinCompetitionUpdate(competition?.id),
	});

	const addClassToCompetitionMutate = useMutation({
		mutationFn: (data) => addClassToCompetition(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries(['classCompetition', id]);
			queryClient.invalidateQueries([
				'classesJoin',
				competition?.timeStart,
			]);

			toast.success('Add successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const deleteClassCompetitionMutation = useMutation({
		mutationFn: deleteClassCompetition,
		onSuccess: () => {
			queryClient.invalidateQueries(['classCompetition', id]);
			queryClient.invalidateQueries([
				'classesJoin',
				competition?.timeStart,
			]);

			toast.success('Delete successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<div>
				<div className="bg-white min-h-[200px]  rounded-2xl  p-4 gap-5 ">
					<div className="flex justify-between">
						<p
							id="modal-modal-title"
							className="font-semibold self-center !text-xl"
						>
							Competition
						</p>
						{competition?.status === 2 && (
							<Button
								onClick={OpenFinal}
								color="error"
								variant="contained"
							>
								Result
							</Button>
						)}
					</div>
					<div className=" flex justify-between mt-4">
						<div className="w-[250px] flex flex-col gap-2">
							<div className="flex justify-between w-full ">
								<p className="font-bold">Id</p>
								<p>{competition?.id}</p>
							</div>

							<div className="flex justify-between w-full">
								<p className="font-bold">Name</p>
								<p>{competition?.name}</p>
							</div>

							<div className="flex justify-between w-full">
								<p className="font-bold">Number of prizes</p>
								<p>{competition?.numOfPrizes}</p>
							</div>
						</div>
						<div className="w-[250px] flex flex-col gap-2">
							<div className="flex justify-between w-full">
								<p className="font-bold">Rounds</p>
								<p>{competition?.numberOfRound}</p>
							</div>
							<div className="flex justify-between w-full">
								<p className="font-bold">Time Start</p>
								<p>{competition?.timeStart}</p>
							</div>
							<div className="flex justify-between w-full">
								<p className="font-bold">Time End</p>
								<p>{competition?.timeEnd}</p>
							</div>
						</div>
						<div className="w-[250px] flex flex-col gap-2">
							<div className="flex justify-between w-full">
								<p className="font-bold">
									Minimum number of students
								</p>
								<p>{competition?.minimumQuantity}</p>
							</div>

							<div className="flex justify-between w-full">
								<p className="font-bold">EmployeeId</p>
								<p>{competition?.employeeId}</p>
							</div>
							<div className="flex justify-between w-full">
								<p className="font-bold">Status</p>
								<div>
									{competition?.status ===
										STATUS_COMPETITION.CREATED && (
										<Chip
											label="Upcoming"
											color="info"
											variant="outlined"
											className="w-32 h-7"
										/>
									)}
									{competition?.status ===
										STATUS_COMPETITION.STARTED && (
										<Chip
											label="In progress"
											color="success"
											variant="outlined"
											className="w-32 h-7"
										/>
									)}

									{competition?.status ===
										STATUS_COMPETITION.ENDED && (
										<Chip
											label="Completed"
											color="secondary"
											variant="outlined"
											className="w-32 h-7"
										/>
									)}
									{competition?.status ===
										STATUS_COMPETITION.CANCEL && (
										<Chip
											label="Canceled"
											color="error"
											variant="outlined"
											className="w-32 h-7"
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					{/* <ModalSeeRound competition={competition} /> */}
				</div>

				<div>
					<Box sx={{ width: '100%' }} className="bg-white">
						<Box className="h-8 border-b rounded-md">
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
								className="bg-[#e7e5e5] !normal-case"
								sx={{
									'.Mui-selected': {
										color: `black !important`,
									},
								}}
							>
								<Tab
									className=" !normal-case"
									label="Rounds & Judges"
									{...a11yProps(0)}
								/>
								<Tab
									className=" !normal-case"
									label="Classes"
									{...a11yProps(1)}
								/>
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<div className="flex gap-2 justify-between items-center mb-4">
								<span className="text-xl font-semibold">
									Rounds
								</span>
								<Button
									variant="contained flex-end !bg-[#000] !text-white !rounded-md"
									onClick={handleOpen}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										id="plus"
										width={22}
										height={22}
									>
										<g
											data-name="Layer 2"
											fill="#ffffff"
											className="color000000 svgShape"
										>
											<g
												data-name="plus"
												fill="#ffffff"
												className="color000000 svgShape"
											>
												<rect
													width="24"
													height="24"
													opacity="0"
													transform="rotate(180 12 12)"
													fill="#ffffff"
													className="color000000 svgShape"
												></rect>
												<path
													d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
													fill="#ffffff"
													className="color000000 svgShape"
												></path>
											</g>
										</g>
									</svg>
									Add
								</Button>
							</div>
							<div className="overflow-auto h-[400px]">
								<RoundTable rows={rows} />
							</div>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<div className="flex gap-2 justify-between items-center mb-4">
								<span className="text-xl font-semibold">
									Classes
								</span>
								<Button
									variant="contained flex-end !bg-[#000] !text-white !rounded-md"
									onClick={() => {
										setOpenAddClass(true);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										id="plus"
										width={22}
										height={22}
									>
										<g
											data-name="Layer 2"
											fill="#ffffff"
											className="color000000 svgShape"
										>
											<g
												data-name="plus"
												fill="#ffffff"
												className="color000000 svgShape"
											>
												<rect
													width="24"
													height="24"
													opacity="0"
													transform="rotate(180 12 12)"
													fill="#ffffff"
													className="color000000 svgShape"
												></rect>
												<path
													d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
													fill="#ffffff"
													className="color000000 svgShape"
												></path>
											</g>
										</g>
									</svg>
									Add
								</Button>
							</div>
							<div>
								<Table
									columns={columnsClass}
									rows={rowsClass}
								/>
							</div>
						</CustomTabPanel>
					</Box>
					{/* class */}
				</div>
			</div>

			<ModalAddRound
				openAddRound={open}
				handleCloseAddRound={handleClose}
				competition={competition}
				addMutate={createRoundMutation}
			/>

			{openAddClass && (
				<Modal
					open={openAddClass}
					onClose={() => {
						setOpenAddClass(false);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					className="flex items-center justify-center "
				>
					<Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl ">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className=" flex flex-col p-4 gap-5"
						>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								className="font-bold "
							>
								Add Classes for competition
							</Typography>

							<FormControl>
								<InputLabel id="demo-mutiple-name-label">
									Classes
								</InputLabel>
								<Controller
									name="competitionClass"
									control={control}
									defaultValue={[]}
									render={({ field }) => (
										<Select
											label="Select Items"
											multiple
											{...field}
										>
											{classesJoin?.data?.map((item) => (
												<MenuItem
													key={item.id}
													value={item.id}
												>
													{item.name}
												</MenuItem>
											))}
										</Select>
									)}
								/>
							</FormControl>
							<Button
								variant="contained"
								className="self-end !normal-case !rounded-lg !bg-black"
								type="submit"
							>
								Save
							</Button>
						</form>
					</Box>
				</Modal>
			)}
			<ModalConfirmDelete
				open={openDeleteClass}
				setOpen={setOpenDeleteClass}
				deleteMutation={deleteClassCompetitionMutation}
				deleteId={classDelete}
			/>
			<Modal
				open={isOpenFinal}
				onClose={closeFinal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="flex items-center justify-center "
			>
				<FinalResult competition={competition} rounds={rows} />
			</Modal>
		</>
	);
};
export default CompetitionDetail;
