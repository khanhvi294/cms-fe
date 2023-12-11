import { Box } from '@mui/material';
import { useMemo } from 'react';

export const FinalResult = ({ competition, rounds }) => {
	const topStudentsWithRank = useMemo(() => {
		if (!rounds) return [];
		const lastRound = rounds[rounds?.length - 1];
		const passedStudents = lastRound?.roundResultRound?.filter(
			(item) => item.score >= lastRound?.scorePoint,
		);
		const sortedStudents = passedStudents?.sort(
			(a, b) => b.score - a.score,
		);
		if (!sortedStudents) return [];
		const result = [];
		let rank = 1;
		let prevScore = -1;
		for (let i = 0; i < sortedStudents.length; i++) {
			const student = sortedStudents[i];
			if (student.score !== prevScore) {
				rank = i + 1;
			}
			result.push({ ...student, rank });
			prevScore = student.score;
		}

		return result.filter((item) => item.rank <= competition.numOfPrizes);
	}, [competition?.numOfPrizes, rounds]);

	return (
		<Box className="w-[50vw] bg-white h-[50vh] rounded-xl p-3">
			<div>
				<h2 className="text-2xl font-semibold text-zinc-950 mb-4">
					Final Result
				</h2>
			</div>
			{topStudentsWithRank?.map((student, index) => (
				<div
					key={index}
					className="flex items-center h-12 p-3 border-b last:border-0 gap-2"
				>
					<span>#{student?.rank}</span>
					<div>
						<span>{student?.roundResultStudent.fullName}</span>{' '}
						<span className="text-gray-500">
							(id:{student?.roundResultStudent.id})
						</span>
					</div>
					<div className="flex justify-center border  rounded-full w-10 h-10  items-center ml-auto">
						<span>{student?.score}</span>
					</div>
				</div>
			))}
		</Box>
	);
};
