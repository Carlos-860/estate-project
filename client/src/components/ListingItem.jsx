import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

const ListingItem = ({ listing }) => {
    const { bedrooms, bathrooms } = listing;
    return (
        <div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96 overflow-hidden">
                <img src={listing.imageUrls[0]} alt={listing.name} class="h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:scale-[1.25] transition ease-in-out" />
            </div>
            <div class="flex flex-1 flex-col space-y-2 p-4">
                <h3 class="text-lg font-semibold text-gray-900 min-h-[50px]">
                    <Link to={`/listing/${listing._id}`}>
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        {listing.name}
                    </Link>
                </h3>
                <div className="flex items-center gap-1">
                    <MdLocationOn className="w-4 h-4 text-green-700" />
                    <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
                </div>
                <p class="text-sm text-gray-500 line-clamp-3">{listing.description}</p>
                <p class="font-semibold text-slate-500 flex items-center">
                    ${listing.offer
                        ? listing.discountPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                </p>

                <div className="flex items-center gap-4 text-slate-700 font-bold text-xs">
                    <div>
                        {bedrooms > 1
                            ? `${bedrooms} beds`
                            : `${bedrooms} bed`}
                    </div>
                    <div>
                        {bathrooms > 1
                            ? `${bathrooms} baths`
                            : `${bathrooms} bath`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingItem