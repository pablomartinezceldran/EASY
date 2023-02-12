import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewShoppingItemButton({
  showCatalog,
}: {
  showCatalog: Function;
}) {
  return (
    <TouchableOpacity
      style={styles.newShoppingItemButton}
      onPress={() => showCatalog(true)}
    >
      <Icon name='plus' size='32' color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newShoppingItemButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});
