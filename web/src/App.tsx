import React, { useEffect, useState } from "react";
import "./styles/main.css";
import logoImg from "/logo.png";
import { GameCard } from "./components/GameCard";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  const handleGetGames = async () => {
    try {
      const games = await fetch("http://localhost:3001/games/")
        .then((res) => res.json())
        .then((data) => data as Game[]);

      setGames(games);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo-image" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-trasparent bg-nlw-gradient bg-clip-text">
          {" "}
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length > 0 ? (
          games.map((game) => {
            return (
              <GameCard
                key={game.id}
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
              />
            );
          })
        ) : (
          <p>Não existem games</p>
        )}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
};

export default App;
