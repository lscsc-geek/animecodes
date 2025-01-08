import Image from "next/image";
import Link from "next/link";
import { CodeUpdate, GameUpdate } from '@/types';
import SearchBar from '@/components/SearchBar';
import { getAllGames } from '@/lib/content';

interface GameItem {
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
  bgClass?: string;
  lastUpdated: string;
  activeCodesCount: number;
  category: string;
}

// 获取最新的游戏列表
async function getLatestGames(): Promise<GameItem[]> {
  const games = await getAllGames();
  
  // 为每个游戏分配一个背景渐变色
  const bgClasses = [
    "from-blue-600 to-purple-400",
    "from-green-600 to-emerald-400",
    "from-orange-600 to-red-400",
    "from-purple-600 to-indigo-400",
    "from-yellow-600 to-amber-400",
    "from-pink-600 to-rose-400"
  ];

  return games
    .filter((game): game is NonNullable<typeof game> => game !== null)
    .map((game, index) => ({
      title: game.title,
      description: game.description,
      thumbnail: game.thumbnail || `/images/game_img/${game.slug}.webp`,
      slug: game.slug,
      bgClass: bgClasses[index % bgClasses.length],
      lastUpdated: game.lastUpdated || game.releaseDate || '',
      activeCodesCount: game.activeCodesCount || 0,
      category: 'games'
    }))
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 6);
}

export default async function Home() {
  const latestGames = await getLatestGames();

  const latestUpdates: (CodeUpdate | GameUpdate)[] = [
    {
      id: '1',
      game: 'Anime Vanguards Codes',
      gameSlug: 'anime-vanguards-codes',
      code: 'RELEASE2025',
      reward: '500 Gems + Limited Character',
      addedDate: '2025-01-20T12:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      game: "Dandy's World Codes",
      gameSlug: 'dandys-world-codes',
      code: 'NEWYEAR2025',
      reward: '1000 Gems + Special Character',
      addedDate: '2025-01-19T15:30:00Z',
      status: 'active'
    },
    {
      id: '3',
      game: 'Jujutsu Infinite Codes',
      gameSlug: 'jujutsu-infinite-codes',
      title: 'Version 1.5 Update',
      description: 'New characters and game modes added',
      date: '2025-01-18T08:00:00Z',
      type: 'update'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1115]">
      {/* Banner 区域 */}
      <div className="relative bg-[#2b0a2b] overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-96 h-96 transform translate-x-1/3 -translate-y-1/3">
            <div className="absolute inset-0 bg-[#e91c24] rounded-full opacity-10 blur-3xl"></div>
          </div>
          <div className="absolute left-0 bottom-0 w-96 h-96 transform -translate-x-1/3 translate-y-1/3">
            <div className="absolute inset-0 bg-[#4267b2] rounded-full opacity-10 blur-3xl"></div>
          </div>
          {/* 点缀装饰 */}
          <div className="absolute inset-0">
            <div className="h-full w-full" style={{ 
              backgroundImage: `
                radial-gradient(circle at 20% 35%, #e91c24 0, transparent 4px),
                radial-gradient(circle at 75% 44%, #4267b2 0, transparent 6px),
                radial-gradient(circle at 40% 60%, #ffd700 0, transparent 3px),
                radial-gradient(circle at 85% 75%, #1da1f2 0, transparent 5px)
              `
            }}></div>
          </div>
        </div>

        {/* Logo 和搜索框 */}
        <div className="relative container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2">
                Anime<span className="text-[#e91c24]">Codes</span>
              </h1>
              <div className="text-yellow-400 text-sm mt-2 font-medium tracking-wider">
                THE ULTIMATE ANIME GAMING CODES HUB
              </div>
            </div>

            {/* 搜索框组件 */}
            <SearchBar />
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-8">
        {/* 特色内容和最新更新 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-12">
          {/* 特色内容 */}
          <Link
            href={`/${latestGames[0].category}/${latestGames[0].slug}`}
            className="group block relative rounded-xl overflow-hidden h-full"
          >
            <div className="relative aspect-[16/9] h-full">
              <Image
                src={latestGames[0].thumbnail}
                alt={latestGames[0].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent`} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#e91c24] text-sm font-medium text-white">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium text-white">
                    {latestGames[0].activeCodesCount} Active Codes
                  </span>
                  <span className="text-sm text-white/80">
                    Updated {new Date(latestGames[0].lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-[#e91c24] transition-colors">
                  {latestGames[0].title}
                </h2>
                <p className="text-lg text-white/90 mb-4">
                  {latestGames[0].description}
                </p>
                <div className="inline-flex items-center gap-2 text-white group-hover:text-[#e91c24] transition-colors">
                  View Details
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* 最新更新 */}
          <div className="bg-[#1a1c21] rounded-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-[#2a3438] to-[#1a1c21] border-b border-gray-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[#e91c24]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Latest Updates
              </h2>
            </div>

            <div className="divide-y divide-gray-800">
              {latestUpdates.slice(0, 4).map((update) => (
                <Link
                  key={update.id}
                  href={`/games/${update.gameSlug}`}
                  className="block p-4 hover:bg-[#2a3438] transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {'code' in update ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/5 text-green-400 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-400 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-200 font-medium truncate group-hover:text-white">
                          {update.game}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          'code' in update 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {'code' in update ? 'New Code' : update.type}
                        </span>
                      </div>
                      {'code' in update ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <code className="px-2 py-0.5 rounded bg-[#2a3438] text-sm font-mono text-gray-300">
                              {update.code}
                            </code>
                            <span className="text-sm text-gray-400">{update.reward}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Added {new Date(update.addedDate).toLocaleDateString()}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-gray-300 mb-1">{update.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(update.date).toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 游戏列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {latestGames.slice(1).map((game) => (
            <Link
              key={game.slug}
              href={`/${game.category}/${game.slug}`}
              className="group relative rounded-lg overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.bgClass} opacity-60`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-full bg-white/20 text-xs font-medium text-white">
                      {game.activeCodesCount} Active Codes
                    </span>
                    <span className="text-xs text-white/80">
                      Updated {new Date(game.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-sm text-white/90">{game.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* About Us 部分 */}
        <div className="bg-[#1a1c21] rounded-xl overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 py-16">
            {/* 标题 */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                About AnimeCodes
              </h2>
              <div className="w-20 h-1 bg-[#e91c24] mx-auto"></div>
            </div>

            {/* 内容网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 左侧：关于我们 */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">
                  Your Ultimate Gaming Companion
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  AnimeCodes is your trusted destination for the latest game codes, guides, and updates for popular anime-themed games. We're dedicated to helping gamers unlock exclusive rewards and enhance their gaming experience.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Our team works tirelessly to verify and update codes, ensuring you always have access to working rewards. Whether you're a casual player or hardcore gamer, we've got you covered.
                </p>
              </div>

              {/* 右侧：特点列表 */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#e91c24]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#e91c24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Verified Codes</h4>
                    <p className="text-gray-400">All codes are thoroughly tested and verified before being published</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#e91c24]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#e91c24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Real-time Updates</h4>
                    <p className="text-gray-400">Stay informed with the latest codes and game updates as they happen</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#e91c24]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#e91c24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Comprehensive Guides</h4>
                    <p className="text-gray-400">Detailed guides and tips to help you make the most of your gaming experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
