<template>
  <div
    v-if="character.builds?.length"
    class="flex flex-col gap-8 md:flex-row md:justify-around md:px-8"
  >
    <div class="md:w-1/2">
      <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
        Main Stats
      </h2>
      <div
        v-for="stat in getMainStats(character.builds[0].build_stat)"
        :key="stat.id"
        class="my-4 flex justify-between items-center bg-secondary p-2 rounded-lg"
      >
        <span class="capitalize badge badge-soft badge-warning">{{
          stat.slot
        }}</span>
        <strong>{{ stat.stat_id.name }}</strong>
      </div>
    </div>
    <div class="md:w-1/2">
      <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
        Substats
      </h2>
      <div
        v-for="stat in getSubstats(character.builds[0].build_stat)"
        :key="stat.id"
        class="my-4 flex justify-between items-center bg-secondary p-2 rounded-lg"
      >
        <span class="badge badge-soft badge-warning">{{ stat.rank }}</span>
        <strong>{{ stat.stat_id.name }}</strong>
      </div>
    </div>
  </div>
  <div class="px-8 md:pt-8 space-y-4">
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary divider">
      Build
    </h2>
    <MarkdownRender :content="character.builds[0].notes" />
  </div>
</template>

<script setup>
import MarkdownRender from "@/components/MarkdownRender.vue";

defineProps({
  character: Object,
});

const getMainStats = (buildStats) => {
  return buildStats
    .filter((stat) => stat.slot !== "substats")
    .sort((a, b) => {
      const order = { sands: 1, goblet: 2, circlet: 3 };
      return order[a.slot] - order[b.slot];
    });
};

const getSubstats = (buildStats) => {
  return buildStats
    .filter((stat) => stat.slot === "substats")
    .sort((a, b) => a.rank - b.rank);
};
</script>
