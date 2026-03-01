<template>
  <section class="md:w-1/2 space-y-6">
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary tracking-tight">
      Best Artifacts
    </h2>
    <div class="space-y-8">
      <template v-for="a in combinedArtifacts" :key="a.key">
        <div
          class="relative flex gap-4 p-5 rounded-2xl bg-base-200/70 backdrop-blur-xl border border-base-300/50 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
        >
          <div
            class="absolute -top-3 -right-3 badge badge-primary badge-lg shadow-lg"
          >
            #{{ a.rank }}
          </div>
          <div class="flex flex-col gap-3 flex-shrink-0">
            <div
              class="w-16 h-16 rounded-xl overflow-hidden rarity-5"
            >
              <img
                class="w-full h-full object-cover"
                :src="a.first.artifact.flower_img_url"
                :alt="a.first.artifact.name"
              />
            </div>
            <div
              v-if="a.combined"
              class="w-16 h-16 rounded-xl overflow-hidden rarity-5"
            >
              <img
                class="w-full h-full object-cover"
                :src="a.second.artifact.flower_img_url"
                :alt="a.second.artifact.name"
              />
            </div>
          </div>
          <div class="flex flex-col justify-between flex-1 min-w-0">
            <div class="space-y-1">
              <p class="font-semibold text-base truncate">
                {{ a.first.artifact.name }}
              </p>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="badge badge-warning badge-soft text-xs">
                  {{ a.first.artifact.two_piece_effect.name }}
                </span>
                <button
                  v-if="!a.combined"
                  class="btn btn-xs btn-primary"
                  @click="openModal(a.first.artifact)"
                >
                  Details
                </button>
              </div>
            </div>
            <div v-if="a.combined" class="space-y-1 mt-3">
              <p class="font-semibold text-base truncate">
                {{ a.second.artifact.name }}
              </p>
              <span class="badge badge-warning badge-outline text-xs">
                {{ a.second.artifact.two_piece_effect.name }}
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="showModal && selectedArtifact"
          class="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          @click.self="closeModal"
        >
          <div
            class="bg-base-100 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6 border border-base-300"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold">
                {{ selectedArtifact.name }}
              </h3>
              <button
                class="btn btn-sm btn-circle btn-ghost"
                @click="closeModal"
              >
                ✕
              </button>
            </div>
            <div class="grid grid-cols-5 gap-3">
              <div
                v-for="piece in artifactPieces"
                :key="piece.key"
                class="flex justify-center"
              >
                <div
                  class="w-16 h-16 rounded-xl overflow-hidden rarity-5"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="selectedArtifact[piece.key]"
                    :alt="piece.label"
                  />
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="p-4 rounded-xl bg-base-200 border border-base-300">
                <p
                  class="text-xs font-semibold text-warning uppercase tracking-wide mb-1"
                >
                  2-Piece Effect
                </p>
                <p class="text-sm opacity-90">
                  {{ selectedArtifact.two_piece_effect.name }}
                </p>
              </div>
              <div class="p-4 rounded-xl bg-base-200 border border-base-300">
                <p
                  class="text-xs font-semibold text-warning uppercase tracking-wide mb-1"
                >
                  4-Piece Effect
                </p>
                <p class="text-sm opacity-90">
                  {{ selectedArtifact.four_piece_effect }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  character: Object,
});

const artifactPieces = [
  { key: "flower_img_url", label: "Flower" },
  { key: "plume_img_url", label: "Plume" },
  { key: "sands_img_url", label: "Sands" },
  { key: "goblet_img_url", label: "Goblet" },
  { key: "circlet_img_url", label: "Circlet" },
];

const selectedArtifact = ref(null);
const showModal = ref(false);

function openModal(artifact) {
  selectedArtifact.value = artifact;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedArtifact.value = null;
}

function combineTwoArtifactsByRank(artifacts) {
  const result = [];
  const used = new Set();

  for (let i = 0; i < artifacts.length; i++) {
    if (used.has(i)) continue;

    let paired = false;
    for (let j = i + 1; j < artifacts.length; j++) {
      if (!used.has(j) && artifacts[j].rank === artifacts[i].rank) {
        result.push({
          key: `${artifacts[i].artifact.name}-${artifacts[j].artifact.name}`,
          combined: true,
          rank: artifacts[i].rank,
          first: artifacts[i],
          second: artifacts[j],
        });
        used.add(i);
        used.add(j);
        paired = true;
        break;
      }
    }

    if (!paired) {
      result.push({
        key: artifacts[i].artifact.name,
        combined: false,
        rank: artifacts[i].rank,
        first: artifacts[i],
      });
      used.add(i);
    }
  }

  return result;
}

const combinedArtifacts = computed(() =>
  combineTwoArtifactsByRank(props.character?.artifacts ?? []),
);
</script>
