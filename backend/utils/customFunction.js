export const generateTimeSlots = (startTime, endTime, interval = 1) => {
    const pad = (num) => num.toString().padStart(2, "0");

    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const formatTime = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const slots = [];

    let current = new Date(start);

    while (current < end) {
        let next = new Date(current);
        next.setHours(current.getHours() + interval);

        if (next > end) {
            next = new Date(end);
        }

        slots.push({ start: formatTime(current), end: formatTime(next) });
        current = new Date(next);
    }

    return slots;
}

export const setDateTonewDate = (unixtime) =>{
    const date = new Date(unixtime * 1000);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

export const setTimeToGivenDate = (isoString, newHour, newMinute) => {
    const date = new Date(isoString);  
    date.setUTCHours(newHour);
    date.setUTCMinutes(newMinute); 
    return date.toISOString();
}
