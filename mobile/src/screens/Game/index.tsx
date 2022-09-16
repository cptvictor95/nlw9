import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

interface Ad {
  id: string;
  name: string;
  weekDays: string[];
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

export function Game() {
  const route = useRoute();
  const nav = useNavigation();
  const game = route.params as GameParams;
  const [ads, setAds] = useState<Ad[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const handleGetGames = async () => {
    try {
      const ads = await fetch(`http://192.168.15.5:3001/games/${game.id}/ads`)
        .then((res) => res.json())
        .then((data) => data as Ad[]);

      setAds(ads);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    nav.goBack();
  };

  const handleShowMatch = async (adId: string) => {
    const res = await fetch(`http://192.168.15.5:3001/ads/${adId}/discord`)
      .then((res) => res.json())
      .then((data) => data.discord);

    setDiscordDuoSelected(res.discord);
  };

  useEffect(() => {
    handleGetGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.spacer} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => handleShowMatch(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
        />

        <DuoMatch
          discord={discordDuoSelected}
          visible={discordDuoSelected.length > 0}
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
