'use client'

import useSWR from 'swr'
import { useMemo } from 'react'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Loading'
import PageContent from '@/components/dashboard/PageContent'
import LeftSidebar from '@/components/dashboard/LeftSidebar'

const fetcher = url => axios.get(url).then(res => res.data.data)

const AdminLayout = ({ children, params }) => {
    const organizationName = params.organization
    const { user } = useAuth({
        middleware: 'auth',
    })

    const { data: organizationData, error } = useSWR(
        user ? `/api/organizations/${organizationName}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    const isLoading = !user || (!organizationData && !error)

    const memoizedLeftSidebar = useMemo(
        () => <LeftSidebar organizationData={organizationData} />,
        [organizationName, organizationData],
    )

    const memoizedPageContent = useMemo(
        () => (
            <PageContent organizationData={organizationData}>
                {children}
            </PageContent>
        ),
        [organizationName, organizationData, children],
    )

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <div className="container mx-auto ">
                <div id="main-content" className="w-full min-h-screen">
                    <div className="drawer lg:drawer-open">
                        <input
                            id="left-sidebar-drawer"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        {memoizedPageContent}
                        {memoizedLeftSidebar}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout