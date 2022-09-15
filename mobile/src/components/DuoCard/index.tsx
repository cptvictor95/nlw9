import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";
import { DuoInfo } from "../DuoInfo";

import { THEME } from "../../theme";
import { styles } from "./styles";

interface DuoCardProps {
  data: {
    id: string;
    name: string;
    weekDays: string[];
    yearsPlaying: number;
    hourStart: string;
    hourEnd: string;
    useVoiceChannel: boolean;
  };
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container} key={data.id}>
      <DuoInfo label="Name" value={data.name} />

      <DuoInfo label="Tempo de Jogo" value={`${data.yearsPlaying} anos`} />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
