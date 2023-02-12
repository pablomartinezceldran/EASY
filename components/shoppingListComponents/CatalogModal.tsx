import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

import CatalogListItem from "./CatalogListItem";

import { CatalogItem, ShoppingItem, createNewShoppingItem } from "../../scripts/shopping";

import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CatalogModal({
  selectedItems,
  updateItems,
  closeModal,
  showNewCatalogItemModal,
}: {
  selectedItems: ShoppingItem[];
  updateItems: Function;
  closeModal: Function;
  showNewCatalogItemModal: Function;
}) {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [temporaryCatalogItems, setTemporaryCatalogItems] = useState<CatalogItem[]>([]);

  function addTemporaryCatalogItemsToShoppingList() {
    let temporaryCatalogItemsToShoppingItems: ShoppingItem[] = [];
    temporaryCatalogItems.forEach((item) => {
      temporaryCatalogItemsToShoppingItems.push(createNewShoppingItem(item, 1));
    });

    AsyncStorage.getItem("shoppingListItems").then((items) => {
      if (!items) {
        AsyncStorage.setItem(
          "shoppingListItems",
          JSON.stringify(temporaryCatalogItemsToShoppingItems)
        ).then(() => {
          updateItems();
          closeModal(false);
        });
      } else {
        const itemsArray = JSON.parse(items);
        //if temporaryItems already exist in shoppingListItems, add quantity to existing item
        itemsArray.push(...temporaryCatalogItemsToShoppingItems);
        AsyncStorage.setItem("shoppingListItems", JSON.stringify(itemsArray)).then(() => {
          updateItems();
          closeModal(false);
        });
      }
    });
  }

  function addToTemporaryCatalogItem(item: CatalogItem) {
    setTemporaryCatalogItems([...temporaryCatalogItems, item]);
  }

  function removeFromTemporaryCatalogItem(item: CatalogItem) {
    let newTemporaryCatalogItems = temporaryCatalogItems.filter(
      (temporaryCatalogItem) => temporaryCatalogItem.id != item.id
    );
    setTemporaryCatalogItems(newTemporaryCatalogItems);
  }

  useEffect(() => {
    AsyncStorage.getItem("catalogItems").then((items) => {
      if (items) {
        const itemsArray = JSON.parse(items);
        setCatalogItems(itemsArray);
      }
    });
  }, []);

  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Catalog</Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => showNewCatalogItemModal(true)}
            >
              <Icon name='plus' size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={catalogItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CatalogListItem
                item={item}
                selectedItems={selectedItems}
                addToTemporaryCatalogItem={addToTemporaryCatalogItem}
                removeFromTemporaryCatalogItem={removeFromTemporaryCatalogItem}
              />
            )}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => closeModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addTemporaryCatalogItemsToShoppingList();
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 64,
  },
  content: {
    backgroundColor: colors.gray,
    width: "95%",
    height: "60%",
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
  },
  headerButton: {
    backgroundColor: colors.main,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: colors.main,
    width: "45%",
    height: 32,
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
