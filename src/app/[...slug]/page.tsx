import { getNoteBySlug, getAllNoteSlugs } from '@/lib/content';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  const slugs = getAllNoteSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  return (
    <article className="max-w-screen-md mx-auto px-4 py-8 md:py-16">
      
      <div className="mb-12 border-b-4 border-black pb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-mono uppercase tracking-widest font-bold mb-6 hover:text-[#CC0000] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Index
        </Link>
        <div className="flex gap-4 items-center mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
          {note.module && <span>Module: {note.module}</span>}
          {note.date && <span>Published: {note.date}</span>}
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
          {note.title}
        </h1>
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {note.tags.map(tag => (
              <span key={tag} className="border border-black px-2 py-1 text-[10px] font-mono uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose prose-lg prose-neutral max-w-none font-body">
        <Markdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h2 className="font-serif text-3xl font-black mt-12 mb-6 uppercase" {...props} />,
            h2: ({node, ...props}) => <h3 className="font-serif text-2xl font-bold mt-10 mb-4" {...props} />,
            h3: ({node, ...props}) => <h4 className="font-serif text-xl font-bold mt-8 mb-4" {...props} />,
            p: ({node, children, ...props}) => {
                // To support drop caps on first paragraph, we could check if it's the first child, 
                // but simpler to just let markdown be normal for now, or apply justified text
                return <p className="mb-6 leading-relaxed text-justify" {...props}>{children}</p>
            },
            a: ({node, ...props}) => <a className="underline decoration-2 decoration-[#CC0000] underline-offset-4 hover:bg-[#E5E5E0] transition-colors" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-black pl-6 py-2 my-8 italic text-neutral-700 bg-neutral-100/50" {...props} />,
            code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                    <div className="border border-black my-6 bg-[#F9F9F7] overflow-hidden">
                        <div className="border-b border-black bg-black text-white px-4 py-1 text-xs font-mono uppercase tracking-widest flex justify-between">
                            <span>{match[1]}</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm font-mono">
                            <code className={className} {...props}>
                                {children}
                            </code>
                        </pre>
                    </div>
                ) : (
                    <code className="bg-neutral-200 px-1.5 py-0.5 font-mono text-sm" {...props}>
                        {children}
                    </code>
                );
            },
            pre: ({node, ...props}) => <>{props.children}</>, // Disable wrapper since we handle it in code
            ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2" {...props} />,
            img: ({node, ...props}) => (
                <span className="block border border-black p-2 my-8 hard-shadow-hover">
                    {/* Note: In production we'd map Obsidian image links to public/assets */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-auto grayscale hover:sepia-[50%] transition-all duration-300" {...props} alt={props.alt || ''} />
                </span>
            ),
          }}
        >
          {note.content}
        </Markdown>
      </div>
      
    </article>
  );
}
