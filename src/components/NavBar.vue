<template>
  <nav class="bg-primary p-4 rounded-b-2xl flex">
    <div class="flex-1">
      <RouterLink to="/" class="flex items-center gap-2 no-underline text-text">
        <img
          src="/src/assets/images/icons/webIcon.webp"
          alt="Logo"
          class="w-10"
        />
        <h2 class="font-bold no-underline">Stratagema</h2>
      </RouterLink>
    </div>
    <div class="hidden md:flex gap-2">
      <RouterLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="btn btn-ghost rounded-lg transition-all duration-200 no-underline"
        :class="
          isActive(link.path)
            ? 'bg-primary-content text-primary shadow-md'
            : 'hover:bg-primary-content/20'
        "
      >
        {{ link.name }}
      </RouterLink>
    </div>
    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button
        @click="open = true"
        class="btn btn-ghost text-xl"
        aria-label="Open menu"
      >
        ☰
      </button>
    </div>

    <!-- Backdrop -->
    <div
      v-if="open"
      class="fixed inset-0 bg-black/40 z-40"
      @click="open = false"
    ></div>
    <div
      class="fixed top-0 right-0 h-full w-fit bg-base-100 z-50 transform transition-transform duration-300 ease-in-out"
      :class="open ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex items-center justify-between p-4 border-b">
        <span class="font-bold text-lg">Menu</span>
        <button @click="open = false" class="btn btn-sm btn-ghost text-xl">
          ✕
        </button>
      </div>

      <nav class="flex flex-col p-4 gap-2">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="open = false"
          class="px-4 py-3 rounded-lg text-base no-underline transition-colors"
          :class="
            isActive(link.path)
              ? 'bg-primary text-primary-content font-bold'
              : 'hover:bg-base-200'
          "
        >
          {{ link.name }}
        </RouterLink>
      </nav>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const open = ref(false);
const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
];

const isActive = (path) => route.path === path;

watch(
  () => route.path,
  () => (open.value = false),
);
</script>
