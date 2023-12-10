import { Box, Button } from '@mui/material';

import { ResetPasswordForm } from './RessetPasswordForm';
import authService from '../../services/authService';
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
export const ForgotPasswordForm = ({ onSuccess = () => {} }) => {
	const [email, setEmail] = useState('');
	const [showFormResetPassword, setShowFormResetPassword] = useState(false);
	const { mutate: forgotPassword, isLoading } = useMutation({
		mutationFn: authService.forgotPassword,
		onSuccess: () => setShowFormResetPassword(true),
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		forgotPassword(email);
	};

	if (showFormResetPassword) {
		return <ResetPasswordForm email={email} onSuccess={onSuccess} />;
	}
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
				Enter the email address associated with your account, we will
				send a verification code to your email
			</p>
			<input
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				type="email"
				required
				className="border focus-visible:outline-none h-12 px-4 rounded-md"
				placeholder="exam@gmail.com"
			/>
			<Button
				disabled={isLoading}
				type="submit"
				variant="contained"
				className="!bg-[#ffca18] !font-medium"
			>
				Send code
			</Button>
		</Box>
	);
};
