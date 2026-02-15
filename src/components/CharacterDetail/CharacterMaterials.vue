<template>
  <section class="space-y-4">
    <h2 class="divider text-quaternary">Materials</h2>
    <h3>Ascension</h3>
    <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-4">
      <template v-for="a in sortedMaterials" :key="a.material_ascension.id">
        <div class="flex items-center gap-3">
          <img
            class="w-20 bg-secondary rounded-xl"
            :src="a.material_ascension.img_url"
            alt=""
          />
          <div class="flex flex-col gap-2">
            <p>{{ a.material_ascension.name }}</p>
            <strong class="text-accent">x{{ a.amount }}</strong>
          </div>
        </div>
      </template>
    </div>
    <h3>Talent</h3>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: Object,
});

const sortedMaterials = computed(() => {
  if (!props.character?.materials) return [];

  return [...props.character.materials].sort((a, b) => {
    return a.material_ascension.id - b.material_ascension.id;
  });
});
</script>
