interface ExperiencePreviewProps {
  dateRange?: string;
  role?: string;
  company?: string;
  description?: string;
  className?: string;
}

export default function ExperiencePreview({
  dateRange = 'Jan 2022 — Present (3 years)',
  role = 'Senior Frontend Developer',
  company = 'TechCorp Solutions',
  description = 'Led development of React applications, mentored junior developers, improved performance by 40%',
  className = '',
}: ExperiencePreviewProps) {
  return (
    <div className={`border-t border-gray-100 flex flex-col gap-[30px] items-start py-s w-full ${className}`}>
      <p className="type-pixel tracking-[2px] uppercase text-black w-full">{dateRange}</p>
      <div className="flex flex-col gap-s items-start w-full">
        <p className="type-h3 text-black tracking-[-0.4px] w-full">{role}</p>
        <div className="flex flex-col gap-xs items-start w-full">
          <p className="type-grotesk text-black">{company}</p>
          <p className="type-grotesk text-black">{description}</p>
        </div>
      </div>
    </div>
  );
}
