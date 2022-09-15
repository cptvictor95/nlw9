import React from "react";

interface GameCardProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  bannerUrl,
  title,
  adsCount,
}) => {
  return (
    <a href="" className="relative rounded-8 overflow-hidden">
      <img src={bannerUrl} alt={title} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white">{title}</strong>
        <span className="text-sm text-zinc-300 block">
          {adsCount === 0
            ? "Nenhum"
            : adsCount > 1
            ? `${adsCount} anúncios`
            : `${adsCount} anúncio`}
        </span>
      </div>
    </a>
  );
};
