interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px'
        }} className={className}>
            {children}
        </div>
    );
};