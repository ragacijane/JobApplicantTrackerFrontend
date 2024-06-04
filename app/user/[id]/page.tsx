import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ShowProfile from "@/components/ShowProfile";
import { Backend_URL } from "@/config/Constants";
import { useUserContext } from "@/context/UserContext";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {

  return (
    <ShowProfile providedUserid={parseInt(props.params.id)} />
  );
};

export default ProfilePage;
/*
const session = await getServerSession(authOptions);
  const { users, profiles } = useUserContext();
  const user = users.find(user => user.idKorisnika == parseInt(props.params.id));
  // const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
  //   method: "GET",
  //   headers: {
  //     authorization: `Bearer ${session?.backendTokens.accessToken}`,
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (!response.headers.get('Content-Type')?.includes('application/json')) {
  //   throw new Error('Response is not JSON');
  // }
  // const user = await response.json();
  const currUser = user ? user : null;
  let currProfile = null;;
  if (user?.idKandidata) {
    const id = user.idKandidata.idKandidata;
    // const kandidatiResponse = await fetch(Backend_URL + `/kandidati/` + id, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!kandidatiResponse.headers.get('Content-Type')?.includes('application/json')) {
    //   throw new Error('Response is not JSON');
    // }
    // const kandidatiUser = await kandidatiResponse.json();
    const profile = profiles.find(profile => profile.idKandidata == id)
    currProfile = profile ? profile : null;
*/
