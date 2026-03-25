import { STATUS_STRIP_HEIGHT_PX } from "@/config/layout";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SideBarApp from "../base/side_bar_app";

interface SideBarProps {
  apps: { id: string; title: string; icon: string }[];
  favourite_apps: Record<string, boolean>;
  closed_windows: Record<string, boolean>;
  focused_windows: Record<string, boolean>;
  openAppByAppId: (id: string) => void;
  onAppButtonClick?: () => void;
  isMinimized: Record<string, boolean>;
  hide: boolean;
  hideSideBar: (id: string | null, hide: boolean) => void;
  showAllApps: () => void;
  allAppsView: boolean;
}

const renderApps = (
  props: SideBarProps,
  openAppFromSideBar: (id: string) => void
): React.ReactElement[] => {
  const sideBarAppsJsx: React.ReactElement[] = [];
  props.apps.forEach((app, index: number) => {
    if (props.favourite_apps[app.id] === false) return;
    sideBarAppsJsx.push(
      <SideBarApp
        key={index}
        id={app.id}
        title={app.title}
        icon={app.icon}
        isClose={props.closed_windows}
        isFocus={props.focused_windows}
        openApp={openAppFromSideBar}
        isMinimized={props.isMinimized}
      />
    );
  });
  return sideBarAppsJsx;
};

export default function SideBar(props: SideBarProps) {
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAppFromSideBar = (id: string) => {
    props.onAppButtonClick?.();
    props.openAppByAppId(id);
  };

  const showAllAppsFromSideBar = () => {
    props.onAppButtonClick?.();
    props.showAllApps();
  };

  function clearHideTimer() {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }

  function showSideBar() {
    clearHideTimer();
    props.hideSideBar(null, false);
  }

  function hideSideBar() {
    clearHideTimer();
    hideTimeoutRef.current = setTimeout(() => {
      props.hideSideBar(null, true);
      hideTimeoutRef.current = null;
    }, 500);
  }

  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  return (
    <>
      <div
        onMouseEnter={showSideBar}
        onMouseLeave={hideSideBar}
        className={
          (props.hide ? " translate-x-full " : "") +
          " absolute transform duration-300 select-none z-40 right-0 top-0 h-full px-2 w-auto flex flex-col justify-start items-center border-black/60 bg-black/50"
        }
        style={{ paddingTop: STATUS_STRIP_HEIGHT_PX }}
      >
        {Object.keys(props.closed_windows).length !== 0
          ? renderApps(props, openAppFromSideBar)
          : null}
        <AllApps showApps={showAllAppsFromSideBar} />
      </div>
      <div
        onMouseEnter={showSideBar}
        onMouseLeave={hideSideBar}
        className={"w-4 h-full absolute top-0 right-0 bg-transparent z-50"}
      ></div>
    </>
  );
}

interface AllAppsProps {
  showApps: () => void;
}

export function AllApps(props: AllAppsProps) {
  const [title, setTitle] = useState(false);

  return (
    <div
      className={`w-11 h-11 rounded m-1.5 hover:bg-white/10 hover:scale-110 hover:translate-y-1 flex items-center justify-center transition-all duration-150 ease-in-out`}
      style={{ marginTop: "auto" }}
      onMouseEnter={() => {
        setTitle(true);
      }}
      onMouseLeave={() => {
        setTitle(false);
      }}
      onClick={props.showApps}
    >
      <div className="relative">
        <Image
          width={32}
          height={32}
          className={`w-8 h-8 transition-transform duration-150 ease-in-out ${title ? "scale-125 translate-y-1" : "scale-100 translate-y-0"}`}
          src="/images/system/view-app-grid-symbolic.svg"
          alt="Ubuntu view app"
        />
        <div
          className={
            (title ? " visible " : " invisible ") +
            " w-max py-0.5 px-1.5 absolute top-1 left-full ml-5 text-ubt-grey/90 text-sm bg-ub-grey/70 border border-gray-400/40 rounded-md transition-transform duration-150 ease-in-out " +
            (title ? "scale-105 translate-y-0.5" : "scale-100 translate-y-0")
          }
        >
          Show Applications
        </div>
      </div>
    </div>
  );
}
