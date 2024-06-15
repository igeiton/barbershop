export const validePhone = (currentPhone: any, targetValue: any) => {
    targetValue = targetValue.replace(/(\s)|(\+7)/g, '');

    let splittedTargetValue: number[] = targetValue.split('');

    if (targetValue.length > 10 || !!targetValue.match(/[^\d]/)) {
        splittedTargetValue = currentPhone.split('');
    }

    return splittedTargetValue
        .join('')
        .replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, ' $1 $2 $3')
        .replace(/\s+(?![0-9])/g, '');
};
