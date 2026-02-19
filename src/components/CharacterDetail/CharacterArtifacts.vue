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
                  class="w-fit badge badge-soft badge-info"
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
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: Object,
});

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
