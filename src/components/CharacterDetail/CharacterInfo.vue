<template>
  <div class="bg-base-200/50 rounded-lg md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
      Character Details
    </h2>

    <div class="flex flex-col gap-4 text-sm md:text-base md:mx-auto">
      <!-- Rarity -->
      <div
        class="flex flex-row justify-between items-center py-2 border-b border-base-300"
      >
        <p class="text-base-content/60 font-semibold">Rarity:</p>
        <p class="text-yellow-400 text-lg md:text-3xl">
          <span v-for="n in character.rarity" :key="n">★</span>
        </p>
      </div>

      <!-- Constellation -->
      <div
        class="flex flex-row justify-between items-center py-2 border-b border-base-300"
      >
        <p class="text-base-content/60 font-semibold">Constellation:</p>
        <p class="text-base-content font-medium">
          {{ character.constellation }}
        </p>
      </div>

      <!-- Signature Dish -->
      <div
        class="flex flex-row justify-between items-center py-2 border-b border-base-300"
      >
        <p class="text-base-content/60 font-semibold">Signature Dish:</p>
        <div
          v-if="character.signature_dish"
          class="flex flex-row gap-2 items-center group relative"
        >
          <!-- Dish Image -->
          <img
            class="w-8 h-8 md:w-10 md:h-10 cursor-pointer rounded-lg border-2 border-base-300 hover:border-primary transition-colors"
            :src="character.signature_dish.image_url"
            :alt="character.signature_dish.name"
          />

          <!-- Dish Pop up -->
          <div
            class="absolute bg-primary bottom-full right-0 md:left-1/2 md:-translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50"
          >
            <div
              class="bg-gray-800 border border-white border-solid p-4 w-72 md:w-96 flex flex-col items-center rounded-lg shadow-2xl"
            >
              <img
                class="w-32 md:w-48 rounded-lg"
                :src="character.signature_dish.image_url"
                :alt="character.signature_dish.name"
              />
              <h3
                class="text-center text-text font-bold text-lg md:text-xl mt-3"
              >
                {{ character.signature_dish.name }}
              </h3>
              <div class="divider my-2"></div>
              <p class="text-center text-sm md:text-base px-2">
                {{ character.signature_dish.description }}
              </p>
            </div>
          </div>

          <!-- Dish name -->
          <p class="font-medium max-w-32 md:max-w-64 truncate">
            <a
              class="link link-primary hover:link-hover"
              :href="character.signature_dish.url"
              target="_blank"
              rel="noopener"
            >
              {{ character.signature_dish.name }}
            </a>
          </p>
        </div>
        <p v-else class="text-base-content/60 italic">Not Revealed Yet</p>
      </div>

      <!-- Weapon -->
      <div
        class="flex flex-row justify-between items-center py-2 border-b border-base-300"
      >
        <p class="text-base-content/60 font-semibold">Weapon:</p>
        <div class="flex flex-row gap-2 items-center">
          <p
            v-if="character.weapon_type"
            class="text-base md:text-lg font-medium text-base-content"
          >
            {{ character.weapon_type.name }}
          </p>
          <img
            v-if="character.weapon_type"
            class="w-5 h-5 md:w-8 md:h-8"
            :src="character.weapon_type.image_url"
            :alt="character.weapon_type.name"
          />
        </div>
      </div>

      <!-- Birthday -->
      <div
        class="flex flex-row justify-between items-center py-2 border-b border-base-300"
      >
        <p class="text-base-content/60 font-semibold">
          Birthday <span class="text-gray-500">(mm/dd)</span>:
        </p>
        <p v-if="character.birthday" class="text-base-content font-medium">
          {{ character.birthday }}
        </p>
        <p v-else class="text-base-content/60 italic">Not Revealed Yet</p>
      </div>

      <!-- Date Released -->
      <div class="flex flex-row justify-between items-center py-2">
        <p class="text-base-content/60 font-semibold">Date Released:</p>
        <p class="text-base-content font-medium">
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
  </div>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>
