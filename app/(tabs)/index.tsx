import React from "react";

import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

export default function LogIn({navigation}) {
  const router = useRouter();
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
      const response = await signInWithEmailAndPassword(auth, value.email, value.password)
      console.log(response);
      navigation.navigate('scan')
        
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          nativeID="email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          nativeID="password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          style={styles.textInput}
        />
      </View>
      <Text
      style={styles.button}
      onPress={()=>{
        signIn()
      }}
      >
        Login
      </Text>
      <Text
        onPress={() => {
 
        }}
      >
        Create Account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    backgroundColor:"white"
  },
  button:{
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: "#455fff",
    borderWidth: 1,
    marginBottom: 8,
    color: "#455fff",
  }
});