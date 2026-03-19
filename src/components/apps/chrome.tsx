/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';

export default function Chrome() {
    const home_url = 'https://www.google.com/webhp?igu=1';
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const [display_url, setDisplay_url] = useState("https://www.google.com");

    // Known sites that set frame-ancestors 'none' or similar CSP and cannot be embedded
    const isBlockedEmbedHost = useCallback((targetUrl: string) => {
        try {
            const { hostname } = new URL(targetUrl);
            return [
                'github.com', 'www.github.com',
                'linkedin.com', 'www.linkedin.com',
                'twitter.com', 'www.twitter.com', 'x.com', 'www.x.com',
                'accounts.google.com', 'facebook.com', 'www.facebook.com'
            ].includes(hostname);
        } catch {
            return false;
        }
    }, []);

    const refreshChrome = useCallback(() => {
        const chromeScreen = document.getElementById("chrome-screen") as HTMLIFrameElement;
        if (chromeScreen) {
            chromeScreen.src += '';
        }
    }, []);

    useEffect(() => {
        const lastVisitedUrl = localStorage.getItem("chrome-url");
        const lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl !== null && lastVisitedUrl !== undefined) {
            if (isBlockedEmbedHost(lastVisitedUrl)) {
                window.open(lastVisitedUrl, '_blank', 'noopener,noreferrer');
                setDisplay_url(lastDisplayedUrl || lastVisitedUrl);
                setUrl('about:blank');
                refreshChrome();
            } else {
                setUrl(lastVisitedUrl);
                setDisplay_url(lastDisplayedUrl || lastVisitedUrl);
                refreshChrome();
            }
        }
    }, [isBlockedEmbedHost, refreshChrome]);

    const storeVisitedUrl = useCallback((url: string, display_url: string) => {
        localStorage.setItem("chrome-url", url);
        localStorage.setItem("chrome-display-url", display_url);
    }, []);

    const goToHome = useCallback(() => {
        setUrl(home_url);
        setDisplay_url("https://www.google.com");
        refreshChrome();
    }, [home_url, refreshChrome]);

    const checkKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            let newUrl = e.currentTarget.value;
            let newDisplayUrl = "";

            newUrl = newUrl.trim();
            if (newUrl.length === 0) return;

            if (newUrl.indexOf("http://") !== 0 && newUrl.indexOf("https://") !== 0) {
                newUrl = "https://" + newUrl;
            }

            newUrl = encodeURI(newUrl);
            newDisplayUrl = newUrl;
            if (newUrl.includes("google.com")) { // 😅
                newUrl = 'https://www.google.com/webhp?igu=1';
                newDisplayUrl = "https://www.google.com";
            }
            // If site disallows embedding, open in a new tab and clear iframe
            if (isBlockedEmbedHost(newUrl)) {
                window.open(newUrl, '_blank', 'noopener,noreferrer');
                setDisplay_url(newDisplayUrl || newUrl);
                setUrl('about:blank');
                storeVisitedUrl(newUrl, newDisplayUrl || newUrl);
                refreshChrome();
                e.currentTarget.blur();
                return;
            }
            setUrl(newUrl);
            setDisplay_url(newUrl);
            storeVisitedUrl(newUrl, newDisplayUrl);
            e.currentTarget.blur();
        }
    }, [storeVisitedUrl, isBlockedEmbedHost, refreshChrome]);

    const handleDisplayUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay_url(e.target.value);
    }, []);

    const displayUrlBar = () => {
        return (
            <div className="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900">
                <div onClick={refreshChrome} className="ml-2 mr-1 flex justify-center items-center rounded-full bg-gray-50/0 hover:bg-gray-50/10 transition-all duration-150 ease-in-out">
                    <img className="w-5" src="/images/icons/chrome_refresh.svg" alt="Ubuntu Chrome Refresh" />
                </div>
                <div onClick={goToHome} className=" mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50/0 hover:bg-gray-50/10 transition-all duration-150 ease-in-out ">
                    <img className="w-5" src="/images/icons/chrome_home.svg" alt="Ubuntu Chrome Home" />
                </div>
                <input onKeyDown={checkKey} onChange={handleDisplayUrl} value={display_url} id="chrome-url-bar" className="outline-none bg-ub-grey rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white" type="url" spellCheck={false} autoComplete="off" />
            </div>
        );
    };

    return (
        <div className="h-full w-full flex flex-col bg-ub-cool-grey">
            {displayUrlBar()}
            <iframe src={url} className="flex-grow" id="chrome-screen" title="Ubuntu Chrome Url" style={{ border: 0 }}></iframe>
        </div>
    );
}