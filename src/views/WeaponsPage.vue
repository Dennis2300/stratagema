<template>
  <main class="min-h-screen space-y-12 px-4 py-8">
    <LoadingSpinner v-if="loading" />
    <h1 class="divider">Weapons</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <RouterLink
        v-for="weapon in weapons"
        class="weapon-card flex flex-row items-center gap-4 no-underline text-text bg-primary/50 md:bg-primary p-4 md:p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        :key="weapon.id"
        :to="`/weapons/${weapon.id}?name=${encodeURIComponent(weapon.name)}`"
        target="_blank"
      >
        <img
          class="w-20 md:w-24 rounded-2xl flex-shrink-0 transition-transform duration-300"
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
            'rarity-3': weapon.rarity === 3,
          }"
          :src="weapon.image_url"
          :alt="weapon.name"
          loading="lazy"
        />
        <h3 class="text-base md:text-lg font-semibold line-clamp-2">
          {{ weapon.name }}
        </h3>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow:
    0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.rarity-3 {
  background: linear-gradient(145deg, #567496, #3a77b1);
  box-shadow:
    0px 0px 15px rgba(86, 116, 150, 0.8),
    0px 0px 30px rgba(86, 116, 150, 0.5);
}

.weapon-card:hover img {
  transform: scale(1.05) rotate(2deg);
}

.weapon-card:active {
  transform: scale(0.98);
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

const loading = ref(true);
const error = ref(null);

const weapons = ref([]);

function cache(key, data = null, ttl = 24 * 60 * 60 * 1000) {
  const now = new Date().getTime();
  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return data;
  } else {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  }
}

async function fetchAllWeapons() {
  try {
    const cached = cache("weapons");
    if (cached) {
      weapons.value = cached;
      return;
    }
    let query = supabase
      .from("weapons")
      .select("id, name, rarity, image_url")
      .order("name", { ascending: true });
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    cache("weapons", data);
    weapons.value = data;
  } catch (err) {
    error.value = err.message || "Failed to fetch weapons";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchAllWeapons();
});
</script>
