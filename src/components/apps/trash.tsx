import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
// import $ from 'jquery';

interface TrashItem {
    name: string;
    icon: string;
}

export default function Trash() {
    const trashItems: TrashItem[] = [
        {
            name: "php",
            icon: "/images/filetypes/php.png"
        },
        {
            name: "Angular.js",
            icon: "/images/filetypes/js.png"
        },
        {
            name: "node_modules",
            icon: "/images/system/folder.png"
        },
        {
            name: "abandoned project",
            icon: "/images/system/folder.png"
        },
        {
            name: "18BCP127 assignment name.zip",
            icon: "/images/filetypes/zip.png"
        },
        {
            name: "project final",
            icon: "/images/system/folder.png"
        },
        {
            name: "project ultra-final",
            icon: "/images/system/folder.png"
        },
    ];

    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        // get user preference from local-storage
        const wasEmpty = localStorage.getItem("trash-empty");
        if (wasEmpty !== null && wasEmpty !== undefined) {
            if (wasEmpty === "true") setEmpty(true);
        }
    }, []);

    const focusFile = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        // icon
        const icon = e.target.children[0] as HTMLElement;
        if (icon) icon.classList.toggle("opacity-60");
        // file name
        const fileName = e.target.children[1] as HTMLElement;
        if (fileName) fileName.classList.toggle("bg-ub-orange");
    }, []);

    const emptyTrash = useCallback(() => {
        setEmpty(true);
        localStorage.setItem("trash-empty", "true");
    }, []);

    const emptyScreen = () => {
        return (
            <div className="flex-grow flex flex-col justify-center items-center">
                <Image width={96} height={96} className=" w-24" src="/images/icons/user-trash-symbolic.svg" alt="Ubuntu Trash" />
                <span className="font-bold mt-4 text-xl px-1 text-gray-400">Trash is Empty</span>
            </div>
        );
    };

    const showTrashItems = () => {
        return (
            <div className="flex-grow ml-4 flex flex-wrap items-start content-start justify-start overflow-y-auto windowMainScreen">
                {trashItems.map((item, index) => {
                    return (
                        <div key={index} tabIndex={1} onFocus={focusFile} onBlur={focusFile} className="flex flex-col items-center text-sm outline-none w-16 my-2 mx-4">
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image width={64} height={64} src={item.icon} alt="Ubuntu File Icons" objectFit='contain' />
                            </div>
                            <span className="text-center rounded px-0.5">{item.name}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col bg-ub-cool-grey text-white select-none">
            <div className="flex items-center justify-between w-full bg-ub-warm-grey/40 text-sm">
                <span className="font-bold ml-2">Trash</span>
                <div className="flex">
                    <div className="border border-black bg-black/50 px-3 py-1 my-1 mx-1 rounded text-gray-300">Restore</div>
                    <div onClick={emptyTrash} className="border border-black bg-black/50 px-3 py-1 my-1 mx-1 rounded hover:bg-black/80 transition-all duration-150 ease-in-out">Empty</div>
                </div>
            </div>
            {empty ? emptyScreen() : showTrashItems()}
        </div>
    );
}

export const displayTrash = () => {
    return <Trash />;
}
