import { getAllGames } from '@/lib/content';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取所有游戏数据并过滤掉 null
  const games = (await getAllGames()).filter((game): game is NonNullable<typeof game> => game !== null);
  
  // 生成游戏页面的 URL
  const gamesUrls = games.map((game) => ({
    url: `https://animecodes.com/games/${game.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8
  }));

  // 静态页面
  const staticPages = [
    {
      url: 'https://animecodes.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: 'https://animecodes.com/about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: 'https://animecodes.com/privacy',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.3
    },
    {
      url: 'https://animecodes.com/terms',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.3
    }
  ];

  // 合并所有 URL
  return [...staticPages, ...gamesUrls];
} 