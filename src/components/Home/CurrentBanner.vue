<template>
  <section class="w-full md:w-2/3 rounded-2xl">
    <h1 class="divider w-full pb-6 text-quaternary">Current Banner</h1>
    <div class="text-center" v-if="loading">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
    <div v-if="!error" class="space-y-6">
      <div
        class="grid auto-cols-max grid-flow-col gap-5 text-center justify-center"
      >
        <div v-if="countdownValues.days > 0" class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span
              :style="`--value:${countdownValues.days};`"
              aria-live="polite"
              :aria-label="countdownValues.days"
            >
              {{ countdownValues.days }}
            </span>
          </span>
          days
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span
              :style="`--value:${countdownValues.hours};`"
              aria-live="polite"
              :aria-label="countdownValues.hours"
            >
              {{ countdownValues.hours }}
            </span>
          </span>
          hours
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span
              :style="`--value:${countdownValues.minutes};`"
              aria-live="polite"
              :aria-label="countdownValues.minutes"
            >
              {{ countdownValues.minutes }}
            </span>
          </span>
          min
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span
              :style="`--value:${countdownValues.seconds};`"
              aria-live="polite"
              :aria-label="countdownValues.seconds"
            >
              {{ countdownValues.seconds }}
            </span>
          </span>
          sec
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <template v-for="a in currentBannerCharacters" :key="a.character.id">
          <RouterLink
            :to="`/characters/${a.character.id}?name=${encodeURIComponent(
              a.character.name,
            )}`"
            target="_blank"
            class="flex flex-col items-center gap-2 no-underline text-text group"
          >
            <div
              class="w-32 h-32 rounded-2xl overflow-hidden transition-transform duration-200 ease-out group-hover:-translate-y-1"
              :class="{
                'rarity-5': a.character.rarity === 5,
                'rarity-4': a.character.rarity === 4,
              }"
            >
              <img
                class="w-full h-full object-cover object-center rounded-2xl transition-transform duration-300 ease-out group-hover:scale-105"
                :src="a.character.img_url"
                alt=""
              />
            </div>

            <h3
              class="text-center transition-colors duration-200 group-hover:text-tertiary"
            >
              {{ a.character.name }}
            </h3>
          </RouterLink>
        </template>
      </div>
      <div class="text-center mb-6">
        <p class="text-sm opacity-70">Ends: {{ formattedEndDate }}</p>
      </div>
    </div>
    <div class="text-center" v-else>
      <span class="badge badge-error"
        >Something went wrong, try again later!</span
      >
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { supabase } from "@/supabaseClient";

const currentBannerCharacters = ref([]);
const currentTime = ref(Date.now());
let countdownInterval = null;
const loading = ref(false);
const error = ref(false);

const countdownValues = computed(() => {
  if (!currentBannerCharacters.value.length) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const endDate = currentBannerCharacters.value[0].banner.end_date;
  const end = new Date(endDate).getTime();
  const now = currentTime.value;
  const difference = end - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
});

const formattedEndDate = computed(() => {
  if (!currentBannerCharacters.value.length) return "";

  const endDate = new Date(currentBannerCharacters.value[0].banner.end_date);
  return endDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
});

function cache(key, data = null, ttl = 60 * 60 * 1000) {
  const now = new Date().getTime();
  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
    return data;
  } else {
    const cachedItem = sessionStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  }
}

async function fetchCurrentBannerCharacters() {
  loading.value = true;
  const cacheKey = "current_banner_characters";

  const cachedData = cache(cacheKey);
  if (cachedData) {
    currentBannerCharacters.value = cachedData;
    loading.value = false;
    return;
  }

  try {
    let query = supabase
      .from("character_banner")
      .select(
        "*, banner(start_date, end_date), character(id, name, img_url, rarity)",
      );
    const { data, error } = await query;
    if (error) throw error;
    cache(cacheKey, data);
    currentBannerCharacters.value = data;
  } catch (err) {
    console.error("Error fetching Current Banners");
    error.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchCurrentBannerCharacters();
  countdownInterval = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>
