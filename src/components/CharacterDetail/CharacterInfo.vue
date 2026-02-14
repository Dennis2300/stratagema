<template>
  <section>
    <h2 class="divider py-3">{{ character.name }} Info</h2>
    <div class="space-y-4">
      <div class="flex justify-between">
        <p>Rarity</p>
        <div class="text-yellow-500">
          <span v-for="n in character.rarity" :key="n">★</span>
        </div>
      </div>
      <div class="flex justify-between">
        <p>Constellation</p>
        <p>{{ character.constellation }}</p>
      </div>
      <div class="flex justify-between">
        <p>Birthday</p>
        <p>{{ character.birthday }}</p>
      </div>
      <div class="flex justify-between">
        <p>Weapon Type</p>
        <p>{{ character.weapon_type.name }}</p>
      </div>
      <div class="flex justify-between">
        <p>Signature Dish</p>
        <p>{{ character.signature_dish.name }}</p>
      </div>
      <div class="flex justify-between">
        <p>Release Date</p>
        <p>
          {{
            new Date(character.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
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
