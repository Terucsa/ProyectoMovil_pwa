import {getDocs, query, collection, doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../conexionFirebase";
import type { MeditationType } from "../../domain/meditation/meditation.type";

export const getAllMeditations = async (): Promise<MeditationType[]> => {
    const meditationsRef = collection(db, "meditation");
    const q = query(meditationsRef);

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No se encontró ningún registro en la colección 'meditaion'.");
        return [];
    }

    const allMeditations: MeditationType[] = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            title: data.title,
            sesion: data.sesion,
            type: data.type,
            meditationSesion: data.meditationSesion
        } as MeditationType;
    });

    return allMeditations;
};

export const insertMeditation = async (id: string, title: string, time: string, audioUrl: string): Promise<boolean> => {
    const meditationRef = doc(db, "meditation", id);
    try {
        await updateDoc(meditationRef, {
            meditationSesion: arrayUnion({
                idSesion: id,
                titleSesion: title,
                time: time,
                urlAudio: audioUrl
            })
        });

        return true;
    } catch (error) {
        console.error("Error al insertar la sesión en el paquete:", error);
        return false;
    }
}