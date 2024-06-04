import AddUser from '@/components/AddUser';
import UserTable from '@/components/UserTable';

export default async function Users() {
    return (
        <section className='py-24'>
            <div className='container'>
                <AddUser />
                <UserTable />
            </div>
        </section>
    )
}