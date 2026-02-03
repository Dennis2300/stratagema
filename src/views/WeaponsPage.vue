<template>
  <main class="min-h-screen space-y-12 px-4 py-8">
    <LoadingSpinner v-if="loading" />
    <h1 class="divider">Weapons</h1>

    <transition name="fade-slide" mode="out-in">
      <div
        :key="currentPage"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
      >
        <RouterLink
          v-for="(weapon, index) in paginatedWeapons"
          class="weapon-card flex flex-row items-center gap-4 no-underline text-text bg-primary/50 md:bg-primary p-4 md:p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          :key="weapon.id"
          :style="{ animationDelay: `${index * 50}ms` }"
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
    </transition>

    <div class="flex justify-center items-center gap-2 md:gap-4 flex-wrap mt-8">
      <button
        @click="currentPage = 1"
        :disabled="currentPage === 1"
        class="btn btn-primary hidden md:inline-flex"
      >
        First
      </button>

      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="btn btn-primary"
      >
        Previous
      </button>

      <div class="flex gap-1 md:hidden">
        <button
          class="btn btn-accent min-w-[40px]"
        >
          {{ currentPage }}
        </button>
        <button
          v-if="currentPage < totalPages"
          @click="currentPage = currentPage + 1"
          class="btn btn-primary min-w-[40px]"
        >
          {{ currentPage + 1 }}
        </button>
      </div>

      <div class="hidden md:flex gap-2">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="currentPage === page ? 'btn-accent' : 'btn-primary'"
          class="btn min-w-[48px]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="btn btn-primary"
      >
        Next
      </button>

      <button
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        class="btn btn-primary hidden md:inline-flex"
      >
        Last
      </button>
    </div>

    <p
      class="text-center text-gray-400 text-sm md:text-base transition-opacity duration-300"
    >
      Showing {{ startIndex + 1 }}-{{ endIndex }} of
      {{ weapons.length }} weapons
    </p>
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.weapon-card {
  animation: fadeInUp 0.5s ease-out backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.08);
  }
}
</style>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

const loading = ref(true);
const error = ref(null);
const weapons = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const totalPages = computed(() =>
  Math.ceil(weapons.value.length / itemsPerPage),
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);

const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage;
  return end > weapons.value.length ? weapons.value.length : end;
});

const paginatedWeapons = computed(() => {
  return weapons.value.slice(startIndex.value, endIndex.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

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
