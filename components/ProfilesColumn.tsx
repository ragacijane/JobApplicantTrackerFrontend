
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons'
import { Kandidati } from '@/types/types'
import { useUserContext } from '@/context/UserContext';
import { Tooltip } from '@nextui-org/tooltip'
import NextLink from "next/link";

export const columnsProfile = [
    {
        key: 'name',
        label: 'Ime i Prezime'
    },
    {
        key: 'city',
        label: 'Grad'
    },
    {
        key: 'diploma',
        label: 'Diploma'
    },
    {
        key: 'poslovi',
        label: 'Poslovi'
    },
    {
        key: 'actions',
        label: 'Actions'
    }
]

export const renderCellProfile = (kandidati: Kandidati, columnKey: React.Key, currentUserType: number) => {
    const { deleteProfile } = useUserContext();
    const handleDeleteProfile = async () => {
        try {
            await deleteProfile(kandidati.idKandidata);
            // Optionally, you can perform UI updates after successful deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };
    switch (columnKey) {
        case 'name':
            return (
                <span>{kandidati.imeKandidata + ' ' + kandidati.prezimeKandidata}</span>
            )
        case 'city':
            return (
                <span>{kandidati.grad}</span>
            )
        case 'diploma':
            if (typeof kandidati.idDiplome === 'object' && 'nazivDiplome' in kandidati.idDiplome) {
                return <span>{kandidati.idDiplome.nazivDiplome}</span>;
            } else {
                return <span>{String(kandidati.idDiplome)}</span>;
            }
        case 'poslovi':
            return (
                <span>{kandidati.tipPosla.map(posao => posao.nazivPosla).join(', ')}</span>
            )
        case 'actions':

            return (
                <div className='relative flex items-center gap-4'>

                    <Tooltip content='Detalji'>
                        <NextLink
                            href={'/user/' + kandidati.idKorisnika.idKorisnika}
                        >
                            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                                {currentUserType == 3 && <EyeIcon />}
                            </span>
                        </NextLink>

                    </Tooltip>
                    <Tooltip content='Izmeni'>
                        <NextLink
                            href={'/user/' + kandidati.idKorisnika.idKorisnika}>
                            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                                {currentUserType == 2 && <EditIcon />}
                            </span></NextLink>
                    </Tooltip>
                    <Tooltip color='danger' content='Izbrisi'>
                        <span className='cursor-pointer text-lg text-danger active:opacity-50' onClick={handleDeleteProfile}>
                            {currentUserType == 2 && <DeleteIcon />}
                        </span>
                    </Tooltip>
                </div>
            )
        default:
            return String(kandidati[columnKey as keyof Kandidati]);
    }
}