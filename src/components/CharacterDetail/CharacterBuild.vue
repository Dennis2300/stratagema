<template>
  <section class="space-y-6">
    <template v-for="build in character.builds">
      <h1 class="divider text-quaternary text-2xl">{{ build.title }}</h1>
      <div class="w-full space-y-8 md:space-y-0 md:flex gap-12">
        <div class="md:w-1/2 space-y-4">
          <h2 class="text-tertiary">Main Stats</h2>
          <div
            class="flex justify-between items-center bg-secondary py-3 px-4 rounded-lg"
            v-for="stat in getMainStats(build.stat)"
            :key="stat.slot"
          >
            <span class="capitalize">{{ stat.slot }}</span>
            <span class="text-warning" v-html="stat.stat"></span>
          </div>
        </div>
        <div class="md:w-1/2 space-y-4">
          <h2 class="text-tertiary">Substats</h2>
          <div
            class="flex justify-between items-center bg-secondary py-2 px-4 rounded-lg"
            v-for="stat in getSubstats(build.stat)"
            :key="stat.slot"
          >
            <span class="text-warning">{{ stat.stat }}</span>
            <p class="badge badge-primary">
              {{ stat.rank }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-secondary p-4 rounded-lg space-y-2">
        <h2 class="text-tertiary">Build Details</h2>
        <MarkdownRender v-if="build.details" :content="build.details" />
        <p v-else class="text-red-500">Come back later for the build details.</p>
      </div>
    </template>
  </section>
</template>

<script setup>
import MarkdownRender from "@/components/MarkdownRender.vue";

defineProps({
  character: Object,
});

function getMainStats(stats) {
  const mainStats = stats.filter((stat) => stat.slot !== "substat");
  return joinMainStats(mainStats);
}

function joinMainStats(mainStats) {
  const grouped = mainStats.reduce((acc, stat) => {
    if (!acc[stat.slot]) {
      acc[stat.slot] = [];
    }
    acc[stat.slot].push(stat.stat);
    return acc;
  }, {});
  return Object.entries(grouped).map(([slot, statValues]) => ({
    slot,
    stat:
      statValues.length >= 2
        ? statValues.join(' <span class="text-text">or</span> ')
        : statValues[0],
  }));
}

function getSubstats(stats) {
  return stats
    .filter((stat) => stat.slot === "substat")
    .sort((a, b) => a.rank - b.rank);
}
</script>
