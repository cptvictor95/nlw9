import { Router } from "express";
import { getGames } from "../endpoints/getGames";
import { getAdsByGame } from "../endpoints/getAdsByGame";
import { getDiscordByAd } from "../endpoints/getDiscordByAd";
import { createAd } from "../endpoints/createAd";

const routes = Router();

routes.get("/games", getGames);

routes.get("/games/:id/ads", getAdsByGame);

routes.get("/ads/:id/discord", getDiscordByAd);

routes.post("/games/:gameId/ads", createAd);

export default routes;
