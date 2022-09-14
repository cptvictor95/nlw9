import { Request, Response } from "express";
import { queryGames } from "../queries/queryGames";

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await queryGames();

    return res.status(200).json(games);
  } catch (error: any) {
    return res.status(error.code).send({ error: error.message });
  }
};
