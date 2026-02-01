<template>
  <nav class="navbar bg-primary text-primary-content px-4 rounded-b-2xl">
    <div class="flex-1">
      <RouterLink to="/" class="flex items-center gap-2 no-underline text-text">
        <img
          src="/src/assets/images/icons/webIcon.webp"
          alt="Logo"
          class="w-10"
        />
        <h2 class="font-bold hidden sm:block no-underline">Stratagema</h2>
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
    <div class="md:hidden dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost"> ☰ </label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 mt-3"
      >
        <li v-for="link in navLinks" :key="link.path">
          <RouterLink
            :to="link.path"
            :class="isActive(link.path) ? 'active font-semibold' : ''"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
  { name: "Banners", path: "/current-banner" },
];

const isActive = (path) => route.path === path;
</script>
