"use client";
import { FormEventHandler, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Backend_URL } from '@/config/Constants';
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { User } from "@/types/types";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

interface NewUser {
    username: string;
    password: string;
    idTipa: number;
}

const AddUser = () => {
    const router = useRouter();
    const { users, setUsers } = useUserContext();
    const { tipoviKorisnika } = useUserContext();
    // const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<NewUser>({ username: "", password: "", idTipa: 1 });
    const [usernameExists, setUsernameExists] = useState<boolean>(false);
    const [formError, setFormError] = useState('');
    //const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);

    const checkUsernameExists = (username: string): boolean => {
        return users.some((user: User) => user.username === username);
    };

    const handleSubmitNewUser: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setFormError('')
        // Check if username and password are provided
        if (!newUser.username || !newUser.password) {
            console.error('All fields are required');
            setFormError('All fields are required');
            return;
        }

        // Check if username already exists
        if (checkUsernameExists(newUser.username)) {
            setUsernameExists(true);
            return;
        }
        if (newUser.username.length && newUser.password.length)
            try {
                const response = await fetch(Backend_URL + '/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });

                if (!response.ok) {
                    throw new Error(`Failed to add new user: ${response.statusText}`);
                }
                const userToAdd = await response.json();
                setUsers((prevUsers: User[]) => [...prevUsers, userToAdd]);
                setNewUser({ username: "", password: "", idTipa: 1 });
                router.refresh();
                onClose();
            } catch (error) {
                console.error('Error adding new user:', error);
            }
    };
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onOpenChange = (isOpen: boolean) => setIsOpen(isOpen);
    return (
        <div>
            <Button
                onClick={onOpen}
                className='btn btn-primary w-full'
            >
                Add new user
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmitNewUser}>
                                <div className='modal-action'>
                                    <ModalHeader>
                                        Dodaj Korisnika
                                    </ModalHeader>
                                    <ModalBody>
                                        <Input
                                            isRequired
                                            value={newUser.username}
                                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                            type='text'
                                            placeholder='Enter username'
                                            className='input input-bordered w-full mb-2'
                                        />
                                        {usernameExists && <p className="text-red-500">Username already exists</p>}
                                        <Input
                                            isRequired
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                            type='password'
                                            placeholder='Enter password'
                                            className='input input-bordered w-full mb-4'
                                        />
                                        <Select
                                            label="Tip korisnika"
                                            defaultSelectedKeys={["1"]}
                                            className="max-w-xs"
                                            onChange={(e) => setNewUser({ ...newUser, idTipa: parseInt(e.target.value) })}
                                        >
                                            {tipoviKorisnika.map((tip) => (
                                                <SelectItem key={tip.idTipa} value={tip.idTipa}>
                                                    {tip.nazivTipa}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </ModalBody>
                                    <ModalFooter>
                                        {formError && <p className="text-red-500">{formError}</p>}
                                        <Button type='submit' className='btn' //onPress={onClose}
                                        >
                                            Add User
                                        </Button>
                                    </ModalFooter>
                                </div>
                            </form>
                        </>
                    )}
                </ModalContent>

            </Modal>
        </div>
    );
};

export default AddUser;
