import React, { useState } from "react";

import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Image } from "react-native";

export default function LogIn() {
  const router = useRouter();
  const auth = getAuth();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      console.log(response);
      router.replace("/scan");
      setLoading(false);
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
      setLoading(false);
    }
  }

  return (
    <View className="w-full h-full">
      <View className=" h-full mt-8 w-10/12 flex flex-col mx-auto justify-center align-center">
      <Image
          source={require("../assets/school-girl.png")}
          style={[{ resizeMode: "contain" }]}
          className="w-full h-1/5 mb-4"
        />
        <View className="mb-4">
          <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </Text>
          <TextInput
            placeholder="Enter email"
            autoCapitalize="none"
            nativeID="email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            style={styles.textInput}
            className="bg-gray-50 px-4 py-2 border text-gray-900 text-sm rounded-full border-[#455fff]"
          />
        </View>
        <View className="mb-4">
          <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </Text>
          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            nativeID="password"
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            style={styles.textInput}
            className="w-full bg-gray-50 px-4 py-2 border border-[#455fff] text-gray-900 text-sm rounded-full"
          />
        </View>
        <Text
          disabled={loading}
          className="w-full rounded-full text-white py-3 text-center bg-[#2637a9] mt-6 disabled:bg-[#4251b0]"
          onPress={() => {
            signIn();
          }}
        >
          {loading ? "Loading..." : "Login"}
        </Text>
        {/* <Text onPress={() => {}}>Create Account</Text> */}
        <Text className="text-center text-red-600 mt-4">{value.error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: "#455fff",
    borderWidth: 1,
    marginBottom: 8,
    color: "#455fff",
  },
});
