<template>
  <section v-if="teams?.length > 0">
    <h1 class="divider text-quaternary text-2xl">{{ character.name }} Teams</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 text-center gap-8 mt-6">
      <template v-for="team in teams">
        <div class="bg-secondary pb-4 rounded-xl">
          <h2 class="my-3 text-tertiary">{{ team.name }}</h2>
          <div class="flex justify-center gap-8">
            <template v-for="member in team.members">
              <RouterLink
                class="no-underline text-text space-y-1 hover:text-tertiary transition"
                :class="{
                  'pointer-events-none': member.character.id === character.id,
                }"
                :to="`/characters/${member.character.id}`"
                target="_blank"
              >
                <div
                  class="w-24 h-24 rounded-xl overflow-hidden"
                  :class="{
                    'rarity-5': member.character.rarity === 5,
                    'rarity-4': member.character.rarity === 4,
                  }"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="member.character.img_url"
                    :alt="member.character.name"
                  />
                </div>
                <h4 class="w-24 truncate">{{ member.character.name }}</h4>
              </RouterLink>
            </template>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  teams: {
    type: Array,
    required: true,
  },
  character: Object,
});
</script>
