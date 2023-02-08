import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

import { colors } from "../../constants/colors";

export default function NewTaskButton({
  showNewTaskForm,
}: {
  showNewTaskForm: Function;
}) {
  return (
    <TouchableOpacity style={styles.newTaskButton} onPress={() => showNewTaskForm(true)}>
      <Icon name='plus' size='32' color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newTaskButton: {
    backgroundColor: colors.main,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
