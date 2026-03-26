import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
<<<<<<< Updated upstream
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
=======
import React, { useCallback, useState } from "react";
>>>>>>> Stashed changes
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  KColors as Colors,
  Radius,
  Shadow,
  Spacing,
} from "../../constants/kaamsetuTheme";
import { myApplications } from "../../constants/mockData";

<<<<<<< Updated upstream
=======
// 🔥 Updated to your server IP
>>>>>>> Stashed changes
const API_URL = "http://172.27.16.252:8030";

// ─── Reusable Components ────────────────────────────────────────────────────

function Avatar({
  name,
  profileImage,
  size = 72,
}: {
  name: string;
  profileImage?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return profileImage ? (
    <Image
      source={{ uri: profileImage }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  ) : (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.35 }]}>
        {initials}
      </Text>
    </View>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={{
            color: i <= Math.round(rating) ? Colors.starGold : "#DDD",
            fontSize: 14,
          }}
        >
          ★
        </Text>
      ))}
      <Text style={styles.ratingText}> ({rating})</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={styles.sectionAccent} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    pending: {
      label: "pending",
      bg: Colors.warningLight,
      color: Colors.warning,
    },
    in_progress: {
      label: "Work in Progress",
      bg: Colors.successLight,
      color: Colors.success,
    },
    completed: { label: "Completed", bg: "#E3F2FD", color: "#1565C0" },
    cancelled: {
      label: "Cancelled",
      bg: Colors.errorLight,
      color: Colors.error,
    },
  };
  const s = map[status] ?? map["pending"];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  skills?: string[];
  rating?: number;
  profileImage?: string;
};
type JobType = {
  _id: string;
  category: string;
  description: string;
  address: string;
  status: string;
  minBudget?: number;
  maxBudget?: number;
  noBudget?: boolean;
};

// ─── Main Screen ──────────────────────────────────────────────────────────

export default function AccountScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [myRequests, setMyRequests] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
<<<<<<< Updated upstream

    await loadAccountData();

    setTimeout(() => {
      setRefreshing(false);
    }, 500); // smooth feel
  };
  
  const loadAccountData = async () => {
  setLoading(true); // 🔥 ADD THIS
=======
    await loadAccountData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const loadAccountData = async () => {
    setLoading(true);
>>>>>>> Stashed changes
    try {
      const token = await AsyncStorage.getItem("token");
      const userString = await AsyncStorage.getItem("user");

      if (!token || !userString) {
        setLoading(false);
        return;
      }

      const parsedUser: UserType = JSON.parse(userString);
      setUser(parsedUser);

      const requestsRes = await fetch(
        `${API_URL}/api/jobs/my-requests/${parsedUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const requestsData = await requestsRes.json();
      if (requestsRes.ok && Array.isArray(requestsData)) {
        setMyRequests(requestsData);
      } else {
        setMyRequests([]);
      }
    } catch (error) {
      console.log("Account load error:", error);
      setMyRequests([]);
    } finally {
      setLoading(false);
    }
  };
<<<<<<< Updated upstream
  // ✅ REPLACE WITH THIS
    useFocusEffect(
      useCallback(() => {
        onRefresh();

        return () => {
          // optional cleanup (safe)
        };
      }, [])
    );
  // if (!user) return null;


=======

  const handleDeleteJob = async (jobId: string) => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              const res = await fetch(`${API_URL}/api/jobs/${jobId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              });
              if (res.ok) {
                onRefresh();
              } else {
                Alert.alert(
                  "Error",
                  "Could not delete. It might be in progress.",
                );
              }
            } catch (err) {
              console.log("Delete error:", err);
            }
          },
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );
>>>>>>> Stashed changes

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/login");
  };

  const activeRequests = myRequests.filter((j) => j.status !== "completed");
  const historyRequests = myRequests.filter((j) => j.status === "completed");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView
<<<<<<< Updated upstream
                  contentContainerStyle={styles.scrollContent}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                >
=======
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Profile Card Section */}
>>>>>>> Stashed changes
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <Avatar
              name={user?.name || "User"}
              profileImage={user?.profileImage}
            />
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName}>
                  {user?.name || "Loading..."}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/update-profile")}
                  style={styles.editIcon}
                >
                  <Text style={styles.editIconText}>✏️</Text>
                </TouchableOpacity>
              </View>
              <StarRating rating={user?.rating || 0} />
              <Text style={styles.profileText}>
                Phone: {user?.phone || "-"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push("/update-profile")}
          >
            <Text style={styles.primaryBtnText}>Update Profile</Text>
          </TouchableOpacity>

