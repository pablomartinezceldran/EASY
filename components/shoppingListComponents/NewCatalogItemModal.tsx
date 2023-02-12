import { useState } from "react";
import {
  Modal,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNewCatalogItem } from "../../scripts/shopping";

import { colors } from "../../constants/colors";

export default function NewCatalogItemModal({
  closeModal,
  loadItems,
}: {
  closeModal: Function;
  loadItems: Function;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  function newShoppingItem() {
    if (name == "") {
      Alert.alert("Name is required", "Please enter a name for the item");
      return;
    }
    const newCatalogItem = createNewCatalogItem(name, description, price, photo);

    AsyncStorage.getItem("catalogItems").then((items) => {
      if (!items) {
        AsyncStorage.setItem("catalogItems", JSON.stringify([newCatalogItem])).then(
          () => {
            loadItems();
            closeModal(false);
          }
        );
      } else {
        const itemsArray = JSON.parse(items);
        itemsArray.push(newCatalogItem);
        AsyncStorage.setItem("catalogItems", JSON.stringify(itemsArray)).then(() => {
          loadItems();
          closeModal(false);
        });
      }
    });
  }

  function cancel() {
    if (name != "" || description != "") {
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
              setName("");
              setDescription("");
              setPrice("");
              setPhoto("");
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

  function stringToNumber(text: string) {
    if (text == "") {
      return 0;
    } else {
      return parseFloat(text);
    }
  }

  return (
    <Modal animationType='fade' transparent={true} visible={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.fields}>
            <View style={styles.section}>
              <Text style={styles.header}>Name:</Text>
              <TextInput
                autoFocus={true}
                placeholder='Title'
                value={name}
                onChangeText={(text) => setName(text)}
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
              <Text style={styles.header}>Price:</Text>
              <TextInput
                placeholder='Price (optional)'
                keyboardType='numeric'
                value={price ? price.toString() : ""}
                onChangeText={(text) => setPrice(text)}
                style={styles.descriptionInput}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Photo:</Text>
              <TextInput
                placeholder='Photo (optional)'
                value={photo}
                onChangeText={(text) => setPhoto(text)}
                style={styles.descriptionInput}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => cancel()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => newShoppingItem()}>
              <Text style={styles.buttonText}>Create</Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 64,
  },
  form: {
    backgroundColor: colors.gray,
    width: "95%",
    height: "75%",
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
    height: 40,
    borderRadius: 8,
    padding: 8,
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
