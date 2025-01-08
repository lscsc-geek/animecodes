import { getDetailContent, getAllContent } from '@/lib/content';
import { notFound } from 'next/navigation';
import DetailPage from '@/components/content/DetailPage';
import { Metadata } from 'next';
import { ResolvingMetadata } from 'next';

// 定义参数类型
type Params = {
  params: {
    category: string;
    slug: string;
  };
};

// 添加静态参数生成
export async function generateStaticParams() {
  const games = await getAllContent('games');
  
  return games.map((game) => ({
    category: 'games',
    slug: game.slug,
  }));
}

// 生成元数据
export async function generateMetadata(
  props: Params,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, slug } = props.params;
  
  try {
    const content = await getDetailContent(category, slug);
    if (!content) return {};

    const url = `https://animecodes.com/${content.category}/${content.slug}`;

    return {
      title: content.seo?.title || content.title,
      description: content.seo?.description || content.description,
      keywords: content.seo?.keywords || content.keywords,
      openGraph: {
        title: content.seo?.ogTitle || content.seo?.title || content.title,
        description: content.seo?.ogDescription || content.seo?.description || content.description,
        type: 'article',
        url,
        images: content.thumbnail ? [`https://animecodes.com${content.thumbnail}`] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: content.seo?.ogTitle || content.seo?.title || content.title,
        description: content.seo?.ogDescription || content.seo?.description || content.description,
        images: content.thumbnail ? [`https://animecodes.com${content.thumbnail}`] : [],
      },
    };
  } catch (error) {
    return {};
  }
}

// 页面组件
export default async function Page(props: Params) {
  const { category, slug } = props.params;
  
  try {
    const content = await getDetailContent(category, slug);
    if (!content) {
      notFound();
    }

    return <DetailPage content={content} />;
  } catch (error) {
    console.error('Error loading content:', error);
    notFound();
  }
} 