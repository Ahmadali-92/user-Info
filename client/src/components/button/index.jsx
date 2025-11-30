export default function Button({
  onClick,
  children,
  type = 'submit',
  className = '',
  disabled = false,
  loading = false,
  active = false,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative px-4 py-2 rounded flex items-center justify-center
        ${
          active
            ? 'bg-blue-800 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }
        ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      {...rest}
    >
      <span className={`${loading ? 'invisible' : 'visible'}`}>{children}</span>

      {/* Spinner overlays text */}
      {loading && (
        <span className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
    </button>
  );
}
