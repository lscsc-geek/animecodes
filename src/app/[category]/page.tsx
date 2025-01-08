import { getAllContent } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default async function CategoryListPage({
  params
}: {
  params: { category: string }
}) {
  const items = await getAllContent(params.category);

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <div className="container mx-auto px-4 py-8">
        {/* 分类标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white capitalize">{params.category}</h1>
          <p className="text-gray-400 mt-2">Browse all {params.category} content</p>
        </div>

        {/* 内容卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${params.category}/${item.slug}`}
              className="bg-[#1a1c21] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200"
            >
              {/* 缩略图 */}
              {item.thumbnail && (
                <div className="relative w-full aspect-video">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* 内容信息 */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>
                
                {/* 标签 */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-[#2a3438] text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* 更新日期 */}
                {item.date && (
                  <div className="text-gray-500 text-sm mt-4">
                    Updated: {new Date(item.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 