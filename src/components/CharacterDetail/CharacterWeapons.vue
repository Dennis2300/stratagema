<template>
  <section class="md:w-1/2">
    <h2 class="text-xl md:text-2xl font-semibold text-quaternary">
      Best Weapons
    </h2>
    <div class="grid grid-cols-1 md:gap-4">
      <template v-for="a in character.weapons" :key="a.weapon.name">
        <div class="flex items-center gap-3 md:backdrop-blur-xl p-4 rounded-xl">
          <div
            class="w-16 h-16 rarity-5 rounded-xl overflow-hidden flex-shrink-0"
          >
            <img
              class="w-full h-full object-cover"
              :src="a.weapon.img_url"
              :alt="a.weapon.name"
            />
          </div>
          <div class="flex flex-col h-full justify-around flex-1 min-w-0">
            <p class="font-medium text-sm md:text-base truncate">
              {{ a.weapon.name }}
            </p>
            <div class="md:flex md:gap-2">
              <span
                class="badge badge-soft badge-secondary hidden md:block md:flex"
              >
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
                Base Attack:
                {{ a.weapon.base_attack }}
              </span>
              <span class="badge badge-soft badge-info">
                {{ a.weapon.bonus_effect_type }}
                {{ a.weapon.bonus_effect_value }}
              </span>
            </div>
          </div>
          <p class="badge badge-primary">
            {{ a.rank }}
          </p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});

const getRankSuffix = (rank) => {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
};
</script>
