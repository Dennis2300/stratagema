<template>
  <section>
    <h1 class="text-quaternary">{{ character.name }} Info</h1>
    <div class="space-y-4">
      <div class="flex justify-between h-[32px] items-center">
        <p>Rarity</p>
        <div class="text-yellow-500">
          <span class="md:text-3xl" v-for="n in character.rarity" :key="n"
            >★</span
          >
        </div>
      </div>
      <div class="flex justify-between h-[32px] items-center">
        <p>Constellation</p>
        <p class="italic">{{ character.constellation }}</p>
      </div>
      <div class="flex justify-between h-[32px] items-center">
        <p>Birthday</p>
        <p v-if="character.birthday">{{ character.birthday }}</p>
        <p v-else class="text-red-500">N/A</p>
      </div>
      <div class="flex justify-between h-[32px] items-center">
        <p>Weapon Type</p>
        <div class="flex items-center gap-2">
          <img class="w-8" :src="character.weapon_type.img_url" alt="" />
          <p>{{ character.weapon_type.name }}</p>
        </div>
      </div>
      <div class="flex justify-between h-[32px] items-center">
        <p>Signature Dish</p>
        <p v-if="character?.signature_dish?.name">
          {{ character?.signature_dish?.name }}
        </p>
        <p v-else class="text-red-500">N/A</p>
      </div>
      <div class="flex justify-between h-[32px] items-center">
        <p>Release Date</p>
        <p>
          {{
            new Date(character.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
