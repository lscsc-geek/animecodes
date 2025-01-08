import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1a1c21] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Logo */}
          <div className="text-xl font-bold">
            Anime<span className="text-[#e91c24]">Codes</span>
          </div>
          
          {/* 基础链接 */}
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
          
          {/* 版权信息 */}
          <div className="text-sm">
            &copy; {currentYear} AnimeCodes. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 