<template>
  <div class="rounded-lg md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-2">Regions</h2>

    <template v-if="character.regions?.length">
      <div class="flex flex-col md:flex-row gap-4">
        <div
          v-for="region in character.regions"
          :key="region.region_id.id"
          class="rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
        >
          <p
            class="font-semibold text-base-content md:text-lg md:badge md:badge-primary md:px-4 md:py-2"
          >
            {{ region.region_id.name }}
          </p>
        </div>
      </div>
    </template>

    <div v-else class="bg-error/10 border border-error/20 rounded-lg p-4">
      <p class="text-error font-semibold flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Not Revealed
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
