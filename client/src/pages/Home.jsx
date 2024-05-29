import React, { Children, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SectionHeading = ({ heading, url, actionText, actionUrl, children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="max-w-6xl mx-auto my-12">
        <div className="sm:flex sm:items-baseline sm:justify-between sm:mb-4">
          <div className="flex-1">
            <h1 className="text-base font-semibold leading-6 text-slate-600">{heading}</h1>
            <Link to={url} className="mt-1 text-sm text-gray-500">Show more</Link>
          </div>

          <div>
            {currentUser && (
              <Link to={actionUrl} className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{actionText}</Link>
            )}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOfferListings = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListings();
  }, [])

  return (
    <div>
      <div className="relative isolate overflow-hidden bg-white">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
        </svg>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">

            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just shipped v1.0</span>
                  {/* <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your comprehensive real estate management system
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you're a property owner, real estate agent, or tenant, Global Estates provides an all-in-one platform to manage your real estate needs efficiently and effectively.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/search"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link to="/sign-in" className="text-sm font-semibold leading-6 text-gray-900">
                Sing in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-estate-c0466.appspot.com/o/1716895167040florian-schmidinger-GqnclQkdOmg-unsplash-min.jpg?alt=media&token=91fb55f0-c43b-4b84-b765-c3863b519df2"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* listing */}
      <SectionHeading
        heading={`Recent Offer's`}
        url={`/search?offer=true`}
        actionUrl={`create-listing`}
        actionText={`Create new listing`}
      >
        <div className="grid grid-cols-3 gap-2">
          {offerListings && offerListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))}

          {loading && offerListings.length === 0 && (
            Array.from([1, 2, 3], (item, index) => (
              <div key={index} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <Skeleton circle={false} height={384} width={'100%'} />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <div>
                      <Skeleton circle={false} height={32} width={56} />
                    </div>
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    <Skeleton circle={false} height={85} width={'100%'} />
                  </p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">
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
        </div>
      </SectionHeading>

      <SectionHeading
        heading={`Rent Listings`}
        url={`/search?type=rent`}
        actionUrl={`create-listing`}
        actionText={`Create new listing`}
      >
        <div className="grid grid-cols-3 gap-2">
          {rentListings && rentListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))}

          {loading && rentListings.length === 0 && (
            Array.from([1, 2, 3], (item, index) => (
              <div key={index} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <Skeleton circle={false} height={384} width={'100%'} />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <div>
                      <Skeleton circle={false} height={32} width={56} />
                    </div>
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    <Skeleton circle={false} height={85} width={'100%'} />
                  </p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">
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
        </div>
      </SectionHeading>

      <SectionHeading
        heading={`Sale Listings`}
        url={`/search?type=sale`}
        actionUrl={`create-listing`}
        actionText={`Create new listing`}
      >
        <div className="grid grid-cols-3 gap-2">
          {saleListings && saleListings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))}

          {loading && saleListings.length === 0 && (
             Array.from([1, 2, 3], (item, index) => (
              <div key={index} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <Skeleton circle={false} height={384} width={'100%'} />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <div>
                      <Skeleton circle={false} height={32} width={56} />
                    </div>
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    <Skeleton circle={false} height={85} width={'100%'} />
                  </p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">
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
        </div>
      </SectionHeading>

    </div>
  )
}

export default Home