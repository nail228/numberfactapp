interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style = {} }) => {
    return (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            padding: window.innerWidth < 768 ? '20px' : '32px',
            margin: '10px 0',
            ...style
        }} className={className}>
            {children}
        </div>
    );
};
