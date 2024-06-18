export const validePhone = (
    currentPhone: string,
    targetValue: string
): string => {
    targetValue = targetValue.replace(/(\s)|(\+7)/g, '');

    let splittedTargetValue: string[] = targetValue.split('');

    if (targetValue.length > 10 || !!targetValue.match(/[^\d]/)) {
        splittedTargetValue = currentPhone.split('');
    }

    return splittedTargetValue
        .join('')
        .replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, ' $1 $2 $3')
        .replace(/\s+(?![0-9])/g, '');
};
