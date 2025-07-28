export const validateNumber = (value: string): string | null => {
    if (!value.trim()) {
        return 'Поле не может быть пустым';
    }

    if (!/^\d+$/.test(value.trim())) {
        return 'Число должно быть в виде цифры';
    }

    const num = parseInt(value.trim(), 10);
    if (num < 0) {
        return 'Число должно быть положительным';
    }

    if (num > 999999) {
        return 'Число слишком большое';
    }

    return null;
};

export const validateDateFormat = (value: string): string | null => {
    if (!value.trim()) {
        return 'Поле не может быть пустым';
    }

    const datePattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/;
    if (!datePattern.test(value.trim())) {
        return 'Формат даты должен быть MM/DD (например: 12/25)';
    }

    return null;
};
