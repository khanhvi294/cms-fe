import {
	Box,
	Tab,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
	getAllClassJoinCompetition,
	getCompetitionById,
} from '../../../services/competitionService';

import PropTypes from 'prop-types';
import { STATUS_COMPETITION } from '../../../configs/competitionStatus';
import Typography from '@mui/material/Typography';
import { getRoundByCompetition } from '../../../services/roundService';
import { getRoundResultByRound } from '../../../services/roundResultService';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// const competition = {
//   name: "Kiểm thử phần mềm",
//   status: 2,
//   timeStart: "01-11-2023",
//   timeEnd: "11-11-2023",
//   soVong: 2,
//   people: 12,
// };

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

const Competition = () => {
	const { id } = useParams();

	const [competition, setCompetition] = useState(null);
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));
	useQuery({
		queryKey: ['competition', id],
		enabled: !!id,
		queryFn: () => getCompetitionById(id),
		onSuccess: (data) => {
			setCompetition(data?.data);
		},
	});

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { data: classes } = useQuery({
		queryKey: ['classes', id],
		enabled: !!id,
		queryFn: () => getAllClassJoinCompetition(id),
		// onSuccess: (data) => {
		//   console.log("class", data);
		// },
	});
	const { data: rounds } = useQuery({
		queryKey: ['rounds', id],
		enabled: !!id,
		queryFn: () => getRoundByCompetition(id),
		// onSuccess: (data) => {
		//   setRows(data.data.data);
		// },
	});

	return (
		<div>
			<div>
				<p className="font-semibold text-xl mb-3">Competition</p>
			</div>
			<div className="bg-[#f9bc0d] flex p-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					data-name="Layer 1"
					viewBox="0 0 24 24"
					id="Championtrophy"
					width={100}
					className="px-3"
				>
					<path
						d="M18 4V2H6v2a4 4 0 0 0 0 8h.38a6.18 6.18 0 0 0 1.41 2.21A4.07 4.07 0 0 1 9 17H6v3H5v2h14v-2h-1v-3h-3a4.07 4.07 0 0 1 1.2-2.79A6.18 6.18 0 0 0 17.62 12H18a4 4 0 0 0 0-8ZM6 10a2 2 0 0 1 0-4Zm4-4h4v2h-4Zm6 13v1H8v-1h8Zm2-9V6a2 2 0 0 1 0 4Z"
						fill="#ffffff"
						className="color000000 svgShape"
					></path>
				</svg>
				<div className="text-white ">
					<div>
						<p className="font-medium text-lg">
							{competition?.name}
						</p>
						<p className="text-sm opacity-60">
							{competition?.people} participants
						</p>
					</div>
					<div className="flex gap-6 mt-4">
						<div>
							<p>{competition?.timeStart}</p>
							<p className="text-sm opacity-60">Start Time</p>
						</div>
						<div>
							<p>{competition?.timeEnd}</p>
							<p className="text-sm opacity-60">End Time</p>
						</div>
						<div>
							{competition?.status ===
								STATUS_COMPETITION.CREATED && <p>Upcoming</p>}
							{competition?.status ===
								STATUS_COMPETITION.STARTED && (
								<p>In progress</p>
							)}
							{competition?.status ===
								STATUS_COMPETITION.ENDED && <p>Completed</p>}
							{competition?.status ===
								STATUS_COMPETITION.CANCEL && <p>Canceled</p>}
							<p className="text-sm opacity-60">Status</p>
						</div>
					</div>
				</div>
			</div>
			<Box sx={{ width: '100%' }} className="bg-white mt-6">
				<Box className="px-6 pt-6">
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
						className="bg-[#f6f7fb] !normal-case"
						sx={{
							'.Mui-selected': {
								color: `white !important`,
							},
						}}
					>
						<Tab
							sx={{
								bgcolor: value === 0 ? '#2ab7ca' : '',
							}}
							label="Description"
							{...a11yProps(0)}
							className=" !normal-case"
						/>
						<Tab
							label="Rounds"
							sx={{
								bgcolor: value === 1 ? '#2ab7ca' : '',
							}}
							{...a11yProps(1)}
							className=" !normal-case"
						/>
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<div className="h-10 bg-[#eef2f7] flex items-center pl-4">
						INTRODUCT
					</div>
					<div className="bg-white w-full px-5 flex flex-col gap-1 py-3 ">
						<p>Number of prizes: {competition?.numOfPrizes}</p>
						<p>
							Maximum number of participants:{' '}
							{competition?.minimumQuantity}
						</p>
						<p> Round: {competition?.numberOfRound}</p>
					</div>
					<div className="h-10 bg-[#eef2f7] flex items-center pl-4">
						CLASSES ARE ALLOW
					</div>
					<div className="mt-4 px-5">
						<table style={{ border: '1px solid black' }}>
							<tbody>
								{classes?.data?.data.map((item, index) => (
									<tr key={index}>
										<td className="p-3">{item?.name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<div className="flex gap-20">
						{rounds?.data?.data?.map((item, index) => (
							<RoundDetail key={index} round={item} />
						))}
					</div>
				</CustomTabPanel>
			</Box>
		</div>
	);
};

export default Competition;

const RoundDetail = ({ round }) => {
	return (
		<div
			key={round.id}
			className="border rounded-md w-[250px] h-[300px] p-6 shadow-md bg-amber-100 "
		>
			<p className="text-red-500 text-lg mb-5 mx-auto">{round?.name}</p>
			<div className="flex justify-between my-4 ">
				<p className="font-semibold">exam form: </p>
				<p>{round?.examFormRound.name}</p>
			</div>

			<div className="flex justify-between my-4">
				<p className="font-semibold">Time</p>
				<p>{round?.time} minutes</p>
			</div>
			<div className="flex justify-between my-4">
				<p className="font-semibold">Date</p>
				<p>{round?.timeStart}</p>
			</div>
		</div>
	);
};
