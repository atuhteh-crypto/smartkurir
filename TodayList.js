import React from "react";
import { View, Text, Button } from "react-native";
import { distanceMeters } from "../utils/geo";

export default function TodayList({ data, current, onUpdate }) {
  if (!data || !data.length) return <Text style={{ padding: 10 }}>Belum ada tujuan hari ini.</Text>;

  // Urutkan: belum delivered → delivered, lalu berdasarkan jarak
  const sorted = [...data].sort((a, b) => {
    if (a.delivered !== b.delivered) return a.delivered ? 1 : -1;
    if (!current) return 0;
    return distanceMeters(current, a) - distanceMeters(current, b);
  });

  // Tandai delivered
  const markDelivered = (id) => {
    onUpdate(sorted.map((t) => (t.id === id ? { ...t, delivered: true } : t)));
  };

  // Hapus tujuan
  const remove = (id) => {
    onUpdate(sorted.filter((t) => t.id !== id));
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>📍 Tujuan Hari Ini</Text>
      {sorted.map((item) => (
        <View
          key={item.id}
          style={{
            padding: 5,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 14 }}>
            {item.label} {item.delivered ? "✅" : ""}
          </Text>

          {current && (
            <Text style={{ fontSize: 12, color: "#666" }}>
              ~{(distanceMeters(current, item) / 1000).toFixed(2)} km dari posisi Anda
            </Text>
          )}

          <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
            {!item.delivered && <Button title="Selesai" onPress={() => markDelivered(item.id)} />}
            <Button title="Hapus" color="#9e9e9e" onPress={() => remove(item.id)} />
          </View>
        </View>
      ))}
    </View>
  );
}
