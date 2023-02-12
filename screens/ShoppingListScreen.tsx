import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ShoppingItemCard from "../components/shoppingListComponents/ShoppingItemCard";
import NewShoppingItemButton from "../components/shoppingListComponents/NewShoppingItemButton";
import CatalogModal from "../components/shoppingListComponents/CatalogModal";

import { ShoppingItem } from "../scripts/shopping";

import { colors } from "../constants/colors";
import NewCatalogItemModal from "../components/shoppingListComponents/NewCatalogItemModal";

export default function ShoppingListScreen() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [showCatalog, setShowCatalog] = useState(false);
  const [showNewCatalogItemModalVisible, setShowNewCatalogItemModalVisible] =
    useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadItems();
    setRefreshing(false);
  }, []);

  function loadItems() {
    AsyncStorage.getItem("shoppingListItems").then((items) => {
      if (items) {
        setItems(JSON.parse(items));
      }
    });
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      {showNewCatalogItemModalVisible ? (
        <NewCatalogItemModal
          closeModal={setShowNewCatalogItemModalVisible}
          loadItems={loadItems}
        />
      ) : (
        <>
          {showCatalog ? (
            <CatalogModal
              selectedItems={items}
              updateItems={loadItems}
              closeModal={setShowCatalog}
              showNewCatalogItemModal={setShowNewCatalogItemModalVisible}
            />
          ) : (
            <>
              <FlatList
                data={items}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => <ShoppingItemCard item={item} />}
                keyExtractor={(item) => item.id}
                style={styles.list}
              />
              <NewShoppingItemButton showCatalog={setShowCatalog} />
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
