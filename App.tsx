import { SafeAreaView, StyleSheet } from "react-native";

import MainRouter from "./routers/MainRouter";

import { colors } from "./constants/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainRouter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
