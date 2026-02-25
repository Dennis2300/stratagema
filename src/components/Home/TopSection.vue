<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-10">
    <template v-for="link in navLinks" :key="link.path">
      <RouterLink :to="link.path" class="no-underline text-text group">
        <div
          class="relative space-y-3 bg-primary p-6 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
        >
          <div class="w-[300px] h-[300px] overflow-hidden rounded-lg">
            <img
              class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              :src="link.img"
              alt=""
            />
          </div>
          <h2 class="text-center">
            {{ link.name }}
          </h2>
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6 space-y-4 opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer"
          >
            <h2 class="text-white text-xl font-semibold cursor-pointer">
              {{ link.alt_name }}
            </h2>
            <p
              class="text-white/90 text-sm leading-relaxed max-w-xs cursor-pointer"
            >
              {{ link.text }}
            </p>
            <p class="badge badge-success cursor-pointer">Click here!</p>
          </div>
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
