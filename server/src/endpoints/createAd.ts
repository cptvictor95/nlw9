import { Request, Response } from "express";
import connection from "../connection";
import { insertAd } from "../queries/insertAd";
import { convertHourStringToMinutes } from "../utils/convertHourStringToMinutes";

export const createAd = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string;
    const newAd = req.body.ad;

    const createdAd = await insertAd(gameId, newAd);

    return res.status(201).json(createdAd);
  } catch (error: any) {
    return res.status(error.code).json({ error: error.message });
  }
};
