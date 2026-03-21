/* eslint-disable @next/next/no-img-element */

import { STATUS_STRIP_HEIGHT_PX } from "@/config/layout";
import React, { useState, useEffect, useCallback } from "react";
import UbuntuApp from "../base/ubuntu_app";

type AppItem = { id: string; title: string; icon: string };

interface AllApplicationsProps {
  apps: AppItem[];
  openApp: (id: string) => void;
}

export default function AllApplications({ apps, openApp }: AllApplicationsProps) {
  const [query, setQuery] = useState("");
  const [filteredApps, setFilteredApps] = useState<AppItem[]>([]);
  const [category, setCategory] = useState(0); // 0 for all, 1 for frequent

  useEffect(() => {
    setFilteredApps(apps);
  }, [apps]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value === "" || value === null) {
      setFilteredApps(apps);
    } else {
      setFilteredApps(prevApps => 
        prevApps.filter((app) =>
          app.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }, [apps]);

  const getFrequentApps = useCallback((): AppItem[] => {
    const frequentAppsInfo = JSON.parse(localStorage.getItem("frequentApps") || "[]") as Array<{ id: string; frequency?: number }>;
    const frequentApps: AppItem[] = [];
    
    if (frequentAppsInfo) {
      frequentAppsInfo.forEach((app_info) => {
        const app = apps.find((a) => a.id === app_info.id);
        if (app) {
          frequentApps.push(app);
        }
      });
    }
    return frequentApps;
  }, [apps]);

  const renderApps = useCallback(() => {
    const appsJsx: React.ReactNode[] = [];
    const appsToRender = category === 0 ? [...filteredApps] : getFrequentApps();
    
    appsToRender.forEach((app, index) => {
      const props = {
        name: app.title,
        id: app.id,
        icon: app.icon,
        openApp: openApp,
      };

      appsJsx.push(<UbuntuApp key={index} {...props} />);
    });
    return appsJsx;
  }, [category, filteredApps, getFrequentApps, openApp]);

  const handleSwitch = useCallback((newCategory: number) => {
    if (newCategory !== category) {
      setCategory(newCategory);
    }
  }, [category]);

  return (
    <div
      className={
        "absolute left-0 right-0 bottom-0 w-full z-20 pl-12 justify-center md:pl-20 border border-black/60 bg-black/70"
      }
      style={{ top: STATUS_STRIP_HEIGHT_PX }}
    >
      <div className={"flex md:pr-20 pt-5 align-center justify-center"}>
        <div
          className={
            "flex w-2/3 h-full items-center pl-2 pr-2 bg-white border-black border-width-2 rounded-xl overflow-hidden md:w-1/3 "
          }
        >
          <img
            className={"w-5 h-5"}
            alt="search icon"
            src={"/images/logos/search.png"}
          />
          <input
            className={"w-3/4 p-1 bg-transparent focus:outline-none text-gray-700 font-medium"}
            placeholder="Type to Search ..."
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className={
          "grid md:grid-cols-6 md:grid-rows-3 grid-cols-3 grid-rows-6 md:gap-4 gap-1 md:px-20 px-5 pt-10 justify-center"
        }
      >
        {renderApps()}
      </div>
      <div
        className={
          "flex align-center justify-center w-full fixed bottom-0 mb-15 pr-20  md:pr-20 "
        }
      >
        <div
          className={
            "w-1/4 text-center group text-white bg-transparent cursor-pointer items-center"
          }
          onClick={() => handleSwitch(1)}
        >
          <h4>Frequent</h4>
          {category === 1 ? (
            <div className={"h-1 mt-1 bg-ub-orange self-center"} />
          ) : (
            <div
              className={"h-1 mt-1 bg-transparent group-hover:bg-white  transition-all duration-150 ease-in-out"}
            />
          )}
        </div>
        <div
          className={
            "w-1/4 text-center group text-white bg-transparent cursor-pointer items-center"
          }
          onClick={() => handleSwitch(0)}
        >
          <h4>All</h4>
          {category === 0 ? (
            <div className={"h-1 mt-1 bg-ub-orange self-center"} />
          ) : (
            <div className={"h-1 mt-1 bg-transparent group-hover:bg-white transition-all duration-150 ease-in-out"} />
          )}
        </div>
      </div>
    </div>
  );
}
