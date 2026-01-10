import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const todos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

export const addTodo = mutation({
  args: {
    title: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      completed: false,
    });
    return todoId;
  },
});
export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get("todos", args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch("todos", args.id, {
      completed: !todo.completed,
    });
  },
});
export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete("todos", args.id);
  },
});
