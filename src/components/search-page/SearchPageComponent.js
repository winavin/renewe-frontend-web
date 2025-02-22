'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from '@/lib/axios'
import Loading from '@/components/ui/Loading'
import SortBy from './Sortby'
import FilterDrawer from './FilterDrawer'
import { ArrowCounterClockwise } from '@phosphor-icons/react'
import OrganizationCard from '@/components/cards/OrganizationCard'
import NoResultFound from '@/components/ui/NoResultFound'
import UserCard from '../cards/UserCard'
import Pagination from '../ui/Pagination'
import { ConditionalRender } from '@/lib/utils'
import MainCard from '../ui/MainCard'

export default function SearchPageComponent({
    searchEndpoint,
    resultName,
    resultCard,
    filterConfig,
    sortOptions,
}) {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortCriteria, setSortCriteria] = useState('')
    const [filters, setFilters] = useState([])
    const [meta, setMeta] = useState(null)
    const [currentPageURL, setCurrentPageURL] = useState(searchEndpoint)

    const fetchSearchResults = async (sortBy, appliedFilters) => {
        try {
            const decodedSearchTerm = decodeURIComponent(search || '')
            const response = await axios.post(currentPageURL, {
                search: {
                    value: decodedSearchTerm,
                },
                sort: sortBy ? [sortBy] : [],
                filters: appliedFilters,
            })
            setMeta(response.data.meta)
            setSearchResults(response.data.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (search) {
            fetchSearchResults(sortCriteria, filters, currentPageURL)
        }
    }, [search, sortCriteria, filters, currentPageURL])

    const handleApplyFilters = newFilters => setFilters(newFilters)

    const handleSortChange = value => setSortCriteria(value)

    const handlePageChange = url => {
        setCurrentPageURL(url)
        window.scrollTo(0, 0)
    }

    return (
        <div className="space-y-2">
            <MainCard>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        <div>
                            <FilterDrawer
                                onApplyFilters={handleApplyFilters}
                                filterConfig={filterConfig}
                                filterLength={filters.length}
                            />
                        </div>

                        <ConditionalRender condition={filters.length > 0}>
                            <button
                                className="btn btn-ghost btn-sm flex items-center gap-2 bg-base-100"
                                onClick={() => setFilters([])}>
                                <ArrowCounterClockwise size={16} />
                                Reset
                            </button>
                        </ConditionalRender>
                    </div>

                    <div className="flex-shrink-0">
                        <SortBy
                            onSortChange={handleSortChange}
                            sortOptions={sortOptions}
                        />
                    </div>
                </div>
            </MainCard>
            <div className="flex items-center justify-between">
                <ConditionalRender condition={searchResults.length > 1}>
                    <div className="flex items-center space-x-2 mx-4">
                        <span className="text-xs">
                            {searchResults.length} result
                            {searchResults.length !== 1 ? 's' : ''} found
                        </span>
                    </div>
                </ConditionalRender>
                <div className="flex-1 ml-2">
                    <div className="divider my-0" />
                </div>
            </div>
            <MainCard title={resultName}>
                <ConditionalRender condition={loading}>
                    <Loading />
                </ConditionalRender>
                <ConditionalRender
                    condition={!loading && searchResults.length > 0}>
                    <div className="space-y-4">
                        {searchResults.map(result => (
                            <>
                                <ConditionalRender
                                    condition={resultCard === 'user'}>
                                    <UserCard
                                        key={result.username}
                                        user={result}
                                    />
                                </ConditionalRender>
                                <ConditionalRender
                                    condition={resultCard === 'organization'}>
                                    <OrganizationCard
                                        key={result.username}
                                        organization={result}
                                    />
                                </ConditionalRender>
                            </>
                        ))}
                    </div>
                </ConditionalRender>
                <ConditionalRender
                    condition={!loading && searchResults.length === 0}>
                    <NoResultFound search={search} />
                </ConditionalRender>
            </MainCard>
            <ConditionalRender condition={meta && meta.last_page !== 1}>
                <Pagination meta={meta} onPageChange={handlePageChange} />
            </ConditionalRender>
        </div>
    )
}
