import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>ボタンを押してログインしてね。</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonLabel}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#00acee",
    width: 200,
    height: 40,
  },
  buttonLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 32,
  },
});
