<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { KColors as Colors, Spacing, Radius, Shadow } from '../../constants/kaamsetuTheme';
import {
  currentUser,
  myRequests,
  completedJobHistory,
  applicantsForJob,
  workerProfiles,
} from '../../constants/mockData';
=======
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
import { completedJobHistory, myRequests } from "../../constants/mockData";
>>>>>>> upstream/feature/auth-profile-integration

// ─── Reusable Components ────────────────────────────────────────────────────

function Avatar({ name, size = 72 }: { name: string; size?: number }) {
  const initials = name
<<<<<<< HEAD
    .split(' ')
    .map((n) => n[0])
    .join('')
=======
    .split(" ")
    .map((n) => n[0])
    .join("")
>>>>>>> upstream/feature/auth-profile-integration
    .slice(0, 2)
    .toUpperCase();
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
<<<<<<< HEAD
      <Text style={[styles.avatarText, { fontSize: size * 0.35 }]}>{initials}</Text>
=======
      <Text style={[styles.avatarText, { fontSize: size * 0.35 }]}>
        {initials}
      </Text>
>>>>>>> upstream/feature/auth-profile-integration
    </View>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
<<<<<<< HEAD
        <Text key={i} style={{ color: i <= Math.round(rating) ? Colors.starGold : '#DDD', fontSize: 14 }}>
=======
        <Text
          key={i}
          style={{
            color: i <= Math.round(rating) ? Colors.starGold : "#DDD",
            fontSize: 14,
          }}
        >
>>>>>>> upstream/feature/auth-profile-integration
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
<<<<<<< HEAD
    pending:     { label: 'Pending',       bg: Colors.warningLight,  color: Colors.warning },
    in_progress: { label: 'Work in Progress', bg: Colors.successLight, color: Colors.success },
    completed:   { label: 'Completed',     bg: '#E3F2FD',            color: '#1565C0' },
    cancelled:   { label: 'Cancelled',     bg: Colors.errorLight,    color: Colors.error },
  };
  const s = map[status] ?? map['pending'];
=======
    pending: {
      label: "Pending",
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
>>>>>>> upstream/feature/auth-profile-integration
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

<<<<<<< HEAD
=======
type UserType = {
  name: string;
  email: string;
  phone: string;
  address?: string;
  skills?: string[];
  rating?: number;
};
>>>>>>> upstream/feature/auth-profile-integration
// ─── Main Component ──────────────────────────────────────────────────────────

export default function AccountScreen() {
  const router = useRouter();
<<<<<<< HEAD

=======
  const [user, setUser] = useState<UserType | null>(null);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // 🔥 token delete

      console.log("Logged out");

      router.replace("/(auth)/login"); // 🔥 login page pe bhej
    } catch (err) {
      console.log("Logout error:", err);
    }
  };
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);
  // if (!user) return null;
>>>>>>> upstream/feature/auth-profile-integration
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card ── */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
<<<<<<< HEAD
            <Avatar name={currentUser.name} size={72} />
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName}>{currentUser.name}</Text>
                <TouchableOpacity
                  onPress={() => router.push('/update-profile')}
=======
            <Avatar name={user?.name || "User"} size={72} />
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName}>{user?.name || "Loading..."}</Text>
                <TouchableOpacity
                  onPress={() => router.push("/update-profile")}
>>>>>>> upstream/feature/auth-profile-integration
                  style={styles.editIcon}
                >
                  <Text style={styles.editIconText}>✏️</Text>
                </TouchableOpacity>
              </View>
