import connection from "../connection";

export const queryGames = async () => {
  const games = await connection.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return games;
};
