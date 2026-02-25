<template>
  <div class="w-full md:mt-4">
    <div class="flex gap-5 items-center flex-wrap md:justify-center px-2">
      <div
        v-for="stars in [5, 4]"
        :key="stars"
        :class="selectedRarity === stars ? 'bg-filter-hover' : ''"
        class="bg-filter flex items-center px-4 py-1.5 rounded cursor-pointer transition-all duration-200 text-lg"
        @click="toggleRarity(stars)"
      >
        <span
          class="text-yellow-500"
          :class="
            selectedRarity === stars
              ? 'border-yellow-400'
              : 'border-transparent'
          "
          v-for="n in stars"
          :key="n"
          >★</span
        >
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

      <button class="btn btn-success" @click="applyFilters">Apply</button>
      <button class="btn btn-warning" @click="resetFilters">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { supabase } from "./../supabaseClient.js";

defineProps({
  characters: Object,
});

const emit = defineEmits(["filter", "reset"]);
//
const visions = ref([]);
const weapon_types = ref([]);
const regions = ref([]);
//
const visionDropdownOpen = ref(false);
const weaponDropdownOpen = ref(false);
const regionDropdownOpen = ref(false);
//
const selectedRarity = ref(null);
const selectedVision = ref(null);
const selectedWeapon = ref(null);
const selectedRegion = ref(null);
//
const visionDropdownRef = ref(null);
const weaponDropdownRef = ref(null);
const regionDropdownRef = ref(null);
const activeFilters = ref({ vision: null, weapon: null, region: null });

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
function toggleRarity(rarity) {
  selectedRarity.value = selectedRarity.value === rarity ? null : rarity;
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
function applyFilters() {
  activeFilters.value = {
    vision: selectedVision.value,
    weapon: selectedWeapon.value,
    region: selectedRegion.value,
    rarity: selectedRarity.value,
  };
  emit("filter", activeFilters.value);
}
function resetFilters() {
  selectedRarity.value = null;
  selectedVision.value = null;
  selectedWeapon.value = null;
  selectedRegion.value = null;
  activeFilters.value = {
    rarity: null,
    vision: null,
    weapon: null,
    region: null,
  };
  emit("reset");
}

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  await fetchVisions();
  await fetchWeaponTypes();
  await fetchRegions();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
