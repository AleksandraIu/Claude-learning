// Token gap (D19): placeholder #cbcbcb not in @theme. Hover/error gap (D22).
interface TextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export default function TextArea({
  label = 'Head Line',
  value,
  placeholder = 'Type something here',
  onChange,
  disabled = false,
  error = false,
  className = '',
}: TextAreaProps) {
  return (
    <div className={`flex flex-col gap-xs items-start ${className}`}>
      <label className="type-caps tracking-[1.6px] text-black uppercase w-full">
        {label}
      </label>
      <div className={`flex items-start px-s py-xs rounded-s w-full transition-all duration-150
        ${error
          ? 'bg-peach-100 ring-1 ring-[#cc0000]'
          : 'bg-gray-100 hover:bg-[#d4d4d4] focus-within:ring-1 focus-within:ring-black focus-within:bg-white'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className="type-pixel tracking-[2px] uppercase text-black bg-transparent border-none outline-none resize-none w-full placeholder:text-[#cbcbcb] disabled:cursor-not-allowed"
          rows={3}
        />
      </div>
    </div>
  );
}
