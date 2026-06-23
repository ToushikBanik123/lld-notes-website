import Link from 'next/link';
import { getModules } from '@/lib/content';

export default function Home() {
  const modules = getModules();
  // Sort modules by name (which starts with digits like "01 - ")
  const sortedModules = Object.keys(modules).sort();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-16">
      
      {/* Hero Section */}
      <div className="border-b-4 border-black pb-12 mb-12">
        <h2 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
          The Definitive <br/> Guide to LLD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 font-body text-lg md:text-xl leading-relaxed text-justify">
            <span className="float-left text-7xl font-serif font-black mr-4 leading-[0.8] mt-2">W</span>
            elcome to the ultimate collection of Low-Level Design notes. 
            Whether you are preparing for software engineering interviews or just looking 
            to solidify your understanding of Object-Oriented principles, SOLID guidelines, 
            and design patterns, you will find everything you need right here.
          </div>
          <div className="md:col-span-4 border-l-0 md:border-l border-black md:pl-8">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-black pb-2 mb-4">
              Breaking News
            </h3>
            <ul className="space-y-4">
              <li className="font-serif text-xl font-bold leading-tight">
                Design Patterns Demystified: Creational, Structural & Behavioral
              </li>
              <li className="font-serif text-xl font-bold leading-tight">
                Tackling the Parking Lot: A Comprehensive Interview Guide
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black">
        {sortedModules.map((moduleName, index) => {
          const notes = modules[moduleName];
          return (
            <div key={moduleName} className="border-r border-b border-black p-6 md:p-8 bg-[#F9F9F7] hover:bg-[#E5E5E0] transition-colors duration-200">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4 text-[#CC0000]">
                {moduleName}
              </h3>
              <ul className="space-y-3">
                {notes.map(note => (
                  <li key={note.slug.join('/')}>
                    <Link 
                      href={`/${note.slug.join('/')}`}
                      className="font-serif text-xl lg:text-2xl font-bold leading-tight hover:underline underline-offset-4 decoration-2 decoration-[#CC0000]"
                    >
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

    </div>
  );
}
