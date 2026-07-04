import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WorkerProfile() {
  const router = useRouter();

  // 🔹 Dummy work history (dynamic part)
  const works = [
    {
      title: "Bathroom Leak Repair",
      rating: "4.9",
      time: "2 weeks ago",
      review: "Very professional and quick.",
    },
    {
      title: "Kitchen Tap Installation",
      rating: "5.0",
      time: "1 month ago",
      review: "Excellent work, highly recommended.",
    },
    {
      title: "Full Plumbing Check",
      rating: "4.8",
      time: "3 months ago",
      review: "Thorough job.",
    },
    {
      title: "Water Heater Repair",
      rating: "5.0",
      time: "6 months ago",
      review: "Fixed it perfectly.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Worker Profile</Text>
      </View>

      {/* 🔹 Profile Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={styles.image}
        />

        <Text style={styles.name}>Rajesh Kumar</Text>
        <Text style={styles.role}>Plumber</Text>

        <Text style={styles.rating}>4.8 ⭐ (250+ Ratings)</Text>

        <Text style={styles.info}>Location: IIT Kanpur</Text>
        <Text style={styles.info}>Years of Experience: 10+</Text>

        {/* 🔹 Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/registration/chat")}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Worker Accepted ✅")}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔹 Work History */}
      <Text style={styles.sectionTitle}>Previous Work History</Text>

      {works.map((item, index) => (
        <View key={index} style={styles.workCard}>
          <Text style={styles.workTitle}>
            {item.title}   {item.rating} ⭐
          </Text>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.review}>"{item.review}"</Text>
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
    marginBottom: 15,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  role: {
    color: "#555",
    marginBottom: 5,
  },

  rating: {
    marginBottom: 5,
  },

  info: {
    fontSize: 13,
    color: "#444",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#6c4ef6",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    width: 120,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  workCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  workTitle: {
    fontWeight: "bold",
  },

  time: {
    fontSize: 12,
    color: "#777",
  },

  review: {
    fontStyle: "italic",
  },
});