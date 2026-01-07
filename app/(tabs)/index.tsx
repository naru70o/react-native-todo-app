import { createHomeStyles } from "@/assets/styles/home.style";
import { useTheme } from "@/hooks/useTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const styles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {/* icon */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: "blue" },
                { borderRadius: 8 },
              ]}
            >
              <FontAwesome name="flash" size={24} color={colors.text} />
            </View>
            {/* title */}
            <View style={styles.titleTextContainer}>
              <Text style={styles.title}>Today&apos;s Tasks 👀</Text>
              <Text style={styles.subtitle}>2 of 4 completed</Text>
            </View>
          </View>
          {/* progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { backgroundColor: colors.success },
                    { width: "50%" }, // will be dynamic
                  ]}
                />
              </View>
              <Text style={styles.progressText}>2 of 4</Text>
            </View>
          </View>
        </View>
        <Link href="/settings">Visit settings...</Link>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>toggle to dark mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
