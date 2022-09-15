import { Image, FlatList } from "react-native";

import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { GameCard } from "../../components/GameCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const nav = useNavigation();

  const handleGetGames = async () => {
    try {
      const games = await fetch("http://192.168.15.5:3001/games")
        .then((res) => res.json())
        .then((data) => data as Game[]);

      setGames(games);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToGame = ({ id, title, bannerUrl }: Game) => {
    nav.navigate("game", { id, title, bannerUrl });
  };

  useEffect(() => {
    handleGetGames();
  }, []);

  return (
    <Background>
      <SafeAreaView>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(game) => game.id}
          renderItem={({ item }) => (
            <GameCard
              data={{
                id: item.id,
                title: item.title,
                bannerUrl: item.bannerUrl,
                ads: item._count.ads,
              }}
              onPress={() => handleGoToGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
