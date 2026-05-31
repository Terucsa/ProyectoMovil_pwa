import type { MeditationInfoType } from "../../../domain/meditation/meditation.type";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../infrastructure/login/AuthToggleState";

type Props = {
    meditationInfo: MeditationInfoType;
}

export default function ItemListMeditacion({ meditationInfo }: Props) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <li className="py-3 flex items-center justify-between hover:opacity-70 cursor-pointer transition-opacity">
            {isLoggedIn ? (
                <Link
                    to={`/meditar/${meditationInfo.idSesion}`}
                    state={{ urlAudio: meditationInfo.urlAudio, title: meditationInfo.titleSesion }}
                >
                    <span>{meditationInfo.titleSesion}</span>
                </Link>
            ) : (
                <Link to="/login">
                    <span>{meditationInfo.titleSesion}</span>
                </Link>
            )}
            <span className="text-[10px] opacity-40 font-sans">{meditationInfo.time}</span>
        </li>
    );
}