import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import $ from 'jquery';
// import ReactGA from 'react-ga';

interface TerminalProps {
    addFolder?: (name: string) => void;
    openApp?: (id: string) => void;
}

export default function Terminal({ addFolder, openApp }: TerminalProps) {
    const [terminal, setTerminal] = useState<React.ReactNode[]>([]);
    // removed old row counter; using nextRowId instead
    const nextRowId = useRef<number>(1);
    const [currentDirectory, setCurrentDirectory] = useState("~");
    const [currDirName, setCurrDirName] = useState("root");
    const [prevCommands, setPrevCommands] = useState<string[]>([]);
    const [commandsIndex, setCommandsIndex] = useState(-1);
    
    const childDirectories: Record<string, string[]> = useMemo(() => ({
        root: ["books", "projects", "personal-documents", "skills", "languages", "PDPU", "interests"],
        PDPU: ["Sem-6"],
        books: ["Eric-Jorgenson_The-Almanack-of-Naval-Ravikant.pdf", "Elon Musk: How the Billionaire CEO of SpaceX.pdf", "The $100 Startup_CHRIS_GUILLEBEAU.pdf", "The_Magic_of_Thinking_Big.pdf"],
        skills: ["Front-end development", "React.js", "jQuery", "Flutter", "Express.js", "SQL", "Firebase"],
        projects: ["vivek9patel-personal-portfolio", "synonyms-list-react", "economist.com-unlocked", "Improve-Codeforces", "flutter-banking-app", "Meditech-Healthcare", "CPU-Scheduling-APP-React-Native"],
        interests: ["Software Engineering", "Deep Learning", "Computer Vision"],
        languages: ["Javascript", "C++", "Java", "Dart"],
    }), []);
    
    const cursorRef = useRef<number | null>(null);

    // Effects are defined after callbacks to avoid use-before-define

    useEffect(() => {
        return () => {
            if (cursorRef.current) {
                clearInterval(cursorRef.current);
            }
        };
    }, []);

    // reStartTerminal will be defined after appendTerminalRow

    // appendTerminalRow will be defined after terminalRow

    // reStartTerminal will be declared after appendTerminalRow

    // Effects declared later

    // terminalRow is defined after cursor and key handlers

    const focusCursor = (id: number) => {
        if (cursorRef.current !== null) {
            window.clearInterval(cursorRef.current);
        }
        startCursor(id);
    };

    const unFocusCursor = useCallback((id: number) => {
        stopCursor(id);
    }, []);

    const startCursor = useCallback((id: number) => {
        if (cursorRef.current !== null) {
            window.clearInterval(cursorRef.current);
        }
        const input = document.getElementById(`terminal-input-${id}`) as HTMLInputElement;
        if (input) {
            input.focus();
            input.addEventListener('input', function() {
                const span = document.getElementById(`show-${id}`);
                if (span) {
                    span.textContent = this.value;
                }
            });
        }
        
        cursorRef.current = window.setInterval(() => {
            const cursor = document.getElementById(`cursor-${id}`);
            if (cursor) {
                if (cursor.style.visibility === 'visible') {
                    cursor.style.visibility = 'hidden';
                } else {
                    cursor.style.visibility = 'visible';
                }
            }
        }, 500);
    }, []);

    const stopCursor = useCallback((id: number) => {
        if (cursorRef.current) {
            clearInterval(cursorRef.current);
        }
        const cursor = document.getElementById(`cursor-${id}`);
        if (cursor) {
            cursor.style.visibility = 'visible';
        }
    }, []);

    const removeCursor = useCallback((id: number) => {
        stopCursor(id);
        const cursor = document.getElementById(`cursor-${id}`);
        if (cursor) {
            cursor.style.display = 'none';
        }
    }, [stopCursor]);

    const clearInput = useCallback((id: number) => {
        const input = document.getElementById(`terminal-input-${id}`) as HTMLInputElement;
        if (input) {
            input.blur();
        }
    }, []);

    const xss = useCallback((str: string) => {
        if (!str) return "";
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }, []);

    const childDirectoriesList = useCallback((parent: string) => {
        const files: string[] = [];
        files.push(`<div class="flex justify-start flex-wrap">`);
        childDirectories[parent]?.forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            );
        });
        files.push(`</div>`);
        return files;
    }, [childDirectories]);

    const closeTerminal = useCallback(() => {
        const closeButton = document.getElementById("close-terminal");
        if (closeButton) {
            closeButton.click();
        }
    }, []);

    // Declare handleCommands ref to break circular dependency
    const handleCommandsRef = useRef<((command: string, rowId: number) => void) | null>(null);

    const checkKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>, terminalRowId: number) => {
        if (e.key === "Enter") {
            const input = e.currentTarget;
            const command = input.value.trim();
            if (command.length !== 0) {
                removeCursor(terminalRowId);
                handleCommandsRef.current?.(command, terminalRowId);
            } else return;
            
            // push to history
            setPrevCommands(prev => [...prev, command]);
            setCommandsIndex(prev => prev + 1);
            clearInput(terminalRowId);
        } else if (e.key === "ArrowUp") {
            let prevCommand = "";
            if (commandsIndex <= -1) {
                prevCommand = "";
            } else {
                prevCommand = prevCommands[commandsIndex] || "";
            }

            const input = e.currentTarget;
            input.value = prevCommand;
            const span = document.getElementById(`show-${terminalRowId}`);
            if (span) {
                span.textContent = prevCommand;
            }
            setCommandsIndex(prev => prev - 1);
        } else if (e.key === "ArrowDown") {
            if (commandsIndex >= prevCommands.length) return;
            if (commandsIndex <= -1) setCommandsIndex(0);

            let prevCommand = "";
            if (commandsIndex === prevCommands.length) {
                prevCommand = "";
            } else {
                prevCommand = prevCommands[commandsIndex] || "";
            }

            const input = e.currentTarget;
            input.value = prevCommand;
            const span = document.getElementById(`show-${terminalRowId}`);
            if (span) {
                span.textContent = prevCommand;
            }
            setCommandsIndex(prev => prev + 1);
        }
    }, [commandsIndex, prevCommands, removeCursor, clearInput]);

    const terminalRow = useCallback((id: number) => {
        return (
            <div key={id} className="w-full">
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">souta@code</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{currentDirectory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={() => focusCursor(id)} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input 
                            id={`terminal-input-${id}`} 
                            data-row-id={id} 
                            onKeyDown={(e) => checkKey(e, id)} 
                            onBlur={() => unFocusCursor(id)} 
                            className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" 
                            spellCheck={false} 
                            autoFocus={true} 
                            autoComplete="off" 
                            type="text" 
                        />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </div>
        );
    }, [currentDirectory, focusCursor, checkKey, unFocusCursor]);

    const appendTerminalRow = useCallback(() => {
        const id = nextRowId.current;
        nextRowId.current = id + 1;
        setTerminal(prev => [...prev, terminalRow(id)]);
    }, [terminalRow]);

    const reStartTerminal = useCallback(() => {
        if (cursorRef.current !== null) {
            window.clearInterval(cursorRef.current);
        }
        setTerminal([]);
        
        nextRowId.current = 1;
        // Append an initial row after reset
        setTimeout(() => appendTerminalRow(), 0);
    }, [appendTerminalRow]);

    // Initialize and focus handling effects
    useEffect(() => {
        reStartTerminal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (cursorRef.current !== null) {
            window.clearInterval(cursorRef.current);
        }
        const latestId = nextRowId.current - 1;
        if (latestId >= 0) {
            startCursor(latestId);
        }
    }, [terminal, startCursor]);

    const handleCommands = useCallback((command: string, rowId: number) => {
        const words = command.split(' ').filter(Boolean);
        const main = words[0];
        const rest = words.slice(1).join(" ").trim();
        let result = "";
        
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    setCurrentDirectory("~");
                    setCurrDirName("root");
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must me <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${currDirName} : Permission denied 😏`;
                    break;
                }

                if (childDirectories[currDirName]?.includes(rest)) {
                    setCurrentDirectory(prev => prev + "/" + rest);
                    setCurrDirName(rest);
                } else if (rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                } else {
                    result = `bash: cd: ${words[1]}: No such file or directory`;
                }
                break;
            case "ls":
                const target = words[1] || currDirName;
                if (words.length > 1) {
                    result = "too many arguments, arguments must me <1.";
                    break;
                }
                if (target in childDirectories) {
                    result = childDirectoriesList(target).join("");
                } else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                } else {
                    result = `ls: cannot access '${words[1]}': No such file or directory`;
                }
                break;
            case "mkdir":
                if (words[1] !== undefined && words[1] !== "") {
                    addFolder?.(words[1]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                result = currentDirectory.replace("~", "/home/vivek");
                break;
            case "code":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands:[ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg]";
                }
                break;
            case "echo":
                result = xss(words.slice(1).join(" "));
                break;
            case "spotify":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "todoist":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("todo-ist");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "trash":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "about-vivek":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("about-vivek");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "terminal":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[1] === "." || words.length === 1) {
                    openApp?.("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "clear":
                reStartTerminal();
                return;
            case "exit":
                closeTerminal();
                return;
            case "sudo":
                // ReactGA.event({
                //     category: "Sudo Access",
                //     action: "lol",
                // });
                result = "<img class=' w-2/5' src='/images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
        }
        const resultElement = document.getElementById(`row-result-${rowId}`);
        if (resultElement) {
            resultElement.innerHTML = result;
        }
        appendTerminalRow();
    }, [currDirName, childDirectories, childDirectoriesList, currentDirectory, addFolder, openApp, reStartTerminal, closeTerminal, appendTerminalRow, xss]);

    // Update ref after handleCommands is defined
    useEffect(() => {
        handleCommandsRef.current = handleCommands;
    }, [handleCommands]);

    return (
        <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
            {terminal}
        </div>
    );
}

export const displayTerminal = (addFolder?: (name: string) => void, openApp?: (id: string) => void) => {
    return <Terminal addFolder={addFolder} openApp={openApp} />;
}