import { IDay } from '../../Service/Day';

export interface IStyles {
    [key: string]: string;
}

export const styledDayClient = (day: IDay): IStyles => {
    return {
        backgroundColor: gotBgColor(day),
        color: 'white',
        cursor: isBookable(day) ? 'pointer' : 'default',
        opacity: isBookable(day) ? '1' : '0.5',
        boxShadow: day.day === '' ? 'none' : '',
    };
};

export const styledDayOwner = (day: IDay): IStyles => {
    return {
        backgroundColor: gotBgColor(day),
        color: 'white',
        cursor: isFilled(day) ? 'pointer' : 'default',
        opacity: isFilled(day) ? '1' : '0.5',
        boxShadow: day.day === '' ? 'none' : '',
    };
};

function gotBgColor(day: IDay): string {
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
}

export function isBookable(day: IDay): boolean {
    if (new Date(day.day).getDay() === 0 || new Date(day.day).getDay() === 6) {
        return false;
    }

    if (day.day === '') {
        return false;
    }

    if (day.service === 'fullfilled') {
        return false;
    }

    return true;
}

export function isFilled(day: IDay): boolean {
    if (day.service !== 'empty') {
        return true;
    }

    return false;
}
