import Image from "next/image";
import React from "react";

interface UbuntuAppProps {
  id: string;
  name: string;
  icon: string;
  openApp: (id: string) => void;
}

export default function UbuntuApp({ id, name, icon, openApp }: UbuntuAppProps) {
  const handleOpenApp = () => {
    openApp(id);
  };

  return (
    <div
      className="group p-1.5 m-0.5 z-10 bg-white/0 hover:bg-white/20 hover:scale-105 hover:translate-y-0.5 focus:bg-ub-orange/50 focus:border-yellow-700 border border-transparent outline-none rounded-md select-none w-24 h-24 flex flex-col justify-start items-center text-center text-xs font-normal text-white transition-all duration-150 ease-in-out"
      id={`app-${id}`}
      onDoubleClick={handleOpenApp}
      tabIndex={0}
    >
      <Image
        width={40}
        height={40}
        className="mb-0.5 w-10 h-10 object-contain transition-transform duration-150 ease-in-out group-hover:scale-110 group-hover:translate-y-0.5"
        src={icon}
        alt={`Ubuntu ${name}`}
      />
      <span className="transition-transform duration-150 ease-in-out group-hover:scale-105 group-hover:translate-y-0.5 leading-tight">
        {name}
      </span>
    </div>
  );
}
