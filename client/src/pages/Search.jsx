import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ListingItem from '../components/ListingItem';

const Search = () => {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();

            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();

    }, [location.search])


    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({ ...sidebardata, type: e.target.id })
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({
                ...sidebardata,
                sort,
                order
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate('/search?' + searchQuery);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto flex flex-col lg:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 lg:min-h-[calc(100vh-72px)] min-w-sm">
                <div className="flex flex-col gap-8 ">
                    <div className="flex items-center gap-2">
                        {/* <label className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </label> */}
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                            onBlur={handleSubmit}
                        />
                    </div>

                    <div className="space-y-3 pt-6">
                        <h3 className="block font-semibold text-gray-900">Type</h3>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="all"
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'}
                            />
                            <label className="ml-3">Rent & Sale</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rent"
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}
                            />
                            <label className="ml-3">Rent</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="sale"
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <label className="ml-3">Sale</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="offer"
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <label className="ml-3">Offer</label>
                        </div>
                    </div>
                    <div className="space-y-3 pt-6">
                        <h3 className="block font-semibold text-gray-900">Amenities</h3>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="parking"
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <label className="ml-3">Parking</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <label className="ml-3">Furnished</label>
                        </div>
                    </div>

                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mt-5 border-b p-3">
                    <h1 className="text-3xl font-semibold text-slate-700">Listing results:</h1>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id="sort_order"
                            className="border rounded-lg p-3"
                        >
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-2 p-12">
                    {listings && !loading && listings.map((listing) => {
                        return (
                            <ListingItem key={listing._id} listing={listing}/>
                        )
                    }
                    )}
                    {loading && (
                        Array.from([1,2], () => (
                            <div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                                <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                    <Skeleton circle={false} height={384} width={'100%'} />
                                </div>
                                <div class="flex flex-1 flex-col space-y-2 p-4">
                                    <h3 class="text-sm font-medium text-gray-900">
                                        <div>
                                            <Skeleton circle={false} height={32} width={56} />
                                        </div>
                                    </h3>
                                    <p class="text-sm text-gray-500 line-clamp-3">
                                        <Skeleton circle={false} height={85} width={'100%'} />
                                    </p>
                                    <div class="flex flex-1 flex-col justify-end">
                                        <p class="text-base font-medium text-gray-900">
                                            <Skeleton circle={false} height={32} width={56} />
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div><Skeleton circle={false} height={16} width={28} /></div>
                                        <div><Skeleton circle={false} height={16} width={28} /></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {listings.length === 0 && !loading && (
                        <div className="text-xl w-full col-span-2 text-cente text-slate-700">No listings match</div>
                    )}
                </div>
            </div>
        </form>
    )
}

export default Search