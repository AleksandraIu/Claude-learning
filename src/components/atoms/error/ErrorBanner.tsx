// Token gaps (D19): bg #f7e0dd → bg-peach-100; text color #cc0000 → text-[#cc0000].
interface ErrorBannerProps {
  message?: string;
  className?: string;
}

export default function ErrorBanner({ message = 'Something went wrong', className = '' }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={`flex gap-s items-start bg-peach-100 rounded-s px-xs py-xs
        font-grotesk text-caps leading-caps tracking-[1.6px] uppercase
        text-[#cc0000] whitespace-nowrap ${className}`}
    >
      <span>Error!</span>
      <span>{message}</span>
    </div>
  );
}
