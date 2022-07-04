import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { postTweet, twitterLogin } from "./lib/twitter";
import { AccountInformation } from "./types";

export default function App() {
  const [accountInfo, setAccountInfo] = useState<AccountInformation>();
  const [text, setText] = useState<string>("");

  const onPressLoginButton = async () => {
    setAccountInfo(await twitterLogin());
  };

  const onPressTweetButton = async () => {
    try {
      accountInfo && (await postTweet(accountInfo, text));
      setText("");
      Alert.alert("ツイート完了！");
    } catch (e) {
      console.log(e);
      Alert.alert("ツイート失敗...");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {accountInfo ? (
        <View>
          <TextInput
            value={text}
            onChangeText={(value) => setText(value)}
            style={styles.input}
          />
          <TouchableOpacity onPress={onPressTweetButton} style={styles.button}>
            <Text style={styles.buttonLabel}>ツイートする</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>ボタンを押してログインしてね。</Text>
          <TouchableOpacity onPress={onPressLoginButton} style={styles.button}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontSize: 18,
    padding: 2,
  },
});
