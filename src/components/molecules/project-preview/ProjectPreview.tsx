// Token gap (D22): tag bg #fffd9e = on-cads/yellow-dark — no token.
interface ProjectPreviewProps {
  description?: string;
  tags?: string[];
  className?: string;
}

export default function ProjectPreview({
  description = 'Full-stack e-commerce solution with React frontend and Node.js backend',
  tags = ['React', 'Node.js', 'MongoDB', 'WebSocket'],
  className = '',
}: ProjectPreviewProps) {
  return (
    <div className={`border-t border-gray-100 flex flex-col gap-[30px] items-start py-s w-full ${className}`}>
      <p className="type-h3 leading-[normal] text-black tracking-[-0.4px] w-[419px]">{description}</p>
      <div className="flex gap-xxxs items-start flex-wrap">
        {tags.map(tag => (
          <div
            key={tag}
            className="bg-[#fffd9e] flex h-8 items-center justify-center px-xs rounded-s shrink-0"
          >
            <span className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
