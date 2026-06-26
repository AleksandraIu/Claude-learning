// Control height h-8 = 32px (Tailwind default 2rem). No explicit 32px token in @theme (D19).
// Hover gap (D22): hover bg #d4d4d4 not in tokens → arbitrary. Error ring uses D19 #cc0000.
interface InputProps {
  label?: string;
  showLabel?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

export default function Input({
  label = 'Head Line',
  showLabel = true,
  value,
  defaultValue,
  placeholder = 'Michael Lee',
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-xs items-start ${className}`}>
      {showLabel && (
        <label className="type-caps tracking-[1.6px] text-black uppercase whitespace-nowrap">
          {label}
        </label>
      )}
      <div className={`flex h-8 items-center px-s py-xs rounded-s w-full transition-all duration-150
        ${error
          ? 'bg-peach-100 ring-1 ring-[#cc0000]'
          : 'bg-gray-100 hover:bg-[#d4d4d4] focus-within:ring-1 focus-within:ring-black focus-within:bg-white'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="text"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className="type-pixel tracking-[2px] uppercase text-black bg-transparent border-none outline-none w-full placeholder:text-[#979797] disabled:cursor-not-allowed"
        />
      </div>
      {error && errorMessage && (
        <p className="type-pixel tracking-[2px] uppercase text-[#cc0000]">{errorMessage}</p>
      )}
    </div>
  );
}
