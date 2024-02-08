import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import users from "../data/users";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showUsersModal, setShowUsersModal] = useState(false); // State for modal visibility

	const dispatch = useDispatch();

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (username.trim() !== "" && password.trim() !== "") {
			const user = users.find(
				(user) => user.username === username && user.password === password
			);
			if (user) {
				dispatch(login(user.username));
				setUsername("");
				setPassword("");
				setError("");
			} else {
				setError("Invalid username or password");
			}
		} else {
			setError("Please enter a valid username and password");
		}
	};

	const handleSeeUsers = () => {
		setShowUsersModal(true); // Show the modal when "See Users" button is clicked
	};

	const handleCloseModal = () => {
		setShowUsersModal(false); // Close the modal
	};

	return (
		<div>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2>Login</h2>
				<input
					type='text'
					value={username}
					onChange={handleUsernameChange}
					placeholder='Username'
				/>
				<input
					type='password'
					value={password}
					onChange={handlePasswordChange}
					placeholder='Password'
				/>
				{error && <p className='error'>{error}</p>}
				<button type='submit'>Login</button>
				<button className='see-users-btn' onClick={handleSeeUsers}>
					See Users
				</button>{" "}
				{/* Button to see users */}
			</form>

			{/* Modal to display users */}
			{showUsersModal && (
				<div className='modal' onClick={handleCloseModal}>
					<div className='modal-content' onClick={(e) => e.stopPropagation()}>
						<span className='close' onClick={handleCloseModal}>
							&times;
						</span>
						<h2>Users</h2>
						<ul>
							{users.map((user, index) => (
								<li key={index}>
									<strong>Username:</strong> {user.username},{" "}
									<strong>Password:</strong> {user.password}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginForm;
