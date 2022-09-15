import React, { useEffect, useState } from "react";
import "./styles/main.css";
import logoImg from "/logo.png";
import { GameCard } from "./components/GameCard";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";

interface Game {
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

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/80 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[540px] shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <form className="flex flex-col gap-4 mt-8 w-full ">
              <section className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>

                <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                />
              </section>

              <section className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </section>

              <section className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    type="number"
                    step="1"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </section>

              <section className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      title="Domingo"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      D
                    </button>
                    <button
                      title="Segunda"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      S
                    </button>
                    <button
                      title="Terça"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      T
                    </button>
                    <button
                      title="Quarta"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      Q
                    </button>
                    <button
                      title="Quinta"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      Q
                    </button>
                    <button
                      title="Sexta"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      S
                    </button>
                    <button
                      title="Sábado"
                      className="w-12 h-12 rounded-sm bg-zinc-900"
                    >
                      S
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hours">Qual horário do dia?</label>

                  <div className="flex gap-2 justify-between">
                    <Input type="time" id="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </section>

              <section>
                <Input type="checkbox" id="useVoiceChannel" placeholder="" />
                <label htmlFor="useVoiceChannel">Usa chat de voz?</label>
              </section>

              <section className="flex justify-end mt-4 gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </section>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default App;
