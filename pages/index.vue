<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <form @submit.prevent="addTodo" class="flex gap-2 mb-4">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Yangi todo"
        class="border border-gray-300 rounded p-2"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Qo'shish
      </button>
    </form>

    <ul>
      <li
        v-if="todos && todos.length > 0"
        v-for="todo in todos"
        :key="todo._id"
        class="flex justify-between items-center border-b py-2"
      >
        <span :class="{ 'line-through': todo.completed }">{{
          todo.title
        }}</span>
        <button @click="toggleComplete(todo)" class="ml-4 text-blue-500">
          {{ todo.completed ? "Bekor qilish" : "Tugatish" }}
        </button>
      </li>
      <li v-else>No todos available.</li>
    </ul>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// useAsyncData bilan fetch
const { data: todos, pending, error, refresh } = await useFetch("/api/todos");

// Yangi todo qo'shish
const newTodo = ref("");

const addTodo = async () => {
  if (!newTodo.value) return;
  const { data, error } = await useFetch("/api/todos", {
    method: "POST",
    body: { title: newTodo.value },
  });
  if (!error.value && data.value) {
    todos.value.push(data.value); // yangi todo ni ro'yxatga qo'shamiz
    newTodo.value = ""; // inputni tozalash
    refresh(); // Malumotlarni yangilash
  }
};

// Todo holatini yangilash
const toggleComplete = async (todo) => {
  const updatedTodo = { ...todo, completed: !todo.completed };
  const { error } = await useFetch(`/api/todos/${todo._id}`, {
    method: "PUT",
    body: updatedTodo,
  });
  if (!error.value) {
    refresh(); // holat yangilanganidan so'ng qayta yuklaymiz
  }
};

// Kuzatib turish
watch(pending, (newValue) => {
  if (newValue) {
    console.log("Loading data...");
  }
});
</script>
