import { useState } from "react";
import { StyleSheet, Alert, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Note } from "../../scripts/notes";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "../../constants/colors";

export default function NoteCard({
  note,
  deleteNote,
  updateNotes,
}: {
  note: Note;
  deleteNote: (id: string | undefined) => void;
  updateNotes: () => void;
}) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [color, setColor] = useState(note.color);

  function updateNote() {
    AsyncStorage.getItem("notes").then((notes) => {
      if (notes) {
        const notesArray = JSON.parse(notes);
        const newNotesArray = notesArray.map((note: any) => {
          if (note.id == note.id) {
            return {
              ...note,
              title,
              body,
            };
          }
          return note;
        });
        AsyncStorage.setItem("notes", JSON.stringify(newNotesArray));
        updateNotes();
      }
    });
  }

  function deleteNoteAlert() {
    if (title == "" && body == "") return deleteNote(note.id);
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteNote(note.id);
        },
      },
    ]);
  }

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.header}>
        <View style={styles.title}>
          <TextInput
            style={styles.titleText}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            onEndEditing={() => {
              updateNote();
            }}
            placeholder='Title'
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              setColor(randomColor());
              updateNote();
            }}
            style={styles.button}
          >
            <Icon name='undo-alt' size={24} color={colors.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteNoteAlert();
            }}
            style={styles.button}
          >
            <Icon name='trash' size={24} color={colors.red} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.bodyText}
          value={body}
          multiline
          onChangeText={(text) => {
            setBody(text);
          }}
          onEndEditing={() => {
            updateNote();
          }}
          placeholder='Body'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 128,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    width: "100%",
    flex: 1,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginLeft: 8,
  },
  body: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  bodyText: {
    width: "100%",
    height: "100%",
    fontSize: 16,
  },
});
