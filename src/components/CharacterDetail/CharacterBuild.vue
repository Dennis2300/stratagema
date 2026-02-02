<template>
  <div
    v-if="character.builds?.length"
    class="bg-base-200/50 rounded-lg p-6 md:p-8"
  >
    <div
      v-for="(build, buildIndex) in character.builds"
      :key="buildIndex"
      class="space-y-6"
    >
      <!-- Main Stats Section -->
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
          Main Stats
        </h2>

        <div class="grid grid-cols-1 gap-4 md:w-1/2 mx-auto">
          <!-- Sands -->
          <div
            v-for="slot of ['sands']"
            :key="slot"
            class="bg-base-300/50 rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-base-300"
          >
            <p
              class="text-base md:text-lg font-bold text-base-content capitalize flex items-center gap-2"
            >
              {{ slot }}
            </p>
            <p class="text-sm md:text-base text-accent font-medium">
              {{
                build.build_stat
                  .filter((stat) => stat.slot === slot)
                  .map((stat) => stat.stat_id.name)
                  .join(" or ")
              }}
            </p>
          </div>

          <!-- Goblet -->
          <div
            v-for="slot of ['goblet']"
            :key="slot"
            class="bg-base-300/50 rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-base-300"
          >
            <p
              class="text-base md:text-lg font-bold text-base-content capitalize flex items-center gap-2"
            >
              {{ slot }}
            </p>
            <p class="text-sm md:text-base text-accent font-medium">
              {{
                build.build_stat
                  .filter((stat) => stat.slot === slot)
                  .map((stat) => stat.stat_id.name)
                  .join(" / ")
              }}
            </p>
          </div>

          <!-- Circlet -->
          <div
            v-for="slot of ['circlet']"
            :key="slot"
            class="bg-base-300/50 rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-base-300"
          >
            <p
              class="text-base md:text-lg font-bold text-base-content capitalize flex items-center gap-2"
            >
              {{ slot }}
            </p>
            <p class="text-sm md:text-base text-accent font-medium">
              {{
                build.build_stat
                  .filter((stat) => stat.slot === slot)
                  .map((stat) => stat.stat_id.name)
                  .join(" or ")
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Substats Section -->
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
          Substats Priority
        </h2>

        <div
          class="bg-base-300/50 rounded-lg p-4 md:p-5 border border-base-300"
        >
          <div class="space-y-3 md:w-1/2 md:mx-auto">
            <div
              v-for="(stat, index) in build.build_stat
                .filter((s) => s.slot === 'substats')
                .sort((a, b) => a.rank - b.rank)"
              :key="stat.id"
              class="flex items-center gap-3 text-sm md:text-base"
            >
              <span
                class="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-content font-bold text-sm flex-shrink-0"
              >
                {{ index + 1 }}
              </span>
              <span class="text-base-content font-medium">
                {{ stat.stat_id.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes Section -->
      <div
        v-if="build.notes"
        class="bg-base-300/50 rounded-lg p-4 md:p-6 border border-base-300"
      >
        <div class="prose prose-sm md:prose-base max-w-none prose-invert">
          <MarkdownRender :content="build.notes" />
        </div>
      </div>

      <!-- Divider between multiple builds -->
      <div
        v-if="buildIndex < character.builds.length - 1"
        class="divider"
      ></div>
    </div>
  </div>
</template>

<script setup>
import MarkdownRender from "@/components/MarkdownRender.vue";

defineProps({
  character: Object,
});
</script>
