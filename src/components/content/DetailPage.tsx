import { ContentData } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from './ShareButtons';

interface DetailPageProps {
  content: ContentData;
}

export default function DetailPage({ content }: DetailPageProps) {
  return (
    <div className="min-h-screen bg-[#0f1115]">
      {/* 面包屑导航 */}
      <div className="bg-[#1a1c21] border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <span className="text-gray-600">/</span>
            <Link href={`/${content.category}`} className="text-gray-400 hover:text-white capitalize">{content.category}</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">{content.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 标题区域 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧缩略图 */}
            {content.thumbnail && (
              <div className="w-full md:w-48 shrink-0">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={content.thumbnail}
                    alt={content.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
            
            {/* 右侧标题和描述 */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{content.title}</h1>
              <p className="text-lg text-gray-300 mb-3">{content.description}</p>
              {content.date && (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Last updated: {new Date(content.date).toLocaleDateString()}</span>
                </div>
              )}
              
              {/* 标签区域 */}
              {content.tags && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {content.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium rounded-full 
                        bg-white/10 text-gray-300 hover:bg-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* 左侧内容 */}
          <main>
            <div className="bg-[#1a1c21] rounded-lg shadow-lg overflow-hidden">
              <article 
                className="prose prose-lg prose-invert max-w-none p-8
                  prose-headings:border-b prose-headings:border-gray-800 prose-headings:pb-4 prose-headings:mb-6
                  prose-h1:text-3xl prose-h1:font-bold
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8
                  prose-h3:text-xl prose-h3:font-semibold
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-gray-300
                  prose-li:marker:text-gray-500
                  prose-table:w-full
                  prose-table:my-6
                  prose-table:border-collapse
                  prose-thead:bg-[#1e2329]
                  prose-th:p-4 prose-th:text-left prose-th:font-medium prose-th:text-gray-300
                  prose-td:p-4 prose-td:text-gray-300 prose-td:border-b prose-td:border-gray-800"
                dangerouslySetInnerHTML={{ __html: content.content }} 
              />
            </div>
          </main>

          {/* 右侧边栏 */}
          <aside className="space-y-6">
            {/* 热门文章 */}
            {content.trending && content.trending.length > 0 && (
              <div className="bg-[#1a1c21] rounded-lg shadow-lg overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-[#3b82f6] to-[#1a1c21] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-white/10 rotate-45"></div>
                  </div>
                  <h2 className="text-xl font-bold text-white relative z-10">
                    Trending Stories in
                  </h2>
                  <p className="text-sm text-blue-200 relative z-10 mt-1">#{content.category?.toUpperCase()}</p>
                </div>
                <div className="divide-y divide-gray-800">
                  {content.trending.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${content.category}/${item.slug}`}
                      className="block p-5 hover:bg-[#2a3438] transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-10 h-10 bg-blue-500/10 text-blue-400 rounded flex items-center justify-center text-sm font-medium">
                          {item.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-200 font-medium text-base mb-2 truncate group-hover:text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            By {item.author}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 分享按钮 */}
            <ShareButtons />
          </aside>
        </div>
      </div>
    </div>
  );
} 