'use client'

import { Plus, ShieldCheck } from '@phosphor-icons/react'
import React, { memo, Suspense } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AvatarSkeleton from '@/components/skeletons/AvatarSkeleton'
import BackdropSkeleton from '@/components/skeletons/BackdropSkeleton'
import FollowButton from '@/components/ui/FollowButton'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('@/components/Image'))

// Common Skeleton Wrapper
const SkeletonWrapper = ({ children, fallback }) => (
    <Suspense fallback={fallback}>{children}</Suspense>
)

// Fallback Defaults
const defaultAvatar = '/images/user.svg'
const defaultBackdrop = '/images/backdrop.svg'

// Sidebar Component
const LeftSidebar = memo(() => {
    const { user } = useAuth({ middleware: 'auth' })

    // Render for Unauthenticated Users
    if (!user) {
        return (
            <SidebarContainer>
                <TrendingSection />
                <FollowSuggestions />
            </SidebarContainer>
        )
    }

    // Render for Authenticated Users
    return (
        <SidebarContainer>
            <UserProfile user={user} />
            <EmploymentSection />
        </SidebarContainer>
    )
})

// Sidebar Layout Wrapper
const SidebarContainer = ({ children }) => (
    <div
        id="left-sidebar"
        className="hidden lg:flex flex-col gap-2 w-full col-span-1 lg:col-span-4 xl:col-span-3">
        {children}
    </div>
)

// User Profile Section
const UserProfile = ({ user }) => (
    <div className="relative flex flex-col rounded-[1rem] bg-base-200 p-5 text-center">
        <figure className="mb-5 mx-5">
            <SkeletonWrapper fallback={<BackdropSkeleton />}>
                <Image
                    data={user?.backdrop || { url: defaultBackdrop }}
                    customClass="align-middle"
                />
            </SkeletonWrapper>
        </figure>
        <div>
            <div className="flex justify-center -mt-16">
                <SkeletonWrapper fallback={<AvatarSkeleton />}>
                    <Image
                        data={user?.avatar || { url: defaultAvatar }}
                        customClass="w-20 rounded-full"
                    />
                </SkeletonWrapper>
            </div>
            <div className="font-semibold flex items-center justify-center gap-2 mt-4">
                <ShieldCheck size={24} stroke={2} color="red" weight="bold" />
                <span>{user?.name || 'Anonymous'}</span>
            </div>
            <div className="text-sm text-gray-500">
                {user?.headline || 'No headline available'}
            </div>
        </div>
    </div>
)

// Employment Section
const EmploymentSection = () => (
    <div className="card bg-base-200 rounded-lg p-5">
        <div className="pb-5">
            <h2 className="text-2xl font-bold">My Employments</h2>
        </div>
        <Link
            href="/profile#employments"
            className="btn bg-base-300 normal-case btn-xs flex items-center gap-2">
            <Plus size={24} stroke={2} />
            <span>Add Employment</span>
        </Link>
    </div>
)

// Trending Topics Section
const TrendingSection = () => (
    <div className="relative flex flex-col gap-2 rounded-[1rem] bg-base-200 py-5">
        <h2 className="text-2xl font-bold pb-5 px-5">What's Going on</h2>
        {trendingTopics.map((topic, idx) => (
            <TrendingTopic key={idx} topic={topic} />
        ))}
    </div>
)

const TrendingTopic = ({ topic }) => (
    <div className="bg-inherit hover:bg-base-300 w-full px-5">
        <div className="flex justify-between items-start">
            <div>
                <div className="text-sm text-gray-500 font-medium mb-1">
                    {topic.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                    {topic.title}
                </h3>
                <div className="text-sm text-blue-500 mt-1">
                    Trending with{' '}
                    <span className="font-semibold">{topic.related}</span>
                </div>
            </div>
            <DropdownMenu />
        </div>
    </div>
)

// Dropdown Menu for Trends
const DropdownMenu = () => (
    <div className="dropdown dropdown-end">
        <button tabIndex={0}>...</button>
        <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
            <li>
                <button className="flex items-center gap-2">
                    Not interested in this
                </button>
            </li>
            <li>
                <button className="flex items-center gap-2">
                    This trend is harmful or shady
                </button>
            </li>
        </ul>
    </div>
)

// Follow Suggestions Section
const FollowSuggestions = () => (
    <div className="relative flex flex-col gap-2 rounded-[1rem] bg-base-200 p-5">
        <h2 className="text-2xl font-bold pb-5">Follow Suggestions</h2>
        <div className="space-y-4 w-full max-w-md mx-auto">
            {followSuggestions.map((user, idx) => (
                <FollowSuggestion key={idx} user={user} />
            ))}
        </div>
    </div>
)

const FollowSuggestion = ({ user }) => (
    <div className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md w-full">
        <div className="flex items-center gap-3">
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={user.avatar} alt={user.name} />
                </div>
            </div>
            <div>
                <span className="font-bold text-base">{user.name}</span>
                <p className="text-gray-500 text-sm">{user.username}</p>
            </div>
        </div>
        <FollowButton />
    </div>
)

// Mock Data for Trends and Follow Suggestions
const trendingTopics = [
    {
        category: 'Trending in India',
        title: '#RenewableEnergy',
        related: '#SwachShakti',
    },
    {
        category: 'Trending',
        title: '#CleanAirMovement',
        related: '#EcoWarriors',
    },
    { category: 'Trending', title: '#GreenEnergy', related: '1445 posts' },
]

const followSuggestions = [
    {
        name: 'Piyush Garg',
        username: '@piyushgarg_dev',
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Aditi Verma',
        username: '@aditiverma',
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Rahul Singh',
        username: '@rahul_singh',
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Sneha Patel',
        username: '@sneha_patel',
        avatar: 'https://via.placeholder.com/150',
    },
]

LeftSidebar.displayName = 'LeftSidebar'
export default LeftSidebar
