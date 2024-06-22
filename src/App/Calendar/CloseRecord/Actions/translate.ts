import { months } from '../../DatePicker/Actions/Dates';

export const translate = (value: string): string => {
    const today: string = new Date().toLocaleDateString('LT');

    if (value === today) {
        return 'Сегодня';
    }

    const splittedCloseRecord: string[] = value.split('-');

    const [_, month, day]: number[] = [
        Number(splittedCloseRecord[0]),
        Number(splittedCloseRecord[1]),
        Number(splittedCloseRecord[2]),
    ];

    return `${day} ${months[month - 1]}`;
};
