import CardItemMeditation from "./CardItemMeditation";
import ListMeditation from "./ListMeditation";
import type { MeditationType } from "../../../domain/meditation/meditation.type";
import {useState} from "react";

type Props = {
    meditations: MeditationType[];
};

export default function CardMeditation({ meditations }: Props) {
    const [idMetetion, setIdMeditation] = useState("");

    const listMedition = (id: string) => {
        setIdMeditation(id);
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {meditations.map((pkg) => (
                    <CardItemMeditation key={pkg.id} meditation={pkg} onListMedition={listMedition}/>
                ))}
            </div>

            <ListMeditation meditationInfo={meditations} id={idMetetion} />
        </>

    )
}