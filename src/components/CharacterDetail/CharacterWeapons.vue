<template>
  <section class="md:w-1/2 space-y-6">
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary tracking-tight">
      Best Weapons
    </h2>
    <div class="space-y-8">
      <template v-for="a in character.weapons" :key="a.weapon.name">
        <div
          class="relative flex gap-4 p-5 rounded-2xl bg-base-200/70 backdrop-blur-xl border border-base-300/50 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
        >
          <div
            class="absolute -top-3 -right-3 badge badge-primary badge-lg shadow-lg"
          >
            #{{ a.rank }}
          </div>
          <div
            class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2"
            :class="{
              'rarity-5 ring-warning/50': a.weapon.rarity === 5,
              'rarity-4 ring-secondary/50': a.weapon.rarity === 4,
            }"
          >
            <img
              class="w-full h-full object-cover"
              :src="a.weapon.img_url"
              :alt="a.weapon.name"
            />
          </div>
          <div class="flex flex-col justify-center flex-1 min-w-0 space-y-2">
            <p class="font-semibold text-base truncate">
              {{ a.weapon.name }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="badge badge-secondary badge-soft text-xs flex items-center gap-1"
              >
                Base ATK: {{ a.weapon.base_attack }}
              </span>
              <span class="badge badge-info badge-soft text-xs">
                {{ a.weapon.bonus_effect_type }}
                {{ a.weapon.bonus_effect_value }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
