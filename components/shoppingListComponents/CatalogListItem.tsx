import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";

import { CatalogItem, ShoppingItem } from "../../scripts/shopping";

import { colors } from "../../constants/colors";

export default function CatalogListItem({
  item,
  selectedItems,
  addToTemporaryCatalogItem,
  removeFromTemporaryCatalogItem,
}: {
  item: CatalogItem;
  selectedItems: ShoppingItem[];
  addToTemporaryCatalogItem: Function;
  removeFromTemporaryCatalogItem: Function;
}) {
  const [selected, setSelected] = useState<boolean>(
    selectedItems.find((i) => i.item.id === item.id) ? true : false
  );

  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Text>Photo</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.price ? (
          <Text style={styles.price}>{item.price} €</Text>
        ) : (
          <Text style={styles.price}>?? €</Text>
        )}
      </View>
      <View style={styles.addToCart}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelected(!selected);
            !selected
              ? !selectedItems.find((i) => i.item.id === item.id) &&
                addToTemporaryCatalogItem(item)
              : removeFromTemporaryCatalogItem(item);
          }}
        >
          <Icon
            name='cart-arrow-down'
            size={24}
            color={selected ? colors.main : colors.white}
          />
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
    borderTopWidth: 1,
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
  addToCart: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
