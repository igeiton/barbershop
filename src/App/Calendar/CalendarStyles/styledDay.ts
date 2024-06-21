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
        boxShadow: gotBoxShadow(day),
    };
};

export const styledDayOwner = (day: IDay): IStyles => {
    return {
        backgroundColor: gotBgColor(day),
        color: 'white',
        cursor: isFilled(day) ? 'pointer' : 'default',
        opacity: isFilled(day) ? '1' : '0.5',
        boxShadow: gotBoxShadow(day),
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

function gotBoxShadow(day: IDay): string {
    const today = new Date().toLocaleDateString('LT');

    if (today === day.day) {
        return '0 0 5px 2px #ffffff';
    } else if (day.day === '') {
        return 'none';
    } else {
        return '';
    }
}

export function isBookable(day: IDay): boolean {
    const today = new Date().toLocaleDateString('LT');

    if (new Date(today).getTime() > new Date(day.day).getTime()) {
        return false;
    }

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
