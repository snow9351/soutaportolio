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
      className="group p-2 m-1 z-10 bg-white/0 hover:bg-white/20 hover:scale-110 hover:translate-y-1 focus:bg-ub-orange/50 focus:border-yellow-700 border border-transparent outline-none rounded-md select-none w-36 h-32 flex flex-col justify-start items-center text-center text-sm font-normal text-white transition-all duration-150 ease-in-out"
      id={`app-${id}`}
      onDoubleClick={handleOpenApp}
      tabIndex={0}
    >
      <Image
        width={64}
        height={64}
        className="mb-1 w-16 h-16 object-contain transition-transform duration-150 ease-in-out group-hover:scale-125 group-hover:translate-y-1"
        src={icon}
        alt={`Ubuntu ${name}`}
      />
      <span className="transition-transform duration-150 ease-in-out group-hover:scale-110 group-hover:translate-y-1">
        {name}
      </span>
    </div>
  );
}
