import { Request, Response } from "express";
import connection from "../connection";
import { queryDiscordByAdId } from "../queries/queryDiscordByAdId";

export const getDiscordByAd = async (req: Request, res: Response) => {
  try {
    const adId = req.params.id as string;

    const discord = await queryDiscordByAdId(adId);

    return res.status(200).json({ discord });
  } catch (error: any) {
    return res.status(error.code).json({ error: error.message });
  }
};
