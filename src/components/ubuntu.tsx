import { useState, useEffect, useCallback } from "react";
import LockScreen from "./screen/lock_screen";
import BootingScreen from "./screen/booting_screen";
import Desktop from "./screen/desktop";
import Navbar from "./screen/navbar";
// import ReactGA from "react-ga";

export default function Ubuntu() {
  const [screen_locked, setScreen_locked] = useState(true);
  const [bg_image_name, setBg_image_name] = useState("wall-2");
  const [booting_screen, setBooting_screen] = useState(false);
  const [shutDownScreen, setShutDownScreen] = useState(false);

  const setTimeOutBootScreen = useCallback(() => {
    setTimeout(() => {
      setBooting_screen(false);
    }, 2000);
  }, []);

  const shutDown = useCallback(() => {
    // ReactGA.pageview("/switch-off");
    // ReactGA.event({
    //   category: `Screen Change`,
    //   action: `Switched off the Ubuntu`,
    // });

    document.getElementById("status-bar")?.blur();
    setShutDownScreen(true);
    localStorage.setItem("shut-down", "true");
  }, []);

  const getLocalData = useCallback(() => {
    // Get Previously selected Background Image
    const bg_image_name = localStorage.getItem("bg-image");
    if (bg_image_name !== null && bg_image_name !== undefined) {
      setBg_image_name(bg_image_name);
    }

    
    const booting_screen = localStorage.getItem("booting_screen");
    if (booting_screen !== null && booting_screen !== undefined) {
      // user has visited site before
      setBooting_screen(false);
    } else {
      // user is visiting site for the first time
      localStorage.setItem("booting_screen", "false");
      setTimeOutBootScreen();
    }

    // get shutdown state
    const shut_down = localStorage.getItem("shut-down");
    if (shut_down !== null && shut_down !== undefined && shut_down === "true")
      shutDown();
    else {
      // Get previous lock screen state
      const screen_locked = localStorage.getItem("screen-locked");
      if (screen_locked !== null && screen_locked !== undefined) {
        setScreen_locked(screen_locked === "true" ? true : false);
      }
    }
  }, [setTimeOutBootScreen, shutDown]);

  const lockScreen = useCallback(() => {
    // google analytics
    // ReactGA.pageview("/lock-screen");
    // ReactGA.event({
    //   category: `Screen Change`,
    //   action: `Set Screen to Locked`,
    // });

    document.getElementById("status-bar")?.blur();
    setTimeout(() => {
      setScreen_locked(true);
    }, 100); // waiting for all windows to close (transition-duration)
    localStorage.setItem("screen-locked", "true");
  }, []);

  const unLockScreen = useCallback(() => {
    // ReactGA.pageview("/desktop");

    window.removeEventListener("click", unLockScreen);
    window.removeEventListener("keypress", unLockScreen);

    setScreen_locked(false);
    localStorage.setItem("screen-locked", "false");
  }, []);

  const changeBackgroundImage = useCallback((img_name: string) => {
    setBg_image_name(img_name);
    localStorage.setItem("bg-image", img_name);
  }, []);

  

  const turnOn = useCallback(() => {
    // ReactGA.pageview("/desktop");

    setShutDownScreen(false);
    setBooting_screen(true);
    setTimeOutBootScreen();
    localStorage.setItem("shut-down", "false");
  }, [setTimeOutBootScreen]);

  useEffect(() => {
    getLocalData();
  }, [getLocalData]);

  return (
    <div className="w-screen h-screen overflow-hidden" id="monitor-screen">
      <LockScreen
        isLocked={screen_locked}
        bgImgName={bg_image_name}
        unLockScreen={unLockScreen}
      />
      <BootingScreen
        visible={booting_screen}
        isShutDown={shutDownScreen}
        turnOn={turnOn}
      />
      <Navbar lockScreen={lockScreen} shutDown={shutDown} />
      <Desktop
        bg_image_name={bg_image_name}
        changeBackgroundImage={changeBackgroundImage}
      />
    </div>
  );
}
