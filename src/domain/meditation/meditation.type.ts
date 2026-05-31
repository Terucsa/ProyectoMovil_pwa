export type MeditationInfoType = {
    idSesion: string;
    titleSesion: string;
    time: string;
    urlAudio: string;
}

export type MeditationType = {
    id: string;
    title: string;
    meditationSesion: MeditationInfoType[];
    type: string;
}