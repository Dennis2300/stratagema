<template>
  <section v-if="teams.length > 0">
    <h1>Teams</h1>
    <template v-for="team in teams" :key="team.id">
      <h3>{{ team.name }}</h3>
      <p>{{ team.detail }}</p>
      <div class="flex gap-6 items-center">
        <template v-for="member in team.members" :key="member.id">
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 rounded-2xl overflow-hidden"
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
            <p>{{ member.character.name }}</p>
          </div>
        </template>
      </div>
    </template>
  </section>
  <section v-else>
    <h1>Teams</h1>
    <p>No teams found.</p>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  teams: {
    type: Array,
    required: true,
  },
});
</script>
