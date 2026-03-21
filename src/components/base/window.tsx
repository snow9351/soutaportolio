/* eslint-disable @next/next/no-img-element */
import { STATUS_STRIP_HEIGHT_PX } from "@/config/layout";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Settings from "../apps/settings";
import { displayTerminal } from "../apps/terminal";

/** Center a window in the viewport below the status strip (matches open size before user resize). */
function estimateCenteredPosition(widthPct: number, heightPct: number) {
  if (typeof window === "undefined") {
    return { x: 0, y: STATUS_STRIP_HEIGHT_PX };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const strip = STATUS_STRIP_HEIGHT_PX;
  const w = (vw * widthPct) / 100;
  const h = (vh * heightPct) / 100;
  return {
    x: Math.max(0, Math.round((vw - w) / 2)),
    y: Math.max(strip, Math.round(strip + (vh - strip - h) / 2)),
  };
}

function parseCssPx(val: string) {
  const n = parseFloat(String(val).replace(/px/gi, "").trim());
  return Number.isFinite(n) ? n : 0;
}

type StateType = {
  cursorType: string;
  width: number;
  height: number;
  closed: boolean;
  maximized: boolean;
  parentSize: {
    height: number;
    width: number;
  }
}

type PropsType = {
  title: string;
  id: string;
  screen: () => React.ReactNode;
  addFolder?: (name: string) => void;
  closed: (id: string) => void;
  onClosed: (id: string) => void;
  openApp?: (id: string) => void;
  focus: (id: string) => void;
  isFocused: boolean;
  hideSideBar: (id: string, hide: boolean) => void;
  hasMinimised: (id: string) => void;
  minimized: boolean;
  changeBackgroundImage: (imageName: string) => void;
  bg_image_name: string;
  /** Optional default size as % of viewport (desktop: width×height; mobile: swapped). */
  windowWidthPct?: number;
  windowHeightPct?: number;
}

type WindowBorderProps = {
  resize: () => void;
}

type WindowTopBarProps = {
  title: string;
  maximizeWindow: () => void;
  minimizeWindow: () => void;
  sizeStatus: boolean;
}

type WindowEditButtonsProps = {
  minimize: () => void;
  maximize: () => void;
  isMaximised: boolean;
  close: () => void;
  id: string;
}

type WindowMainScreenProps = {
  screen: () => React.ReactNode;
  title: string;
  addFolder?: (name: string) => void;
  openApp?: (id: string) => void;
}

const WindowYBorder = (props: WindowBorderProps) => {
  const trpImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = new Image(0, 0);
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    img.style.opacity = "0";
    trpImgRef.current = img;
  }, [])

  return (
    <div
      className="window-y-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      draggable
      onDragStart={(e) => {
        if (trpImgRef.current) {
          e.dataTransfer.setDragImage(trpImgRef.current, 0, 0);
        }
      }}
      onDrag={props.resize}
    ></div>
  )
}

const WindowXBorder = (props: WindowBorderProps) => {
  const trpImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = new Image(0, 0);
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    img.style.opacity = "0";
    trpImgRef.current = img;
  }, [])

  return (
    <div
      className=" window-x-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      draggable
      onDragStart={(e) => {
        if (trpImgRef.current) {
          e.dataTransfer.setDragImage(trpImgRef.current, 0, 0);
        }
      }}
      onDrag={props.resize}
    ></div>
  )
}

const WindowTopBar = (props: WindowTopBarProps) => {
  const changeWindowSize = useCallback(() => {
    if (!props.sizeStatus) props.maximizeWindow();
  }, [props.sizeStatus, props.maximizeWindow])

  return (
    <div
      className={
        " relative bg-ub-window-title border-t-2 border-white/5 py-1.5 px-3 text-white w-full select-none rounded-b-none"
      }
      onDoubleClick={changeWindowSize}
    >
      <div className="flex justify-center text-sm font-bold">{props.title}</div>
    </div>
  )
}

const WindowEditButtons = (props: WindowEditButtonsProps) => {
  return (
    <div className="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
      <span
        className="mx-1.5 bg-white/0 hover:bg-white/10 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
        onClick={props.minimize}
      >
        <img
          src="/images/window/window-minimize-symbolic.svg"
          alt="ubuntu window minimize"
          className="h-5 w-5 inline "
        />
      </span>
      {props.isMaximised ? (
        <span
          className="mx-2 bg-white/0 hover:bg-white/10 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
          onClick={props.maximize}
        >
          <img
            src="/images/window/window-restore-symbolic.svg"
            alt="ubuntu window restore"
            className="h-5 w-5 inline"
          />
        </span>
      ) : (
        <span
          className="mx-2 bg-white/0 hover:bg-white/10 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
          onClick={props.maximize}
        >
          <img
            src="/images/window/window-maximize-symbolic.svg"
            alt="ubuntu window maximize"
            className="h-5 w-5 inline"
          />
        </span>
      )}
      <button
        tabIndex={-1}
        id={`close-${props.id}`}
        className="mx-1.5 focus:outline-none cursor-default bg-ub-orange/90 hover:bg-ub-orange/100 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
        onClick={props.close}
      >
        <img
          src="/images/window/window-close-symbolic.svg"
          alt="ubuntu window close"
          className="h-5 w-5 inline"
        />
      </button>
    </div>
  )
}

