<template>
  <section class="w-full lg:w-3/4 bg-secondary p-4 sm:p-6 lg:p-8 rounded-2xl">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 p-2">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="group no-underline block perspective-1000"
      >
        <div
          class="overflow-hidden rounded-xl relative transform transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-2 shadow-lg group-hover:shadow-2xl"
        >
          <img
            :src="link.image"
            :alt="link.name"
            class="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover object-top rounded-xl transform transition-all duration-700 ease-out group-hover:scale-105"
          />
          <!-- Animated overlay with blur -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-tertiary/30 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
          ></div>
          <!-- Shine effect -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-xl"
          ></div>
        </div>
        <h2
          class="text-center mt-2 sm:mt-3 text-text font-bold text-base sm:text-lg group-hover:text-tertiary transition-all duration-300 transform group-hover:scale-110"
        >
          {{ link.name }}
        </h2>
      </router-link>
    </div>
  </section>
</template>

<script setup>
const navLinks = [
  {
    name: "Characters",
    path: "/characters",
    image:
      "https://fcvtcwoutrlordurhweb.supabase.co/storage/v1/object/public/Vision%20Forge%20Storage%20Bucket/twins.webp",
  },
  {
    name: "Weapons",
    path: "/weapons",
    image:
      "https://fcvtcwoutrlordurhweb.supabase.co/storage/v1/object/public/Vision%20Forge%20Storage%20Bucket/skirk.webp",
  },
  {
    name: "Artifacts",
    path: "/artifacts",
    image:
      "https://fcvtcwoutrlordurhweb.supabase.co/storage/v1/object/public/Vision%20Forge%20Storage%20Bucket/chiori.webp",
  },
  {
    name: "Banners",
    path: "/current-banner",
    image:
      "https://fcvtcwoutrlordurhweb.supabase.co/storage/v1/object/public/Vision%20Forge%20Storage%20Bucket/twins2.png",
  },
];
</script>
