export const hasDay = (day: string, days: any) => {
    return days.filter((someDay: any) => someDay.day === day);
};
