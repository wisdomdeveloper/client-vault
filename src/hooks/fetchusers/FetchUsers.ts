import { db } from "@/lib/firebase/auth";
import { UserData } from "@/types/type";
import { collection, getDocs } from "firebase/firestore";

export let users: UserData[] = [];

const fetchUserData = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const userData: UserData[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      photoURL: data.photoURL ?? "",
      name: data.name ?? "",
      email: data.email ?? "",
      uid: data.uid ?? "",
    } as UserData;
  });

  users = userData;
};

export default fetchUserData();
