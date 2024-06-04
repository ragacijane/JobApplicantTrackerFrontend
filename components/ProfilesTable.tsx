'use client'
import { useCallback, useMemo, useState } from 'react'
import { Kandidati, User } from '@/types/types'
import { SearchIcon } from './icons'
import { SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Input } from '@nextui-org/input'
import { Pagination } from '@nextui-org/pagination'
import { useUserContext } from '@/context/UserContext'
import { useSession } from 'next-auth/react'
import { columnsProfile, renderCellProfile } from './ProfilesColumn'

export default function ProfilesTable() {
    const { data: session } = useSession(); // Retrieve the current session
    // // Check if there's a session and extract the username
    const curentUser = session?.user || null;
    const currentUserType = curentUser?.idTipa.idTipa || 3;
    const { profiles } = useUserContext();
    const [filterValue, setFilterValue] = useState('')
    const hasSearchFilter = Boolean(filterValue)

    const filteredItems = useMemo(() => {
        let filteredUsers = [...profiles]

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(profile =>
                profile.imeKandidata.toLowerCase().includes(filterValue.toLowerCase())
            )
        }
        return filteredUsers
    }, [profiles, filterValue, hasSearchFilter])

    const rowsPerPage = 8
    const [page, setPage] = useState(1)
    const pages = Math.ceil(filteredItems.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [page, filteredItems])

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'name',
        direction: 'ascending'
    })

    const sortedItems = useMemo(() => {
        return [...items].sort((a: Kandidati, b: Kandidati) => {
            const first = a[sortDescriptor.column as keyof Kandidati] as string
            const second = b[sortDescriptor.column as keyof Kandidati] as string
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === 'descending' ? -cmp : cmp
        })
    }, [sortDescriptor, items])

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value)
            setPage(1)
        } else {
            setFilterValue('')
        }
    }, [])

    const onClear = useCallback(() => {
        setFilterValue('')
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex items-end justify-between gap-3'>
                    <Input
                        isClearable
                        className='w-full sm:max-w-[44%]'
                        placeholder='Search by name...'
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
            </div>
        )
    }, [filterValue, onSearchChange, onClear])

    return (
        <Table
            aria-label='Users table'
            topContent={topContent}
            topContentPlacement='outside'
            bottomContent={
                <div className='flex w-full justify-center'>
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color='secondary'
                        page={page}
                        total={pages}
                        onChange={page => setPage(page)}
                    />
                </div>
            }
            bottomContentPlacement='outside'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            classNames={{
                wrapper: 'min-h-[222px]'
            }}
        >
            <TableHeader columns={columnsProfile}>
                {column => (
                    <TableColumn
                        key={column.key}
                        {...(column.key === 'name' ? { allowsSorting: true } : {})}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={sortedItems} emptyContent={'No users to display.'}>
                {profile => (
                    <TableRow key={profile.idKandidata}>
                        {columnKey => <TableCell>{renderCellProfile(profile, columnKey, currentUserType)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}