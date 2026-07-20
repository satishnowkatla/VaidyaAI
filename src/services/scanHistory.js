import AsyncStorage from "@react-native-async-storage/async-storage";

const getHistoryKey = (userId) => `vaidyaai_history_${userId}`;

export const saveScan = async (userId, scanData) => {
  try {
    const key = getHistoryKey(userId);
    const existing = await AsyncStorage.getItem(key);
    const history = existing ? JSON.parse(existing) : [];
    const newScan = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...scanData,
    };
    history.unshift(newScan);
    if (history.length > 50) history.pop();
    await AsyncStorage.setItem(key, JSON.stringify(history));
    return newScan;
  } catch (e) {
    console.warn("Failed to save scan:", e);
    return null;
  }
};

export const getScanHistory = async (userId) => {
  try {
    const key = getHistoryKey(userId);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn("Failed to load scan history:", e);
    return [];
  }
};

export const clearScanHistory = async (userId) => {
  try {
    const key = getHistoryKey(userId);
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn("Failed to clear scan history:", e);
  }
};

export const deleteScan = async (userId, scanId) => {
  try {
    const key = getHistoryKey(userId);
    const existing = await AsyncStorage.getItem(key);
    const history = existing ? JSON.parse(existing) : [];
    const updated = history.filter((s) => s.id !== scanId);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to delete scan:", e);
  }
};
