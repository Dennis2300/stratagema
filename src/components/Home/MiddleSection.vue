<template>
  <section
    class="w-full lg:w-3/4 bg-secondary p-4 sm:p-6 lg:p-8 rounded-2xl space-y-4"
  >
    <h2 class="divider w-full pb-4">Current Banner</h2>
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
    <div class="grid grid-cols-2 gap-y-8 pt-4 md:flex md:justify-around">
      <div v-for="a in currentBannerCharacters" :key="a.character_id.id">
        <RouterLink
          :to="`/characters/${a.character_id.id}?name=${encodeURIComponent(
            a.character_id.name,
          )}`"
          target="_blank"
          class="flex flex-col items-center gap-2 no-underline text-text group"
        >
          <div
            class="w-32 h-32 rounded-2xl"
            :class="{
              'rarity-5': a.character_id.rarity === 5,
              'rarity-4': a.character_id.rarity === 4,
            }"
          >
            <img
              class="w-full h-full object-cover object-center rounded-2xl"
              :src="a.character_id.avatar_url"
              alt=""
            />
          </div>
          <h3 class="group-hover:text-tertiary transition ease-in-out">{{ a.character_id.name }}</h3>
        </RouterLink>
      </div>
    </div>
    <div class="text-center mb-6">
      <p class="text-sm opacity-70">Ends: {{ formattedEndDate }}</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { supabase } from "@/supabaseClient";

const currentBannerCharacters = ref([]);
const currentTime = ref(Date.now());
let countdownInterval = null;

const countdownValues = computed(() => {
  if (!currentBannerCharacters.value.length) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const endDate = currentBannerCharacters.value[0].banner_id.end_date;
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

  const endDate = new Date(currentBannerCharacters.value[0].banner_id.end_date);
  return endDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

async function fetchCurrentBannerCharacters() {
  try {
    let query = supabase
      .from("character_banner")
      .select("*, banner_id(*), character_id(id, name, rarity, avatar_url)");
    const { data, error } = await query;
    if (error) throw error;
    currentBannerCharacters.value = data;
    console.log(currentBannerCharacters.value);
  } catch (err) {
    console.error("Error fetching Current Banners");
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
</style>
