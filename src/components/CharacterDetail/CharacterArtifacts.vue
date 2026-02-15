<template>
  <section class="md:w-1/2">
    <h2 class="text-xl md:text-2xl font-semibold text-quaternary">Best Artifacts</h2>
    <div class="grid grid-cols-1 md:gap-6">
      <template v-for="a in character.artifacts" :key="a.artifact.name">
        <div class="flex items-center gap-3 md:backdrop-blur-xl p-4 rounded-xl">
          <div
            class="w-16 h-16 rarity-5 rounded-xl overflow-hidden flex-shrink-0"
          >
            <img
              class="w-full h-full object-cover"
              :src="a.artifact.flower_img_url"
              :alt="a.artifact.name"
            />
          </div>
          <div class="flex flex-col h-full justify-around flex-1 min-w-0">
            <p class="font-medium text-sm md:text-base truncate">
              {{ a.artifact.name }}
            </p>
            <button class="w-fit badge badge-soft badge-info">View</button>
          </div>
          <p
            class="p-2 rounded-full text-xs w-3 h-3 md:text-base md:w-6 md:h-6 flex items-center justify-center"
            :class="{
              'bg-yellow-500 text-black': a.rank === 1,
              'bg-gray-300 text-black': a.rank === 2,
              'bg-orange-600 text-black': a.rank === 3,
              'bg-tertiary': a.rank > 3,
            }"
          >
            {{ a.rank }}{{ getRankSuffix(a.rank) }}
          </p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  character: Object,
});
const getRankSuffix = (rank) => {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
};
</script>
