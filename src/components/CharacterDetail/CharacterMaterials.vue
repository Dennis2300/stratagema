<template>
  <div
    v-if="props.character && materials.length"
    class="bg-base-200/50 rounded-lg p-6 md:p-8"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-quaternary mb-6 divider">
      Materials Required
    </h2>

    <!-- Group materials by type -->
    <div class="space-y-6">
      <template v-for="(group, type) in groupedMaterials" :key="type">
        <div v-if="group.length > 0">
          <h3
            class="text-lg md:text-xl font-semibold text-text mb-4 capitalize flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clip-rule="evenodd"
              />
            </svg>
            {{ formatTypeName(type) }}
          </h3>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          >
            <div
              v-for="mat in group"
              :key="mat.id"
              class="bg-base-300/50 rounded-lg p-3 md:p-4 flex items-center gap-3 border border-base-300 hover:border-primary/30 transition-all duration-200"
            >
              <!-- Material Image -->
              <div
                class="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-base-100 rounded-lg p-1 flex items-center justify-center"
              >
                <img
                  :src="mat.img_url"
                  :alt="mat.name"
                  class="object-contain w-full h-full"
                />
              </div>

              <!-- Material Info -->
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm md:text-base font-medium text-base-content truncate"
                >
                  {{ mat.name }}
                </p>
                <p class="text-lg md:text-xl font-bold text-accent">
                  {{ new Intl.NumberFormat().format(mat.amount) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const materials = computed(() => {
  if (!props.character) return [];
  return [
    ...(props.character.enhancement_mats ?? []).map((m) => ({
      id: `enh-${m.id}`,
      type: "enhancement",
      name: m.materials_enhancement_id.name,
      img_url: m.materials_enhancement_id.img_url,
      amount: m.amount,
    })),
    ...(props.character.talent_mats ?? []).map((m) => ({
      id: `tal-${m.id}`,
      type: "talent",
      name: m.materials_talent_id.name,
      img_url: m.materials_talent_id.img_url,
      amount: m.amount,
    })),
    ...(props.character.ascension_mats ?? []).map((m) => ({
      id: `asc-${m.id}`,
      type: "ascension",
      name: m.materials_ascension_id.name,
      img_url: m.materials_ascension_id.img_url,
      amount: m.amount,
    })),
    ...(props.character.local_specialty ?? []).map((m) => ({
      id: `loc-${m.id}`,
      type: "local-specialty",
      name: m.local_specialty_id.name,
      img_url: m.local_specialty_id.img_url,
      amount: m.amount,
    })),
    ...(props.character.level_up_mats ?? []).map((m) => ({
      id: `lvl-${m.id}`,
      type: "level-up",
      name: m.materials_level_up_id.name,
      img_url: m.materials_level_up_id.img_url,
      amount: m.amount,
    })),
    ...(props.character.exp_mats ?? []).map((m) => ({
      id: `exp-${m.id}`,
      type: "exp",
      name: m.materials_exp_id.name,
      img_url: m.materials_exp_id.img_url,
      amount: m.amount,
    })),
  ];
});

const groupedMaterials = computed(() => {
  const groups = {
    ascension: [],
    talent: [],
    enhancement: [],
    "local-specialty": [],
    "level-up": [],
    exp: [],
  };

  materials.value.forEach((mat) => {
    if (groups[mat.type]) {
      groups[mat.type].push(mat);
    }
  });

  return groups;
});

function formatTypeName(type) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
</script>
