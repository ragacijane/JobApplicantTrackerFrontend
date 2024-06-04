// context/UserContext.tsx
import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { Diplome, Kandidati, Poslovi, TipKorisnika, User } from '@/types/types';
import { Backend_URL } from '@/config/Constants';

interface UserContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    profiles: Kandidati[];
    setProfiles: React.Dispatch<React.SetStateAction<Kandidati[]>>;
    deleteUser: (id: number, profile: number) => void;
    deleteProfile: (id: number) => void;
    tipoviKorisnika: TipKorisnika[];
    poslovi: Poslovi[];
    diplome: Diplome[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [profiles, setProfiles] = useState<Kandidati[]>([]);
    const [tipoviKorisnika, setTipoviKorisnika] = useState<TipKorisnika[]>([]);
    const [poslovi, setPoslova] = useState<Poslovi[]>([]);
    const [diplome, setDiploma] = useState<Diplome[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(Backend_URL + "/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json()
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users', error)
            }
            // finally{
            //     setLoading(false);

            // }
        }

        const fetchProfiles = async () => {
            try {
                const res = await fetch(Backend_URL + "/kandidati", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json()
                setProfiles(data);
            } catch (error) {
                console.error('Failed to fetch users', error)
            }
            // finally{
            //     setLoading(false);

            // }
        }

        const fetchTipoviKorisnika = async () => {
            try {
                const res = await fetch(Backend_URL + "/user/types", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json()
                setTipoviKorisnika(data);
            } catch (error) {
                console.error('Failed to fetch tipovi korisnika', error)
            }
        };
        const fetchPoslovi = async () => {
            try {
                const res = await fetch(Backend_URL + "/kandidati/poslovi", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json()
                setPoslova(data);
            } catch (error) {
                console.error('Failed to fetch tipovi korisnika', error)
            }
        };
        const fetchDiplome = async () => {
            try {
                const res = await fetch(Backend_URL + "/kandidati/diplome", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json()
                setDiploma(data);
            } catch (error) {
                console.error('Failed to fetch tipovi korisnika', error)
            }
        };
        fetchProfiles();
        fetchDiplome();
        fetchPoslovi();
        fetchUsers();
        fetchTipoviKorisnika();
    }, []);

    const deleteUser = async (userId: number, profileId: number) => {
        try {
            const response = await fetch(Backend_URL + '/user/' + userId, {
                method: 'DELETE'
            });

            if (!response.ok) {
                // Handle non-2xx response status
                throw new Error(`Failed to delete user: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
        setUsers(prevUsers => prevUsers.filter(user => user.idKorisnika !== userId));
        if (profileId)
            setProfiles(prevProfile => prevProfile.filter(profile => profile.idKandidata !== profileId));
    };

    const deleteProfile = async (profileId: number) => {
        try {
            const response = await fetch(Backend_URL + '/kandidati/' + profileId, {
                method: 'DELETE'
            });

            if (!response.ok) {
                // Handle non-2xx response status
                throw new Error(`Failed to delete profile: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
            throw error;
        }
        setProfiles(prevProfile => prevProfile.filter(profile => profile.idKandidata !== profileId));
    };

    const value = useMemo(() => ({ users, setUsers, deleteUser, tipoviKorisnika, poslovi, diplome, profiles, setProfiles, deleteProfile }), [users, profiles],);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
