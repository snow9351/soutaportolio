import { displayTerminalCalc } from "@/components/apps/calc";
import Chrome from "@/components/apps/chrome";
import Gedit from "@/components/apps/gedit";
import AboutMe from "@/components/apps/me";
import { displaySettings } from "@/components/apps/settings";
import { displayTerminal } from "@/components/apps/terminal";
import { displayTrash } from "@/components/apps/trash";
import VsCode from "@/components/apps/vscode";

const apps = [
  {
    id: "about-me",
    title: "Souta Hoshino",
    icon: "/images/icons/my-computer-48.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: AboutMe,
  },
  {
    id: "gedit",
    title: "Contact Me",
    icon: "/images/apps/gedit.png",
    disabled: false,
    favourite: false,
    desktop_shortcut: true,
    screen: Gedit,
  },
  {
    id: "chrome",
    title: "Google Chrome",
    icon: "/images/apps/chrome.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: Chrome,
  },
  {
    id: "calc",
    title: "Calc",
    icon: "/images/apps/calc.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displayTerminalCalc,
  },
  {
    id: "vscode",
    title: "Visual Studio Code",
    icon: "/images/apps/vscode.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: VsCode,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "/images/apps/bash.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displayTerminal,
  },
  {
    id: "settings",
    title: "Settings",
    icon: "/images/apps/gnome-control-center.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displaySettings,
  },
  {
    id: "trash",
    title: "Trash",
    icon: "/images/system/user-trash-full.png",
    disabled: false,
    favourite: false,
    desktop_shortcut: false,
    screen: displayTrash,
  },
];

export default apps;
