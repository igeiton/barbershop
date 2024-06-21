interface IMonths {
    [key: number]: string;
}
export const months: IMonths = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Маия',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
};

export const months2_0: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export const years2_0 = () => {
    const years2_0 = [new Date().getFullYear()];

    for (let i = 1; i < 3; ++i) {
        years2_0.push(years2_0[0] + i);
    }

    return years2_0;
};

export const year: number = new Date().getFullYear();

export const dayOfWeek: string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
