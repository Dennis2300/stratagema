<template>
  <nav class="bg-primary p-4 rounded-b-2xl flex">
    <div class="flex-1">
      <RouterLink
        to="/"
        class="flex items-center gap-2 no-underline text-text w-fit"
      >
        <img
          src="/src/assets/images/icons/webIcon.webp"
          alt="Logo"
          class="w-10"
        />
        <h2 class="font-bold no-underline cursor-pointer">Stratagema</h2>
      </RouterLink>
    </div>

    <!-- Desktop Nav -->
    <div class="hidden md:flex gap-2 items-center">
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

      <!-- Dropdown -->
      <div class="relative" ref="dropdownRef">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="btn btn-ghost rounded-lg transition-all duration-200"
          :class="
            dropdownOpen
              ? 'bg-primary-content/20'
              : 'hover:bg-primary-content/20'
          "
        >
          More
          <span
            class="ml-1 text-xs transition-transform duration-200"
            :class="dropdownOpen ? 'rotate-180' : ''"
            >▼</span
          >
        </button>
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg z-50 flex flex-col p-2"
        >
          <RouterLink
            v-for="link in dropdownLinks"
            :key="link.path"
            :to="link.path"
            @click="dropdownOpen = false"
            class="px-4 py-2 text-sm no-underline hover:bg-base-200 transition-colors text-text"
            :class="isActive(link.path) ? 'font-bold text-primary' : ''"
          >
            {{ link.name }}
          </RouterLink>
        </div>
      </div>
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

    <!-- Mobile Drawer -->
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

        <!-- Dropdown links flat in mobile -->
        <div class="border-t my-1"></div>
        <h5>More</h5>
        <RouterLink
          v-for="link in dropdownLinks"
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const open = ref(false);
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
];

const dropdownLinks = [{ name: "Codes", path: "/codes" }];

const isActive = (path) => route.path === path;

// Close dropdown when clicking outside
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside),
);
</script>
