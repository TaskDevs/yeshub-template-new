import React, { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from './UserContext';

const AuthCallback = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { updateUser } = useUser();
	const provider = useMemo(
		() => (location.pathname.includes("linkedin") ? "linkedin" : "google"),
		[location.pathname]
	);

	const searchParams = new URLSearchParams(window.location.search);
	const token = searchParams.get("token");
	console.log("searchParams", searchParams);
	console.log("token", token);


	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const token = searchParams.get("token");
		console.log("searchParams", searchParams);

		const processAuth = async () => {
			if (token) {
				sessionStorage.setItem("authToken", token);

				try {
					const res = await axios.get(
						`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/api/user`,
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);

					console.log(`${provider}-res`, res);
					updateUser(res.data);
					navigate("/dashboard");
				} catch (error) {
					console.error(`Error processing ${provider} login`, error);
					toast.error(`Error processing ${provider} login`);
					navigate("/login");
				}
			} else {
				toast.error("No authentication token received");
				navigate("/login");
				return;
			}
		};

		processAuth();
	}, [location.pathname, location.search, navigate, provider, updateUser]);

	return <div>{`Processing ${provider} Login...`}</div>;
};

export default AuthCallback;



