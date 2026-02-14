<template>
  <div class="relative z-10 space-y-4">
    <section class="space-y-4 md:flex">
      <div class="flex flex-col items-center md:w-2/3">
        <div
          class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden"
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
        <h1 class="">{{ character.name }}</h1>
        <div class="flex flex-wrap justify-center gap-2">
          <p class="badge badge-primary">{{ character.vision }}</p>
          <p class="badge badge-primary">{{ character.weapon_type.name }}</p>
          <p class="badge badge-primary">{{ character.role }}</p>
          <p class="badge badge-primary">{{ character.main_stat }}</p>
        </div>
      </div>
      <div class="space-y-2 md:w-1/3 md:flex md:flex-col md:justify-center">
        <h2 class="divider py-2">Voice Actors</h2>
        <template v-for="voice in character.voices" :key="voice.name">
          <div class="flex items-center gap-2 pl-4">
            <span :class="`fi fi-${voice.language} text-xl`"></span>
            <p>{{ voice.name }}</p>
          </div>
        </template>
      </div>
    </section>
    <section class="space-y-4">
      <div class="flex flex-col gap-2">
        <h2>Regions</h2>
        <template v-for="a in character.regions" :key="a.region.name">
          <p class="badge badge-primary">{{ a.region.name }}</p>
        </template>
      </div>
      <div class="flex flex-col gap-2">
        <h2>Affiliations</h2>
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

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow:
    0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>
