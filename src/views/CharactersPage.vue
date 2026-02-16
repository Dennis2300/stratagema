<template>
  <div class="min-h-screen flex flex-col items-center gap-2">
    <div class="w-full">
      <div class="flex gap-5 items-center flex-wrap">
        <div
          class="bg-filter flex items-center px-4 py-1.5 rounded cursor-pointer transition-all duration-200 text-lg border-2 border-transparent hover:translate-y-[-2px] active:translate-y-0"
        >
          <span class="text-yellow-500" v-for="n in 5" :key="n">★</span>
        </div>
        <div
          class="bg-filter flex items-center px-4 py-1.5 rounded cursor-pointer transition-all duration-200 text-lg border-2 border-transparent hover:translate-y-[-2px] active:translate-y-0"
        >
          <span class="text-yellow-500" v-for="n in 4" :key="n">★</span>
        </div>
        <div
          class="dropdown-container relative min-w-[175px]"
          ref="visionDropdownRef"
        >
          <div
            class="dropdown-header flex justify-between items-center px-4 py-2.5 rounded cursor-pointer transition-all duration-200 select-none border-2 border-transparent h-full hover:border-white/10 active:scale-[0.98]"
            @click="toggleVisionDropdown"
          >
            <span class="font-medium flex items-center gap-1.5">
              <img
                v-if="selectedVision"
                class="w-5"
                :src="selectedVision.img_url"
                alt=""
              />
              {{ selectedVision ? selectedVision.name : "Vision" }}
            </span>
            <span
              class="arrow ml-3 text-xs opacity-70 transition-transform duration-300 ease-in-out"
              :class="{ open: visionDropdownOpen }"
              >▼</span
            >
          </div>
          <div
            v-if="visionDropdownOpen"
            class="dropdown-menu absolute top-[calc(100%+8px)] left-0 right-0 rounded border-2 border-white/10 shadow-lg z-[1000]"
          >
            <div
              v-for="vision in visions"
              :key="vision.id"
              class="dropdown-item flex gap-1.5 px-4 py-3 cursor-pointer transition-all duration-150 border-l-[3px] border-l-transparent hover:pl-[18px]"
              @click="selectVision(vision)"
            >
              <img class="w-5" :src="vision.img_url" alt="" />
              <span>
                {{ vision.name }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="dropdown-container relative min-w-[175px]"
          ref="weaponDropdownRef"
        >
          <div
            class="dropdown-header flex justify-between items-center px-4 py-2.5 rounded cursor-pointer transition-all duration-200 select-none border-2 border-transparent h-full hover:border-white/10 active:scale-[0.98]"
            @click="toggleWeaponDropdown"
          >
            <span class="font-medium flex items-center gap-1.5">
              <img
                v-if="selectedWeapon"
                class="w-5"
                :src="selectedWeapon.img_url"
                alt=""
              />
              {{ selectedWeapon ? selectedWeapon.name : "Weapon" }}
            </span>
            <span
              class="arrow ml-3 text-xs opacity-70 transition-transform duration-300 ease-in-out"
              :class="{ open: weaponDropdownOpen }"
              >▼</span
            >
          </div>
          <div
            v-if="weaponDropdownOpen"
            class="dropdown-menu absolute top-[calc(100%+8px)] left-0 right-0 rounded border-2 border-white/10 shadow-lg z-[1000] max-h-[250px] overflow-y-auto"
          >
            <div
              v-for="weapon in weapon_types"
              :key="weapon.id"
              class="dropdown-item flex gap-1.5 px-4 py-3 cursor-pointer transition-all duration-150 border-l-[3px] border-l-transparent hover:pl-[18px]"
              @click="selectWeapon(weapon)"
            >
              <img class="w-5" :src="weapon.img_url" alt="" />
              <span>{{ weapon.name }}</span>
            </div>
          </div>
        </div>

        <div
          class="dropdown-container relative min-w-[175px]"
          ref="regionDropdownRef"
        >
          <div
            class="dropdown-header flex justify-between items-center px-4 py-2.5 rounded cursor-pointer transition-all duration-200 select-none border-2 border-transparent h-full hover:border-white/10 active:scale-[0.98]"
            @click="toggleRegionDropdown"
          >
            <span class="font-medium flex items-center gap-1.5">
              <img
                v-if="selectedRegion"
                class="w-5"
                :src="
                  selectedRegion.img_url ||
                  'https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/10/30/237301566/93cd2bc9b90c8b87b1f8cbdbe95b4b9d_5225561202100412280.png?x-oss-process=image%2Fformat%2Cwebp'
                "
                alt=""
              />
              {{ selectedRegion ? selectedRegion.name : "Region" }}
            </span>
            <span
              class="arrow ml-3 text-xs opacity-70 transition-transform duration-300 ease-in-out"
              :class="{ open: regionDropdownOpen }"
              >▼</span
            >
          </div>
          <div
            v-if="regionDropdownOpen"
            class="dropdown-menu absolute top-[calc(100%+8px)] left-0 right-0 rounded border-2 border-white/10 shadow-lg z-[1000] max-h-[250px] overflow-y-auto"
          >
            <div
              v-for="region in regions"
              :key="region.id"
              class="dropdown-item flex gap-1.5 px-4 py-3 cursor-pointer transition-all duration-150 border-l-[3px] border-l-transparent hover:pl-[18px]"
              @click="selectRegion(region)"
            >
              <img
                class="w-5"
                :src="
                  region.img_url ||
                  'https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/10/30/237301566/93cd2bc9b90c8b87b1f8cbdbe95b4b9d_5225561202100412280.png?x-oss-process=image%2Fformat%2Cwebp'
                "
                alt=""
              />
              <span>{{ region.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider w-full pb-6"></div>
    <div class="h-fit w-full lg:w-4/5 flex flex-col gap-10 md:gap-16">
      <RouterLink
        :to="`/characters/${character.id}?name=${encodeURIComponent(
          character.name,
        )}`"
        class="relative group rounded-2xl no-underline text-white"
        :class="{
          'rarity-5': character.rarity === 5,
          'rarity-4': character.rarity === 4,
        }"
        v-for="character in characters"
        :key="character.id"
        target="_blank"
      >
        <div v-if="character.is_new" class="absolute -top-3 -left-3 z-10">
          <div
            class="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md uppercase"
          >
            New
          </div>
        </div>
        <div v-if="character.is_upcoming" class="absolute -top-3 -left-3 z-10">
          <div
            class="flex items-center justify-center px-2 sm:px-3 h-6 sm:h-7 rounded-full bg-blue-500 text-white text-xs font-semibold uppercase shadow-md whitespace-nowrap"
          >
            Upcoming
          </div>
        </div>
        <div
          class="relative bg-primary flex flex-row justify-between overflow-hidden rounded-t-2xl"
        >
          <div
            class="flex flex-row items-center justify-center p-4 sm:p-6 gap-3 sm:gap-4"
          >
            <img
              class="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full"
              :class="{
                'rarity-5': character.rarity === 5,
                'rarity-4': character.rarity === 4,
              }"
              :src="character.img_url"
              loading="lazy"
            />
            <h1
              class="relative text-xl sm:text-3xl lg:text-4xl font-acme tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full"
            >
              {{ character.name }}
            </h1>
          </div>
          <img
            v-if="character.splash_art_url"
            class="absolute w-36 h-36 md:w-80 md:h-80 md:-top-10 right-0 top-0 opacity-50"
            :src="character.splash_art_url"
            loading="lazy"
            alt=""
          />
          <div v-if="!character.splash_art_url"></div>
        </div>
        <div
          class="bg-secondary flex flex-col sm:flex-row justify-between rounded-b-2xl py-4 sm:py-6 border-0 border-t-2 border-solid border-black gap-3 sm:gap-0"
        >
          <div
            class="flex sm:hidden flex-row gap-3 items-center justify-left px-4"
          >
            <img
              class="w-10"
              :src="character.vision.image_url"
              loading="lazy"
              alt=""
            />
            <p
              v-if="character.vision.name"
              class="px-3 py-1 badge badge-soft badge-primary text-text text-xs"
            >
              {{ character.vision.name }}
            </p>
            <p
              v-if="character.role"
              class="px-3 py-1 badge badge-soft badge-primary text-text text-xs"
            >
              {{ character.role.name }}
            </p>
            <p
              v-if="character.weapon_type"
              class="px-3 py-1 badge badge-soft badge-primary text-text text-xs"
            >
              {{ character.weapon_type.name }}
            </p>
          </div>
          <div
            class="hidden sm:flex flex-row gap-2 lg:gap-4 items-center flex-wrap px-3"
          >
            <img
              class="w-10 sm:w-12 ml-0 sm:ml-2"
              :src="character.vision.img_url"
              loading="lazy"
              alt=""
            />
            <p
              v-if="character.vision.name"
              class="px-3 sm:px-4 py-1 sm:py-2 badge badge-soft badge-primary text-text text-xs sm:text-sm"
            >
              {{ character.vision.name }}
            </p>
            <p
              v-if="character.role"
              class="px-3 sm:px-4 py-1 sm:py-2 badge badge-soft badge-primary text-text text-xs sm:text-sm"
            >
              {{ character.role }}
            </p>
            <p
              v-if="character.weapon_type"
              class="px-3 sm:px-4 py-1 sm:py-2 badge badge-soft badge-primary text-text text-xs sm:text-sm"
            >
              {{ character.weapon_type.name }}
            </p>
            <p
              v-if="character.main_stat"
              class="px-3 sm:px-4 py-1 sm:py-2 badge badge-soft badge-primary text-text text-xs sm:text-sm"
            >
              {{ character.main_stat }}
            </p>
          </div>

          <div
            class="hidden sm:flex items-center justify-center sm:justify-end px-4"
          >
            <p
              class="px-3 sm:px-4 py-1 sm:py-2 badge badge-soft badge-primary text-text text-xs sm:text-sm"
            >
              <strong> Released: </strong>
              {{
                character.release_date
                  ? new Date(character.release_date).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "UPCOMING"
              }}
            </p>
          </div>
        </div>
      </RouterLink>
      <div ref="loadMoreTrigger" class="load-more-trigger" v-if="hasMore">
        <LoadingMoreSpinner />
      </div>
      <div v-if="filtering">
        <LoadingMoreSpinner />
      </div>
    </div>
    <div
      class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 btn btn-soft btn-info px-3 sm:px-4"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingMoreSpinner from "../components/Loadings/LoadingMoreSpinner.vue";
// state variables
const filtering = ref(false);
const loading = ref(false);
const error = ref(null);
// data states
const characters = ref([]);
const visions = ref([]);
const weapon_types = ref([]);
const regions = ref([]);
// drop down states
const visionDropdownOpen = ref(false);
const weaponDropdownOpen = ref(false);
const regionDropdownOpen = ref(false);
const selectedVision = ref(null);
const selectedWeapon = ref(null);
const selectedRegion = ref(null);
const visionDropdownRef = ref(null);
const weaponDropdownRef = ref(null);
const regionDropdownRef = ref(null);
// pagination states
const page = ref(1);
const pageSize = 10;
const hasMore = ref(true);
const loadMoreTrigger = ref(null);
// Intersection Observer instance
let observer = null;
// -------- Cache Functions -------------
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
// -------- Data Fetching Function --------
async function fetchVisions() {
  try {
    const cached = cache("visions");
    if (cached) {
      visions.value = cached;
      return;
    }
    let query = supabase.from("visions").select("*");
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    cache("visions", data);
    visions.value = data;
  } catch (err) {
    console.error("Error fetching visions:", err);
  }
}
async function fetchWeaponTypes() {
  try {
    const cached = cache("weapon_types");
    if (cached) {
      weapon_types.value = cached;
      return;
    }
    let query = supabase.from("weapon_types").select("*");
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    cache("weapon_types", data);
    weapon_types.value = data;
  } catch (err) {
    console.error("Error fetching weapon types:", err);
  }
}
async function fetchRegions() {
  try {
    const cached = cache("regions");
    if (cached) {
      regions.value = cached;
      return;
    }
    let query = supabase.from("regions").select("*");
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    cache("regions", data);
    regions.value = data;
  } catch (err) {
    console.error("Error fetching regions:", err);
  }
}
async function fetchCharacters({ reset = false } = {}) {
  if (reset) {
    page.value = 1;
    characters.value = [];
    hasMore.value = true;
  }
  if (!hasMore.value || loading.value) return;
  loading.value = true;
  const from = (page.value - 1) * pageSize;
  const to = from + pageSize - 1;
  try {
    const cached = cache("characters");
    if (cached && !reset) {
      characters.value = cached;
      hasMore.value = cached.length >= pageSize;
      loading.value = false;
      return;
    }
    let query = supabase
      .from("characters")
      .select(
        "*, vision(*), weapon_type(id, name), regions:character_region(region(id, name))",
      )
      .order("release_date", { ascending: false })
      .range(from, to);
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;

    if (data.length < pageSize) hasMore.value = false;
    characters.value.push(...data);
    page.value++;
    sessionStorage.setItem(
      "characters",
      JSON.stringify({
        characters: characters.value,
        page: page.value,
        hasMore: hasMore.value,
      }),
    );
  } catch (err) {
    error.value = err.message || "Failed to load characters";
  } finally {
    loading.value = false;
  }
}
// -------- Filter Functions -------------
function toggleVisionDropdown() {
  visionDropdownOpen.value = !visionDropdownOpen.value;
  if (visionDropdownOpen.value) {
    weaponDropdownOpen.value = false;
  }
  if (visionDropdownOpen) {
    regionDropdownOpen.value = false;
  }
}
function toggleWeaponDropdown() {
  weaponDropdownOpen.value = !weaponDropdownOpen.value;
  if (weaponDropdownOpen.value) {
    visionDropdownOpen.value = false;
  }
  if (weaponDropdownOpen.value) {
    regionDropdownOpen.value = false;
  }
}
function toggleRegionDropdown() {
  regionDropdownOpen.value = !regionDropdownOpen.value;
  if (regionDropdownOpen.value) {
    visionDropdownOpen.value = false;
  }
  if (regionDropdownOpen.value) {
    weaponDropdownOpen.value = false;
  }
}
function selectVision(vision) {
  selectedVision.value = vision;
  visionDropdownOpen.value = false;
}
function selectWeapon(weapon) {
  selectedWeapon.value = weapon;
  weaponDropdownOpen.value = false;
}
function selectRegion(region) {
  selectedRegion.value = region;
  regionDropdownOpen.value = false;
}
function handleClickOutside(event) {
  if (
    visionDropdownRef.value &&
    !visionDropdownRef.value.contains(event.target)
  ) {
    visionDropdownOpen.value = false;
  }
  if (
    weaponDropdownRef.value &&
    !weaponDropdownRef.value.contains(event.target)
  ) {
    weaponDropdownOpen.value = false;
  }
  if (
    regionDropdownRef.value &&
    !regionDropdownRef.value.contains(event.target)
  ) {
    regionDropdownOpen.value = false;
  }
}
// -------- Utility Functions -------------
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
function setupObserver() {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
    observer.disconnect();
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        console.log("▶ Sentinel visible → fetching next page...");
        fetchCharacters();
      }
    },
    {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    },
  );

  nextTick(() => {
    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value);
    }
  });
}
// -------- Computed Properties -------------

// -------- Lifecycle Hooks -------------
// on component mount, fetch initial data and setup observer
onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  await fetchVisions();
  await fetchWeaponTypes();
  await fetchRegions();
  const cached = sessionStorage.getItem("characters");
  if (cached) {
    const {
      characters: cachedChars,
      page: cachedPage,
      hasMore: cachedHasMore,
    } = JSON.parse(cached);
    characters.value = cachedChars;
    page.value = cachedPage;
    hasMore.value = cachedHasMore;
  } else {
    await fetchCharacters();
  }
  setupObserver();
});
// clean up observer on component unmount
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
    observer.disconnect();
  }
});
</script>
