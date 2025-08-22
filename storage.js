import AsyncStorage from "@react-native-async-storage/async-storage";

/** Nama key untuk penyimpanan */
export const STORAGE_TODAY = "TODAY_DESTINATIONS_v2";
export const STORAGE_HISTORY = "HISTORY_LOCATIONS_v2";

/** Simpan data ke storage */
export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Gagal menyimpan ke storage:", e);
  }
}

/** Ambil data dari storage */
export async function loadData(key) {
  try {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.warn("Gagal load dari storage:", e);
    return [];
  }
}

/** Hapus data dari storage */
export async function clearData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn("Gagal menghapus storage:", e);
  }
}
