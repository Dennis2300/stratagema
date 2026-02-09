<template>
  <div
    v-if="character.weapons?.length > 0"
    class="bg-base-200/50 rounded-lg p-6 md:p-8"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
      Best Weapons
    </h2>

    <div class="grid grid-cols-1 gap-4 md:gap-6">
      <RouterLink
        v-for="weapon in character.weapons"
        :key="weapon.weapon_id.id"
        class="text-inherit no-underline group"
        :to="`/weapons/${weapon.weapon_id.id}?name=${encodeURIComponent(
          weapon.weapon_id.name,
        )}`"
        target="_blank"
      >
        <div
          class="relative flex flex-col sm:flex-row items-start sm:items-center bg-base-300/50 hover:bg-base-300/80 rounded-xl p-4 md:p-6 gap-4 md:gap-6 border border-transparent hover:border-primary/30 transition-all duration-200"
        >
          <!-- Weapon Image -->
          <img
            class="w-20 h-20 md:w-24 md:h-24 rounded-xl flex-shrink-0"
            :class="{
              'rarity-5': weapon.weapon_id.rarity === 5,
              'rarity-4': weapon.weapon_id.rarity === 4,
              'rarity-3': weapon.weapon_id.rarity === 3,
            }"
            :src="weapon.weapon_id.image_url"
            :alt="weapon.weapon_id.name"
          />

          <!-- Weapon Info -->
          <div class="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
            <h3
              class="text-lg md:text-xl font-bold group-hover:text-tertiary transition-colors truncate"
            >
              {{ weapon.weapon_id.name }}
            </h3>

            <div class="flex flex-col sm:flex-row gap-2 flex-wrap">
              <span class="badge badge-secondary badge-md md:badge-lg gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  />
                </svg>
                Base ATK: {{ weapon.weapon_id.base_attack }}
              </span>

              <span class="badge badge-accent badge-md md:badge-lg gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ weapon.weapon_id.bonus_effect_type.name }}:
                {{ weapon.weapon_id.bonus_effect_value }}
              </span>
            </div>
          </div>

          <!-- Rank Badge -->
          <div class="absolute top-5 right-3 z-10">
            <span
              class="flex items-center justify-center w-8 h-8 font-bold rounded-full border-2 border-white shadow-lg"
              :class="{
                'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black rank-shine':
                  weapon.rank === 1,
                'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                  weapon.rank === 2,
                'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                  weapon.rank === 3,
                'bg-gradient-to-b from-slate-500 to-slate-700 text-white':
                  weapon.rank > 3,
              }"
            >
              {{ weapon.rank }}
            </span>
          </div>
        </div>
      </RouterLink>
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

.rarity-3 {
  background: linear-gradient(145deg, #567496, #3a77b1);
  box-shadow:
    0px 0px 15px rgba(86, 116, 150, 0.8),
    0px 0px 30px rgba(86, 116, 150, 0.5);
}

.rank-shine {
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% {
    box-shadow:
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 30px rgba(255, 215, 0, 0.6);
  }
}
</style>
