import {Provider, useSelector} from "react-redux";
import {type RootState, store} from "./providers/store/config/store.ts";
import {useEffect} from "react";
import {HomePage} from "../pages/HomePage";
import {ResultPage} from "../pages/ResultPage";

const AppContent: React.FC = () => {
    const currentPage = useSelector((state: RootState) => state.numberFacts.currentPage);

    console.log('AppContent render - currentPage:', currentPage);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '15px 0',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#333'
        }}>
            {currentPage === 'home' ? (
                <>
                    {console.log('Rendering HomePage')}
                    <HomePage />
                </>
            ) : (
                <>
                    {console.log('Rendering ResultPage')}
                    <ResultPage />
                </>
            )}
        </div>
    );
};

export const App: React.FC = () => {
    // Добавляем глобальный обработчик ошибок
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error('Global error caught:', event);
            if (event.message?.includes('targeName')) {
                console.error('targeName error detected - check for typos in property names');
            }
        };

        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            console.error('Unhandled promise rejection:', event.reason);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    return (
        <Provider store={store}>
                <AppContent />
        </Provider>
    );
};

export default App;