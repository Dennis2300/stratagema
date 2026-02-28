<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-10">
    <template v-for="link in navLinks" :key="link.path">
      <RouterLink :to="link.path" class="no-underline text-text group">
        <div
          class="bg-secondary p-6 flex flex-col items-center space-y-3 rounded-xl"
        >
          <div class="relative w-[300px] h-[300px] rounded-xl overflow-hidden">
            <img
              class="w-full h-full object-cover object-center rounded-xl transition-transform duration-500 group-hover:scale-105"
              :src="link.img"
              alt=""
            />
            <div
              class="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <h3 class="text-white text-xl font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {{ link.alt_name }}
              </h3>
              <p class="text-white text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                {{ link.text }}
              </p>
            </div>
          </div>
          <h2 class="group-hover:text-tertiary transition-colors duration-300">
            {{ link.name }}
          </h2>
        </div>
      </RouterLink>
    </template>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";

const navLinks = [
  {
    name: "Characters",
    alt_name: "Characters Archive",
    path: "/characters",
    img: "https://wfhyslxivzmdgbnhbnjg.supabase.co/storage/v1/object/public/StratagemaStorage/twins.webp",
    text: "Explore all playable characters, check out their builds, and find the perfect team setup for your playstyle.",
  },
  {
    name: "Weapons",
    alt_name: "Weapons Archive",
    path: "/weapons",
    img: "https://wfhyslxivzmdgbnhbnjg.supabase.co/storage/v1/object/public/StratagemaStorage/skirk.webp",
    text: "Browse every weapon in the game, compare stats, and discover which ones truly power up your characters.",
  },
  {
    name: "Artifacts",
    alt_name: "Artifacts Archive",
    path: "/artifacts",
    img: "https://wfhyslxivzmdgbnhbnjg.supabase.co/storage/v1/object/public/StratagemaStorage/chiori.webp",
    text: "Dive into artifact sets, explore their bonuses, and optimize your stats to maximize your damage.",
  },
];
</script>
