import { useEffect, useState } from "react";

const AutoSaveIndicator = ({ active }: { active: boolean }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        if (!active) return;

        const now = new Date();
        setTime(now.toLocaleTimeString());

    }, [active]);

    if (!active) return null;

    return (
        <small className="text-muted ms-1">
            Draft saved at {time}
        </small>
    );
};

export default AutoSaveIndicator;
