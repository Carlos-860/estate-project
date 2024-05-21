import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth.jsx'

const SignUp = () => {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData(() => (
			{
				...formData,
				[e.target.id]: e.target.value
			}
		))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const data = await res.json();
			if (data.success === false) {
				setLoading(false);
				setError(data.message)
				return;
			}

			setLoading(false);
			setError(null);
			navigate('/sign-in')
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1">
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<img
								className="h-10 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt="Your Company"
							/>
							<h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Create an account
							</h2>
							<p className="mt-2 text-sm leading-6 text-gray-500">
								You a member?{' '}
								<Link to="/sign-in" className="font-semibold text-indigo-600 hover:text-indigo-500">
									Sign in
								</Link>
							</p>
						</div>

						<div className="mt-4">
							<div>
								{error && <p className="text-red-500">{error}</p>}

								<form onSubmit={handleSubmit} className="space-y-6">

									<div>
										<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
											Username
										</label>
										<div className="mt-2">
											<input
												id="username"
												name="username"
												type="text"
												placeholder="username"
												onChange={handleChange}
												autoComplete="current-username"
												
												className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div>
										<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
											Email address
										</label>
										<div className="mt-2">
											<input
												id="email"
												name="email"
												type="email"
												placeholder="email"
												onChange={handleChange}
												autoComplete="email"
												
												className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div>
										<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
											Password
										</label>
										<div className="mt-2">
											<input
												id="password"
												name="password"
												type="password"
												placeholder="password"
												onChange={handleChange}
												autoComplete="current-password"
												
												className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div>
										<button disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
											{loading ? 'Loading...' : 'Sign Up'}
										</button>
									</div>
								</form>
							</div>

							<div className="mt-10">
								<div className="relative">
									<div className="absolute inset-0 flex items-center" aria-hidden="true">
										<div className="w-full border-t border-gray-200" />
									</div>
									<div className="relative flex justify-center text-sm font-medium leading-6">
										<span className="bg-white px-6 text-gray-900">Or continue with</span>
									</div>
								</div>

								<div className="mt-6 grid grid-cols-1 gap-4">
									<OAuth />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative hidden w-0 flex-1 lg:block">
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt=""
					/>
				</div>
			</div>
		</>
	);
}

export default SignUp