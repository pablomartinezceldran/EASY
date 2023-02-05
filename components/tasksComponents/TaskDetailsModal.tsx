import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { Task } from "../../scripts/tasks";

import { colors } from "../../constants/colors";
import RelevanceSelectorButton from "./RelevanceSelectorButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskDetailsModal({
  task,
  closeModal,
  deleteTask,
}: {
  task: Task;
  closeModal: Function;
  deleteTask: (id: string | undefined) => void;
}) {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [relevance, setRelevance] = useState(task?.relevance);
  const [dueDate, setDueDate] = useState(task?.dueDate);

  function cancel() {
    if (
      title != task.title ||
      description != task.description ||
      relevance != task.relevance ||
      dueDate != task.dueDate
    ) {
      Alert.alert(
        "Are you sure you want to cancel?",
        "All changes will be lost",
        [
          {
            text: "Back",
            style: "cancel",
          },
          {
            text: "OK",
            style: "destructive",
            onPress: () => {
              setTitle("");
              setDescription("");
              setRelevance(1);
              setDueDate(new Date());
              closeModal(false);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      closeModal(false);
    }
  }

  function deleteTaskAlert() {
    Alert.alert(
      "Are you sure you want to delete this task?",
      "This action cannot be undone",
      [
        {
          text: "Back",
          style: "cancel",
        },
        {
          text: "OK",
          style: "destructive",
          onPress: () => {
            deleteTask(task.id);
          },
        },
      ],
      { cancelable: true }
    );
  }

  function updateTask() {
    if (task) {
      task.title = title ? title : "";
      task.description = description ? description : "";
      task.dueDate = dueDate ? dueDate : new Date();
      task.relevance = relevance ? relevance : 1;
      AsyncStorage.getItem("tasks").then((tasks) => {
        if (tasks) {
          const tasksArray = JSON.parse(tasks);
          const index = tasksArray.findIndex((t: { id: string }) => t.id == task.id);
          tasksArray[index] = task;
          AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
          closeModal(false);
        }
      });
    }
  }

  return (
    <Modal animationType='fade' transparent={true} visible={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.fields}>
            <View style={styles.section}>
              <Text style={styles.header}>Title:</Text>
              <TextInput
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.titleInput}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Description:</Text>
              <TextInput
                placeholder='Description'
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.descriptionInput}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Due date:</Text>
              <View style={styles.datePicker}>
                <RNDateTimePicker
                  value={new Date(dueDate)}
                  mode='date'
                  is24Hour={true}
                  display='default'
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dueDate;
                    setDueDate(currentDate);
                  }}
                />
                <RNDateTimePicker
                  value={new Date(dueDate)}
                  mode='time'
                  is24Hour={true}
                  display='default'
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dueDate;
                    setDueDate(currentDate);
                  }}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Relevance:</Text>
              <View style={styles.relevanceButtons}>
                <RelevanceSelectorButton
                  relevance={4}
                  setRelevance={setRelevance}
                  selected={relevance == 4}
                />
                <RelevanceSelectorButton
                  relevance={3}
                  setRelevance={setRelevance}
                  selected={relevance == 3}
                />
                <RelevanceSelectorButton
                  relevance={2}
                  setRelevance={setRelevance}
                  selected={relevance == 2}
                />
                <RelevanceSelectorButton
                  relevance={1}
                  setRelevance={setRelevance}
                  selected={relevance == 1}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => updateTask()}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => cancel()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.red }]}
              onPress={() => deleteTaskAlert()}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginBottom: 64,
  },
  form: {
    backgroundColor: colors.gray,
    width: "95%",
    height: "100%",
    borderRadius: 16,
    padding: 16,
  },
  fields: {
    flex: 1,
    justifyContent: "space-between",
  },
  section: {
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: colors.black,
    color: colors.white,
    width: "100%",
    height: 40,
    borderRadius: 8,
    padding: 8,
  },
  descriptionInput: {
    backgroundColor: colors.black,
    color: colors.white,
    width: "100%",
    height: 120,
    borderRadius: 8,
    padding: 8,
  },
  dateInput: {
    backgroundColor: colors.black,
    color: colors.white,
    width: "100%",
    height: 40,
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
  },
  dateText: {
    color: colors.white,
    fontSize: 16,
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  relevanceButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: colors.main,
    width: "30%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
