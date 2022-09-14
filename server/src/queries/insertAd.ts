import connection from "../connection";
import { convertHourStringToMinutes } from "../utils/convertHourStringToMinutes";

export const insertAd = async (gameId: string, ad: any) => {
  const newAd = {
    ...ad,
    gameId,
    weekDays: ad.weekDays.join(","),
    hourStart: convertHourStringToMinutes(ad.hourStart),
    hourEnd: convertHourStringToMinutes(ad.hourEnd),
  };
  await connection.ad.create({
    data: newAd,
  });

  return newAd;
};
