import { Headphones, X } from "lucide-react";
import ItemListMeditacion from "./ItemListMeditacion"
import type { MeditationType } from "../../../domain/meditation/meditation.type";

type Props = {
    meditationInfo: MeditationType[];
    id: string;
}

export default function ListMeditation({meditationInfo, id}: Props) {
    const selectedMeditation = meditationInfo.find((meditation) => meditation.id === id);

    return (
      <>
          <input type="checkbox" id="playlist-modal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm z-50">
              <div className="modal-box rounded-none border border-current border-opacity-10 bg-current/3 backdrop-blur-md
              p-6 max-w-md shadow-2xl backdrop-blur-md text-white">
                  <div className="flex items-center justify-between border-b pb-4 border-current border-opacity-5 mb-4">
                      <div className="flex items-center gap-2">
                          <Headphones className="w-4 h-4 opacity-60" />
                          <h3 className="text-xs uppercase tracking-widest font-medium opacity-80">
                              Contenido del Paquete
                          </h3>
                      </div>
                      <label htmlFor="playlist-modal" className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                          <X className="w-4 h-4" />
                      </label>
                  </div>
                  <ul className="flex flex-col text-xs uppercase tracking-wider font-light divide-y divide-current divide-opacity-5 max-h-48 overflow-y-auto pr-2 pb-12
                  custom-scrollbar ">
                      {
                          selectedMeditation?.meditationSesion ? (
                              selectedMeditation.meditationSesion.map((sesion) => (
                                  <ItemListMeditacion key={sesion.idSesion} meditationInfo={sesion} />
                              ))
                          ) : (
                              <p className="text-[10px] opacity-50 text-center py-4 lowercase">
                                  Selecciona un paquete para ver las sesiones
                              </p>
                          )
                      }
                  </ul>
              </div>
              <label className="modal-backdrop" htmlFor="playlist-modal">Cerrar</label>
          </div>
      </>
    );
}