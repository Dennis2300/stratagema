<template>
  <main class="space-y-6 px-4 pb-8 min-h-screen">
    <LoadingSpinner v-if="loading" />
    <section v-else-if="!loading">
      <h1 class="divider pb-8">Artifacts</h1>
      <div class="flex justify-center">
        <input
          v-model="search"
          type="text"
          placeholder="Search artifacts..."
          class="input input-bordered w-full max-w-sm mb-6"
        />
      </div>
      <div class="grid md:grid-cols-4 gap-6">
        <template v-for="artifact in filteredArtifacts" :key="artifact.id">
          <div
            @click="selectedArtifact = artifact"
            class="flex flex-col items-center justify-center bg-secondary pb-4 rounded-xl hover:bg-filter-hover transition cursor-pointer"
          >
            <img class="w-32" :src="artifact.flower_img_url" alt="" />
            <p>{{ artifact.name }}</p>
          </div>
        </template>
      </div>
      <div
        v-if="selectedArtifact"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="selectedArtifact = null"
      >
        <div class="bg-secondary rounded-2xl p-6 relative w-[560px] shadow-xl">
          <div
            class="absolute top-4 right-4 text-red-500 cursor-pointer"
            @click="selectedArtifact = null"
          >
            ✕
          </div>
          <h3 class="text-xl font-bold mb-5">{{ selectedArtifact.name }}</h3>
          <div class="flex justify-between bg-base-100/30 rounded-xl p-3">
            <template v-for="type in artifactTypes" :key="type">
              <img
                v-if="selectedArtifact?.[`${type}_img_url`]"
                class="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-md"
                :src="selectedArtifact[`${type}_img_url`]"
                :alt="type"
                loading="lazy"
              />
            </template>
          </div>
          <div class="flex flex-col gap-3 mt-2">
            <div class="bg-base-100/30 rounded-xl">
              <p class="text-xs font-bold uppercase tracking-widest opacity-40">
                2-Piece
              </p>
              <p class="text-sm opacity-80">
                {{ selectedArtifact.two_piece_effect.name }}
              </p>
            </div>
            <div class="bg-base-100/30 rounded-xl">
              <p class="text-xs font-bold uppercase tracking-widest opacity-40">
                4-Piece
              </p>
              <p class="text-sm opacity-80">
                {{ selectedArtifact.four_piece_effect }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center flex flex-col items-center gap-8" v-if="loading">
      <img
        class="w-48"
        src="https://upload-static.hoyoverse.com/hoyolab-wiki/2023/10/14/151578876/2e03d2af283a8f13053a757f7497d6d8_4575400536973253402.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <p class="badge badge-error">Something went wrong, try again later!</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

const loading = ref(false);
const error = ref(null);
const artifacts = ref([]);
const selectedArtifact = ref(null);
const search = ref("");

const artifactTypes = ["flower", "plume", "sands", "goblet", "circlet"];

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
const filteredArtifacts = computed(() => {
  if (!search.value) return artifacts.value;
  return artifacts.value.filter((artifact) =>
    artifact.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});

async function fetchArtifacts() {
  loading.value = true;
  try {
    const cached = cache("artifacts");
    if (cached) {
      artifacts.value = cached;
      loading.value = false;
      return;
    }
    const { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("*, two_piece_effect(*)");
    if (fetchError) throw fetchError;
    cache("artifacts", data);
    artifacts.value = data;
    console.log(artifacts.value);
  } catch (err) {
    error.value = err.message || "Failed to load artifacts";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchArtifacts();
});
</script>

<style scoped>
.artifact-card {
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

.artifact-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.artifact-card:active {
  transform: scale(0.98);
}

/* Page transition effects */
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
