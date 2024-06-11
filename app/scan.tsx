import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { user } = useAuth();
  const router = useRouter()
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(data);
    
    // // Parse the QR code data URL to extract query parameters
    const urlParams = new URLSearchParams(new URL(data).search);
    const classId = urlParams.get("classId");
    const courseId = urlParams.get("courseId");

    // Log the extracted IDs or perform other actions with them
    // alert(`Class ID: ${classId}, Course ID: ${courseId}`);
    try {
      const studentRef = doc(db, "courses", courseId, "classes", classId);
      await updateDoc(studentRef, {
        [`students.${user?.uid}.attended`]: true,
      });
      alert("successful")
      router.replace("/success")
    } catch (error) {
      // alert(error);
      console.log(error);
      
    }

    // alert(`Bar code with type ${type} and data ${data} has been scanned`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "upc_e",
            "ean8",
            "ean13",
            "datamatrix",
            "code128",
            "code93",
            "code39",
            "codabar",
            "aztec",
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
