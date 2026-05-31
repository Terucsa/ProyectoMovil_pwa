import {  Sparkles } from 'lucide-react'
import CardMeditation from "../components/meditation/CardMeditation";
import useMeditationActions from "../../aplication/meditation/useMeditationActions"

export default function HomePageMeditation() {
    const {meditations} = useMeditationActions();

    return (
        <>
            <div className="w-full flex flex-col gap-6 bg-transparent">
                <div className="border-b pb-2 border-current border-opacity-5">
                    <h3 className="text-xs uppercase tracking-widest font-medium opacity-60 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> Paquetes Disponibles
                    </h3>
                </div>
                <CardMeditation meditations={meditations} />


            </div>
        </>

    );
}