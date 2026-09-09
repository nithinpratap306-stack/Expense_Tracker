export const CATEGORIES = [
  {
    id: "Food",
    name: "Food",
    emoji: "🍔",
    color: "#F97316", // Orange
    bgColor: "#FFF7ED",
    borderColor: "#FFEDD5",
    description: "Canteens, groceries, hostel mess & treats"
  },
  {
    id: "Transport",
    name: "Transport",
    emoji: "🚌",
    color: "#06B6D4", // Cyan
    bgColor: "#ECFEFF",
    borderColor: "#CFFAFE",
    description: "Bus, metro pass, autos & bike fuel"
  },
  {
    id: "Education",
    name: "Education",
    emoji: "📚",
    color: "#8B5CF6", // Purple
    bgColor: "#F5F3FF",
    borderColor: "#EDE9FE",
    description: "Books, printing, courses & stationery"
  },
  {
    id: "Entertainment",
    name: "Entertainment",
    emoji: "🎮",
    color: "#EC4899", // Pink
    bgColor: "#FDF2F8",
    borderColor: "#FCE7F3",
    description: "Movies, outings, gaming & campus events"
  },
  {
    id: "Shopping",
    name: "Shopping",
    emoji: "🛍️",
    color: "#3B82F6", // Blue
    bgColor: "#EFF6FF",
    borderColor: "#DBEAFE",
    description: "Clothes, footwear & tech accessories"
  },
  {
    id: "Subscriptions",
    name: "Subscriptions",
    emoji: "💻",
    color: "#10B981", // Emerald
    bgColor: "#ECFDF5",
    borderColor: "#D1FAE5",
    description: "Spotify, Prime, cloud storage & tools"
  },
  {
    id: "Accommodation",
    name: "Accommodation",
    emoji: "🏠",
    color: "#6366F1", // Indigo
    bgColor: "#EEF2FF",
    borderColor: "#E0E7FF",
    description: "Hostel rent, laundry, electricity & room needs"
  },
  {
    id: "Other",
    name: "Other",
    emoji: "💡",
    color: "#64748B", // Slate
    bgColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    description: "Medicines, gifts & miscellaneous expenses"
  }
];

export function getCategoryMeta(categoryName) {
  const found = CATEGORIES.find(
    c => c.id.toLowerCase() === (categoryName || "").toLowerCase()
  );
  if (found) return found;
  return {
    id: categoryName || "Other",
    name: categoryName || "Other",
    emoji: "💡",
    color: "#64748B",
    bgColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    description: "Miscellaneous expenses"
  };
}
