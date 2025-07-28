import {getNumberFactState, numberFactActions} from "../../../entity";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useGetNumberFactQuery} from "../../../shared/api/numbersApi.ts";
import {Select} from "../../../shared/ui/Select/Select.tsx";
import {Checkbox} from "../../../shared/ui/CheckBox/CheckBox.tsx";
import {Input} from "../../../shared/ui/Input/Input.tsx";
import {NOTFOUND_OPTIONS, NUMBER_TYPES} from "../../../shared/types/common.ts";
import {LoadingSpinner} from "../../../shared/ui/Loading/LoadingSpinner.tsx";
import {validateDateFormat, validateNumber} from "../../../shared/lib/utils.ts";
import {Card} from "../../../shared/ui/Card/Card.tsx";
import {Button} from "../../../shared/ui/Button/Button.tsx";

export const NumberForm: React.FC = () => {
    const dispatch = useDispatch();
    const { number, type, isRandom, error, settings } = useSelector(getNumberFactState);

    const [localNumber, setLocalNumber] = useState(number);
    const [shouldFetch, setShouldFetch] = useState(false);

    const queryNumber = isRandom ? 'random' : localNumber;

    const { data: factData, isLoading, error: apiError } = useGetNumberFactQuery(
        {
            number: queryNumber,
            type,
            fragment: settings.useFragment,
            notfound: settings.notFoundAction,
            min: isRandom ? settings.minRange : undefined,
            max: isRandom ? settings.maxRange : undefined,
        },
        { skip: !shouldFetch }
    );

    useEffect(() => {
        if (factData && shouldFetch) {
            // Проверяем что данные корректны
            console.log('Received fact data:', factData);

            if (typeof factData === 'object' && factData.text) {
                dispatch(numberFactActions.setResult({
                    fact: factData,
                    number: queryNumber,
                    type
                }));
            } else {
                console.error('Invalid fact data received:', factData);
                dispatch(numberFactActions.setError('Получены некорректные данные от сервера'));
            }
            setShouldFetch(false);
        }
    }, [factData, shouldFetch, dispatch, queryNumber, type]);

    useEffect(() => {
        if (apiError && shouldFetch) {
            dispatch(numberFactActions.setError('Произошла ошибка при получении данных. Попробуйте еще раз.'));
            setShouldFetch(false);
        }
    }, [apiError, shouldFetch, dispatch]);

    const handleNumberChange = (value: string) => {
        setLocalNumber(value);
        dispatch(numberFactActions.setNumber(value));
        if (error) {
            dispatch(numberFactActions.clearError());
        }
    };

    const handleTypeChange = (selectedType: string) => {
        dispatch(numberFactActions.setType(selectedType));
    };

    const handleRandomChange = (checked: boolean) => {
        dispatch(numberFactActions.setIsRandom(checked));
        if (checked) {
            setLocalNumber('');
            dispatch(numberFactActions.setNumber(''));
        }
    };

    const handleSubmit = () => {
        if (!isRandom) {
            let validationError = null;

            if (type === 'date') {
                validationError = validateDateFormat(localNumber);
            } else {
                validationError = validateNumber(localNumber);
            }

            if (validationError) {
                dispatch(numberFactActions.setError(validationError));
                return;
            }
        }

        dispatch(numberFactActions.clearError());
        setShouldFetch(true);
    };

    const getInputPlaceholder = () => {
        switch (type) {
            case 'date': return 'Например: 12/25 или 07/04';
            case 'year': return 'Например: 1969 или 2001';
            default: return 'Например: 42';
        }
    };

    const getInputHelpText = () => {
        switch (type) {
            case 'date': return 'Формат: месяц/день (MM/DD)';
            case 'year': return 'Введите любой год';
            default: return 'Введите любое положительное число';
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Card>
            <h1 style={{
                marginBottom: '32px',
                textAlign: 'center',
                color: '#2c3e50',
                fontSize: '28px'
            }}>
                🔢 Узнайте интересные факты о числах
            </h1>

            <Select
                label="Тип информации"
                value={type}
                onChange={handleTypeChange}
                options={NUMBER_TYPES}
            />

            <Checkbox
                checked={isRandom}
                onChange={handleRandomChange}
                label="Случайное число"
                helpText="Получить факт о случайном числе вместо конкретного"
            />

            {!isRandom && (
                <Input
                    label={type === 'date' ? 'Введите дату' : type === 'year' ? 'Введите год' : 'Введите число'}
                    value={localNumber}
                    onChange={handleNumberChange}
                    placeholder={getInputPlaceholder()}
                    helpText={getInputHelpText()}
                    error={error}
                />
            )}

            {isRandom && (
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#2c3e50' }}>Диапазон для случайного числа:</h4>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Input
                            label="От"
                            value={settings.minRange?.toString() || '1'}
                            onChange={(value) => dispatch(numberFactActions.updateSettings({ minRange: parseInt(value) || 1 }))}
                            placeholder="1"
                        />
                        <Input
                            label="До"
                            value={settings.maxRange?.toString() || '100'}
                            onChange={(value) => dispatch(numberFactActions.updateSettings({ maxRange: parseInt(value) || 100 }))}
                            placeholder="100"
                        />
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '12px', color: '#2c3e50' }}>Дополнительные настройки:</h4>

                <Checkbox
                    checked={settings.useFragment}
                    onChange={(checked) => dispatch(numberFactActions.updateSettings({ useFragment: checked }))}
                    label="Фрагмент предложения"
                    helpText="Возвращать факт как часть предложения (без заглавной буквы и точки)"
                />

                <Select
                    label="Если число не найдено"
                    value={settings.notFoundAction}
                    onChange={(value) => dispatch(numberFactActions.updateSettings({ notFoundAction: value as 'default' | 'floor' | 'ceil' }))}
                    options={NOTFOUND_OPTIONS}
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <Button onClick={handleSubmit} disabled={isLoading} size="large">
                    {isLoading ? 'Загрузка...' : 'Получить факт'}
                </Button>
            </div>
        </Card>
    );
};