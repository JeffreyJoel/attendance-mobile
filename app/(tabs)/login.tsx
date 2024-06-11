import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const TextInputExample = () => {
  const auth = getAuth();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
      />
      <TextInput
        style={styles.input}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
      />

      <Text onPress={signIn}>Login</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
