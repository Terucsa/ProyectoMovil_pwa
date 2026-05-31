import { doc, setDoc, query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../conexionFirebase";
import type { NewUser, User } from "../../domain/user/user.types";


export const insertNewUser = async (user: NewUser): Promise<void> => {
    const userRef = doc(db, "users", user.id);

    await setDoc(userRef, {
        id: user.id,
        email: user.email,
        password: user.password,
        userName: user.userName,
        age: user.age,
        role: user.role,
    });
};

export const getUser = async (email: string, password: string): Promise<User | null> => {
    const usersRef = collection(db, "users");
    const q = query(
        usersRef,
        where("email", "==", email),
        where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log("Credenciales incorrectas o usuario no encontrado.");
        return null;
    }
    const docSnap = querySnapshot.docs[0];
    const userData = docSnap.data();
    return {
        id: docSnap.id,
        email: userData.email,
        userName: userData.userName,
        age: userData.age,
        role: userData.role
    } as User;
}