import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  KColors as Colors,
  Radius,
  Shadow,
  Spacing,
} from "../constants/kaamsetuTheme";

function StarRatingInput({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (r: number) => void;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity key={i} onPress={() => onRate(i)}>
          <Text
            style={{
              fontSize: 28,
              color: i <= rating ? Colors.starGold : "#DDD",
            }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function AcceptedApplicationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ─── Parse app data passed via params ────────────────────────────────────
  const app = params.appData ? JSON.parse(params.appData as string) : null;
  // ─────────────────────────────────────────────────────────────────────────

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // ─── NEW: End Work and Rating state ──────────────────────────────────────
  const [workEnded, setWorkEnded] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  // ─────────────────────────────────────────────────────────────────────────

  const handleEndWork = () => {
    Alert.alert("End Work", "Confirm that you have completed the job?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Complete",
        onPress: () =>
          Alert.alert("Job marked as completed!", "", [
            {
              text: "OK",
              onPress: () => setWorkEnded(true),
            },
          ]),
      },
    ]);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      Alert.alert("Please select a rating.");
      return;
    }
    Alert.alert("Thank you!", "Your rating has been submitted.", [
      {
        text: "OK",
        onPress: () => setRatingSubmitted(true),
      },
    ]);
  };

  if (!app) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Application Detail</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No application data found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Application Detail</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.acceptedCard}>
          {/* Status Banner */}
          <View style={styles.inProgressBanner}>
            <Text style={styles.inProgressIcon}>✅</Text>
            <Text style={styles.inProgressText}>WORK IN PROGRESS</Text>
          </View>

          {/* Job Summary */}
          <View style={styles.section}>
            <Text style={styles.jobTitle}>{app.jobId?.category}</Text>
            <Text style={styles.jobMeta}>
              Status: Accepted · {new Date(app.createdAt).toLocaleDateString()}
            </Text>
          </View>

          {/* Job Details */}
          <View style={styles.detailsBox}>
            <Text style={styles.detailsHeading}>Job Details</Text>
            {[
              ["Job Type", app.jobTitle?.split(" at ")[0]],
              ["Description", app.description],
              ["Location", app.jobLocation],
              ["Date Posted", app.datePosted],
              ["Expected Pay", `₹${app.expectedPay}`],
            ].map(([k, v]) => (
              <View key={k} style={styles.detailRow}>
                <Text style={styles.detailKey}>{k}:</Text>
                <Text style={styles.detailVal}>{v}</Text>
              </View>
            ))}
          </View>

          {/* ─── End Work button ─────────────────────────────────────────── */}
          {workEnded ? (
            <View style={[styles.endWorkBtn, { backgroundColor: Colors.textMuted }]}>
              <Text style={styles.endWorkText}>Work Ended</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.endWorkBtn} onPress={handleEndWork}>
              <Text style={styles.endWorkText}>End Work</Text>
            </TouchableOpacity>
          )}
          {/* ────────────────────────────────────────────────────────────── */}

          {/* ─── Rate User section ───────────────────────────────────────── */}
          <View style={styles.rateBox}>
            <Text style={styles.rateTitle}>Rate User</Text>

            {!ratingSubmitted && (
              <>
                <StarRatingInput rating={rating} onRate={setRating} />
                <TextInput
                  style={styles.reviewInput}
                  value={review}
                  onChangeText={setReview}
                  placeholder="Write a review..."
                  placeholderTextColor={Colors.textMuted}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </>
            )}

            {ratingSubmitted ? (
              <View style={[styles.submitRatingBtn, { backgroundColor: Colors.textMuted }]}>
                <Text style={styles.submitRatingText}>Rating Submitted</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.submitRatingBtn}
                onPress={handleSubmitRating}
              >
                <Text style={styles.submitRatingText}>Submit Rating</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* ────────────────────────────────────────────────────────────── */}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  backBtn: { width: 36, justifyContent: "center" },
  backText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 32,
  },
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: "700" },

  scrollContent: { padding: Spacing.md, gap: 14 },

  empty: { padding: 60, alignItems: "center" },
  emptyText: { color: Colors.textMuted, fontSize: 14 },

  acceptedCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.md,
    gap: 0,
  },
  inProgressBanner: {
    backgroundColor: Colors.success,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 10,
  },
  inProgressIcon: { fontSize: 20 },
  inProgressText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },
  section: { padding: Spacing.md, gap: 4 },
  jobTitle: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary },
  jobMeta: { fontSize: 12, color: Colors.textSecondary },

  detailsBox: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.primaryPale,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  detailsHeading: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  detailRow: { flexDirection: "row", gap: 8 },
  detailKey: {
    width: 80,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  detailVal: { flex: 1, fontSize: 12, color: Colors.textPrimary },

  endWorkBtn: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.full,
    paddingVertical: 12,
    alignItems: "center",
  },
  endWorkText: { color: Colors.white, fontWeight: "700", fontSize: 15 },

  rateBox: {
    margin: Spacing.md,
    gap: 12,
    alignItems: "center",
  },
  rateTitle: { fontSize: 17, fontWeight: "700", color: Colors.textPrimary },
  reviewInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    minHeight: 80,
    backgroundColor: Colors.offWhite,
  },
  submitRatingBtn: {
    backgroundColor: Colors.accentDark,
    borderRadius: Radius.full,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  submitRatingText: { color: Colors.white, fontWeight: "700", fontSize: 14 },
});