import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ChatScreen() {
  const router = useRouter();

  // 🔹 Chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi Rajesh, What will be the things required for the repair, Tap's broken",
      sender: "user",
    },
    {
      id: 2,
      text: "I sending you list of things..",
      sender: "worker",
    },
  ]);

  // 🔹 Input
  const [input, setInput] = useState("");

  // 🔹 Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Rajesh Kumar</Text>
      </View>

      {/* 🔹 Messages */}
      <ScrollView style={styles.chatArea}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.sender === "user"
                ? styles.userMessage
                : styles.workerMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 🔹 Input box */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e6ddff",
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  chatArea: {
    flex: 1,
    padding: 10,
  },

  message: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: "75%",
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6c4ef6",
  },

  workerMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
  },

  messageText: {
    color: "#000",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#6c4ef6",
    padding: 10,
    borderRadius: 50,
  },
});