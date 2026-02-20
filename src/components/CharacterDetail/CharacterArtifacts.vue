<template>
  <section class="md:w-1/2">
    <h2 class="text-xl md:text-2xl font-semibold text-quaternary">
      Best Artifacts
    </h2>
    <div class="grid grid-cols-1 md:gap-4">
      <template v-for="a in combinedArtifacts" :key="a.key">
        <div class="flex items-center gap-3 md:backdrop-blur-xl p-4 rounded-xl">
          <div class="flex flex-col gap-4 flex-shrink-0">
            <div class="w-16 h-16 rarity-5 rounded-xl overflow-hidden">
              <img
                class="w-full h-full object-cover"
                :src="a.first.artifact.flower_img_url"
                :alt="a.first.artifact.name"
              />
            </div>
            <div
              v-if="a.combined"
              class="w-16 h-16 rarity-5 rounded-xl overflow-hidden"
            >
              <img
                class="w-full h-full object-cover"
                :src="a.second.artifact.flower_img_url"
                :alt="a.second.artifact.name"
              />
            </div>
          </div>
          <div
            class="flex flex-col h-full justify-around flex-1 min-w-0"
            :class="a.combined ? 'gap-1' : ''"
          >
            <div class="flex flex-col min-w-0">
              <p class="font-medium text-sm md:text-base truncate">
                {{ a.first.artifact.name }}
              </p>
              <div class="flex gap-2">
                <span class="badge badge-soft badge-warning">{{
                  a.first.artifact.two_piece_effect.name
                }}</span>
                <button
                  v-if="!a.combined"
                  class="w-fit btn btn-primary btn-xs"
                  @click="openModal(a.first.artifact)"
                >
                  View
                </button>
              </div>
            </div>
            <div v-if="a.combined" class="flex flex-col min-w-0">
              <p class="font-medium text-sm md:text-base truncate">
                {{ a.second.artifact.name }}
              </p>
              <div class="flex gap-2">
                <span class="badge badge-soft badge-warning">{{
                  a.second.artifact.two_piece_effect.name
                }}</span>
              </div>
            </div>
          </div>
          <p class="badge badge-primary">{{ a.rank }}</p>
        </div>
        <div
          v-if="showModal && selectedArtifact"
          class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div
            class="bg-base-200 rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 shadow-xl"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-quaternary">
                {{ selectedArtifact.name }}
              </h3>
              <button
                class="btn btn-sm btn-ghost btn-circle"
                @click="closeModal"
              >
                ✕
              </button>
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="grid grid-cols-5 gap-2">
                  <div
                    v-for="piece in artifactPieces"
                    :key="piece.key"
                    class="flex flex-col items-center gap-1"
                  >
                    <div class="w-14 h-14 rarity-5 rounded-xl overflow-hidden">
                      <img
                        class="w-full h-full object-cover"
                        :src="selectedArtifact[piece.key]"
                        :alt="piece.label"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-base-300 rounded-xl p-3 mt-2">
                <p class="text-xs text-warning font-semibold mb-1">
                  2-Piece Effect
                </p>
                <p class="text-sm">
                  {{ selectedArtifact.two_piece_effect.name }}
                </p>
              </div>
              <div class="bg-base-300 rounded-xl p-3">
                <p class="text-xs text-warning font-semibold mb-1">
                  4-Piece Effect
                </p>
                <p class="text-sm">
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
