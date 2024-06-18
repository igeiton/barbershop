import { IDay } from '../../../Service/Day';

export default function getDaysByDiff(
    month: number,
    year: number,
    days: IDay[]
): IDay[] {
    const diff: number = new Date(year, month, 0).getDate();
    const daysArray: IDay[] = [];
    const startDate = {
        year: Number(year),
        month: Number(month),
        day: Number(1),
    } as { year: number; month: number; day: number };

    const dayOfWeek: number = new Date(
        Number(startDate.year),
        Number(startDate.month) - 1,
        Number(startDate.day)
    ).getDay();

    for (let i = 1; i < (dayOfWeek === 0 ? 7 : dayOfWeek); i++) {
        daysArray.push({
            id: new Date().getTime(),
            day: '',
            records: [],
            service: 'empty',
        });
    }

    for (let i = 0; i < diff; i++) {
        const current: Date = new Date(
            Number(startDate.year),
            Number(startDate.month) - 1,
            Number(startDate.day) + i
        );

        if (dayExist(current)) {
            continue;
        }

        daysArray.push({
            id: new Date().getTime(),
            day: current.toLocaleDateString('LT'),
            records: [],
            service: 'empty',
        });
    }

    function dayExist(current: any): boolean {
        for (let j = 0; j < days.length; j++) {
            if (days[j].day === current.toLocaleDateString('LT')) {
                daysArray.push(days[j]);
                return true;
            }
        }

        return false;
    }

    return daysArray;
}
