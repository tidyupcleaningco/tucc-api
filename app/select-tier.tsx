import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const tiers = [
  {
    name: "Trusted",
    price: "$40–$75/hr",
    description:
      "Reliable, hardworking cleaners who are newer to the platform and eager to impress."
  },
  {
    name: "Premium",
    price: "$76–$110/hr",
    description:
      "Experienced pros with strong reviews, verified certifications, and consistent quality."
  },
  {
    name: "Luxury",
    price: "$111–$200/hr",
    description:
      "Elite cleaners with top-tier ratings, extensive experience, and unmatched attention to detail."
  }
];

const SelectTierScreen = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Choose Your Cleaner Tier</Text>
      <Text style={styles.subtext}>
        Every cleaner is vetted — but tiers help you choose based on experience & budget.
      </Text>

      {tiers.map((tier, index) => {
        const isSelected = selectedTier === index;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTier(index)}
            style={[styles.card, isSelected && styles.cardSelected]}
            activeOpacity={0.9}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.tierName}>{tier.name}</Text>
              <Text style={styles.price}>{tier.price}</Text>
            </View>
            <Text style={styles.description}>{tier.description}</Text>
            {isSelected && (
              <View style={styles.selectionBadge}>
                <Ionicons name="checkmark" size={16} color="#fff" />
                <Text style={styles.selectedText}>Selected</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {selectedTier !== null && (
        <Text style={styles.summary}>
          You’ve selected: <Text style={{ fontWeight: "600" }}>{tiers[selectedTier].name} Tier</Text>
        </Text>
      )}

      <TouchableOpacity
        style={[styles.nextButton, selectedTier === null && styles.disabledButton]}
        disabled={selectedTier === null}
        onPress={() => router.push("/home-consultation")}
        accessibilityRole="button"
        accessibilityState={{ disabled: selectedTier === null }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center"
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  cardSelected: {
    borderColor: "#007aff",
    backgroundColor: "#eef6ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  tierName: {
    fontSize: 18,
    fontWeight: "600"
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444"
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20
  },
  selectionBadge: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#007aff",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  selectedText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 6,
    fontWeight: "500"
  },
  summary: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginBottom: 10
  },
  nextButton: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "#ccc"
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default SelectTierScreen;
