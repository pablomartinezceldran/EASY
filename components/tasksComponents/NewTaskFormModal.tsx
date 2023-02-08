import { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { createNewTask } from "../../scripts/tasks";

import { colors } from "../../constants/colors";
import RelevanceSelectorButton from "./RelevanceSelectorButton";

export default function NewTaskFormModal({
  updateTasks,
  closeModal,
}: {
  updateTasks: () => void;
  closeModal: Function;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [relevance, setRelevance] = useState(1);
  const [dueDate, setDueDate] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);

  function checkFields() {
    if (title == "") {
      Alert.alert("Title is required", "Please enter a title for the task");
      return false;
    }
    return true;
  }

  function newTask() {
    if (checkFields()) {
      const newTask = createNewTask(
        title,
        description,
        dueDate,
        showTimePicker,
        relevance
      );
      AsyncStorage.getItem("tasks").then((tasks) => {
        if (!tasks) {
          AsyncStorage.setItem("tasks", JSON.stringify([newTask]));
          updateTasks();
          closeModal(false);
        } else {
          const tasksArray = JSON.parse(tasks);
          tasksArray.push(newTask);
          AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
          updateTasks();
          closeModal(false);
        }
      });
    }
  }

  function cancel() {
    if (title != "" || description != "") {
      Alert.alert(
        "Are you sure you want to cancel?",
        "All data will be lost",
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

  return (
    <Modal animationType='fade' transparent={true} visible={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.fields}>
            <View style={styles.section}>
              <Text style={styles.header}>Title:</Text>
              <TextInput
                autoFocus={true}
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.titleInput}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Description:</Text>
              <TextInput
                placeholder='Description (optional)'
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.descriptionInput}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Due date:</Text>
              <View style={styles.datePicker}>
                <RNDateTimePicker
                  value={dueDate}
                  mode='date'
                  is24Hour={true}
                  display='default'
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dueDate;
                    setDueDate(currentDate);
                  }}
                />
                <View style={styles.time}>
                  <Switch
                    value={showTimePicker}
                    onValueChange={() => setShowTimePicker(!showTimePicker)}
                  />
                  <RNDateTimePicker
                    disabled={!showTimePicker}
                    value={dueDate}
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
            <TouchableOpacity style={styles.button} onPress={() => newTask()}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => cancel()}>
              <Text style={styles.buttonText}>Cancel</Text>
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
  time: {
    flexDirection: "row",
    alignItems: "center",
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
    width: "45%",
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
