import { createHomeStyles } from "@/assets/styles/home.style";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function Index() {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const todos = useQuery(api.todos.todos);
  const isLoading = todos === undefined;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        {/* header */}
        <Header />
        {/* todo input */}
        <TodoInput />
        {/* todo list */}
        <FlatList
          data={todos}
          renderItem={({ item }) => <TodoItem item={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false} // will hide the scrollbar
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
