export const styledDay = (day: any, isOwner: boolean) => {
    const weekends =
        new Date(day.day).getDay() === 0 || new Date(day.day).getDay() === 6;

    return {
        backgroundColor: gotBgColor(day),
        color: 'white',
        cursor:
            weekends || day.day === '' || (day.records.length === 0 && isOwner)
                ? 'default'
                : 'pointer',
        boxShadow: day.day === '' ? 'none' : '',
        opacity: weekends ? 0.5 : 1,
    };
};

function gotBgColor(day: any) {
    if (day.day === '') {
        return 'transparent';
    }

    if (day.service === 'fullfilled') {
        return 'red';
    } else if (day.service === 'halffilled') {
        return 'orange';
    } else {
        return '#1976d2';
    }

    return 'transparent';
}
