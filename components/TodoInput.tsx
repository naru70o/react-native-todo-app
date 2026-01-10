import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";

import { TextInput, TouchableOpacity, View } from "react-native";

const TodoInput = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const [newTodo, setNewTodo] = React.useState("");
  const [state, SetState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const add = useMutation(api.todos.addTodo);

  function handleAddTodo() {
    if (newTodo.trim()) {
      SetState("loading");
      add({ title: newTodo, completed: false })
        .then(() => {
          setNewTodo("");
          SetState("success");
        })
        .catch((err) => {
          console.error("Failed to add todo:", err);
          SetState("error");
        });
    }
  }

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          placeholderTextColor={colors.textMuted}
          value={newTodo}
          onSubmitEditing={handleAddTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity
          style={styles.addButton}
          disabled={!newTodo.trim() || state === "loading"}
          onPress={handleAddTodo}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={styles.addButton}
          >
            <Ionicons name="add" size={24} color={"#ffffff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
