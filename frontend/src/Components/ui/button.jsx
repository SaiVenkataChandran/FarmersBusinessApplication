export default function Button({
    children,
    variant = 'default',
    size = 'default',
    className = '',
    onClick
}) {
    const baseStyles = 'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2'

    const variantStyles = {
        default: 'bg-green-600 text-white hover:bg-green-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-200 bg-white hover:bg-gray-50',
        ghost: 'hover:bg-gray-100',
        destructive: 'bg-red-600 text-white hover:bg-red-700'
    }

    const sizeStyles = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8'
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}