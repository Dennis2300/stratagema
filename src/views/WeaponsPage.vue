<template>
  <main class="space-y-6 px-4 pb-8 min-h-screen">
    <h1 class="divider">Weapons</h1>

    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-6 md:flex md:justify-center">
        <button
          @click="toggleRarity(5)"
          :class="selectedRarity === 5 ? 'filter-active' : 'filter-inactive'"
          class="filter-btn transition-all duration-300"
        >
          ★★★★★
        </button>
        <button
          @click="toggleRarity(4)"
          :class="selectedRarity === 4 ? 'filter-active' : 'filter-inactive'"
          class="filter-btn transition-all duration-300"
        >
          ★★★★
        </button>
      </div>
      <div class="grid grid-cols-2 gap-6 md:flex md:justify-center">
        <button
          @click="toggleWeaponType('Sword')"
          :class="
            selectedWeaponType === 'Sword' ? 'filter-active' : 'filter-inactive'
          "
          class="filter-btn transition-all duration-300"
        >
          Sword
        </button>
        <button
          @click="toggleWeaponType('Claymore')"
          :class="
            selectedWeaponType === 'Claymore'
              ? 'filter-active'
              : 'filter-inactive'
          "
          class="filter-btn transition-all duration-300"
        >
          Claymore
        </button>
        <button
          @click="toggleWeaponType('Bow')"
          :class="
            selectedWeaponType === 'Bow' ? 'filter-active' : 'filter-inactive'
          "
          class="filter-btn transition-all duration-300"
        >
          Bow
        </button>
        <button
          @click="toggleWeaponType('Polearm')"
          :class="
            selectedWeaponType === 'Polearm'
              ? 'filter-active'
              : 'filter-inactive'
          "
          class="filter-btn transition-all duration-300"
        >
          Polearm
        </button>
        <button
          @click="toggleWeaponType('Catalyst')"
          :class="
            selectedWeaponType === 'Catalyst'
              ? 'filter-active'
              : 'filter-inactive'
          "
          class="filter-btn transition-all duration-300"
        >
          Catalyst
        </button>
      </div>
    </div>
    <transition name="fade-slide" mode="out-in">
      <div
        :key="currentPage"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 min-h-[555px]"
      >
        <RouterLink
          v-for="(weapon, index) in weapons"
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
            :src="weapon.img_url"
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
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        class="btn btn-primary hidden md:inline-flex"
      >
        First
      </button>

      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="btn btn-primary"
      >
        Previous
      </button>

      <div class="flex gap-1 md:hidden">
        <button class="btn btn-accent min-w-[40px]">
          {{ currentPage }}
        </button>
        <button
          v-if="currentPage < totalPages"
          @click="goToPage(currentPage + 1)"
          class="btn btn-primary min-w-[40px]"
        >
          {{ currentPage + 1 }}
        </button>
      </div>

      <div class="hidden md:flex gap-2">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="currentPage === page ? 'btn-accent' : 'btn-primary'"
          class="btn min-w-[48px]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="btn btn-primary"
      >
        Next
      </button>

      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        class="btn btn-primary hidden md:inline-flex"
      >
        Last
      </button>
    </div>

    <p
      class="text-center text-gray-400 text-sm md:text-base transition-opacity duration-300"
    >
      Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ totalCount }} weapons
    </p>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "./../supabaseClient.js";

const loading = ref(true);
const error = ref(null);
const selectedWeaponType = ref(null);
const selectedRarity = ref(null);
const weapons = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;
const totalCount = ref(0);

const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage));

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);

const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage;
  return end > totalCount.value ? totalCount.value : end;
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

function toggleWeaponType(type) {
  selectedWeaponType.value = selectedWeaponType.value === type ? null : type;
  applyFilters();
}

function toggleRarity(rarity) {
  selectedRarity.value = selectedRarity.value === rarity ? null : rarity;
  applyFilters();
}

async function applyFilters() {
  currentPage.value = 1;
  await fetchTotalCount();
  await fetchWeaponsPage(1);
}

function buildQuery() {
  let query = supabase
    .from("weapons")
    .select("id, name, rarity, img_url, type!inner(name)")
    .order("name", { ascending: true });
  if (selectedWeaponType.value) {
    query = query.eq("type.name", selectedWeaponType.value);
  }
  if (selectedRarity.value) {
    query = query.eq("rarity", selectedRarity.value);
  }

  return query;
}

async function fetchTotalCount() {
  try {
    const cacheKey = `weapons_count_${selectedWeaponType.value || "all"}_${selectedRarity.value || "all"}`;
    const cached = cache(cacheKey, null, 60 * 60 * 1000);

    if (cached !== null) {
      totalCount.value = cached;
      return;
    }
    let countQuery = supabase
      .from("weapons")
      .select("id", { count: "exact", head: true });
    if (selectedWeaponType.value || selectedRarity.value) {
      countQuery = supabase
        .from("weapons")
        .select("id, type!inner(name)", { count: "exact", head: true });

      if (selectedWeaponType.value) {
        countQuery = countQuery.eq("type.name", selectedWeaponType.value);
      }
    }

    if (selectedRarity.value) {
      countQuery = countQuery.eq("rarity", selectedRarity.value);
    }

    const { count, error: countError } = await countQuery;

    if (countError) throw countError;

    totalCount.value = count || 0;
    cache(cacheKey, count, 60 * 60 * 1000);
  } catch (err) {
    error.value = err.message || "Failed to fetch weapons count";
    console.error("Count error:", err);
  }
}

async function fetchWeaponsPage(page) {
  loading.value = true;
  try {
    const cacheKey = `weapons_page_${page}_${selectedWeaponType.value || "all"}_${selectedRarity.value || "all"}`;
    const cached = cache(cacheKey, null, 60 * 60 * 1000);

    if (cached) {
      weapons.value = cached;
      loading.value = false;
      return;
    }

    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = buildQuery();
    const { data, error: fetchError } = await query.range(from, to);

    if (fetchError) throw fetchError;

    cache(cacheKey, data, 60 * 60 * 1000);
    weapons.value = data || [];
  } catch (err) {
    error.value = err.message || "Failed to fetch weapons";
    console.error("Fetch error:", err);
    weapons.value = [];
  } finally {
    loading.value = false;
  }
}

async function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  await fetchWeaponsPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(async () => {
  await fetchTotalCount();
  await fetchWeaponsPage(1);
});
</script>

<style scoped>
.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid transparent;
}

.filter-inactive {
  background-color: var(--filter-color);
  border: 1px solid black;
}

.filter-active {
  background-color: var(--filter-color);
  border: 1px solid var(--tertiary);
}

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
  transform: scale(1.1);
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
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
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
</style>
