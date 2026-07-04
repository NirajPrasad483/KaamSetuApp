import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Referrals() {
  const router = useRouter();

  // 🔹 Dummy referral data
  const referrals = [
    {
      name: "Amit Sharma",
      phone: "+91 98210 XXXXX",
      tag: "Plumber",
      work: "Plumber needed at Hall A, IIT Kanpur",
    },
    {
      name: "Priya Singh",
      phone: "+91 88776 1XXXX",
      tag: "Cook",
      work: "Cook needed at Civil Lines, Kanpur",
    },
    {
      name: "Rajesh Verma",
      phone: "+91 70045 8XXXX",
      tag: "Electrician",
      work: "Electrician needed at Swaroop Nagar",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Referrals</Text>
      </View>

      {/* 🔹 Referral Cards */}
      {referrals.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>Name: {item.name}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Worker Tag: {item.tag}</Text>
          <Text>Referred For: {item.work}</Text>
        </View>
      ))}

    </ScrollView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#f0f5d8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});