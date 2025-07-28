import {Button} from "../../../shared/ui/Button/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import { numberFactActions} from "../../../entity";
import {Card} from "../../../shared/ui/Card/Card.tsx";
import type {RootState} from "../../../app/providers/store/config/store.ts";

export const NumberFactResult: React.FC = () => {
    const dispatch = useDispatch();
    const lastQuery = useSelector((state: RootState) => state.numberFacts.lastQuery);

    // Отладочная информация
    console.log('NumberFactResult rendered with lastQuery:', lastQuery);

    if (!lastQuery) {
        console.log('No lastQuery found, returning null');
        return null;
    }

    const { fact, number, type } = lastQuery;

    // Отладочная информация о fact
    console.log('Fact object:', fact, 'Type of fact:', typeof fact);

    // Добавляем проверки на безопасность
    if (!fact || typeof fact !== 'object') {
        console.error('Invalid fact object:', fact);
        return (
            <div style={{ width: '100%', padding: '0 15px' }}>
                <Card>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#dc3545' }}>❌ Ошибка данных</h2>
                        <p>Некорректные данные факта</p>
                        <Button onClick={() => dispatch(numberFactActions.navigateToHome())}>
                            Назад к поиску
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'trivia': return 'Интересный факт';
            case 'math': return 'Математический факт';
            case 'date': return 'Исторический факт о дате';
            case 'year': return 'Исторический факт о годе';
            default: return 'Факт';
        }
    };

    const handleBackClick = () => {
        dispatch(numberFactActions.navigateToHome());
    };

    return (
        <div style={{ width: '100%', padding: '0 15px' }}>
            <Card>
                <h1 style={{
                    marginBottom: '24px',
                    textAlign: 'center',
                    color: '#2c3e50'
                }}>
                    Результат поиска
                </h1>

                <div style={{
                    marginBottom: '24px',
                    padding: '16px',
                    background: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <h3 style={{ marginBottom: '12px', color: '#495057' }}>Информация о запросе:</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <p><strong>Число:</strong> {number === 'random' ? 'Случайное число' : number}</p>
                        <p><strong>Тип:</strong> {getTypeLabel(type)}</p>
                        <p><strong>Найден факт:</strong> {fact?.found ? '✅ Да' : '❌ Нет'}</p>
                        <p><strong>Фактическое число:</strong> {fact?.number || 'Не определено'}</p>
                        {fact?.date && <p><strong>Дата:</strong> {String(fact.date)}</p>}
                        {fact?.year && <p><strong>Год:</strong> {String(fact.year)}</p>}
                    </div>
                </div>

                <div style={{
                    background: fact?.found
                        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                        : 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)',
                    color: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    margin: '16px 0',
                    boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
                }}>
                    <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>
                        {fact?.found ? getTypeLabel(type) : 'Альтернативный факт'}
                    </h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                        {fact?.text || 'Факт не найден'}
                    </p>

                    {/* Отладочная информация для разработки */}
                    {process.env.NODE_ENV === 'development' && (
                        <details style={{ marginTop: '16px', fontSize: '14px' }}>
                            <summary>🔍 Отладочная информация</summary>
                            <pre style={{
                                background: 'rgba(255,255,255,0.2)',
                                padding: '8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                overflow: 'auto',
                                marginTop: '8px'
                            }}>
                {JSON.stringify({ fact, number, type }, null, 2)}
              </pre>
                        </details>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Button variant="secondary" onClick={handleBackClick}>
                        ← Назад к поиску
                    </Button>
                </div>
            </Card>
        </div>
    );
};
