import { Request, Response } from "express";
import connection from "../connection";

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await connection.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return res.status(200).json(games);
  } catch (error: any) {
    return res.status(error.code).send({ error: error.message });
  }
};
