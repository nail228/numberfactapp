interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
    const sizeClass = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    }[size];

    return (
        <div className="flex items-center justify-center p-4">
            <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClass}`}></div>
        </div>
    );
};