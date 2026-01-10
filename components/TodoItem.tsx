import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/useTheme";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

type Todo = Doc<"todos">;

const TodoItem = ({ item }: { item: Todo }) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  async function handleToggleTodo() {
    await toggleTodo({ id: item._id });
  }

  async function handleEditTodo(id: Id<"todos">) {}

  async function handleDeleteTodo() {
    Alert.alert("delete todo", "are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteTodo({ id: item._id }),
        style: "destructive",
      },
    ]);
  }

  return (
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          style={[styles.checkbox]}
          activeOpacity={0.7}
          onPress={handleToggleTodo}
        >
          <LinearGradient
            colors={
              item.completed ? colors.gradients.success : colors.gradients.muted
            }
            style={[
              styles.checkboxInner,
              { borderColor: item.completed ? "transparent" : colors.border },
            ]}
          >
            {item.completed && <Entypo name="check" size={24} color="#fff" />}
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.todoTextContainer}>
          <Text
            style={[
              styles.todoText,
              item.completed && {
                textDecorationLine: "line-through",
                color: colors.textMuted,
                opacity: 0.6,
              },
            ]}
          >
            {item.title}
          </Text>
          <View style={styles.todoActions}>
            <TouchableOpacity
              onPress={() => handleEditTodo()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={colors.gradients.warning}
                style={styles.actionButton}
              >
                <Ionicons name="pencil" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteTodo()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={colors.gradients.danger}
                style={styles.actionButton}
              >
                <Ionicons name="trash" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
