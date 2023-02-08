import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

import { colors } from "../../constants/colors";

export default function OrderButton({
  orderTasks,
  order,
}: {
  orderTasks: Function;
  order: string;
}) {
  return (
    <TouchableOpacity
      style={styles.orderButton}
      onPress={() => {
        orderTasks();
      }}
    >
      <Icon
        name={order == "date" ? "clock" : "exclamation-circle"}
        size='24'
        color={colors.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
});
