import React, { useState } from "react";

import { Text, View, TextInput, StyleSheet, Alert, Image } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();

  return (
    <View className="w-full h-full">
      <View className="mx-auto w-4/5 mt-8">
        <Text className="text-2xl text-center text-white mt-24 mb-0">
          Welcome to the mobile attendance app
        </Text>
        <Image
          source={require("../assets/school-girl.png")}
          style={[{ resizeMode: "contain" }]}
          className="w-full h-3/5"
        />

        <Text
          className="w-full rounded-full text-white py-3 text-center bg-[#2637a9] mt-6 disabled:bg-[#4251b0]"
          onPress={() => {
            router.replace("/login")
          }}
        >
          Get Started
        </Text>
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
