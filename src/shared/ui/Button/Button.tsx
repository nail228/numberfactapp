interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  disabled = false,
                                                  variant = 'primary',
                                                  size = 'medium'
                                              }) => {
    const sizeStyles = {
        small: { padding: '8px 16px', fontSize: '14px' },
        medium: { padding: '12px 24px', fontSize: '16px' },
        large: { padding: '16px 32px', fontSize: '18px' }
    };

    const baseStyle: React.CSSProperties = {
        background: variant === 'primary'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'transparent',
        color: variant === 'primary' ? 'white' : '#667eea',
        border: variant === 'primary' ? 'none' : '2px solid #667eea',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        minWidth: '120px',
        opacity: disabled ? 0.6 : 1,
        ...sizeStyles[size]
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            if (variant === 'primary') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            } else {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.color = 'white';
            }
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            if (variant === 'primary') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            } else {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#667eea';
            }
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={baseStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    );
};