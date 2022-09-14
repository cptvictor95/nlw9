import { Request, Response } from "express";
import connection from "../connection";
import { convertHourStringToMinutes } from "../utils/convertHourStringToMinutes";

export const createAd = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string;
    const newAd = req.body.ad;

    await connection.ad.create({
      data: {
        ...newAd,
        gameId,
        weekDays: newAd.weekDays.join(","),
        hourStart: convertHourStringToMinutes(newAd.hourStart),
        hourEnd: convertHourStringToMinutes(newAd.hourEnd),
      },
    });

    return res.status(201).json(newAd);
  } catch (error: any) {
    return res.status(error.code).json({ error: error.message });
  }
};
