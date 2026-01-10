import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const todos = useQuery(api.todos.todos);

  const completedTodos = todos?.filter((todo) => todo.completed).length;
  const totalTodos = todos?.length;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        {/* icon */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={[styles.iconContainer, { borderRadius: 8 }]}
        >
          <FontAwesome name="flash" size={24} color={colors.text} />
        </LinearGradient>
        {/* title */}
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={styles.subtitle}>
            {completedTodos} of {totalTodos} completed
          </Text>
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
                {
                  width:
                    completedTodos && totalTodos
                      ? `${(completedTodos / totalTodos) * 100}%`
                      : "0%",
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {completedTodos} of {totalTodos}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
