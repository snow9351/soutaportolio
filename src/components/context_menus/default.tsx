import React from "react";

interface DefaultMenuProps {
  active: boolean;
}

function DefaultMenu(props: DefaultMenuProps) {
  return (
    <div
      id="default-menu"
      className={
        (props.active ? " block " : " hidden ") +
        " cursor-default w-52 context-menu-bg border text-left border-gray-900 rounded text-white py-4 absolute z-50 text-sm"
      }
    >
      <a
        rel="noreferrer noopener"
        href="https://github.com/snow9351/portfolio"
        target="_blank"
        className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey/20 mb-1.5 transition-all duration-150 ease-in-out"
      >
        <span className="ml-5">🌟</span>{" "}
        <span className="ml-2">Star this Project</span>
      </a>
      <a
        rel="noreferrer noopener"
        href="https://github.com/snow9351/portfolio/issues"
        target="_blank"
        className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey/20 mb-1.5 transition-all duration-150 ease-in-out"
      >
        <span className="ml-5">❗</span>{" "}
        <span className="ml-2">Report bugs</span>
      </a>
      <Devider />
      <a
        rel="noreferrer noopener"
        href="https://www.linkedin.com/in/souta-mizuno-6310a6365/"
        target="_blank"
        className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey/20 mb-1.5 transition-all duration-150 ease-in-out"
      >
        <span className="ml-5">🙋‍♂️</span>{" "}
        <span className="ml-2">
          Follow on <strong>Linkedin</strong>
        </span>
      </a>
      <a
        rel="noreferrer noopener"
        href="https://github.com/snow9351"
        target="_blank"
        className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey/20 mb-1.5 transition-all duration-150 ease-in-out"
      >
        <span className="ml-5">🤝</span>{" "}
        <span className="ml-2">
          Follow on <strong>Github</strong>
        </span>
      </a>
      <a
        rel="noreferrer noopener"
        href="mailto:mizunosouta0624@gmail.com"
        target="_blank"
        className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey/20 mb-1.5 transition-all duration-150 ease-in-out"
      >
        <span className="ml-5">📥</span>{" "}
        <span className="ml-2">Contact Me</span>
      </a>
      <Devider />
      <div
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey/20 mb-1.5 transition-all duration-150 ease-in-out"
      >
        <span className="ml-5">🧹</span>{" "}
        <span className="ml-2">Reset Ubuntu</span>
      </div>
    </div>
  );
}

function Devider() {
  return (
    <div className="flex justify-center w-full">
      <div className=" border-t border-gray-900 py-1 w-2/5"></div>
    </div>
  );
}

export default DefaultMenu;
