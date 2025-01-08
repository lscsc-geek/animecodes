import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentData {
  title: string;
  description: string;
  keywords?: string;
  date?: string;
  thumbnail?: string;
  background?: string;
  tags?: string[];
  navigation?: NavigationItem[];
  trending?: TrendingItem[];
  content: string;
  slug?: string;
  category?: string;
  activeCodesCount?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
}

export interface NavigationItem {
  title: string;
  icon: string;
  link: string;
  bgColor: string;
}

export interface TrendingItem {
  title: string;
  slug: string;
  author: string;
  number: string;
}

// 添加这个辅助函数来处理 HTML 转义
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function parseMarkdown(filePath: string): Promise<ContentData> {
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, {
      sanitize: false,
      handlers: {
        code(h: any, node: any) {
          if (node.position?.start?.line > 10) {
            const value = node.value || '';
            return h(node, 'span', {
              className: 'code-block',
              'data-code': escapeHtml(value),
              onclick: `
                const code = this.getAttribute('data-code');
                if (code) {
                  navigator.clipboard.writeText(code).then(() => {
                    const toast = document.createElement('div');
                    toast.className = 'copy-success';
                    toast.textContent = 'Code copied!';
                    document.body.appendChild(toast);
                    setTimeout(() => {
                      toast.classList.add('hide');
                      setTimeout(() => toast.remove(), 300);
                    }, 2000);
                  });
                }
              `
            }, [h(node, 'text', value)]);
          }
          return false;
        }
      }
    } as any)
    .process(content);

  return {
    title: data.title || '',
    description: data.description || '',
    ...data,
    content: processedContent.toString(),
    slug: path.basename(filePath, '.md'),
    category: data.category
  };
}

export async function getListContent(category: string): Promise<ContentData> {
  const filePath = path.join(contentDirectory, category, 'index.md');
  return parseMarkdown(filePath);
}

export async function getDetailContent(category: string, slug: string): Promise<ContentData | null> {
  try {
    const filePath = path.join(contentDirectory, category, slug, 'index.md');
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }

    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, {
        sanitize: false,
        handlers: {
          code(h: any, node: any) {
            if (node.position?.start?.line > 10) {
              const value = node.value || '';
              return h(node, 'span', {
                className: 'code-block',
                'data-code': escapeHtml(value),
                onclick: `
                  const code = this.getAttribute('data-code');
                  if (code) {
                    navigator.clipboard.writeText(code).then(() => {
                      const toast = document.createElement('div');
                      toast.className = 'copy-success';
                      toast.textContent = 'Code copied!';
                      document.body.appendChild(toast);
                      setTimeout(() => {
                        toast.classList.add('hide');
                        setTimeout(() => toast.remove(), 300);
                      }, 2000);
                    });
                  }
                `
              }, [h(node, 'text', value)]);
            }
            return false;
          }
        }
      } as any)
      .process(content);

    return {
      title: data.title || '',
      description: data.description || '',
      ...data,
      content: processedContent.toString(),
      category,
      slug,
      seo: data.seo || {}
    };
  } catch (error) {
    console.error('Error in getDetailContent:', error);
    return null;
  }
}

export async function getAllContent(category: string): Promise<ContentData[]> {
  const categoryPath = path.join(contentDirectory, category);
  const entries = await fs.promises.readdir(categoryPath, { withFileTypes: true });
  
  const contents = await Promise.all(
    entries
      .filter(entry => entry.isDirectory())
      .map(async (entry) => {
        return getDetailContent(category, entry.name);
      })
  );

  return contents.filter((content): content is ContentData => content !== null);
}

interface GameData {
  title: string;
  description: string;
  thumbnail?: string;
  slug: string;
  lastUpdated?: string;
  releaseDate?: string;
  activeCodesCount?: number;
}

export async function getAllGames(): Promise<GameData[]> {
  const gamesDirectory = path.join(contentDirectory, 'games');
  
  try {
    // 使用 fs.promises.readdir
    const entries = await fs.promises.readdir(gamesDirectory, { withFileTypes: true });
    
    const games = await Promise.all(
      entries
        .filter(entry => entry.isDirectory())
        .map(async (entry) => {
          const fullPath = path.join(gamesDirectory, entry.name, 'index.md');
          try {
            // 使用 fs.promises.readFile
            const fileContents = await fs.promises.readFile(fullPath, 'utf8');
            const { data } = matter(fileContents);
            return {
              ...data,
              slug: entry.name,
            };
          } catch (err) {
            console.error(`Error reading ${fullPath}:`, err);
            return null;
          }
        })
    );

    return games.filter(Boolean) as GameData[];
  } catch (err) {
    console.error('Error reading games directory:', err);
    return [];
  }
} 