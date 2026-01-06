import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link href="/settings">Visit settings...</Link>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle to dark mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // this is column by default
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 30,
    textAlign: "center",
    padding: 4,
  },
});
