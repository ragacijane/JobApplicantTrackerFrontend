"use client"
import { Backend_URL } from "@/config/Constants";
import { useUserContext } from "@/context/UserContext";
import { Diplome, Kandidati, Poslovi, User } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
type Props = {
    providedUserid: number | null;
};
interface EditProfile {
    //idKandidata: number | null;
    imeKandidata: string | "";
    prezimeKandidata: string | "";
    jmbg: string | "";
    email: string | "";
    telefon: string | "";
    grad: string | "";
    zeljenaPlata: string | "";
    obrazovnaUstanova: string | "";
    idDiplome: number | 1 | Diplome;
    idKorisnika: number | null | User;
    tipPosla: number[];
}
const ShowProfile = ({ providedUserid: id }: Props) => {
    const router = useRouter();
    const { diplome, poslovi } = useUserContext();
    const { profiles, setProfiles} = useUserContext();
    const { users, setUsers } = useUserContext();
    const { data: session } = useSession();

    const curentUser = users.find(user => user.idKorisnika == id) ? users.find(user => user.idKorisnika == id) : null;
    let currProfile = null;;
    if (curentUser?.idKandidata) {
        const id = curentUser.idKandidata.idKandidata;
        const profile = profiles.find(profile => profile.idKandidata == id)
        currProfile = profile ? profile : null;
    }
    //const currProfile = curentUser?.idKandidata ? true : false;
    const allowed = session?.user.idTipa.idTipa == 3 || curentUser?.idTipa.idTipa != 1 ? false : true;
    const [formError, setFormError] = useState('');
    var [userProfile, setUserProfile] = useState<EditProfile>(
        {
        imeKandidata: currProfile?.imeKandidata|| "",
        prezimeKandidata: currProfile?.prezimeKandidata || "",
        jmbg:currProfile?.jmbg || "",
        email: currProfile?.email || "",
        telefon:currProfile?.telefon || "",
        grad: currProfile?.grad || "",
        zeljenaPlata: currProfile?.zeljenaPlata || "",
        obrazovnaUstanova:currProfile?.obrazovnaUstanova || "",
        idDiplome: currProfile?.idDiplome.idDiplome || 1,
        idKorisnika: curentUser?.idKorisnika || null,
        tipPosla: currProfile? currProfile.tipPosla.map((job: Poslovi) => job.idPosla) : []
    }
);
    // currProfile ? userProfile.imeKandidata = currProfile.imeKandidata : "";
    // currProfile ? userProfile.prezimeKandidata = currProfile.prezimeKandidata : "";
    // currProfile ? userProfile.jmbg = currProfile.jmbg : "";
    // currProfile ? userProfile.email = currProfile.email : "";
    // currProfile ? userProfile.telefon = currProfile.telefon : "";
    // currProfile ? userProfile.grad = currProfile.grad : "";
    // currProfile ? userProfile.zeljenaPlata = currProfile.zeljenaPlata : "";
    // currProfile ? userProfile.obrazovnaUstanova = currProfile.obrazovnaUstanova : "";
    // currProfile ? userProfile.idDiplome = currProfile.idDiplome.idDiplome : null;
    //let method = currProfile ? 'PUT' : 'POST'
    //let kandId = method == 'PUT' ? curentUser?.idKandidata.idKandidata : '';
    const handleSubmitProfile: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setFormError('')
        let method = currProfile ? 'PUT' : 'POST'
        let kandId = method == 'PUT' ? curentUser?.idKandidata.idKandidata : '';
        if (!userProfile.imeKandidata
            || !userProfile.prezimeKandidata
            || !userProfile.jmbg
            || !userProfile.email
            || !userProfile.telefon
            || !userProfile.grad
            || !userProfile.zeljenaPlata
            || !userProfile.obrazovnaUstanova
            || !userProfile.idDiplome
            || userProfile.tipPosla.length == 0
        ) {
            console.error('All fields are required');
            setFormError('All fields are required');
            return;
        }
        try {
            console.log(userProfile)
            userProfile.tipPosla = userProfile.tipPosla.map(Number);
            const response = await fetch(Backend_URL + '/kandidati/' + kandId, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            });

            if (!response.ok) {
                throw new Error(`Failed to add new user: ${response.statusText}`);
            }
            const profileToAdd = await response.json();
            setProfiles((prevProfiles: Kandidati[]) => {
                const existingIndex = prevProfiles.findIndex(profile => profile.idKandidata === profileToAdd.idKandidata);

                if (existingIndex !== -1) {
                    // Update the existing profile
                    const updatedProfiles = [...prevProfiles];
                    updatedProfiles[existingIndex] = profileToAdd;
                    return updatedProfiles;
                } else {
                    // Add the new profile
                    return [...prevProfiles, profileToAdd];
                }
            })
            setUsers((prevUsers: User[])=>{
                const existingIndex= prevUsers.findIndex(user => user.idKorisnika === profileToAdd.idKorisnika.idKorisnika);
                const updatedUser = [...prevUsers];
                if (existingIndex !== -1) {
                    updatedUser[existingIndex].idKandidata=profileToAdd;
                }
                return updatedUser;
            }

            )
            setUserProfile({
                imeKandidata: currProfile?.imeKandidata|| "",
                prezimeKandidata: currProfile?.prezimeKandidata || "",
                jmbg:currProfile?.jmbg || "",
                email: currProfile?.email || "",
                telefon:currProfile?.telefon || "",
                grad: currProfile?.grad || "",
                zeljenaPlata: currProfile?.zeljenaPlata || "",
                obrazovnaUstanova:currProfile?.obrazovnaUstanova || "",
                idDiplome: currProfile?.idDiplome.idDiplome || 1,
                idKorisnika: curentUser?.idKorisnika || null,
                tipPosla: currProfile? currProfile.tipPosla.map((job: Poslovi) => job.idPosla) : []
            });
            router.refresh();
        } catch (error) {
            console.error('Error adding new user:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start h-full">
            <form onSubmit={handleSubmitProfile}>
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.imeKandidata}
                    onChange={(e) => setUserProfile({ ...userProfile, imeKandidata: e.target.value })}
                    type='text'
                    label="Ime"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.prezimeKandidata}
                    onChange={(e) => setUserProfile({ ...userProfile, prezimeKandidata: e.target.value })}
                    type='text'
                    label="Prezime"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.jmbg}
                    onChange={(e) => setUserProfile({ ...userProfile, jmbg: e.target.value })}
                    type='text'
                    label="JMBG"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    type='text'
                    label="Email"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.telefon}
                    onChange={(e) => setUserProfile({ ...userProfile, telefon: e.target.value })}
                    type='text'
                    label="Telefon"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.grad}
                    onChange={(e) => setUserProfile({ ...userProfile, grad: e.target.value })}
                    type='text'
                    label="Grad"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.zeljenaPlata}
                    onChange={(e) => setUserProfile({ ...userProfile, zeljenaPlata: e.target.value })}
                    type='text'
                    label="Zeljena Plata"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={userProfile.obrazovnaUstanova}
                    onChange={(e) => setUserProfile({ ...userProfile, obrazovnaUstanova: e.target.value })}
                    type='text'
                    label="Obrazovna Ustanova"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <div className="mb-4">
                    <Select
                        label="Diploma"
                        isDisabled={!allowed}
                        labelPlacement="outside-left"
                        defaultSelectedKeys={[userProfile.idDiplome.toString()]}
                        className="max-w-xs"
                        onChange={(e) => setUserProfile({ ...userProfile, idDiplome: parseInt(e.target.value) })}
                    >
                        {diplome.map((tip) => (
                            <SelectItem key={tip.idDiplome} value={tip.idDiplome}>
                                {tip.nazivDiplome}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="mb-4">
                    <Select
                        label="Poslovi"
                        isDisabled={!allowed}
                        defaultSelectedKeys={userProfile.tipPosla.map(num => num.toString())}
                        labelPlacement="outside-left"
                        className="max-w-xs"
                        selectionMode="multiple"
                        onChange={(selectedValues) => {
                            setUserProfile({ ...userProfile, tipPosla: selectedValues.target.value.split(',').map(Number) });
                        }}
                    >
                        {poslovi.map((tip) => (
                            <SelectItem key={tip.idPosla} value={tip.idPosla}>
                                {tip.nazivPosla}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                {formError && <p className="text-red-500">{formError}</p>}
                <Button type='submit' className='btn' //onPress={onClose}
                >
                    Save changes
                </Button>
            </form>
        </div>
    );
};
//numberArray.map(num => num.toString());
export default ShowProfile;
/* 
"use client"
import { Backend_URL } from "@/config/Constants";
import { useUserContext } from "@/context/UserContext";
import { Diplome, Kandidati, Poslovi, User } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, Key, useState } from "react";
type Props = {
    providedUser: User;
};
interface EditProfile {
    //idKandidata: number | null;
    imeKandidata: string;
    prezimeKandidata: string;
    jmbg: string;
    email: string;
    telefon: string;
    grad: string;
    zeljenaPlata: string;
    obrazovnaUstanova: string;
    idDiplome: number | null | Diplome;
    idKorisnika: number | null | User;
    tipPosla: [];
}

const getProvidedKandidat = async (providedUser: User) => {

    try {
        const response = await fetch(Backend_URL + '/kandidati/' + providedUser.idKandidata, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to add new user: ${response.statusText}`);
        }
        const data = await response.json();
        setUserProfile({
            //idKandidata: session?.user.idKandidata || null,
            imeKandidata: data.idKandidata,
            prezimeKandidata: data.prezimeKandidata,
            jmbg: data.jmbg,
            email: data.email,
            telefon: data.telefon,
            grad: data.grad,
            zeljenaPlata: data.zeljenaPlata,
            obrazovnaUstanova: data.obrazovnaUstanova,
            idDiplome: data.idDiplome.idDiplome,
            idKorisnika: providedUser?.idKorisnika || null,
            tipPosla: data.tipPosla.length > 0 ? data.tipPosla.map((job: Poslovi) => job.idPosla) : []
        });
        router.refresh();
    } catch (error) {
        console.error('Error adding new user:', error);
    }
}
const ShowProfile = ({ providedUser: providedUser }: Props) => {

    const router = useRouter();
    const { diplome, poslovi } = useUserContext();
    const { data: session } = useSession(); // Retrieve the current session
    // // Check if there's a session and extract the username
    const curentUser = session?.user || null;
    const profileExist = providedUser?.idKandidata ? true : false;
    const allowed = session?.user.idTipa.idTipa == 3 ? false : true;
    const [formError, setFormError] = useState('');
    const [userProfile, setUserProfile] = useState<EditProfile>({
        //idKandidata: session?.user.idKandidata || null,
        imeKandidata: "",
        prezimeKandidata: "",
        jmbg: "",
        email: "",
        telefon: "",
        grad: "",
        zeljenaPlata: "",
        obrazovnaUstanova: "",
        idDiplome: null,
        idKorisnika: providedUser?.idKorisnika || null,
        tipPosla: []
    });

    if (profileExist) {
        getProvidedKandidat(providedUser)
    }

    // const selectedDiploma: Key[] | undefined = profileExist && !allowed && userProfile.idDiplome !== null
    //     ? [userProfile.idDiplome]
    //     : undefined;

    const handleSubmitProfile: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setFormError('')

        if (!userProfile.imeKandidata
            || !userProfile.prezimeKandidata
            || !userProfile.jmbg
            || !userProfile.email
            || !userProfile.telefon
            || !userProfile.grad
            || !userProfile.zeljenaPlata
            || !userProfile.obrazovnaUstanova
            || !userProfile.idDiplome
            || userProfile.tipPosla.length == 0
        ) {
            console.error('All fields are required');
            setFormError('All fields are required');
            return;
        }
        try {
            const response = await fetch(Backend_URL + '/kandidati', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            });

            if (!response.ok) {
                throw new Error(`Failed to add new user: ${response.statusText}`);
            }
            const profileToAdd = await response.json();
            setProfiles((prevProfiles: Kandidati[]) => [...prevProfiles, profileToAdd])
            setUserProfile({
                //idKandidata: session?.user.idKandidata || null,
                imeKandidata: "",
                prezimeKandidata: "",
                jmbg: "",
                email: "",
                telefon: "",
                grad: "",
                zeljenaPlata: "",
                obrazovnaUstanova: "",
                idDiplome: null,
                idKorisnika: providedUser?.idKorisnika || null,
                tipPosla: []
            });
            router.refresh();
        } catch (error) {
            console.error('Error adding new user:', error);
        }
    }
    console.log(providedUser)
    console.log("profile " + profileExist + " allowed " + allowed)
    return (
        <div className="flex flex-col items-center justify-start h-full">
            <form onSubmit={handleSubmitProfile}>
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.imeKandidata : ""}
                    value={userProfile.imeKandidata}
                    onChange={(e) => setUserProfile({ ...userProfile, imeKandidata: e.target.value })}
                    type='text'
                    label="Ime"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.prezimeKandidata : ""}
                    value={userProfile.prezimeKandidata}
                    onChange={(e) => setUserProfile({ ...userProfile, prezimeKandidata: e.target.value })}
                    type='text'
                    label="Prezime"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.jmbg : ""}
                    value={userProfile.jmbg}
                    onChange={(e) => setUserProfile({ ...userProfile, jmbg: e.target.value })}
                    type='text'
                    label="JMBG"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.email : ""}
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    type='text'
                    label="Email"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.telefon : ""}
                    value={userProfile.telefon}
                    onChange={(e) => setUserProfile({ ...userProfile, telefon: e.target.value })}
                    type='text'
                    label="Telefon"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.grad : ""}
                    value={userProfile.grad}
                    onChange={(e) => setUserProfile({ ...userProfile, grad: e.target.value })}
                    type='text'
                    label="Grad"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.zeljenaPlata : ""}
                    value={userProfile.zeljenaPlata}
                    onChange={(e) => setUserProfile({ ...userProfile, zeljenaPlata: e.target.value })}
                    type='text'
                    label="Zeljena Plata"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <Input
                    isRequired
                    isDisabled={!allowed}
                    placeholder={profileExist && !allowed ? userProfile.obrazovnaUstanova : ""}
                    value={userProfile.obrazovnaUstanova}
                    onChange={(e) => setUserProfile({ ...userProfile, obrazovnaUstanova: e.target.value })}
                    type='text'
                    label="Obrazovna Ustanova"
                    labelPlacement="outside-left"
                    className='input input-bordered w-full mb-4'
                />
                <div className="mb-4">
                    <Select
                        label="Diploma"
                        labelPlacement="outside-left"
                        //defaultSelectedKeys={}
                        className="max-w-xs"
                        onChange={(e) => setUserProfile({ ...userProfile, idDiplome: parseInt(e.target.value) })}
                    >
                        {diplome.map((tip) => (
                            <SelectItem key={tip.idDiplome} value={tip.idDiplome}>
                                {tip.nazivDiplome}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="mb-4">
                    <Select
                        label="Poslovi"
                        labelPlacement="outside-left"
                        className="max-w-xs"
                        selectionMode="multiple"
                        onChange={(selectedValues) => {
                            setUserProfile({ ...userProfile, tipPosla: selectedValues.target.value.split(',') });
                        }}
                    >
                        {poslovi.map((tip) => (
                            <SelectItem key={tip.idPosla} value={tip.idPosla}>
                                {tip.nazivPosla}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                {formError && <p className="text-red-500">{formError}</p>}
                <Button type='submit' className='btn' //onPress={onClose}
                >
                    Save changes
                </Button>
            </form>
        </div>
    );
};
export default ShowProfile;
*/