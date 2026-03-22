<<<<<<< HEAD
import { View, Text, StyleSheet } from 'react-native';
=======
import { StyleSheet, Text, View } from "react-native";
>>>>>>> upstream/feature/auth-profile-integration

export default function PostJobScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔨</Text>
      <Text style={styles.title}>Post New Job</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F1FB',
=======
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F1FB",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 10,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 22,
<<<<<<< HEAD
    fontWeight: '700',
    color: '#5B2D8E',
  },
  subtitle: {
    fontSize: 14,
    color: '#888899',
=======
    fontWeight: "700",
    color: "#5B2D8E",
  },
  subtitle: {
    fontSize: 14,
    color: "#888899",
>>>>>>> upstream/feature/auth-profile-integration
  },
});
