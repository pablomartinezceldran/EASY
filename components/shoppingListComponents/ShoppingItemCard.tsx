import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

import { ShoppingItem } from "../../scripts/shopping";

import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShoppingItemCard({ item }: { item: ShoppingItem }) {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  function deleteItem() {
    AsyncStorage.getItem("shoppingListItems").then((items) => {
      if (items) {
        const itemsArray = JSON.parse(items);
        const index = itemsArray.findIndex((i: ShoppingItem) => i.id === item.id);
        itemsArray.splice(index, 1);
        AsyncStorage.setItem("shoppingListItems", JSON.stringify(itemsArray));
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <TouchableOpacity onPress={deleteItem}>
          <Text>Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.item.name}</Text>
        <Text style={styles.description}>{item.item.description}</Text>
        {item.item.price ? (
          <Text style={styles.price}>{item.item.price} €</Text>
        ) : (
          <Text style={styles.price}>?? €</Text>
        )}
      </View>
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setQuantity(quantity - 1)}
          disabled={quantity <= 0}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.selectorText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderColor: colors.white,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderRadius: 8,
  },
  photo: {
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.main,
    borderWidth: 2,
  },
  info: {
    flex: 6,
    padding: 8,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: colors.white,
    fontSize: 12,
  },
  price: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  quantitySelector: {
    flex: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  selectorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.main,
  },
  selectorText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
  },
});
