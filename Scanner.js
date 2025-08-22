import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner({ hasCam, onScanned, onClose }) {
  if (hasCam === null) {
    return (
      <View style={styles.center}>
        <Text>Meminta izin kamera...</Text>
      </View>
    );
  }

  if (hasCam === false) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>
          Izin kamera ditolak. Aktifkan di pengaturan.
        </Text>
        <Button title="Tutup" onPress={onClose} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={onScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Button title="Batal" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  center: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
