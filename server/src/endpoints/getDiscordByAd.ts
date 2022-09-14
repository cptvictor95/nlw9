import { Request, Response } from "express";
import connection from "../connection";

export const getDiscordByAd = async (req: Request, res: Response) => {
  try {
    const adId = req.params.id as string;

    const ad = await connection.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    return res.status(200).json({ discord: ad.discord });
  } catch (error: any) {
    return res.status(error.code).json({ error: error.message });
  }
};
