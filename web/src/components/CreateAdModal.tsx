import React, { FormEvent, useState } from "react";
import { Input } from "./Form/Input";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { GameController } from "phosphor-react";
import { Game } from "../App";
import axios from "axios";

export interface Ad {
  name: string;
  weekDays: string[];
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  discord: string;
  game: string;
}

export const CreateAdModal: React.FC<{ games: Game[] }> = ({ games }) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const ad = {
      ...data,
      weekDays,
      useVoiceChannel,
    } as Ad;

    if (
      !ad.name ||
      !ad.yearsPlaying ||
      !ad.hourStart ||
      !ad.hourEnd ||
      !ad.discord
    )
      setError(true);

    await handleSendAd(ad);
  };

  const handleSendAd = async (ad: Ad) => {
    try {
      const formattedWeekDays = ad.weekDays.map(Number);
      const newAd = {
        name: ad.name,
        yearsPlaying: Number(ad.yearsPlaying),
        discord: ad.discord,
        weekDays: formattedWeekDays,
        hourStart: ad.hourStart,
        hourEnd: ad.hourEnd,
        useVoiceChannel: ad.useVoiceChannel,
      };

      const res = await axios.post(
        `http://localhost:3001/games/${ad.game}/ads`,
        {
          ad: newAd,
        }
      );

      if (res.status === 201) setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[540px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-8 w-full "
        >
          <section className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <select
              id="game"
              name="game"
              placeholder="Selecione o game que deseja jogar"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue=""
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </section>

          <section className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                step="1"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </section>

          <section className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                className="grid grid-cols-4 gap-2"
                type="multiple"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-12 h-12 rounded-sm ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hours">Qual horário do dia?</label>

              <div className="flex gap-2 justify-between">
                <Input
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </section>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <input
              id="useVoiceChannel"
              name="useVoiceChannel"
              type="checkbox"
              checked={useVoiceChannel}
              onChange={(e) => setUseVoiceChannel(e.target.checked)}
            />
            <label>Usa chat de voz?</label>
          </div>

          <section>
            <p className="text-red-500">
              {error ? "Você deve preencher todos os campos" : <></>}
            </p>
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
  );
};
