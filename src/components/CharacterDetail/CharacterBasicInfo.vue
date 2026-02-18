<template>
  <div class="space-y-8">
    <section class="space-y-4 md:flex">
      <div
        class="flex flex-col items-center md:w-2/3 md:flex-row md:gap-6 md:justify-center"
      >
        <div class="relative">
          <img
            class="absolute w-12 -top-3 -left-3 bg-gray-700 rounded-full"
            :src="character.vision.img_url"
            alt=""
          />
          <div
            class="w-32 h-32 md:w-42 md:h-42 rounded-full overflow-hidden"
            :class="{
              'rarity-5': character.rarity === 5,
              'rarity-4': character.rarity === 4,
            }"
          >
            <img
              class="w-full h-full object-cover rounded-full"
              :src="character.img_url"
              :alt="character.name"
            />
          </div>
        </div>
        <div class="flex flex-col items-center md:items-start">
          <h1>{{ character.name }}</h1>
          <div class="flex flex-wrap justify-center gap-2">
            <p class="badge badge-primary">{{ character.vision.name }}</p>
            <p class="badge badge-primary">{{ character.weapon_type.name }}</p>
            <p class="badge badge-primary">{{ character.role }}</p>
            <p class="badge badge-primary">{{ character.main_stat }}</p>
          </div>
        </div>
      </div>
      <div class="space-y-2 md:w-1/3 md:flex md:flex-col md:justify-center">
        <h2 class="divider py-2">Voice Actors</h2>
        <template v-for="voice in character.voices" :key="voice.name">
          <div class="flex items-center gap-2 md:pl-4">
            <span :class="`fi fi-${voice.language} text-xl`"></span>
            <p>{{ voice.name }}</p>
          </div>
        </template>
      </div>
    </section>
    <section class="space-y-2">
      <h2>Regions</h2>
      <div class="flex flex-wrap gap-2">
        <template v-for="a in character.regions" :key="a.region.name">
          <p class="badge badge-primary">{{ a.region.name }}</p>
        </template>
      </div>
      <h2 class="pt-2">Affiliations</h2>
      <div class="flex flex-wrap gap-2">
        <template v-for="a in character.affiliations" :key="a.affiliation.name">
          <p class="badge badge-primary">{{ a.affiliation.name }}</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
