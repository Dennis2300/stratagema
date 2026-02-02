<template>
  <div class="bg-base-200/50  rounded-lg p-6 md:p-8">
    <!-- Avatar Section -->
    <div class="flex flex-col md:flex-row items-center gap-4 mb-6">
      <figure class="relative">
        <img
          class="bg-primary rounded-full absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-14 md:h-14 p-2 shadow-lg z-10"
          :src="character.vision.image_url"
          alt=""
        />
        <img
          class="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover border-4 border-base-300"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
          :src="character.avatar_url"
          :alt="character.name"
        />
      </figure>

      <!-- Info Section -->
      <div class="flex flex-col gap-4 text-center md:text-left w-full">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text">
          {{ character.name }}
        </h1>
        
        <div class="flex flex-wrap gap-2 justify-center md:justify-start">
          <span v-if="character.vision" class="badge badge-lg badge-primary gap-2">
            {{ character.vision.name }}
          </span>
          <span v-if="character.weapon_type" class="badge badge-lg badge-primary gap-2">
            {{ character.weapon_type.name }}
          </span>
          <span v-if="character.main_stat" class="badge badge-lg badge-primary gap-2">
            {{ character.main_stat.name }}
          </span>
          <span v-if="character.role" class="badge badge-lg badge-primary gap-2">
            {{ character.role.name }}
          </span>
        </div>
      </div>
    </div>
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