<<<<<<< Updated upstream
          
=======
          <TouchableOpacity
            style={styles.testChatBtn}
            onPress={() =>
              router.push("/job-chat?chatId=69c39b7dcf8d1328e3f5ffd1")
            }
          >
            <Text style={styles.testChatBtnText}>💬 Open Test Chat</Text>
          </TouchableOpacity>
>>>>>>> Stashed changes
        </View>

        {/* ─── MY JOB REQUESTS (Active) ─── */}
        <SectionHeader title="My Job Requests" />
        {loading && !refreshing ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 20 }} />
        ) : activeRequests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No active requests found.</Text>
          </View>
        ) : (
          activeRequests.map((job) => (
            <View key={job._id} style={styles.requestCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.requestTitle}>{job.category}</Text>
                {job.status === "pending" && (
                  <TouchableOpacity onPress={() => handleDeleteJob(job._id)}>
                    <Text style={{ fontSize: 20 }}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.requestSub} numberOfLines={2}>
                {job.description}
              </Text>
              <StatusBadge status={job.status} />
              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={() => router.push(`/applications?jobId=${job._id}`)}
              >
                <Text style={styles.outlineBtnText}>View Applicants</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* ─── MY APPLICATIONS ─── */}
        <SectionHeader title="My Applications" />
        {myApplications.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No applications found.</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/applications")}
          >
            <Text style={styles.quickCardTitle}>Track Applications</Text>
            <Text style={styles.quickCardSub}>
              {myApplications.length} ongoing application(s)
            </Text>
          </TouchableOpacity>
        )}

        {/* ─── HISTORY ─── */}
        <SectionHeader title="History" />
        {historyRequests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No past history.</Text>
          </View>
        ) : (
          historyRequests.map((job) => (
            <View
              key={job._id}
              style={[
                styles.requestCard,
                { opacity: 0.6, backgroundColor: "#f9f9f9" },
              ]}
            >
              <Text style={styles.requestTitle}>
                {job.category} (Completed)
              </Text>
              <StatusBadge status="completed" />
            </View>
          ))
        )}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: { color: Colors.white, fontSize: 22, fontWeight: "700" },
  scrollContent: { padding: Spacing.md, gap: 14 },
  centered: {
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.md,
    gap: 12,
  },
  profileName: { fontSize: 20, fontWeight: "800", color: Colors.textPrimary },
  profileText: { fontSize: 14, color: Colors.textSecondary },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: Colors.white, fontWeight: "700" },
  testChatBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: 5,
  },
  testChatBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: Colors.textPrimary },
  emptyCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  emptyText: { fontSize: 15, color: Colors.textMuted },
  requestCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.md,
    gap: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestTitle: { fontSize: 17, fontWeight: "700", color: Colors.textPrimary },
  requestSub: { fontSize: 14, color: Colors.textSecondary },
  outlineBtn: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 10,
    alignItems: "center",
  },
  outlineBtnText: { color: Colors.primary, fontWeight: "700" },
  quickCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.sm,
  },
  quickCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  quickCardSub: { marginTop: 6, fontSize: 12, color: Colors.textSecondary },
  logoutBtn: {
    backgroundColor: "#D9534F",
    borderRadius: Radius.full,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutBtnText: { color: Colors.white, fontWeight: "700" },
  avatar: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
<<<<<<< Updated upstream

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },

  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },

=======
  avatarText: { color: "#fff", fontWeight: "bold" },
  starsRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { marginLeft: 5, fontSize: 12, color: Colors.textSecondary },
  profileTop: { flexDirection: "row", alignItems: "center" },
  profileInfo: { marginLeft: 12, flex: 1 },
>>>>>>> Stashed changes
  profileNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
<<<<<<< Updated upstream

  editIcon: {
    marginLeft: 8,
  },

  editIconText: {
    fontSize: 16,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },

=======
  editIcon: { marginLeft: 8 },
  editIconText: { fontSize: 16 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 5 },
>>>>>>> Stashed changes
  tag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 5,
    marginTop: 5,
  },
<<<<<<< Updated upstream

  tagText: {
    color: "#fff",
    fontSize: 12,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },

=======
  tagText: { color: "#fff", fontSize: 12 },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
>>>>>>> Stashed changes
  sectionAccent: {
    width: 4,
    height: 16,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
<<<<<<< Updated upstream

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
=======
  badgeText: { fontSize: 11, fontWeight: "700" },
>>>>>>> Stashed changes
});
