import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../constants/colors";

import TaskCard from "../components/tasksComponents/TaskCard";
import ButtonsMenu from "../components/tasksComponents/ButtonsMenu";
import NewTaskFormModal from "../components/tasksComponents/NewTaskFormModal";
import TaskDetailsModal from "../components/tasksComponents/TaskDetailsModal";

import { Task } from "../scripts/tasks";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState<Task>();

  const [order, setOrder] = useState("relevance");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    orderTasks();
    setRefreshing(false);
  }, []);

  function deleteTask(id: string | undefined) {
    AsyncStorage.getItem("tasks").then((tasks) => {
      if (tasks) {
        const tasksArray = JSON.parse(tasks);
        const newTasksArray = tasksArray.filter((task: any) => task.id != id);
        AsyncStorage.setItem("tasks", JSON.stringify(newTasksArray));
        setTaskDetails(undefined);
        orderTasks();
      }
    });
  }

  function closeTaskDetailModal() {
    setTaskDetails(undefined);
  }

  const showTaskDetails = (task: Task) => {
    setTaskDetails(task);
  };

  function orderTasks() {
    AsyncStorage.getItem("tasks").then((tasks) => {
      if (tasks) {
        const tasksArray = JSON.parse(tasks);
        switch (order) {
          case "relevance":
            tasksArray.sort((a: any, b: any) => {
              if (a.relevance > b.relevance) {
                return -1;
              }
              if (a.relevance < b.relevance) {
                return 1;
              }
              return 0;
            });
            break;
          case "date":
            tasksArray.sort((a: any, b: any) => {
              if (new Date(b.dueDate).getTime() > new Date(a.dueDate).getTime()) {
                return -1;
              }
              if (new Date(b.dueDate).getTime() < new Date(a.dueDate).getTime()) {
                return 1;
              }
              return 0;
            });
            break;
        }
        setTasks(tasksArray);
      }
    });
  }

  function changeOrder() {
    if (order == "relevance") {
      setOrder("date");
    } else {
      setOrder("relevance");
    }
  }

  useEffect(() => {
    orderTasks();
  }, [order]);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      {showNewTaskForm ? (
        <NewTaskFormModal updateTasks={orderTasks} closeModal={setShowNewTaskForm} />
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
              <ButtonsMenu
                orderTasks={changeOrder}
                order={order}
                showNewTaskForm={setShowNewTaskForm}
              />
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
