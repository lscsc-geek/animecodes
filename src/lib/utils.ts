export function getCanonicalUrl(path: string = ''): string {
  // 移除开头的斜杠，确保不会出现双斜杠
  const cleanPath = path.replace(/^\/+/, '');
  return `https://animecodes.com/${cleanPath}`;
} 