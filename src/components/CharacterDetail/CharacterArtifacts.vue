<template>
  <div
    v-if="character.artifacts?.length > 0"
    class="bg-base-200/50 rounded-lg p-6 md:p-8"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
      Best Artifacts
    </h2>

    <div class="grid grid-cols-1 gap-4 md:gap-6">
      <template v-for="(group, rank) in artifactsByRank" :key="rank">
        <div
          class="relative bg-base-300/50 hover:bg-base-300/80 p-4 md:p-6 rounded-xl border border-transparent hover:border-primary/30 transition-all duration-200"
        >
          <!-- Rank Badge -->
          <div class="absolute top-3 right-3 z-10">
            <span
              class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-lg md:text-xl font-bold rounded-full border-2 border-white shadow-lg"
              :class="{
                'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black rank-shine':
                  rank == 1,
                'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                  rank == 2,
                'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                  rank == 3,
                'bg-gradient-to-b from-slate-500 to-slate-700 text-white':
                  rank > 3,
              }"
            >
              {{ rank }}
            </span>
          </div>

          <!-- Artifacts in this rank -->
          <div class="flex flex-col gap-4 md:gap-6">
            <div
              v-for="artifact in group"
              :key="artifact.id"
              class="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <!-- Artifact Image -->
              <img
                class="w-20 h-20 md:w-24 md:h-24 rounded-xl flex-shrink-0 rarity-5"
                v-if="artifact.artifact_id.flower_img_url"
                :src="artifact.artifact_id.flower_img_url"
                :alt="artifact.artifact_id.name"
              />
              <div
                v-else
                class="w-20 h-20 md:w-24 md:h-24 rounded-xl flex-shrink-0 bg-base-100 flex items-center justify-center text-base-content/40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Artifact Info -->
              <div class="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
                <div class="flex flex-col">
                  <span
                    class="text-xs md:text-sm text-primary font-semibold uppercase tracking-wide"
                  >
                    {{ group.length === 2 ? "2-Piece" : "4-Piece" }}
                  </span>
                  <h3
                    class="text-lg md:text-xl font-bold text-base-content truncate"
                  >
                    {{ artifact.artifact_id.name }}
                  </h3>
                </div>

                <div class="flex flex-col sm:flex-row gap-2 flex-wrap">
                  <span class="badge badge-accent badge-md md:badge-lg">
                    {{ artifact.artifact_id.two_piece.name }}
                  </span>

                  <button
                    v-if="group.length === 1"
                    class="badge badge-info badge-md md:badge-lg cursor-pointer hover:badge-info/80 transition-colors gap-1"
                    @click="openBox(artifact.artifact_id.four_piece)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    View 4-Piece
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Modal for 4-Piece Effect -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isOpen"
          class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          @click.self="closeBox"
        >
          <div
            class="bg-base-100 border border-primary/20 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden"
          >
            <div
              class="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 border-b border-base-300"
            >
              <h3
                class="text-xl md:text-2xl font-bold text-text flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clip-rule="evenodd"
                  />
                </svg>
                4-Piece Effect
              </h3>
            </div>

            <div class="px-6 pb-4">
              <p class="text-base md:text-lg text-base-content leading-relaxed">
                {{ selectedFourPiece }}
              </p>
            </div>

            <div class="p-6 pt-0 flex justify-end">
              <button
                class="btn btn-primary btn-sm md:btn-md"
                @click="closeBox"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  character: Object,
});

const isOpen = ref(false);
const selectedFourPiece = ref("");

function openBox(text) {
  selectedFourPiece.value = text;
  isOpen.value = true;
}

function closeBox() {
  isOpen.value = false;
}

const artifactsByRank = computed(() => {
  const groups = {};
  for (const art of props.character.artifacts || []) {
    if (!groups[art.rank]) groups[art.rank] = [];
    groups[art.rank].push(art);
  }
  return groups;
});
</script>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rank-shine {
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% {
    box-shadow:
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 30px rgba(255, 215, 0, 0.6);
  }
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-base-100,
.modal-leave-active .bg-base-100 {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-base-100,
.modal-leave-to .bg-base-100 {
  transform: scale(0.9);
}
</style>
