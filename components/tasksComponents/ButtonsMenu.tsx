import { StyleSheet, View } from "react-native";

import OrderButton from "./OrderButton";
import NewTaskButton from "./NewTaskButton";

export default function ButtonsMenu({
  orderTasks,
  order,
  showNewTaskForm,
}: {
  orderTasks: Function;
  order: string;
  showNewTaskForm: Function;
}) {
  return (
    <View style={styles.buttonsMenu}>
      <OrderButton orderTasks={orderTasks} order={order} />
      <NewTaskButton showNewTaskForm={showNewTaskForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsMenu: {
    position: "absolute",
    bottom: 16,
    right: 16,
    alignItems: "center",
  },
});
