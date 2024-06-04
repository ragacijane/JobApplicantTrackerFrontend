
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons'
import { User, TipKorisnika } from '@/types/types'
import { useUserContext } from '@/context/UserContext';
import { Tooltip } from '@nextui-org/tooltip'
import NextLink from "next/link";

export const columns = [
    {
        key: 'username',
        label: 'Username'
    },
    {
        key: 'tip',
        label: 'Role'
    },
    {
        key: 'actions',
        label: 'Actions'
    }
]

export const renderCell = (user: User, columnKey: React.Key, currentUserType: number) => {
    const { deleteUser } = useUserContext();

    console.log(currentUserType)
    const handleDeleteUser = async () => {
        try {
            let profileExist = user.idKandidata ? user.idKandidata.idKandidata : 0;
            await deleteUser(user.idKorisnika, profileExist);
            // Optionally, you can perform UI updates after successful deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };
    switch (columnKey) {
        case 'username':
            return (
                <span>{user.username}</span>
            )
        case 'tip':
            if (typeof user.idTipa === 'object' && 'nazivTipa' in user.idTipa) {
                return <span>{user.idTipa.nazivTipa}</span>;
            } else {
                return <span>{String(user.idTipa)}</span>;
            }
        case 'actions':

            return (
                <div className='relative flex items-center gap-4'>

                    <Tooltip content='Vise'>
                        <NextLink
                            href={'/user/' + user.idKorisnika}
                        >
                            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                                {currentUserType == 3 && <EyeIcon />}
                            </span>
                        </NextLink>
                    </Tooltip>
                    <Tooltip content='Izmeni'>
                        <NextLink
                            href={'/user/' + user.idKorisnika}>
                            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                                {currentUserType == 2 && <EditIcon />}
                            </span></NextLink>
                    </Tooltip>
                    <Tooltip color='danger' content='Izbrisi'>
                        <span className='cursor-pointer text-lg text-danger active:opacity-50' onClick={handleDeleteUser}>
                            {currentUserType == 2 && <DeleteIcon />}
                        </span>
                    </Tooltip>
                </div>
            )
        default:
            return String(user[columnKey as keyof User]);
    }
}

// import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons'
// import { User } from '@/config/types'
// import { Tooltip } from '@nextui-org/tooltip'
// import NextLink from "next/link";
// import { deleteUser } from './deleteUser';
// import { FC } from 'react';
// import { useRouter } from 'next/router';

// interface RenderCellProps {
//     user: User;
// }

// const RenderCell: FC<RenderCellProps> = ({ user }) => {
//     const router = useRouter();

//     const handleDeleteUser = async () => {
//         try {
//             await deleteUser(user.idKorisnika);
//             router.push('/');
//             // Optionally, you can perform UI updates after successful deletion
//         } catch (error) {
//             console.error('Failed to delete user:', error);
//         }
//     };

//     return (
//         <div className='relative flex items-center gap-4'>
//             <Tooltip content='Details'>
//                 <NextLink href={'/user/' + user.idKorisnika}>
//                     <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
//                         <EyeIcon />
//                     </span>
//                 </NextLink>
//             </Tooltip>
//             <Tooltip content='Edit user'>
//                 <NextLink href={'/user/' + user.idKorisnika}>
//                     <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
//                         <EditIcon />
//                     </span>
//                 </NextLink>
//             </Tooltip>
//             <Tooltip color='danger' content='Delete user'>
//                 <span className='cursor-pointer text-lg text-danger active:opacity-50' onClick={handleDeleteUser}>
//                     <DeleteIcon />
//                 </span>
//             </Tooltip>
//         </div>
//     );
// };
// export const columns = [
//     {
//         key: 'username',
//         label: 'Username'
//     },
//     {
//         key: 'idTipa',
//         label: 'Role'
//     },
//     {
//         key: 'actions',
//         label: 'Actions'
//     }
// ];

// export const renderCell = async (user: User, columnKey: React.Key) => {
//     const cellValue = user[columnKey as keyof User]
//     switch (columnKey) {
//         case 'username':
//             return (
//                 <span>{user.username}</span>
//             )
//         case 'idTipa':
//             return <span>{user.idTipa}</span>
//         case 'actions':
//             return <RenderCell user={user} />;
//         default:
//             return cellValue
//     }
// };
