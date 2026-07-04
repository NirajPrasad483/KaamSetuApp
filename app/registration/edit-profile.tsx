import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function EditProfile() {
  const router = useRouter();

  // 🔹 State (dynamic data)
  const [name, setName] = useState("Rahul S.");
  const [email, setEmail] = useState("rahul.s@email.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [address, setAddress] = useState("Hall A, IIT Kanpur");
  const [tags, setTags] = useState("");

  // 🔹 Save handler
  const handleSave = () => {
    console.log("Saved Data:", { name, email, phone, address, tags });
    alert("Profile Updated ✅");

    // Go back to dashboard
    router.back();
  };

  return (
    <View style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Update Profile</Text>
      </View>

      {/* 🔹 Profile Icon */}
      <View style={styles.profileContainer}>
        <View style={styles.profileCircle}>
          <Ionicons name="person" size={60} color="#6c4ef6" />
        </View>
        <Text style={styles.changePhoto}>Change Photo</Text>
      </View>

      {/* 🔹 Form */}
      <View style={styles.form}>
        
        <Text>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />

        <Text>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text>Worker Tags (comma separated)</Text>
        <TextInput
          style={styles.input}
          placeholder="Plumber, Cook, etc."
          value={tags}
          onChangeText={setTags}
        />

      </View>

      {/* 🔹 Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e6ddff",
    justifyContent: "center",
    alignItems: "center",
  },

  changePhoto: {
    marginTop: 8,
    color: "#6c4ef6",
  },

  form: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  button: {
    backgroundColor: "#6c4ef6",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});