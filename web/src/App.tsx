import React from "react";
import "./styles/main.css";
import logoImg from "/logo.png";
import { MagnifyingGlassPlus } from "phosphor-react";

const App: React.FC = () => {
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
        <a href="" className="relative rounded-8 overflow-hidden">
          <img src="/game1.png" alt="" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">League of legends</strong>
            <span className="text-sm text-zinc-300 block">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-8 overflow-hidden ">
          <img src="/game2.png" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Dota 2</strong>
            <span className="text-sm text-zinc-300 block">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-8 overflow-hidden">
          <img src="/game3.png" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Counter-Strike</strong>
            <span className="text-sm text-zinc-300 block">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-8 overflow-hidden">
          <img src="/game4.png" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Apex Legends</strong>
            <span className="text-sm text-zinc-300 block">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-8 overflow-hidden">
          <img src="/game5.png" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Fortnite</strong>
            <span className="text-sm text-zinc-300 block">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-8 overflow-hidden">
          <img src="/game6.png" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">World of Warcraft</strong>
            <span className="text-sm text-zinc-300 block">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400">Publique um anúncio</span>
          </div>
          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex gap-3 items-center">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
