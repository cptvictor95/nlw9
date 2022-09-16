import React, { useState } from "react";

import {
  Modal,
  ModalProps,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";
import * as Clipboard from "expo-clipboard";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUserDiscord = async () => {
    setCopied(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert("Discord copiado!", "Bom jogo!");
    setCopied(false);
  };

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyUserDiscord}
            disabled={copied}
          >
            <Text style={styles.discord}>
              {copied ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
