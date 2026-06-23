import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the combined folder one level up
const contentDirectory = path.join(process.cwd(), '../combined');

export interface NoteData {
  slug: string[];
  title: string;
  content: string;
  module?: string;
  tags?: string[];
  date?: string;
}

export function getAllNoteSlugs(): string[][] {
  const slugs: string[][] = [];

  function walkSync(dir: string, filelist: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'assets') continue; // skip assets folder for slugs
      
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);
      
      if (stat.isDirectory()) {
        filelist = walkSync(filepath, filelist);
      } else if (file.endsWith('.md')) {
        const relativePath = path.relative(contentDirectory, filepath);
        // split into array for Next.js [...slug] format
        const slug = relativePath.replace(/\.md$/, '').split(path.sep);
        slugs.push(slug);
      }
    }
    return filelist;
  }

  walkSync(contentDirectory);
  return slugs;
}

export function getNoteBySlug(slug: string[]): NoteData {
  const realSlug = slug.map(decodeURIComponent).join('/');
  const fullPath = path.join(contentDirectory, `${realSlug}.md`);
  
  // If file doesn't exist, try index.md if the path was a directory
  let finalPath = fullPath;
  if (!fs.existsSync(fullPath)) {
     const dirPath = path.join(contentDirectory, realSlug, 'index.md');
     if (fs.existsSync(dirPath)) {
        finalPath = dirPath;
     }
  }

  const fileContents = fs.readFileSync(finalPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || realSlug.split('/').pop() || 'Untitled',
    module: data.module,
    tags: data.tags,
    date: data.date,
    content,
  };
}

export function getAllNotes(): NoteData[] {
  const slugs = getAllNoteSlugs();
  return slugs.map((slug) => getNoteBySlug(slug));
}

export function getModules(): Record<string, NoteData[]> {
    const notes = getAllNotes();
    const modules: Record<string, NoteData[]> = {};
    
    notes.forEach(note => {
        // use the first part of the slug as the module if frontmatter doesn't have it
        const modName = note.module || note.slug[0];
        if (!modules[modName]) {
            modules[modName] = [];
        }
        modules[modName].push(note);
    });
    
    return modules;
}
