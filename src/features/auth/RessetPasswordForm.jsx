import { Box, Button } from '@mui/material';

import authService from '../../services/authService';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useState } from 'react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};
export const ResetPasswordForm = ({ email, onSuccess }) => {
	const { mutate: resetPassword } = useMutation({
		mutationFn: authService.resetPassword,
		onSuccess: () => {
			toast.success('Reset password successfully');
			onSuccess();
		},
		onError: (err) => {
			setError(err.message);
		},
	});
	const [error, setError] = useState(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		const { password, confirmPassword, code } = data;
		if (password !== confirmPassword) {
			setError('Password and confirm password must be the same');
			return;
		}
		resetPassword({ email, password, code });
		setError(null);
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={style}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			closeAfterTransition
			className="rounded-md flex flex-col justify-center items-stretch gap-5"
		>
			<div className="border-2 border-amber-400 rounded-full self-center w-12 h-12 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 32 32"
					id="mail"
					width={35}
				>
					<path
						fill="#231f20"
						d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
					></path>
					<path
						fill="#231f20"
						d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
					></path>
				</svg>
			</div>
			<p className="text-sm">
				We have sent a code to your email. Please enter the code and
				choose a new password.
			</p>
			<input
				name="code"
				type="text"
				required
				className="border focus-visible:outline-none h-12 px-4 rounded-md"
				placeholder="Enter your code"
			/>
			<input
				type="password"
				required
				name="password"
				className="border focus-visible:outline-none h-12 px-4 rounded-md"
				placeholder="Enter your new password"
			/>
			<input
				type="password"
				name="confirmPassword"
				required
				className="border focus-visible:outline-none h-12 px-4 rounded-md"
				placeholder="Confirm your new password"
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}

			<Button
				// disabled={isLoading}
				type="submit"
				variant="contained"
				className="!bg-[#ffca18] !font-medium"
			>
				Reset Password
			</Button>
		</Box>
	);
};
