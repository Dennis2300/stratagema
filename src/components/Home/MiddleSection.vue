<template>
  <section class="w-full lg:w-3/4 bg-secondary p-4 sm:p-6 lg:p-8 rounded-2xl">
    <h2 class="divider w-full pb-4">Current Banner</h2>
    <div class="flex py-4 justify-around">
      <div
        v-for="a in currentBannerCharacters"
        :key="a.character_id.id"
        class="text-center space-y-2"
      >
        <div
          class="w-32 h-32 rounded-2xl"
          :class="{
            'rarity-5': a.character_id.rarity === 5,
            'rarity-4': a.character_id.rarity === 4,
          }"
        >
          <img
            class="w-full h-full object-cover object-center"
            :src="a.character_id.avatar_url"
            alt=""
          />
        </div>
        <h4>{{ a.character_id.name }}</h4>
      </div>
    </div>
    <div class="text-center my-2">
      <p class="text-2xl font-semibold">
        <span>Days left: </span>{{ countdown }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { supabase } from "@/supabaseClient";

const currentBannerCharacters = ref([]);
const currentTime = ref(Date.now());
let countdownInterval = null;

const countdown = computed(() => {
  if (!currentBannerCharacters.value.length) return "";

  const endDate = currentBannerCharacters.value[0].banner_id.end_date;
  const end = new Date(endDate).getTime();
  const now = currentTime.value;
  const difference = end - now;

  if (difference <= 0) {
    return "Banner ended";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
});

async function fetchCurrentBannerCharacters() {
  try {
    let query = supabase
      .from("character_banner")
      .select("*, banner_id(*), character_id(name, rarity, avatar_url)");
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

<style>
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
