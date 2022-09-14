import connection from "../connection";

export const queryDiscordByAdId = async (adId: string) => {
  const ad = await connection.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return ad;
};
