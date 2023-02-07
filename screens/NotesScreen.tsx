import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../constants/colors";

import NoteCard from "../components/notesComponents/NoteCard";

import { Note } from "../scripts/notes";
import NewNoteButton from "../components/notesComponents/NewNoteButton";

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotes();
    setRefreshing(false);
  }, []);

  function loadNotes() {
    AsyncStorage.getItem("notes").then((notes) => {
      if (notes) {
        setNotes(JSON.parse(notes));
      }
    });
  }

  function deleteNote(id: string | undefined) {
    AsyncStorage.getItem("notes").then((notes) => {
      if (notes) {
        const notesArray = JSON.parse(notes);
        const newNotesArray = notesArray.filter((note: any) => note.id != id);
        AsyncStorage.setItem("notes", JSON.stringify(newNotesArray));
        loadNotes();
      }
    });
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <FlatList
        data={notes}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <NoteCard note={item} deleteNote={deleteNote} updateNotes={loadNotes} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <NewNoteButton updateNotes={loadNotes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },
  list: {
    width: "100%",
    padding: 8,
  },
});
