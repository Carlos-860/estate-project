import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Header = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('searchTerm', searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	}

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const searchTermFromUrl = urlParams.get('searchTerm');
		if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);

	}, [location.search])

	return (
		<header>
			<nav className='bg-white shadow'>
				<div className='flex justify-between items-center mx-auto max-w-7xl p-3'>
					<Link to="/">
						<img src="/global-estates-high-resolution-logo-transparent.svg" alt="" width={200} height="76" />
					</Link>
					<form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
						<input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
						<button >
							<FaSearch className="text-slate-600" />
						</button>
					</form>
					<ul className='flex gap-4'>
						<Link to="/">
							<li className='hidden sm:inline text-slate-700 hover:underline text-sm font-medium'>Home</li>
						</Link>
						<Link to="/about">
							<li className='hidden sm:inline text-slate-700 hover:underline text-sm font-medium'>About</li>
						</Link>

						<Link to="/profile">
							{currentUser ? (
								<>
									{!imageLoaded && (
										<Skeleton circle={true} height={28} width={28} />
									)}
									<img
										className={`rounded-full h-7 w-7 object-cover ${imageLoaded ? '' : 'hidden'}`}
										src={currentUser.avatar}
										alt="Profile"
										onLoad={handleImageLoad}
									/>

								</>
							) : (
								<li className='inline text-slate-700 hover:underline text-sm font-medium'>Sign in</li>
							)}
						</Link>
					</ul>
				</div>
			</nav >
		</header >
	)
}

export default Header