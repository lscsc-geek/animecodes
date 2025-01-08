import Link from "next/link";
import Image from 'next/image';
import { HomeIcon } from "./icons/HomeIcon";
import { GamesIcon } from "./icons/GamesIcon";

const games = [
  {
    title: "Anime Adventures",
    slug: "anime-adventures-codes",
    icon: (
      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
        <Image
          src="/images/game_img/anime-adventures.webp"
          alt="Anime Adventures"
          fill
          className="object-cover"
        />
      </div>
    )
  },
  {
    title: "Dandy's World",
    slug: "dandys-world-codes",
    icon: (
      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
        <Image
          src="/images/game_img/dandys-world.webp"
          alt="Dandy's World"
          fill
          className="object-cover"
        />
      </div>
    )
  },
  {
    title: "Anime Vanguards",
    slug: "anime-vanguards-codes",
    icon: (
      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
        <Image
          src="/images/game_img/anime-vanguards.webp"
          alt="Anime Vanguards"
          fill
          className="object-cover"
        />
      </div>
    )
  },
  {
    title: "Jujutsu Infinite",
    slug: "jujutsu-infinite-codes",
    icon: (
      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
        <Image
          src="/images/game_img/jujutsu-infinite.webp"
          alt="Jujutsu Infinite"
          fill
          className="object-cover"
        />
      </div>
    )
  },
  {
    title: "Anime Royale",
    slug: "anime-royale-codes",
    icon: (
      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
        <Image
          src="/images/game_img/anime-royale.webp"
          alt="Anime Royale"
          fill
          className="object-cover"
        />
      </div>
    )
  }
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-[60px] bg-[#1a1c21] border-r border-gray-800 flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <div className="w-8 h-8 bg-[#e91c24] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg"><HomeIcon className="w-5 h-5" /></span>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4 mb-8">
        {/* Search */}
        <Link
          href="/search"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3438] transition-colors group relative"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#2a3438] text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            Search
          </div>
        </Link>
        {/* Games List */}
        <Link
          href="/games"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3438] transition-colors group relative"
        >
          <GamesIcon className="w-8 h-8" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#2a3438] text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            All Games
          </div>
        </Link>

        
      </div>

      {/* Games */}
      <div className="flex-1 w-full flex flex-col items-center space-y-4">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a3438] transition-colors group relative"
          >
            {game.icon}
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#2a3438] text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
              {game.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 