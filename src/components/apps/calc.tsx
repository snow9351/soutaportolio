import React, { useState, useEffect, useCallback } from 'react';

export default function Calc() {
    const [display, setDisplay] = useState<string>("0");
    const [previous, setPrevious] = useState<number | null>(null);
    const [operator, setOperator] = useState<"+" | "-" | "*" | "/" | null>(null);
    const [justEvaluated, setJustEvaluated] = useState<boolean>(false);

    const clearAll = useCallback(() => {
        setDisplay("0");
        setPrevious(null);
        setOperator(null);
        setJustEvaluated(false);
    }, []);

    const inputDigit = useCallback((d: string) => {
        setDisplay((curr) => {
            if (justEvaluated) {
                setJustEvaluated(false);
                return d;
            }
            if (curr === "0") return d;
            return curr + d;
        });
    }, [justEvaluated]);

    const inputDot = useCallback(() => {
        setDisplay((curr) => (curr.includes(".") ? curr : curr + "."));
    }, []);

    const backspace = useCallback(() => {
        setDisplay((curr) => (curr.length <= 1 || (curr.length === 2 && curr.startsWith("-")) ? "0" : curr.slice(0, -1)));
    }, []);

    const toggleSign = useCallback(() => {
        setDisplay((curr) => (curr === "0" ? "0" : (curr.startsWith("-") ? curr.slice(1) : "-" + curr)));
    }, []);

    const percent = useCallback(() => {
        setDisplay((curr) => {
            const n = parseFloat(curr);
            if (Number.isNaN(n)) return curr;
            return (n / 100).toString();
        });
    }, []);

    const compute = useCallback((a: number, b: number, op: "+" | "-" | "*" | "/" | null): number => {
        if (op === "+") return a + b;
        if (op === "-") return a - b;
        if (op === "*") return a * b;
        if (op === "/") return b === 0 ? NaN : a / b;
        return b;
    }, []);

    const chooseOperator = useCallback((op: "+" | "-" | "*" | "/") => {
        setPrevious((prev) => {
            const current = parseFloat(display);
            if (prev === null) return current;
            const result = compute(prev, current, operator);
            setDisplay(Number.isNaN(result) ? "Error" : result.toString());
            return result;
        });
        setOperator(op);
        setJustEvaluated(false);
        setDisplay("0");
    }, [display, operator, compute]);

    const evaluate = useCallback(() => {
        const current = parseFloat(display);
        if (previous === null || operator === null) {
            setDisplay(current.toString());
            setJustEvaluated(true);
            return;
        }
        const result = compute(previous, current, operator);
        setDisplay(Number.isNaN(result) ? "Error" : result.toString());
        setPrevious(null);
        setOperator(null);
        setJustEvaluated(true);
    }, [display, previous, operator, compute]);

    // Keyboard support
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const key = e.key;
            if (key >= "0" && key <= "9") inputDigit(key);
            else if (key === "." || key === ",") inputDot();
            else if (key === "+" || key === "-" || key === "*" || key === "/") chooseOperator(key as "+" | "-" | "*" | "/");
            else if (key === "Enter" || key === "=") evaluate();
            else if (key === "Backspace") backspace();
            else if (key === "%") percent();
            else if (key === "Escape") clearAll();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [inputDigit, inputDot, chooseOperator, evaluate, backspace, percent, clearAll]);

    const Btn: React.FC<{ label: string; onClick: () => void; variant?: 'default' | 'op' | 'accent'; span?: number }>
      = ({ label, onClick, variant = 'default', span = 1 }) => (
        <button
          type="button"
          onClick={onClick}
          className={
            (span === 2 ? " col-span-2 " : " ") +
            (
              variant === 'op'
                ? " bg-gray-700/60 hover:bg-gray-700 text-white "
                : variant === 'accent'
                ? " bg-ub-orange/90 hover:bg-ub-orange/100 text-white "
                : " bg-gray-800/60 hover:bg-gray-700/70 text-gray-100 "
            ) +
            " rounded-lg py-3 text-lg font-medium transition-colors duration-150 "
          }
        >
          {label}
        </button>
      );

    return (
        <div className="h-full w-full bg-ub-cool-grey text-white p-4">
            <div className="max-w-sm mx-auto w-full">
                <div className="bg-black/30 rounded-xl p-4 border border-white/10 shadow">
                    {/* Display */}
                    <div className="mb-3 px-2 py-4 rounded-lg bg-black/40 text-right text-3xl font-bold tracking-wider overflow-hidden">
                        {display}
                    </div>
                    {/* Keypad */}
                    <div className="grid grid-cols-4 gap-2 select-none">
                        <Btn label="C" onClick={clearAll} variant="op" />
                        <Btn label="±" onClick={toggleSign} variant="op" />
                        <Btn label="%" onClick={percent} variant="op" />
                        <Btn label="⌫" onClick={backspace} variant="op" />

                        <Btn label="7" onClick={() => inputDigit("7")} />
                        <Btn label="8" onClick={() => inputDigit("8")} />
                        <Btn label="9" onClick={() => inputDigit("9")} />
                        <Btn label="÷" onClick={() => chooseOperator("/")} variant="accent" />

                        <Btn label="4" onClick={() => inputDigit("4")} />
                        <Btn label="5" onClick={() => inputDigit("5")} />
                        <Btn label="6" onClick={() => inputDigit("6")} />
                        <Btn label="×" onClick={() => chooseOperator("*")} variant="accent" />

                        <Btn label="1" onClick={() => inputDigit("1")} />
                        <Btn label="2" onClick={() => inputDigit("2")} />
                        <Btn label="3" onClick={() => inputDigit("3")} />
                        <Btn label="−" onClick={() => chooseOperator("-")} variant="accent" />

                        <Btn label="0" onClick={() => inputDigit("0")} span={2} />
                        <Btn label="," onClick={inputDot} />
                        <Btn label="+" onClick={() => chooseOperator("+")} variant="accent" />

                        <Btn label="=" onClick={evaluate} span={4} variant="op" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const displayTerminalCalc = () => {
    return <Calc />;
}


