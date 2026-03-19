import { useState, useEffect } from 'react'

interface ClockProps {
    onlyTime?: boolean;
    onlyDay?: boolean;
}

export default function Clock({ onlyTime, onlyDay }: ClockProps) {
    const month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day_list = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // Prevent hydration mismatch: server + initial client render must match.
    // We only start rendering real time after the component mounts.
    const [current_time, setCurrent_time] = useState<Date | null>(null);
    const [hour_12] = useState(true);

    useEffect(() => {
        setCurrent_time(new Date());
        const update_time = setInterval(() => setCurrent_time(new Date()), 10 * 1000);

        return () => clearInterval(update_time);
    }, []);

    if (!current_time) return <span />;

    const day = day_list[current_time.getDay()];
    let hour = current_time.getHours();
    let minute = current_time.getMinutes();
    const month = month_list[current_time.getMonth()];
    const date = String(current_time.getDate());
    const meridiem = (hour < 12 ? "AM" : "PM");

    // Keep formatting stable across environments.
    const minuteStr = String(minute).padStart(2, "0");

    if (hour_12 && hour > 12) hour -= 12;

    let display_time;
    if (onlyTime) {
        display_time = hour + ":" + minuteStr + " " + meridiem;
    }
    else if (onlyDay) {
        display_time = day + " " + month + " " + date;
    }
    else display_time = day + " " + month + " " + date + " " + hour + ":" + minuteStr + " " + meridiem;
    
    return <span>{display_time}</span>;
}
