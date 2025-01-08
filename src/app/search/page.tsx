import { getAllContent } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q?.toLowerCase() || '';
  
  // 获取所有游戏内容
  const games = await getAllContent('games');
  
  // 搜索过滤
  const results = games.filter(game => {
    const searchContent = `${game.title} ${game.description} ${game.keywords}`.toLowerCase();
    return searchContent.includes(query);
  });

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <div className="container mx-auto px-4 py-8">
        {/* 搜索栏 */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {query ? (
          <>
            {/* 搜索结果 */}
            <h2 className="text-xl text-white mb-4">
              Search results for: <span className="font-bold">{query}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <Link
                  key={result.slug}
                  href={`/games/${result.slug}`}
                  className="bg-[#1a1c21] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200"
                >
                  {/* 缩略图 */}
                  {result.thumbnail && (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={result.thumbnail}
                        alt={result.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  {/* 内容信息 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {result.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center text-gray-400 py-12">
                No results found for "{query}"
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400 py-12">
            Enter a search term to find game codes and guides
          </div>
        )}
      </div>
    </div>
  );
} 