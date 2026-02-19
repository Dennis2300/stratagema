<template>
  <section class="h-[800px] flex">
    <div class="w-1/2 h-full flex justify-end items-center">
      <img
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/05/20/35428890/3a95beed79926f13932d6beafca64b10_6744977131439339792.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
    </div>
    <div class="w-1/2 h-full flex flex-col justify-center">
      <h1>404 Page Not Found!</h1>
      <h3>Are you lost or trying something?</h3>
      <p class="mt-4">
        If you are lost, no worry use the navigation under to go to the right
        pages.
      </p>
      <nav class="flex gap-6 mt-3">
        <RouterLink
          class="no-underline text-text px-6 py-2 bg-primary rounded-lg hover:bg-gray-500 transition"
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
        >
          {{ link.name }}
        </RouterLink>
      </nav>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
];
</script>
