import React from 'react'

interface SmallArrowProps {
    angle?: string;
    className?: string;
}

export default function SmallArrow({ angle = "up", className = "" }: SmallArrowProps) {
    return (
        <div className={`arrow-custom-${angle} ${className}`}></div>
    )
}
