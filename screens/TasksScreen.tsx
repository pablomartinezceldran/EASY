import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../constants/colors";

import NewTaskButton from "../components/tasksComponents/NewTaskButton";
import TaskCard from "../components/tasksComponents/TaskCard";
import NewTaskFormModal from "../components/tasksComponents/NewTaskFormModal";
import TaskDetailsModal from "../components/tasksComponents/TaskDetailsModal";

import { Task } from "../scripts/tasks";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState<Task>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTasks();
    setRefreshing(false);
  }, []);

  function loadTasks() {
    AsyncStorage.getItem("tasks").then((tasks) => {
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    });
  }

  function deleteTask(id: string | undefined) {
    AsyncStorage.getItem("tasks").then((tasks) => {
      if (tasks) {
        const tasksArray = JSON.parse(tasks);
        const newTasksArray = tasksArray.filter((task: any) => task.id != id);
        AsyncStorage.setItem("tasks", JSON.stringify(newTasksArray));
        setTaskDetails(undefined);
        loadTasks();
      }
    });
  }

  function closeTaskDetailModal() {
    setTaskDetails(undefined);
  }

  const showTaskDetails = (task: Task) => {
    setTaskDetails(task);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      {showNewTaskForm ? (
        <NewTaskFormModal updateTasks={loadTasks} closeModal={setShowNewTaskForm} />
      ) : (
        <>
          {taskDetails ? (
            <TaskDetailsModal
              task={taskDetails}
              closeModal={closeTaskDetailModal}
              deleteTask={deleteTask}
            />
          ) : (
            <>
              <FlatList
                data={tasks}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => (
                  <TaskCard
                    task={item}
                    showTaskDetails={showTaskDetails}
                    deleteTask={deleteTask}
                  />
                )}
                keyExtractor={(item) => item.id}
                style={styles.list}
              />
              <NewTaskButton showNewTaskForm={setShowNewTaskForm} />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    padding: 8,
  },
});
