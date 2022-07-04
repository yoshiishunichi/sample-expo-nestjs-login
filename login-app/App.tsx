import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { twitterLogin } from "./lib/twitter";
import { AccountInformation } from "./types";

export default function App() {
  const [accountInfo, setAccountInfo] = useState<AccountInformation>();

  const onPressLoginButton = async () => {
    setAccountInfo(await twitterLogin());
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>ボタンを押してログインしてね。</Text>
      <TouchableOpacity onPress={onPressLoginButton} style={styles.button}>
        <Text style={styles.buttonLabel}>Login</Text>
      </TouchableOpacity>
      {accountInfo && (
        <View>
          <Text>{accountInfo.screenName}</Text>
          <Text>{accountInfo.accessToken}</Text>
          <Text>{accountInfo.accessSecret}</Text>
        </View>
      )}
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
