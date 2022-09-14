import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "../utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "../utils/convertMinutesToHourString";

const prisma = new PrismaClient({
  log: ["query"],
});

const routes = Router();

routes.get("/games", async (req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.status(200).json(games);
});

routes.get("/games/:id/ads", async (req: Request, res: Response) => {
  const gameId = req.params.id as string;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

routes.get("/ads/:id/discord", async (req: Request, res: Response) => {
  const adId = req.params.id as string;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.status(200).json({ discord: ad.discord });
});

routes.post("/games/:gameId/ads", async (req: Request, res: Response) => {
  const gameId = req.params.gameId as string;
  const newAd = req.body.ad;

  await prisma.ad.create({
    data: {
      ...newAd,
      gameId,
      weekDays: newAd.weekDays.join(","),
      hourStart: convertHourStringToMinutes(newAd.hourStart),
      hourEnd: convertHourStringToMinutes(newAd.hourEnd),
    },
  });

  return res.status(201).json(newAd);
});

export default routes;
