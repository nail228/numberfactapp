interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string | null;
    label?: string;
    type?: string;
    helpText?: string;
}

export const Input: React.FC<InputProps> = ({
                                                value,
                                                onChange,
                                                placeholder,
                                                error,
                                                label,
                                                type = 'text',
                                                helpText
                                            }) => {
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        border: `2px solid ${error ? '#e74c3c' : '#e1e5e9'}`,
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        outline: 'none',
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = '#667eea';
        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = error ? '#e74c3c' : '#e1e5e9';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#2c3e50'
                }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {helpText && !error && (
                <div style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    marginTop: '4px'
                }}>
                    {helpText}
                </div>
            )}
            {error && (
                <div style={{
                    color: '#e74c3c',
                    fontSize: '14px',
                    marginTop: '8px',
                    padding: '8px 12px',
                    background: '#fdf2f2',
                    borderRadius: '6px',
                    borderLeft: '4px solid #e74c3c'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
};