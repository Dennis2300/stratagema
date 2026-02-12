<template>
  <div v-if="character.builds?.length" class="space-y-12">
    <div v-for="(build, index) in character.builds" :key="build.id || index">
      <h2 class="text-2xl md:text-3xl text-quaternary divider pb-6 md:px-8">
        {{ build.title }}
      </h2>
      <div class="flex flex-col gap-8 md:flex-row md:justify-around md:px-8">
        <div class="md:w-1/2">
          <h3>Main Stats</h3>
          <div
            class="my-3 p-2 flex justify-between items-center bg-secondary rounded-lg"
            v-for="stat in formatMainStats(build.build_stat)"
            :key="stat.id"
          >
            <span class="capitalize badge badge-soft badge-warning">{{
              stat.slot
            }}</span>
            <strong v-html="stat.stat_id.name"></strong>
          </div>
        </div>
        <div class="md:w-1/2">
          <h3>Substats</h3>
          <div
            class="my-3 p-2 flex justify-between items-center bg-secondary rounded-lg"
            v-for="stat in formatSubStats(build.build_stat)"
            :key="stat.id"
          >
            <span class="badge badge-soft badge-warning">{{ stat.rank }}</span>
            <strong>{{ stat.stat_id.name }}</strong>
          </div>
        </div>
      </div>

      <div class="px-8 md:pt-8 space-y-4">
        <h3 class="text-quaternary divider">Build Details</h3>
        <MarkdownRender :content="build.notes" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownRender from "@/components/MarkdownRender.vue";

defineProps({
  character: Object,
});

function joinDuplicateSlots(stats) {
  return stats.reduce((acc, stat) => {
    const existing = acc.find((item) => item.slot === stat.slot);
    if (existing) {
      existing.stat_id = {
        ...existing.stat_id,
        name: `${existing.stat_id.name} <span class="block text-center sm:inline text-accent"><span class="hidden sm:inline"> </span>or</span> ${stat.stat_id.name}`,
      };
    } else {
      acc.push({ ...stat });
    }
    return acc;
  }, []);
}

function formatMainStats(buildStats) {
  const filtered = buildStats.filter((stat) => stat.slot !== "substats");
  const sorted = filtered.sort((a, b) => {
    const order = { sands: 1, goblet: 2, circlet: 3 };
    return order[a.slot] - order[b.slot];
  });
  return joinDuplicateSlots(sorted);
}

function formatSubStats(buildStats) {
  return buildStats
    .filter((stat) => stat.slot === "substats")
    .sort((a, b) => a.rank - b.rank);
}
</script>
