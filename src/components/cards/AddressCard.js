import React from 'react'
import { PencilSimple, Trash, Star } from '@phosphor-icons/react'
import Link from 'next/link'

const AddressCard = ({
    addresses,
    onEdit,
    onDelete,
    onSetDefault,
    onSetPublicPrivate,
}) => {
    if (!addresses) {
        return <div className="text-center">Address not found</div>
    }

    return (
        <>
            {addresses.map((address, idx) => (
                <div key={idx} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="card-title">{address.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {address.type}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {/* Edit Button */}
                                <div className="flex">
                                    <button
                                        onClick={() => onEdit(address)}
                                        className="btn btn-ghost btn-sm">
                                        <PencilSimple size={20} />
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => onDelete(address.uuid)}
                                        className="btn btn-ghost btn-sm text-error">
                                        <Trash size={20} />
                                    </button>
                                </div>
                                {/* Default Star Toggle */}
                                <button
                                    onClick={() => onSetDefault(address.uuid)}
                                    className="mr-2 relative group">
                                    {address.is_default ? (
                                        <Star
                                            size={24}
                                            weight="fill"
                                            color="#f2d307"
                                        />
                                    ) : (
                                        <Star size={24} weight="regular" />
                                    )}
                                    <span className="tooltip absolute mb-2 bottom-full left-1/2 transform -translate-x-1/2 text-white bg-black px-2 py-1 rounded-md">
                                        Default
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="font-medium">{address.line_1}</p>
                            {address.line_2 && <p>{address.line_2}</p>}
                            <p>{`${address.state}, ${address.country}`}</p>
                        </div>

                        <div className="mt-4 flex lg:flex-row flex-col justify-between gap-5">
                            <div className="space-y-2 lg:space-x-2 flex items-center">
                                {/* Public/Private Toggle */}
                                <div className="form-control">
                                    <label className="label cursor-pointer space-x-2">
                                        <span className="label-text">
                                            Private
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-primary"
                                            onChange={() =>
                                                onSetPublicPrivate(address.uuid)
                                            }
                                            checked={address.is_public}
                                        />

                                        <span className="label-text">
                                            Public
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <Link href="" className="btn btn-primary">
                                More
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AddressCard