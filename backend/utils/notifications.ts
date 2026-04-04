import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Base_Url } from "../../constants/Config";

export async function registerForPushNotifications() {
  try {
    if (Platform.OS === "web") return;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") return;
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });
    const pushToken = tokenData.data;
    console.log("🔑 Got push token:", pushToken);
    const authToken = await AsyncStorage.getItem("token");
    if (!authToken) return;
    const res = await fetch(`${Base_Url}/api/auth/save-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pushToken }),
    });
    const data = await res.json();
    console.log("✅ Token save response:", data);
  } catch (err) {
    console.log("⚠️ Push notification setup error:", err);
  }
}