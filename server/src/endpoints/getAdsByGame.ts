import { Request, Response } from "express";
import connection from "../connection";
import { convertMinutesToHourString } from "../utils/convertMinutesToHourString";

export const getAdsByGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.id as string;

    const ads = await connection.ad.findMany({
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
  } catch (error: any) {
    return res.status(error.code).send({ error: error.message });
  }
};