<<<<<<< HEAD
              <StarRating rating={currentUser.rating} />
              {currentUser.workerTags.length > 0 && (
                <View style={styles.tagsRow}>
                  {currentUser.workerTags.map((tag) => (
=======
              <StarRating rating={user?.rating || 0} />
              {user?.skills && user.skills.length > 0 && (
                <View style={styles.tagsRow}>
                  {user?.skills?.map((tag) => (
>>>>>>> upstream/feature/auth-profile-integration
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

<<<<<<< HEAD
=======
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

>>>>>>> upstream/feature/auth-profile-integration
          <View style={styles.divider} />

          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email</Text>
<<<<<<< HEAD
              <Text style={styles.contactValue}>{currentUser.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{currentUser.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>{currentUser.address}</Text>
=======
              <Text style={styles.contactValue}>{user?.email || "-"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{user?.phone || "-"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>{user?.address || "-"}</Text>
>>>>>>> upstream/feature/auth-profile-integration
            </View>
          </View>

          <TouchableOpacity
            style={styles.updateBtn}
<<<<<<< HEAD
            onPress={() => router.push('/update-profile')}
=======
            onPress={() => router.push("/update-profile")}
>>>>>>> upstream/feature/auth-profile-integration
          >
            <Text style={styles.updateBtnText}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ── My Requests ── */}
        <SectionHeader title="My Requests (Current)" />
        {myRequests.map((job) => {
<<<<<<< HEAD
          const isInProgress = job.status === 'in_progress';
=======
          const isInProgress = job.status === "in_progress";
>>>>>>> upstream/feature/auth-profile-integration
          return (
            <View key={job.jobID} style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{job.jobType}</Text>
                  <Text style={styles.cardSubtitle}>{job.location}</Text>
                </View>
                <StatusBadge status={job.status} />
              </View>
              <Text style={styles.cardMeta}>
<<<<<<< HEAD
                ₹{job.budget.min} – ₹{job.budget.max} · {job.schedule.date}, {job.schedule.timeRange}
=======
                ₹{job.budget.min} – ₹{job.budget.max} · {job.schedule.date},{" "}
                {job.schedule.timeRange}
>>>>>>> upstream/feature/auth-profile-integration
              </Text>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() =>
                  router.push(
                    isInProgress
<<<<<<< HEAD
                      ? `/view-status/${job.jobID}`
                      : `/applicants/${job.jobID}`
=======
                      ? `/job-status?jobId=${job.jobID}`
                      : `/applicants-list?jobId=${job.jobID}`,
>>>>>>> upstream/feature/auth-profile-integration
                  )
                }
              >
                <Text style={styles.secondaryBtnText}>
<<<<<<< HEAD
                  {isInProgress ? 'View Status' : 'View Applicants'}
=======
                  {isInProgress ? "View Status" : "View Applicants"}
>>>>>>> upstream/feature/auth-profile-integration
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* ── My Applications / Referrals ── */}
        <SectionHeader title="My Applications" />
        <View style={styles.appLinksRow}>
          <TouchableOpacity
            style={styles.appLinkCard}
<<<<<<< HEAD
            onPress={() => router.push('/referrals')}
=======
            onPress={() => router.push("/referrals")}
>>>>>>> upstream/feature/auth-profile-integration
          >
            <Text style={styles.appLinkIcon}>🔗</Text>
            <Text style={styles.appLinkLabel}>Referrals</Text>
            <Text style={styles.appLinkArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appLinkCard}
<<<<<<< HEAD
            onPress={() => router.push('/applications')}
=======
            onPress={() => router.push("/applications")}
>>>>>>> upstream/feature/auth-profile-integration
          >
            <Text style={styles.appLinkIcon}>📋</Text>
            <Text style={styles.appLinkLabel}>Applications</Text>
            <Text style={styles.appLinkArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Completed Job History ── */}
        <SectionHeader title="Completed Job History" />
        {completedJobHistory.map((job) => (
          <View key={job.jobID} style={styles.historyCard}>
            <View style={styles.historyLeft}>
              <Text style={styles.historyTitle}>{job.jobType}</Text>
              <Text style={styles.historyMeta}>Date: {job.date}</Text>
              <Text style={styles.historyMeta}>Worker: {job.workerName}</Text>
            </View>
            <View style={styles.historyRight}>
              <Text style={styles.historyPay}>₹{job.agreedPay}</Text>
<<<<<<< HEAD
              <View style={[styles.badge, { backgroundColor: '#E3F2FD' }]}>
                <Text style={[styles.badgeText, { color: '#1565C0' }]}>{job.status}</Text>
=======
              <View style={[styles.badge, { backgroundColor: "#E3F2FD" }]}>
                <Text style={[styles.badgeText, { color: "#1565C0" }]}>
                  {job.status}
                </Text>
>>>>>>> upstream/feature/auth-profile-integration
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
<<<<<<< HEAD
=======
    alignItems: "center",
>>>>>>> upstream/feature/auth-profile-integration
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
<<<<<<< HEAD
    fontWeight: '700',
    letterSpacing: 0.5,
=======
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
>>>>>>> upstream/feature/auth-profile-integration
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: Spacing.md,
    gap: 12,
  },

  // Profile Card
  profileCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.md,
    marginBottom: 4,
  },
  profileTop: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'flex-start',
=======
    flexDirection: "row",
    alignItems: "flex-start",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 14,
  },
  avatar: {
    backgroundColor: Colors.primary,
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
  },
  profileInfo: { flex: 1 },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
=======
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.white,
    fontWeight: "700",
  },
  profileInfo: { flex: 1 },
  profileNameRow: {
    flexDirection: "row",
    alignItems: "center",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 8,
    marginBottom: 4,
  },
  profileName: {
    fontSize: 20,
<<<<<<< HEAD
    fontWeight: '700',
=======
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
    color: Colors.textPrimary,
  },
  editIcon: {
    padding: 2,
  },
  editIconText: { fontSize: 16 },
  starsRow: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
>>>>>>> upstream/feature/auth-profile-integration
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  tagsRow: {
<<<<<<< HEAD
    flexDirection: 'row',
    flexWrap: 'wrap',
=======
    flexDirection: "row",
    flexWrap: "wrap",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.primaryPale,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagText: {
    color: Colors.primary,
    fontSize: 11,
<<<<<<< HEAD
    fontWeight: '600',
=======
    fontWeight: "600",
>>>>>>> upstream/feature/auth-profile-integration
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  contactGrid: { gap: 8, marginBottom: Spacing.md },
<<<<<<< HEAD
  contactItem: { flexDirection: 'row', gap: 8 },
  contactLabel: {
    fontSize: 13,
    fontWeight: '600',
=======
  contactItem: { flexDirection: "row", gap: 8 },
  contactLabel: {
    fontSize: 13,
    fontWeight: "600",
>>>>>>> upstream/feature/auth-profile-integration
    color: Colors.textSecondary,
    width: 58,
  },
  contactValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    flex: 1,
  },
  updateBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 12,
<<<<<<< HEAD
    alignItems: 'center',
  },
  updateBtnText: {
    color: Colors.white,
    fontWeight: '700',
=======
    alignItems: "center",
  },
  updateBtnText: {
    color: Colors.white,
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
    fontSize: 15,
  },

  // Section Header
  sectionHeaderRow: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionAccent: {
    width: 4,
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
<<<<<<< HEAD
    fontWeight: '700',
=======
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
    color: Colors.textPrimary,
  },

  // Job Cards
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.sm,
    gap: 8,
  },
  cardTopRow: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
=======
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
<<<<<<< HEAD
    fontWeight: '700',
=======
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Badge
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
<<<<<<< HEAD
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
=======
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
  },

  // Secondary Button
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 8,
<<<<<<< HEAD
    alignItems: 'center',
=======
    alignItems: "center",
>>>>>>> upstream/feature/auth-profile-integration
    marginTop: 2,
  },
  secondaryBtnText: {
    color: Colors.primary,
<<<<<<< HEAD
    fontWeight: '600',
=======
    fontWeight: "600",
>>>>>>> upstream/feature/auth-profile-integration
    fontSize: 13,
  },

  // App Links
  appLinksRow: {
<<<<<<< HEAD
    flexDirection: 'row',
=======
    flexDirection: "row",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 12,
  },
  appLinkCard: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
>>>>>>> upstream/feature/auth-profile-integration
    gap: 8,
    ...Shadow.sm,
  },
  appLinkIcon: { fontSize: 18 },
  appLinkLabel: {
    flex: 1,
    fontSize: 14,
<<<<<<< HEAD
    fontWeight: '600',
=======
    fontWeight: "600",
>>>>>>> upstream/feature/auth-profile-integration
    color: Colors.textPrimary,
  },
  appLinkArrow: {
    fontSize: 20,
    color: Colors.primary,
<<<<<<< HEAD
    fontWeight: '700',
=======
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
  },

  // History Cards
  historyCard: {
    backgroundColor: Colors.primaryPale,
    borderRadius: Radius.md,
    padding: Spacing.md,
<<<<<<< HEAD
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
=======
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
>>>>>>> upstream/feature/auth-profile-integration
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  historyLeft: { flex: 1 },
  historyTitle: {
    fontSize: 14,
<<<<<<< HEAD
    fontWeight: '700',
=======
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  historyMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
<<<<<<< HEAD
  historyRight: { alignItems: 'flex-end', gap: 6 },
  historyPay: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
=======
  historyRight: { alignItems: "flex-end", gap: 6 },
  historyPay: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  logoutBtn: {
    backgroundColor: "#ff4d4f",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
>>>>>>> upstream/feature/auth-profile-integration
});
