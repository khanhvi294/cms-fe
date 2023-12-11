import * as React from 'react';

import {
	Button,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import {
	deleteJudgeInRound,
	getJudgeByRound,
} from '../../../services/judgeService';
import { deleteRound, updateRound } from '../../../services/roundService';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import Box from '@mui/material/Box';
import { CheckIcon } from '../../icons/CheckIcon';
import Collapse from '@mui/material/Collapse';
import { FlagIcon } from '../../icons';
import IconButton from '@mui/material/IconButton';
import ModalAddJudge from '../judges/modalAddJudge';
import ModalApprove from './ModelApprove';
import ModalConfirmDelete from '../../Modal/modalConfirmDelete';
import { ModalRoundResult } from '../../../features/admin/Competitions/ModalRoundResult';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { getExamForms } from '../../../services/examFormService';
import { getFileName } from '../../../utils/getFileName';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../utils/cloundinaryFns';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../hooks/use-modal';

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const [openAddJudges, setOpenAddJudges] = React.useState(false);
	const [judges, setJudges] = React.useState([]);
	const [openDelete, setOpenDelete] = React.useState(false);
	const [itemDelete, setItemDelete] = React.useState();
	const [funcDelete, setFuncDelete] = React.useState(false);
	const [openEditRound, setOpenEditRound] = React.useState(false);

	const {
		isOpen: isOpenResult,
		close: closeResult,
		open: openResult,
	} = useModal(false);
	const [fileExam, setFileExam] = React.useState();

	const {
		isOpen: isOpenApprove,
		close: closeApprove,
		open: openApprove,
	} = useModal(false);

	// eslint-disable-next-line no-unused-vars
	const [error, setError] = React.useState(null);
	const queryClient = useQueryClient();
	const { id } = useParams();

	const fileName = React.useMemo(() => {
		if (row?.exam) {
			return getFileName(row.exam);
		}
		return '';
	}, [row?.exam]);

	useQuery({
		queryKey: ['judges', row?.id],
		enabled: !!row?.id,
		queryFn: () => getJudgeByRound(row?.id),
		onSuccess: (data) => {
			setJudges(data?.data?.data);
		},
	});

	const deleteRoundMutation = useMutation({
		mutationFn: deleteRound,
		onSuccess: () => {
			queryClient.invalidateQueries(['rounds', id]);
			toast.success('Delete successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const deleteJudgeMutation = useMutation({
		mutationFn: deleteJudgeInRound,
		onSuccess: () => {
			queryClient.invalidateQueries(['teachers', row?.id]);
			queryClient.invalidateQueries(['judges', row?.id]);

			toast.success('Delete successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { data: examForms } = useQuery({
		queryKey: ['exams'],
		queryFn: getExamForms,
	});
	const updateRoundMutation = useMutation({
		mutationFn: updateRound,
		onSuccess: () => {
			queryClient.invalidateQueries(['rounds', id]);
			setOpenEditRound(false);
			toast.success('Update successfully!');
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const onSubmit = async (data) => {
		let fileUrl = row?.exam;
		if (fileExam) {
			try {
				const url = await uploadFile(fileExam);
				fileUrl = url;
			} catch (error) {
				console.log(error);
			}
			setError(null);
		} else {
			setError('Exam is require');
		}

		updateRoundMutation.mutate({
			...data,
			id: row?.id,
			competitionId: row?.competitionId,
			exam: fileUrl,
		});
		reset();
	};

	return (
		<React.Fragment>
			<TableRow
				className={
					row?.approved
						? 'bg-green-100 hover:bg-green-200'
						: 'bg-white hover:bg-gray-100'
				}
				sx={{ '& > *': { borderBottom: 'unset' } }}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								id="Up"
								x="0"
								y="0"
								version="1.1"
								viewBox="0 0 29 29"
								width={18}
							>
								<path
									fill="none"
									stroke="#151515"
									d="m8.5 17.5 6-6 6 6"
									className="colorStroke000000 svgStroke"
								></path>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								id="Down"
								width={18}
							>
								<path
									d="M14.83 16.42 24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"
									fill="#151515"
									className="color000000 svgShape"
								></path>
								<path fill="none" d="M0-.75h48v48H0z"></path>
							</svg>
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row?.id}
				</TableCell>
				<TableCell align="left">{row?.name}</TableCell>

				<TableCell align="left">{row?.examFormRound?.name}</TableCell>
				<TableCell align="left">{row?.timeStart}</TableCell>
				<TableCell align="left">{row?.time}</TableCell>
				<TableCell align="left" className="w-[100px] overflow-hidden">
					<div
						className="truncate underline text-blue-800 cursor-pointer"
						style={{ maxWidth: '100px' }}
					>
						<Link to={row?.exam}>{getFileName(row?.exam)}</Link>
					</div>
				</TableCell>
				<TableCell align="center">
					<div className="flex justify-center">
						<IconButton
							onClick={() => {
								setOpenEditRound(true);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								id="Edit"
								width={15}
							>
								<path
									d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"
									fill="#151515"
									className="color000000 svgShape"
								></path>
								<path
									d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"
									fill="#151515"
									className="color000000 svgShape"
								></path>
							</svg>
						</IconButton>
						<IconButton
							onClick={() => {
								setItemDelete(row?.id);
								setOpenDelete(true);
								setFuncDelete(deleteRoundMutation);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								id="Delete"
								x="0"
								y="0"
								version="1.1"
								viewBox="0 0 29 29"
								xmlSpace="preserve"
								width={15}
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
						</IconButton>
						<IconButton onClick={openResult}>
							<FlagIcon className="w-4 text-black h-4" />
						</IconButton>
						{!row?.approved && (
							<IconButton onClick={openApprove}>
								<CheckIcon className="w-4 h-4 text-black" />
							</IconButton>
						)}
					</div>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					className="!pl-24"
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }} className="!w-[60%] ">
							<div className="flex justify-between">
								<Typography
									variant="h6"
									gutterBottom
									component="div"
									className="!font-semibold"
								>
									Judges
								</Typography>
								<IconButton
									onClick={() => setOpenAddJudges(true)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										id="Plus"
										width={18}
									>
										<path
											fill="#151515"
											d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM11 8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8Z"
											className="color000000 svgShape"
										></path>
									</svg>
								</IconButton>
							</div>

							<Table size="medium" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell className="!font-semibold">
											Employee ID
										</TableCell>
										<TableCell className="!font-semibold">
											Name
										</TableCell>
										<TableCell
											className="!font-semibold"
											align="right"
										>
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{judges?.map((item, index) => (
										<TableRow key={index}>
											<TableCell
												component="th"
												scope="row"
											>
												{item.employeeJudge.id}
											</TableCell>
											<TableCell>
												{item.employeeJudge.fullName}
											</TableCell>
											<TableCell align="right">
												<IconButton
													onClick={() => {
														setOpenDelete(true);
														setItemDelete({
															roundId:
																item.roundId,
															employeeId:
																item
																	.employeeJudge
																	.id,
														});
														setFuncDelete(
															deleteJudgeMutation,
														);
													}}
												>
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
															// setClassDelete(params?.row);
															// setOpenDelete(true);
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
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<ModalAddJudge
				open={openAddJudges}
				setOpen={setOpenAddJudges}
				setJudges={setJudges}
				roundId={row?.id}
			/>
			<ModalConfirmDelete
				open={openDelete}
				setOpen={setOpenDelete}
				deleteMutation={funcDelete}
				deleteId={itemDelete}
			/>
			<Modal
				open={openEditRound}
				onClose={() => {
					setOpenEditRound(false);
					reset();
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
							Edit Round
						</Typography>
						<div className="flex flex-col !justify-center !items-center gap-4">
							<TextField
								id="outlined-basic"
								size="small"
								label="Id*"
								variant="outlined"
								defaultValue={row?.id}
								disabled
								className="w-full !text-black bg-slate-200"
							/>
							<TextField
								id="outlined-basic"
								size="small"
								label="Name*"
								variant="outlined"
								defaultValue={row?.name}
								error={!!errors.name}
								helperText={
									errors.name ? errors.name.message : ``
								}
								className="w-full"
								{...register('name', {
									required: 'Name is required filed',
								})}
							/>
							<TextField
								id="outlined-basic"
								size="small"
								label="Time*"
								type="number"
								variant="outlined"
								defaultValue={row?.time}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											minute
										</InputAdornment>
									),
								}}
								error={!!errors.time}
								helperText={
									errors.time ? errors.time.message : ``
								}
								className="w-full"
								{...register('time', {
									required: 'Time is required filed',
								})}
							/>
							{/* xem chỗ này vi */}
							<div className="w-full ">
								<label
									className="block  text-sm mb-1 text-[#666666] w-full"
									// for="default_size"
								>
									Exam
								</label>
								<div className="flex items-center gap-3">
									<FileInput
										row={row}
										register={register}
										setFileExam={setFileExam}
										fileExam={fileExam}
										fileName={fileName}
									></FileInput>
								</div>

								<p className="text-red-400 text-xs mt-1">
									{errors.exam ? errors.exam.message : ``}
								</p>
							</div>
						</div>
						<FormControl
							className="w-full"
							size="small"
							error={!!errors.role}
						>
							<InputLabel id="demo-select-small-label">
								Exam Form*
							</InputLabel>

							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								// value={age}
								label="Role"
								// onChange={handleChange}
								defaultValue={row?.examFormRound?.id}
								size="small"
								{...register('examFormId', {
									required: 'Exam Form is required filed',
								})}
							>
								{examForms?.data?.data.map((item, index) => (
									<MenuItem key={index} value={item.id}>
										{item.name}
									</MenuItem>
								))}
							</Select>
							{!!errors.examFormId && (
								<FormHelperText>
									{errors.examFormId.message}
								</FormHelperText>
							)}
						</FormControl>
						<TextField
							error={!!errors.timeStart}
							helperText={
								errors.timeStart ? errors.timeStart.message : ``
							}
							size="small"
							label="Time Start"
							type="date"
							defaultValue={new Date(row?.timeStart)
								.toISOString()
								.slice(0, 10)}
							className="w-full"
							{...register('timeStart', {
								required: 'Time start is required filed',
							})}
						/>
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
			<ModalRoundResult
				isOpen={isOpenResult}
				onClose={closeResult}
				roundId={row?.id}
			/>
			<Modal
				open={isOpenApprove}
				onClose={closeApprove}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="flex items-center justify-center "
			>
				<Box className="bg-white w-[1080px] min-h-[640px]  rounded-2xl p-5 ">
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						className="font-bold self-center"
					>
						Approve
					</Typography>
					<ModalApprove
						roundId={row?.id}
						competitionId={row?.competitionId}
					/>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default function RoundTable({ rows }) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell className="!font-semibold">ID</TableCell>
						<TableCell className="!font-semibold" align="left">
							NAME
						</TableCell>

						<TableCell className="!font-semibold" align="left">
							EXAM FORM
						</TableCell>
						<TableCell className="!font-semibold" align="left">
							TIME START
						</TableCell>
						<TableCell className="!font-semibold" align="left">
							EXAM TIME
						</TableCell>
						<TableCell className="!font-semibold" align="left">
							EXAM
						</TableCell>
						<TableCell className="!font-semibold" align="center">
							ACTIONS
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<Row key={index} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const FileInput = ({ row, register, setFileExam, fileExam, fileName }) => {
	React.useEffect(() => {
		// onUnmount set fileExam to null
		return () => {
			setFileExam(null);
		};
	}, []);
	return (
		<>
			{row?.exam && !fileExam ? (
				<a
					href={row?.exam}
					target="_blank"
					rel="noreferrer"
					className="py-2 px-2 w-[260px] flex items-center gap-1 cursor-pointer text-xs bg-gray-200 rounded-full rounded-md"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						id="document"
						width={24}
					>
						<g data-name="katman 2">
							<path
								fill="none"
								stroke="#2c2c2c"
								d="M14,1H6A2,2,0,0,0,4,3V21a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V7"
							></path>
							<path
								fill="none"
								stroke="#2c2c2c"
								d="M14,1V5a2,2,0,0,0,2,2h4Z"
							></path>
							<line
								x1="10"
								x2="8"
								y1="7"
								y2="7"
								fill="none"
								stroke="#2c2c2c"
							></line>
							<line
								x1="16"
								x2="8"
								y1="11"
								y2="11"
								fill="none"
								stroke="#2c2c2c"
							></line>
							<line
								x1="16"
								x2="8"
								y1="15"
								y2="15"
								fill="none"
								stroke="#2c2c2c"
							></line>
							<line
								x1="16"
								x2="14"
								y1="19"
								y2="19"
								fill="none"
								stroke="#2c2c2c"
							></line>
							<g>
								<rect width="24" height="24" fill="none"></rect>
							</g>
						</g>
					</svg>{' '}
					<p className="underline text-blue-800">{fileName}</p>
				</a>
			) : (
				''
			)}
			<input
				className="block flex-1 h-10 !min-w-[40px] pl-1 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white  focus:outline-none"
				{...register('exam')}
				type="file"
				onChange={(e) => {
					if (!e.target.files[0]) {
						return;
					}
					setFileExam(e.target.files[0]);
				}}
			/>
		</>
	);
};
