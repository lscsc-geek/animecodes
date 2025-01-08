import { ContentData } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';

interface ListPageProps {
  content: ContentData;
}

export default function ListPage({ content }: ListPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-gray-600">{content.description}</p>
      </header>

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }} 
      />
    </div>
  );
} 