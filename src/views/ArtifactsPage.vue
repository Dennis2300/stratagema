<template>
  <LoadingSpinner v-if="loading" />
  <main v-else class="px-4 md:px-8 lg:px-24">
    <h1 class="divider">Artifacts</h1>

    <transition name="fade-slide" mode="out-in">
      <div
        :key="currentPage"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-8"
      >
        <template
          v-for="(artifact, index) in paginatedArtifacts"
          :key="artifact.id"
        >
          <div
            class="artifact-card text-center bg-primary md:bg-secondary p-4 md:px-8 md:py-4 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="toggleArtifact(artifact.id)"
          >
            <img
              class="w-20 md:w-32 mx-auto"
              :src="artifact.flower_img_url"
              alt=""
            />
            <h3
              class="w-full truncate tracking-wide font-acme mt-2 text-sm md:text-base"
            >
              {{ artifact.name }}
            </h3>
          </div>
        </template>
      </div>
    </transition>

    <!-- Pagination Controls -->
    <div class="flex justify-center items-center gap-2 md:gap-4 flex-wrap mt-8">
      <button
        @click="currentPage = 1"
        :disabled="currentPage === 1"
        class="btn btn-primary hidden md:inline-flex btn-sm md:btn-md"
      >
        First
      </button>

      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="btn btn-primary btn-sm md:btn-md"
      >
        Previous
      </button>

      <div class="flex gap-1 md:hidden">
        <button class="btn btn-accent min-w-[40px] btn-sm">
          {{ currentPage }}
        </button>
        <button
          v-if="currentPage < totalPages"
          @click="currentPage = currentPage + 1"
          class="btn btn-primary min-w-[40px] btn-sm"
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
          class="btn min-w-[48px] btn-md"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="btn btn-primary btn-sm md:btn-md"
      >
        Next
      </button>

      <button
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        class="btn btn-primary hidden md:inline-flex btn-sm md:btn-md"
      >
        Last
      </button>
    </div>

    <p class="text-center text-gray-400 text-sm md:text-base mt-4">
      Showing {{ startIndex + 1 }}-{{ endIndex }} of
      {{ artifacts.length }} artifacts
    </p>

    <!-- Popup Overlay -->
    <transition name="fade">
      <div
        v-if="expandedArtifact"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        @click.self="closeArtifact"
      >
        <div
          class="bg-primary w-full md:w-[700px] lg:w-[800px] max-h-[90vh] md:max-h-[600px] p-4 md:p-6 rounded-xl relative overflow-y-scroll"
        >
          <button
            class="btn btn-circle btn-sm absolute top-3 right-3 md:top-5 md:right-5 z-10"
            @click="closeArtifact"
          >
            ✕
          </button>

          <!-- Find the selected artifact -->
          <div v-if="selectedArtifact">
            <h1 class="text-2xl md:text-4xl font-acme tracking-wide pr-8">
              {{ selectedArtifact.name }}
            </h1>
            <div
              class="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 mt-6 md:mt-8"
            >
              <img
                class="w-16 md:w-24"
                :src="selectedArtifact.flower_img_url"
                alt=""
              />
              <img
                class="w-16 md:w-24"
                :src="selectedArtifact.plume_img_url"
                alt=""
              />
              <img
                class="w-16 md:w-24"
                :src="selectedArtifact.sands_img_url"
                alt=""
              />
              <img
                class="w-16 md:w-24"
                :src="selectedArtifact.goblet_img_url"
                alt=""
              />
              <img
                class="w-16 md:w-24"
                :src="selectedArtifact.circlet_img_url"
                alt=""
              />
            </div>
            <div class="divider m-0 my-4"></div>
            <div class="px-4 md:px-10">
              <div class="my-4">
                <h2
                  class="mb-2 text-tertiary font-semibold text-base md:text-lg"
                >
                  2 Piece Set Bonus
                </h2>
                <p class="text-sm md:text-base">
                  {{ selectedArtifact.two_piece.name }}
                </p>
              </div>
              <div class="my-4">
                <h2
                  class="mb-2 text-tertiary font-semibold text-base md:text-lg"
                >
                  4 Piece Set Bonus
                </h2>
                <p class="text-sm md:text-base">
                  {{ selectedArtifact.four_piece }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

const loading = ref(true);
const error = ref(null);
const artifacts = ref([]);
const expandedArtifact = ref(null);
const currentPage = ref(1);
const itemsPerPage = 12;

// Watch for page changes and scroll to top
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Computed properties for pagination
const totalPages = computed(() =>
  Math.ceil(artifacts.value.length / itemsPerPage),
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);

const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage;
  return end > artifacts.value.length ? artifacts.value.length : end;
});

const paginatedArtifacts = computed(() => {
  return artifacts.value.slice(startIndex.value, endIndex.value);
});

// Show max 5 page numbers at a time
const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  // Adjust start if we're near the end
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

function toggleArtifact(id) {
  expandedArtifact.value = expandedArtifact.value === id ? null : id;
}

function closeArtifact() {
  expandedArtifact.value = null;
}

async function getAllArtifacts() {
  try {
    const cached = cache("artifacts");
    if (cached) {
      artifacts.value = cached;
      return;
    }
    const { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("*, two_piece:twoPieceSets(name)");
    if (fetchError) throw fetchError;
    cache("artifacts", data);
    artifacts.value = data;
  } catch (err) {
    error.value = err.message || "Failed to load artifacts";
  } finally {
    loading.value = false;
  }
}

const selectedArtifact = computed(() =>
  artifacts.value.find((a) => a.id === expandedArtifact.value),
);

onMounted(() => {
  getAllArtifacts();
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
