// Release Notes — auto-rendered from NOTES.md (Vite ?raw import)
// Parses ## [Step ...] entries into a readable timeline.
import rawNotes from '../../NOTES.md?raw';
import PreviewNav from './PreviewNav';

interface NoteEntry {
  title: string;
  date: string;
  body: string;
}

function parseNotes(raw: string): NoteEntry[] {
  // Split on newline-prefixed '## [' which marks each step entry
  const parts = raw.split(/\n## \[/);
  return parts
    .slice(1) // skip the file header
    .map(part => {
      const closeBracket = part.indexOf(']');
      if (closeBracket === -1) return null;
      const title = part.substring(0, closeBracket);
      const afterBracket = part.substring(closeBracket + 1);
      const newlineIdx = afterBracket.indexOf('\n');
      const datePart = afterBracket
        .substring(0, newlineIdx < 0 ? undefined : newlineIdx)
        .replace(/^\s*—\s*/, '')
        .trim();
      const body = newlineIdx >= 0
        ? afterBracket.substring(newlineIdx + 1).trim()
        : '';
      return { title, date: datePart, body };
    })
    .filter((e): e is NoteEntry => e !== null);
}

const entries = parseNotes(rawNotes);

function BodyLine({ line }: { line: string }) {
  // Render markdown-ish lines: table rows, headings, plain text
  if (line.startsWith('### ')) {
    return <p className="type-h4 text-black mt-m mb-xs">{line.slice(4)}</p>;
  }
  if (line.startsWith('| ') && line.endsWith(' |')) {
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    const isSep = cells.every(c => /^[-:]+$/.test(c));
    if (isSep) return null;
    return (
      <div className="flex gap-m border-b border-border py-xxxs">
        {cells.map((cell, i) => (
          <span key={i} className={`type-grotesk flex-1 min-w-0 break-words ${i === 0 ? 'text-black font-bold' : 'text-black/50'}`}>
            {cell.replace(/`/g, '')}
          </span>
        ))}
      </div>
    );
  }
  if (line.startsWith('- ') || line.startsWith('* ')) {
    return <p className="type-grotesk text-black/70 ml-m">{line.slice(2)}</p>;
  }
  if (line.startsWith('**') && line.endsWith('**')) {
    return <p className="type-grotesk font-bold text-black">{line.slice(2, -2)}</p>;
  }
  if (line === '---' || line === '') return null;
  return <p className="type-grotesk text-black/70">{line}</p>;
}

export default function ReleaseNotes() {
  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-5xl mx-auto">
        <PreviewNav />
        <h1 className="type-h1 mb-xxl">Release Notes</h1>

        <div className="flex flex-col gap-xxl">
          {entries.map((entry, i) => (
            <article key={i} className="border-l-2 border-primary pl-l">
              <div className="flex items-baseline gap-m mb-m flex-wrap">
                <p className="type-h3 text-black">{entry.title}</p>
                <p className="type-caps tracking-[1.6px] uppercase text-black/50 whitespace-nowrap">
                  {entry.date}
                </p>
              </div>
              <div className="flex flex-col gap-xxxs">
                {entry.body.split('\n').map((line, j) => (
                  <BodyLine key={j} line={line} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
