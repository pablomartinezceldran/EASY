import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { colors } from "../../constants/colors";

import { Task, calculateDaysLeft, dateToString, timeToString } from "../../scripts/tasks";

export default function TaskCard({
  task,
  showTaskDetails,
  deleteTask,
}: {
  task: Task;
  showTaskDetails: (task: Task) => void;
  deleteTask: (id: string) => void;
}) {
  function calculateRelevanceColor(relevance: number) {
    if (relevance == 4) return colors.red;
    if (relevance == 3) return colors.yellow;
    if (relevance == 2) return colors.green;
    if (relevance == 1) return colors.blue;
    return "gray";
  }

  function showDeleteOption() {
    Alert.alert(
      "Are you sure you want to delete this task?",
      "This action cannot be undone",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTask(task.id);
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => showTaskDetails(task)}
      onLongPress={() => showDeleteOption()}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <View
          style={[
            styles.relevance,
            { backgroundColor: calculateRelevanceColor(task.relevance) },
          ]}
        ></View>
      </View>
      <View style={styles.body}>
        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : (
          <Text style={styles.noDescription}>No description...</Text>
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.daysLeft}>
          {calculateDaysLeft(new Date(task.dueDate))} days left
        </Text>
        <Text style={styles.dueDate}>{dateToString(new Date(task.dueDate))}</Text>
        {task.timeRelevant && (
          <Text style={styles.timeRelevant}>{timeToString(new Date(task.dueDate))}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    width: "100%",
    height: 128,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  relevance: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 4,
    borderColor: colors.white,
    borderWidth: 2,
  },
  body: {
    flex: 1,
  },
  description: {
    color: colors.white,
    fontSize: 16,
  },
  noDescription: {
    color: "gray",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  daysLeft: {
    color: "lightgray",
    fontSize: 8,
    marginRight: 4,
  },
  dueDate: {
    color: colors.white,
    fontSize: 16,
  },
  timeRelevant: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 4,
  },
});
