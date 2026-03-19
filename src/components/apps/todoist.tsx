import React from 'react'

export default function Todoist() {
    return (
        <iframe src="https://todoist.com/showProject?id=220474322" title="Todoist" className="h-full w-full" style={{ border: 0 }}></iframe>
        // just to bypass the headers 🙃
    )
}

export const displayTodoist = () => {
    return <Todoist />;
}
