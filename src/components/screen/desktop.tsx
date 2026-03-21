import apps from "@/config/config";
import { STATUS_STRIP_HEIGHT_PX } from "@/config/layout";
import React, { useState, useEffect, useRef, useCallback } from "react";
import UbuntuApp from "../base/ubuntu_app";
import Window from "../base/window";
import BackgroundImage from "../utils/background-image";
import Clock from "../utils/clock";
import SideBar from "./side_bar";
import DesktopMenu from "../context_menus/desktop-menu";
import DefaultMenu from "../context_menus/default";
import AllApplications from "./all-applications";

interface DesktopProps {
  changeBackgroundImage: (imageName: string) => void;
  bg_image_name: string;
}

export default function Desktop({ changeBackgroundImage, bg_image_name }: DesktopProps) {
  // Refs for non-state values
  const app_stack = useRef<string[]>([]);
  const initFavourite = useRef<Record<string, boolean>>({});
  const clockDragOffset = useRef<{ x: number; y: number } | null>(null);
  const initialSideBarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const allWindowClosed = useRef(false);

  type AppConfig = {
    id: string;
    title: string;
    icon: string;
    disabled: boolean;
    favourite: boolean;
    desktop_shortcut: boolean;
    screen: (addFolder?: (name: string) => void, openApp?: (id: string) => void) => React.ReactNode;
    windowWidthPct?: number;
    windowHeightPct?: number;
  };

  // State variables
  const [focused_windows, setFocused_windows] = useState<Record<string, boolean>>({});
  const [closed_windows, setClosed_windows] = useState<Record<string, boolean>>({});
  const [allAppsView, setAllAppsView] = useState(false);
  const [overlapped_windows, setOverlapped_windows] = useState<Record<string, boolean>>({});
  const [disabled_apps, setDisabled_apps] = useState<Record<string, boolean>>({});
  const [favourite_apps, setFavourite_apps] = useState<Record<string, boolean>>({});
  const [hideSideBarState, setHideSideBarState] = useState(true);
  const [minimized_windows, setMinimized_windows] = useState<Record<string, boolean>>({});
  const [desktop_apps, setDesktop_apps] = useState<string[]>([]);
  const [context_menus, setContext_menus] = useState({
    desktop: false,
    default: false,
  });
  const [showNameBar, setShowNameBar] = useState(false);
  const [clockPosition, setClockPosition] = useState({ x: 0, y: 0 });
  const [clockDragging, setClockDragging] = useState(false);
  const [clockDisabled, setClockDisabled] = useState(false);
  const [sideBarPinned, setSideBarPinned] = useState(false);

  // Helper functions
  const getMenuPosition = (e: MouseEvent) => {
    let posx = 0;
    let posy = 0;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return {
      posx,
      posy,
    };
  };

  const hideAllContextMenu = () => {
    setContext_menus({
      desktop: false,
      default: false,
    });
  };

  const showContextMenu = (e: MouseEvent, menuName: string) => {
    let { posx, posy } = getMenuPosition(e);
    const contextMenu = document.getElementById(`${menuName}-menu`);

    if (contextMenu) {
      if (posx + contextMenu.offsetWidth > window.innerWidth)
        posx -= contextMenu.offsetWidth;
      if (posy + contextMenu.offsetHeight > window.innerHeight)
        posy -= contextMenu.offsetHeight;

      contextMenu.style.left = posx + "px";
      contextMenu.style.top = posy + "px";

      setContext_menus(prev => ({ ...prev, [menuName]: true }));
    }
  };

  const checkContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    hideAllContextMenu();
    const target = e.target as HTMLElement;
    switch (target.dataset.context) {
      case "desktop-area":
        // ReactGA.event({
        //   category: `Context Menu`,
        //   action: `Opened Desktop Context Menu`,
        // });
        showContextMenu(e, "desktop");
        break;
      default:
        // ReactGA.event({
        //   category: `Context Menu`,
        //   action: `Opened Default Context Menu`,
        // });
        showContextMenu(e, "default");
    }
  };

  const fetchAppsData = () => {
    let focused_windows: Record<string, boolean> = {},
      closed_windows: Record<string, boolean> = {},
      disabled_apps: Record<string, boolean> = {},
      favourite_apps: Record<string, boolean> = {},
      overlapped_windows: Record<string, boolean> = {},
      minimized_windows: Record<string, boolean> = {};
    const desktop_apps: string[] = [];
    (apps as AppConfig[]).forEach((app) => {
      focused_windows = {
        ...focused_windows,
        [app.id]: false,
      };
      closed_windows = {
        ...closed_windows,
        [app.id]: true,
      };
      disabled_apps = {
        ...disabled_apps,
        [app.id]: app.disabled,
      };
      favourite_apps = {
        ...favourite_apps,
        [app.id]: app.favourite,
      };
      overlapped_windows = {
        ...overlapped_windows,
        [app.id]: false,
      };
      minimized_windows = {
        ...minimized_windows,
        [app.id]: false,
      };
      if (app.desktop_shortcut) desktop_apps.push(app.id);
    });
    setFocused_windows(focused_windows);
    setClosed_windows(closed_windows);
    setDisabled_apps(disabled_apps);
    setFavourite_apps(favourite_apps);
    setOverlapped_windows(overlapped_windows);
    setMinimized_windows(minimized_windows);
    setDesktop_apps(desktop_apps);
    initFavourite.current = { ...favourite_apps };
  };

  const updateAppsData = () => {
    let focused_windows: Record<string, boolean> = {},
      closed_windows: Record<string, boolean> = {},
      favourite_apps: Record<string, boolean> = {},
      minimized_windows: Record<string, boolean> = {},
      disabled_apps: Record<string, boolean> = {};
    const desktop_apps: string[] = [];
    (apps as AppConfig[]).forEach((app) => {
      focused_windows = {
        ...focused_windows,
        [app.id]:
          focused_windows[app.id] !== undefined ||
          focused_windows[app.id] !== null
            ? focused_windows[app.id]
            : false,
      };
      minimized_windows = {
        ...minimized_windows,
        [app.id]:
          minimized_windows[app.id] !== undefined ||
          minimized_windows[app.id] !== null
            ? minimized_windows[app.id]
            : false,
      };
      disabled_apps = {
        ...disabled_apps,
        [app.id]: app.disabled,
      };
      closed_windows = {
        ...closed_windows,
        [app.id]:
          closed_windows[app.id] !== undefined ||
          closed_windows[app.id] !== null
            ? closed_windows[app.id]
            : true,
      };
      favourite_apps = {
        ...favourite_apps,
        [app.id]: app.favourite,
      };
      if (app.desktop_shortcut) desktop_apps.push(app.id);
    });
    setFocused_windows(focused_windows);
    setClosed_windows(closed_windows);
    setDisabled_apps(disabled_apps);
    setMinimized_windows(minimized_windows);
    setFavourite_apps(favourite_apps);
    setDesktop_apps(desktop_apps);
    initFavourite.current = { ...favourite_apps };
  };

  const checkForNewFolders = () => {
    const new_folders = localStorage.getItem("new_folders");
    if (new_folders === null || new_folders === undefined) {
      localStorage.setItem("new_folders", JSON.stringify([]));
    } else {
      const folders = JSON.parse(new_folders) as Array<{id: string, name: string}>;
      folders.forEach((folder) => {
        apps.push({
          id: `new-folder-${folder.id}`,
          title: folder.name,
          icon: "/images/system/folder.png",
          disabled: true,
          favourite: false,
          desktop_shortcut: true,
          screen: () => <></>,
        });
      });
      updateAppsData();
    }
  };

  const setEventListeners = () => {
    const settingsElement = document.getElementById("open-settings");
    if (settingsElement) {
      settingsElement.addEventListener("click", () => {
        openApp("settings");
      });
    }
  };

  const setContextListeners = () => {
    document.addEventListener("contextmenu", checkContextMenu);
    document.addEventListener("click", hideAllContextMenu);
  };

  const removeContextListeners = () => {
    document.removeEventListener("contextmenu", checkContextMenu);
    document.removeEventListener("click", hideAllContextMenu);
  };

  const focus = (objId: string) => {
    const newFocused_windows = { ...focused_windows };
    newFocused_windows[objId] = true;
    for (const key in newFocused_windows) {
      if (newFocused_windows.hasOwnProperty(key)) {
        if (key !== objId) {
          newFocused_windows[key] = false;
        }
      }
    }
    setFocused_windows(newFocused_windows);
  };

  const checkAllMinimised = () => {
    let result = true;
    for (const key in minimized_windows) {
      if (!closed_windows[key]) {
        result = result && minimized_windows[key];
      }
    }
    return result;
  };

  const giveFocusToLastApp = () => {
    if (!checkAllMinimised()) {
      for (const index in app_stack.current) {
        if (!minimized_windows[app_stack.current[index]]) {
          focus(app_stack.current[index]);
          break;
        }
      }
    }
  };

  const hideSideBar = (objId: string | null, hide: boolean) => {
    if (sideBarPinned && hide) return;
    if (hide === hideSideBarState) return;

    if (objId === null) {
      if (hide === false) {
        setHideSideBarState(false);
      } else {
        for (const key in overlapped_windows) {
          if (overlapped_windows[key]) {
            setHideSideBarState(true);
            return;
          }
        }
        // No overlapped windows - still hide the side bar on mouse leave.
        setHideSideBarState(true);
      }
      return;
    }

    if (hide === false) {
      for (const key in overlapped_windows) {
        if (overlapped_windows[key] && key !== objId) return;
      }
    }

    const newOverlapped_windows = { ...overlapped_windows };
    newOverlapped_windows[objId] = hide;
    setHideSideBarState(hide);
    setOverlapped_windows(newOverlapped_windows);
  };

  const hasMinimised = (objId: string) => {
    const newMinimized_windows = { ...minimized_windows };
    const newFocused_windows = { ...focused_windows };

    newMinimized_windows[objId] = true;
    newFocused_windows[objId] = false;
    setMinimized_windows(newMinimized_windows);
    setFocused_windows(newFocused_windows);

    hideSideBar(null, false);
    giveFocusToLastApp();
  };

  const openApp = (objId: string) => {
    // ReactGA.event({
    //   category: `Open App`,
    //   action: `Opened ${objId} window`,
    // });

    if (disabled_apps[objId]) return;

    if (minimized_windows[objId]) {
      focus(objId);

      const r = document.querySelector("#" + objId) as HTMLElement;
      if (r) {
        r.style.transform = `translate(${r.style.getPropertyValue(
          "--window-transform-x"
        )},${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      }

      const newMinimized_windows = { ...minimized_windows };
      newMinimized_windows[objId] = false;
      setMinimized_windows(newMinimized_windows);
      return;
    }

    if (app_stack.current.includes(objId)) focus(objId);
    else {
      const newClosed_windows = { ...closed_windows };
      const newFavourite_apps = { ...favourite_apps };
      const frequentApps = localStorage.getItem("frequentApps")
        ? JSON.parse(localStorage.getItem("frequentApps")!)
        : [];
      const currentApp = frequentApps.find((app: {id: string, frequency: number}) => app.id === objId);
      if (currentApp) {
        frequentApps.forEach((app: {id: string, frequency: number}) => {
          if (app.id === currentApp.id) {
            app.frequency += 1;
          }
        });
      } else {
        frequentApps.push({ id: objId, frequency: 1 });
      }

      frequentApps.sort((a: {id: string, frequency: number}, b: {id: string, frequency: number}) => {
        if (a.frequency < b.frequency) {
          return 1;
        }
        if (a.frequency > b.frequency) {
          return -1;
        }
        return 0;
      });

      localStorage.setItem("frequentApps", JSON.stringify(frequentApps));

      setTimeout(() => {
        newFavourite_apps[objId] = true;
        newClosed_windows[objId] = false;
        setClosed_windows(newClosed_windows);
        setFavourite_apps(newFavourite_apps);
        setAllAppsView(false);
        focus(objId);
        app_stack.current.push(objId);
      }, 200);
    }
  };

  const closeApp = (objId: string) => {
    app_stack.current.splice(app_stack.current.indexOf(objId), 1);
    giveFocusToLastApp();
    hideSideBar(null, false);

    const newClosed_windows = { ...closed_windows };
    const newFavourite_apps = { ...favourite_apps };

    if (initFavourite.current[objId] === false) newFavourite_apps[objId] = false;
    newClosed_windows[objId] = true;

    setClosed_windows(newClosed_windows);
    setFavourite_apps(newFavourite_apps);
  };

  /** Click empty desktop (not on a window) → close the focused app window. */
  const handleDesktopBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest(".main-window")) return;
      if (showNameBar || allAppsView) return;

      const focusedId = Object.keys(focused_windows).find(
        (id) =>
          focused_windows[id] &&
          closed_windows[id] === false &&
          !minimized_windows[id]
      );
      if (focusedId) closeApp(focusedId);
    },
    [
      allAppsView,
      closed_windows,
      focused_windows,
      minimized_windows,
      showNameBar,
    ]
  );

  const addNewFolder = () => {
    setShowNameBar(true);
  };

  const addToDesktop = (folder_name: string) => {
    folder_name = folder_name.trim();
    const folder_id = folder_name.replace(/\s+/g, "-").toLowerCase();
    (apps as AppConfig[]).push({
      id: `new-folder-${folder_id}`,
      title: folder_name,
      icon: "/images/system/folder.png",
      disabled: true,
      favourite: false,
      desktop_shortcut: true,
      screen: () => <></>,
    });
    
    const new_folders = JSON.parse(localStorage.getItem("new_folders") || "[]") as Array<{id: string, name: string}>;
    new_folders.push({ id: `new-folder-${folder_id}`, name: folder_name });
    localStorage.setItem("new_folders", JSON.stringify(new_folders));

    setShowNameBar(false);
    updateAppsData();
  };

  const showAllApps = () => {
    setAllAppsView((prev) => {
      const next = !prev;
      // When the right-bottom app grid mode is closed, restore default behavior.
      if (!next) {
        setSideBarPinned(false);
        setClockDisabled(false);
      }
      return next;
    });
  };

  const renderDesktopApps = () => {
    if (Object.keys(closed_windows).length === 0) return null;
    const appsJsx: React.ReactElement[] = [];
    (apps as AppConfig[]).forEach((app, index: number) => {
      if (desktop_apps.includes(app.id)) {
        const props = {
          name: app.title,
          id: app.id,
          icon: app.icon,
          openApp: openApp,
        };
        appsJsx.push(<UbuntuApp key={index} {...props} />);
      }
    });
    return appsJsx;
  };

  const renderWindows = () => {
    const windowsJsx: React.ReactElement[] = [];
    (apps as AppConfig[]).forEach((app, index: number) => {
      if (closed_windows[app.id] === false) {
        const props = {
          title: app.title,
          id: app.id,
          screen: app.screen,
          addFolder: addToDesktop,
          closed: closeApp,
          onClosed: closeApp,
          openApp: openApp,
          focus: focus,
          isFocused: focused_windows[app.id],
          hideSideBar: hideSideBar,
          hasMinimised: hasMinimised,
          minimized: minimized_windows[app.id],
          changeBackgroundImage: changeBackgroundImage,
          bg_image_name: bg_image_name,
          windowWidthPct: app.windowWidthPct,
          windowHeightPct: app.windowHeightPct,
        };
        windowsJsx.push(<Window key={index} {...props} />);
      }
    });
    return windowsJsx;
  };

  const renderNameBar = () => {
    const addFolder = () => {
      const folder_name = (document.getElementById("folder-name-input") as HTMLInputElement)?.value;
      if (folder_name) {
        addToDesktop(folder_name);
      }
    };

    const removeCard = () => {
      setShowNameBar(false);
    };

    return (
      <div className="absolute rounded-md top-1/2 left-1/2 text-center text-white font-light text-sm bg-ub-cool-grey transform -translate-y-1/2 -translate-x-1/2 sm:w-96 w-3/4 z-50">
        <div className="w-full flex flex-col justify-around items-start pl-6 pb-8 pt-6">
          <span>New folder name</span>
          <input
            className="outline-none mt-5 px-1 w-10/12  context-menu-bg border-2 border-yellow-700 rounded py-0.5"
            id="folder-name-input"
            type="text"
            autoComplete="off"
            spellCheck="false"
            autoFocus={true}
          />
        </div>
        <div className="flex">
          <div
            onClick={addFolder}
            className="w-1/2 px-4 py-2 border border-gray-900/50 border-r-0 hover:bg-ub-warm-grey/10 hover:border-gray-900/50 transition-all duration-150 ease-in-out"
          >
            Create
          </div>
          <div
            onClick={removeCard}
            className="w-1/2 px-4 py-2 border border-gray-900/50 hover:bg-ub-warm-grey/10 hover:border-gray-900/50 transition-all duration-150 ease-in-out"
          >
            Cancel
          </div>
        </div>
      </div>
    );
  };

  // Component lifecycle effects
  useEffect(() => {
    // ReactGA.pageview("/desktop");
    fetchAppsData();
    setContextListeners();
    setEventListeners();
    checkForNewFolders();
    openApp("about-aiden");

    // On startup, preview right bar for 5 seconds.
    setHideSideBarState(false);
    initialSideBarTimer.current = setTimeout(() => {
      setHideSideBarState(true);
      initialSideBarTimer.current = null;
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const savedClockPosition = localStorage.getItem("desktop_clock_position");
    if (savedClockPosition) {
      try {
        const parsed = JSON.parse(savedClockPosition) as { x: number; y: number };
        setClockPosition(parsed);
        return;
      } catch {
        // Fallback to default position below.
      }
    }

    setClockPosition({
      x: Math.max(window.innerWidth - 260, 20),
      y: 80,
    });
  }, []);

  useEffect(() => {
    if (!clockDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!clockDragOffset.current) return;
      const clockSize = window.innerWidth >= 768 ? 160 : 128;
      const nextX = e.clientX - clockDragOffset.current.x;
      const nextY = e.clientY - clockDragOffset.current.y;

      setClockPosition({
        x: Math.max(8, Math.min(nextX, window.innerWidth - clockSize - 8)),
        y: Math.max(8, Math.min(nextY, window.innerHeight - clockSize - 8)),
      });
    };

    const onMouseUp = () => {
      setClockDragging(false);
      clockDragOffset.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [clockDragging]);

  useEffect(() => {
    if (clockPosition.x === 0 && clockPosition.y === 0) return;
    localStorage.setItem("desktop_clock_position", JSON.stringify(clockPosition));
  }, [clockPosition]);

  const startClockDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clockDisabled) return;
    clockDragOffset.current = {
      x: e.clientX - clockPosition.x,
      y: e.clientY - clockPosition.y,
    };
    setClockDragging(true);
  };

  const onSideBarButtonClick = () => {
    setSideBarPinned(true);
    setHideSideBarState(false);
    setClockDisabled(true);
  };

  useEffect(() => {
    return () => {
      removeContextListeners();
      if (initialSideBarTimer.current) {
        clearTimeout(initialSideBarTimer.current);
        initialSideBarTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        " h-full w-full flex flex-col items-end justify-start content-end flex-wrap-reverse bg-transparent relative overflow-hidden overscroll-none window-parent"
      }
      style={{ paddingTop: STATUS_STRIP_HEIGHT_PX }}
    >
      {/* Window Area */}
      <div
        className="absolute h-full w-full bg-transparent"
        data-context="desktop-area"
        onClick={handleDesktopBackdropClick}
      >
        {renderWindows()}
      </div>

      {/* Background Image */}
      <BackgroundImage img={bg_image_name} />

      {/* Desktop Clock */}
      {!clockDisabled ? (
        <div
          className="absolute z-30 select-none pointer-events-auto"
          style={{ left: clockPosition.x, top: clockPosition.y }}
          onMouseDown={startClockDrag}
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-br from-white/40 via-gray-300/20 to-black/50 shadow-2xl shadow-black/60 transition-all duration-200 hover:from-white/60 hover:via-gray-200/35 hover:to-gray-700/60 hover:shadow-white/20">
            <div className={"w-full h-full rounded-full border border-white/25 bg-gradient-to-br from-gray-900/85 via-black/80 to-gray-800/90 backdrop-blur-md flex flex-col items-center justify-center text-white transition-colors duration-200 hover:from-gray-700/70 hover:via-gray-600/65 hover:to-gray-700/70 " + (clockDragging ? "cursor-grabbing" : "cursor-grab")}>
              <div className="text-lg md:text-2xl font-bold tracking-wide leading-none">
                <Clock onlyTime={true} />
              </div>
              <div className="mt-2 text-[10px] md:text-xs text-gray-200 tracking-widest uppercase">
                <Clock onlyDay={true} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Ubuntu Side Menu Bar */}
      <SideBar
        apps={apps}
        hide={hideSideBarState}
        hideSideBar={hideSideBar}
        favourite_apps={favourite_apps}
        showAllApps={showAllApps}
        allAppsView={allAppsView}
        closed_windows={closed_windows}
        focused_windows={focused_windows}
        isMinimized={minimized_windows}
        openAppByAppId={openApp}
        onAppButtonClick={onSideBarButtonClick}
      />

      {/* Desktop Apps */}
      {renderDesktopApps()}

      {/* Context Menus */}
      <DesktopMenu
        active={context_menus.desktop}
        openApp={openApp}
        addNewFolder={addNewFolder}
      />
      <DefaultMenu active={context_menus.default} />

      {/* Folder Input Name Bar */}
      {showNameBar ? renderNameBar() : null}

      {allAppsView ? (
        <AllApplications
          apps={apps}
          openApp={openApp}
        />
      ) : null}
    </div>
  );
}