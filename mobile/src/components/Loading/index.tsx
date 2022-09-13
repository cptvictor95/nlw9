import { ActivityIndicator, View } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

export function Loading() {
  return (
    <View>
      <ActivityIndicator
        color={THEME.COLORS.PRIMARY}
        style={styles.container}
      />
    </View>
  );
}
