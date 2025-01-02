import { getPaginatedData } from '@/actions/get-paginated-data'
import UserCard from '@/components/cards/UserCard'
import MainCard from '@/components/ui/MainCard'
import { User } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import LoadMoreUser from './LoadMoreUsers'

const page = async ({ params }) => {
    const username = params.user
    const {
        data: userFollowing,
        meta: userFollowingMeta,
    } = await getPaginatedData(1, `users/${username}/following/users`)

    return (
        <div className="space-y-2">
            {' '}
            <MainCard CardClassName="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <User
                            weight="duotone"
                            size={32}
                            color="#2478ff"
                            className="flex-shrink-0 bg-blue-100 rounded-full p-1"
                        />
                        <div className=" text-2xl font-bold ">
                            {username} follows {userFollowingMeta.total}{' '}
                            peoples.{' '}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {userFollowing.map(user => (
                        <UserCard key={user?.username} user={user} />
                    ))}
                    {userFollowing.last_page !== 1 && (
                        <LoadMoreUser username={username} />
                    )}
                </div>
            </MainCard>
        </div>
    )
}

export default page