interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    helpText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, helpText }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                cursor: 'pointer',
                fontWeight: '600',
                color: '#2c3e50'
            }}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    style={{ marginRight: '8px', marginTop: '2px' }}
                />
                <div>
                    <span>{label}</span>
                    {helpText && (
                        <div style={{
                            fontSize: '14px',
                            color: '#6c757d',
                            fontWeight: 'normal',
                            marginTop: '4px'
                        }}>
                            {helpText}
                        </div>
                    )}
                </div>
            </label>
        </div>
    );
};