import { StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../../constants/colors";

export default function RelevanceSelectorButton({
  relevance,
  setRelevance,
  selected,
}: {
  relevance: number;
  setRelevance: Function;
  selected: boolean;
}) {
  function calculateRelevanceColor(relevance: number) {
    if (relevance == 4) return colors.red;
    if (relevance == 3) return colors.yellow;
    if (relevance == 2) return colors.green;
    if (relevance == 1) return colors.blue;
    return "gray";
  }

  return (
    <TouchableOpacity
      style={[
        styles.relevanceButton,
        { backgroundColor: calculateRelevanceColor(relevance) },
        selected ? { borderColor: colors.main } : {},
      ]}
      onPress={() => {
        setRelevance(relevance);
      }}
    ></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  relevanceButton: {
    backgroundColor: colors.black,
    width: 40,
    height: 40,
    borderRadius: 8,
    borderColor: colors.white,
    borderWidth: 4,
  },
});
