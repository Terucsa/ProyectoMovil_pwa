import { useState, useEffect } from "react"
import type { MeditationType } from "../../domain/meditation/meditation.type"
import {getAllMeditations, insertMeditation} from "../../infrastructure/meditation/meditationFirebase.db";

export default function useMeditationActions() {
    const [meditations, setMeditations] = useState<MeditationType[]>([]);

    useEffect(() => {
        async function cargarDatos() {
            try {
                const meditationsSave = await getAllMeditations();
                setMeditations(meditationsSave);
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        }
        cargarDatos();
    }, []);

    const addMeditation = async (id: string, title: string, time: string, audioUrl: string): Promise<boolean> => {
            const meditationSesion = await insertMeditation(id, title, time, audioUrl);
            return meditationSesion ? true : false;
    }

    return {
        meditations,
        addMeditation,
    }

}