const WindowMainScreen = (props: WindowMainScreenProps) => {
  const [state, setState] = useState({
    setDarkBg: false,
  })

  useEffect(() => {
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        setDarkBg: true,
      }))
    }, 3000)
  }, [])

  return (
    <div
        className={
          "w-full flex-1 flex flex-col z-20 max-h-full  windowMainScreen" +
          (state.setDarkBg ? " bg-ub-drk-abrgn " : " bg-ub-cool-grey")
        }
      >
        {props.addFolder
          ? displayTerminal(props.addFolder, props.openApp)
          : props.screen()}
      </div>
  )
}

function getViewportWindowPercents(
  initialWidthPct?: number,
  initialHeightPct?: number
) {
  if (typeof window === "undefined") {
    return {
      w: initialWidthPct ?? 60,
      h: initialHeightPct ?? 85,
    };
  }
  const mobile = window.innerWidth < 640;
  const w = initialWidthPct ?? (mobile ? 85 : 60);
  const h = initialHeightPct ?? (mobile ? 60 : 85);
  return { w, h };
}

const Window = (props: PropsType) => {
  const [id, setId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState(() => {
    const { w, h } = getViewportWindowPercents(
      props.windowWidthPct,
      props.windowHeightPct
    );
    return estimateCenteredPosition(w, h);
  });
  const [state, setState] = useState<StateType>(() => {
    const { w, h } = getViewportWindowPercents(
      props.windowWidthPct,
      props.windowHeightPct
    );
    return {
      cursorType: "cursor-default",
      width: w,
      height: h,
      closed: false,
      maximized: false,
      parentSize: {
        height: 100,
        width: 100,
      },
    };
  })
  const windowRef = useRef<HTMLDivElement>(null);

  const resizeBoundries = useCallback(() => {
    setState((prev) => {
      const nextParentSize = {
        height: window.innerHeight - window.innerHeight * (prev.height / 100.0) - STATUS_STRIP_HEIGHT_PX,
        width: window.innerWidth - window.innerWidth * (prev.width / 100.0),
      };
      if (
        nextParentSize.height === prev.parentSize.height &&
        nextParentSize.width === prev.parentSize.width
      ) {
        return prev;
      }
      return { ...prev, parentSize: nextParentSize };
    })
  }, [])

  const setDefaultWindowDimension = useCallback(() => {
    const { w, h } = getViewportWindowPercents(
      props.windowWidthPct,
      props.windowHeightPct
    );
    setState((prev) => ({
      ...prev,
      width: w,
      height: h,
    }));
  }, [props.windowHeightPct, props.windowWidthPct])

  // Update parentSize whenever width/height change
  useEffect(() => {
    resizeBoundries()
  }, [state.width, state.height, resizeBoundries])

  useEffect(() => {
    setId(props.id);
    setDefaultWindowDimension();

    const onResize = () => resizeBoundries();
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [props.id, setDefaultWindowDimension, resizeBoundries])

  const wasMaximizedRef = useRef(false);

  /** Center window when it opens; skip when restoring from maximize so position is preserved. */
  useLayoutEffect(() => {
    if (state.maximized) {
      wasMaximizedRef.current = true;
      return;
    }
    if (state.closed || props.minimized) return;

    if (wasMaximizedRef.current) {
      wasMaximizedRef.current = false;
      return;
    }

    const applyCenterFromDom = () => {
      const el = windowRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width < 32 || r.height < 32) return;
      const x = Math.round((window.innerWidth - r.width) / 2);
      const y = Math.round(
        STATUS_STRIP_HEIGHT_PX +
          (window.innerHeight - STATUS_STRIP_HEIGHT_PX - r.height) / 2
      );
      setDragPosition({ x, y });
    };

    const { w, h } = getViewportWindowPercents(
      props.windowWidthPct,
      props.windowHeightPct
    );
    setDragPosition(estimateCenteredPosition(w, h));

    const timeouts = [0, 32, 100].map((ms) =>
      window.setTimeout(applyCenterFromDom, ms)
    );
    const raf = requestAnimationFrame(applyCenterFromDom);

    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
    };
  }, [
    props.id,
    props.minimized,
    props.windowHeightPct,
    props.windowWidthPct,
    state.closed,
    state.maximized,
  ])

  const focusWindow = useCallback(() => {
    props.focus(id ?? "");
  }, [id, props])

  const checkOverLap = useCallback(() => {
    const r = windowRef.current;
    if (!r) return;
    const rect = r.getBoundingClientRect();
    if (Number(rect.right.toFixed(1)) > window.innerWidth - 50) {
      props.hideSideBar(id ?? "", true);
    } else {
      props.hideSideBar(id ?? "", false);
    }
  }, [id, props])

  const restoreWindow = useCallback(() => {
    const r = windowRef.current;
    if (!r) return;
    setDefaultWindowDimension();
    const posx = r.style.getPropertyValue("--window-transform-x");
    const posy = r.style.getPropertyValue("--window-transform-y");
    r.style.transform = `translate(${posx}, ${posy})`;
    setDragPosition({
      x: parseCssPx(posx),
      y: parseCssPx(posy),
    });
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        maximized: false,
      }))
      checkOverLap();
    }, 300)
  }, [checkOverLap, setDefaultWindowDimension])

  const changeCursorToMove = useCallback(() => {
    focusWindow();
    if (state.maximized) {
      restoreWindow()
    }
    setState((prev) => ({
      ...prev,
      cursorType: "cursor-move",
    }))
  }, [focusWindow, restoreWindow, state.maximized])

  const changeCursorToDefault = useCallback(() => {
    setState((prev) => ({
      ...prev,
      cursorType: "cursor-default",
    }))
  }, [])


  const handleHorizontalResize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      width: prev.width + 0.1,
    }))
  }, [])

  const handleVerticleResize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      height: prev.height + 0.1,
    }))
  }, [])

  const setWindowPosition = useCallback(() => {
    const r = windowRef.current;
    if (!r) return;
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      rect.x.toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      (Number(rect.y.toFixed(1)) - STATUS_STRIP_HEIGHT_PX).toString() + "px"
    );
  }, [])

  const minimizeWindow = useCallback(() => {
    let posx = -310;
    if (state.maximized) {
      posx = -510;
    }
    setWindowPosition();
    const r = windowRef.current;
    if (!r) return;
    const rect = r.getBoundingClientRect();
    const sidebar = document.querySelector(`#sidebar-${id}`) as HTMLElement | null;
    const targetY = sidebar ? sidebar.getBoundingClientRect().y : rect.y;
    r.style.transform = `translate(${posx}px,${Number(targetY.toFixed(1)) - 240}px) scale(0.2)`;
    props.hasMinimised(id ?? "");
  }, [id, props, setWindowPosition, state.maximized])

  const maximizeWindow = useCallback(() => {
    if (state.maximized) {
      restoreWindow();
    } else {
      focusWindow();
      const r = windowRef.current;
      if (!r) return;
      setWindowPosition();
      // Desktop parent already reserves STATUS_STRIP_HEIGHT_PX padding — fill content area (no double offset).
      r.style.transform = "translate(0px, 0px)";
      setDragPosition({ x: 0, y: 0 });
      setState((prev) => ({
        ...prev,
        maximized: true,
        height: 100,
        width: 100,
      }))
      props.hideSideBar(id ?? "", true);
    }
  }, [focusWindow, id, props, restoreWindow, setWindowPosition, state.maximized])

  const closeWindow = () => {
    setWindowPosition();
    setState({
      ...state,
      closed: true,
    })

    props.hideSideBar?.(id ?? "", false);

    setTimeout(() => {
      props.closed(id ?? "");
    }, 300);
  };

  return (
    <Draggable
      axis="both" // Both axes for dragging
      handle=".bg-ub-window-title"
      grid={[1, 1]}
      scale={1}
      disabled={state.maximized}
      onStart={() => changeCursorToMove()}
      onStop={() => changeCursorToDefault()}
      onDrag={(_, data) => {
        setDragPosition({ x: data.x, y: data.y });
        checkOverLap();
      }}
      allowAnyClick={false} // Drag by only left-button
      position={dragPosition}
      bounds={{
        left:0,
        top:0,
        right: state.parentSize.width,
        bottom: state.parentSize.height,
      }}
      nodeRef={windowRef}
    >
      <div
        ref={windowRef}
        style={{
          width: `${state.width}%`,
          height: `${state.height}%`,
        }}
        className={`
          ${state.cursorType} 
          ${state.closed ? " closed-window " : ""} 
          ${state.maximized ? " duration-300 rounded-none" : " rounded-lg rounded-b-none"} 
          ${props.minimized ? " pointer-events-none opacity-0 invisible duration-200" : ""} 
          ${props.isFocused ? " z-[35] " : " z-[25] notFocused"} 
          opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window absolute window-shadow border-black/40 border border-t-0 flex flex-col
        `}
        id={id ?? ""}
      >
        <WindowYBorder resize={() => handleHorizontalResize()} />
        <WindowXBorder resize={() => handleVerticleResize()} />
        <WindowTopBar
            title={props.title}
            maximizeWindow={maximizeWindow}
            minimizeWindow={minimizeWindow}
            sizeStatus={state.maximized}
          />
          <WindowEditButtons
            minimize={minimizeWindow}
            maximize={maximizeWindow}
            isMaximised={state.maximized}
            close={closeWindow}
            id={id ?? ""}
          />
          {id === "settings" ? (
            <Settings
              changeBackgroundImage={props.changeBackgroundImage}
              currBgImgName={props.bg_image_name}
            />
          ) : (
            <WindowMainScreen
              screen={props.screen}
              title={props.title}
               addFolder={props.id === "terminal" ? props.addFolder : undefined}
              openApp={props.openApp}
            />
          )}
      </div>
    </Draggable>
  )
}

export default Window;