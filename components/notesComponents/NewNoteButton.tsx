import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNewNote } from "../../scripts/notes";

import { colors } from "../../constants/colors";

export default function NewNoteButton({ updateNotes }: { updateNotes: Function }) {
  function newNote() {
    const newNote = createNewNote("", "", randomColor());
    AsyncStorage.getItem("notes").then((notes) => {
      if (!notes) {
        console.log("no hay notas");
        AsyncStorage.setItem("notes", JSON.stringify([newNote]));
        updateNotes();
      } else {
        const notesArray = JSON.parse(notes);
        notesArray.push(newNote);
        AsyncStorage.setItem("notes", JSON.stringify(notesArray));
        updateNotes();
      }
    });
  }

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <TouchableOpacity style={styles.newNoteButton} onPress={() => newNote()}>
      <Icon name='plus' size='32' color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newNoteButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});
