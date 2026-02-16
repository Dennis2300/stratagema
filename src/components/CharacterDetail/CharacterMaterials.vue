<template>
  <section class="space-y-4">
    <h2 class="divider text-quaternary">Materials</h2>
    <h3>Ascension</h3>
    <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-4">
      <template v-for="a in sortedAscensions" :key="a.material_ascension.id">
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
    <h3>Enhancement</h3>
    <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-4">
      <template
        v-for="a in sortedEnhancements"
        :key="a.material_enhancements.id"
      >
        <div class="flex items-center gap-3">
          <img
            class="w-20 bg-secondary rounded-xl"
            :src="a.material_enhancements.img_url"
            alt=""
          />
          <div class="flex flex-col gap-2">
            <p>{{ a.material_enhancements.name }}</p>
            <strong class="text-accent">x{{ a.amount }}</strong>
          </div>
        </div>
      </template>
    </div>
    <h3>Talents</h3>
    <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-4">
      <template
        v-for="a in sortedTalents"
        :key="a.material_talents.id"
      >
        <div class="flex items-center gap-3">
          <img
            class="w-20 bg-secondary rounded-xl"
            :src="a.material_talents.img_url"
            alt=""
          />
          <div class="flex flex-col gap-2">
            <p>{{ a.material_talents.name }}</p>
            <strong class="text-accent">x{{ a.amount }}</strong>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: Object,
});

const sortByMaterialId = (items, getMaterialId) => {
  if (!items) return [];
  return [...items].sort((a, b) => getMaterialId(a) - getMaterialId(b));
};

const sortedAscensions = computed(() => {
  return sortByMaterialId(
    props.character?.ascensions,
    (item) => item.material_ascension.id,
  );
});

const sortedEnhancements = computed(() => {
  return sortByMaterialId(
    props.character?.enhancements,
    (item) => item.material_enhancements.id,
  );
});

const sortedTalents = computed(() => {
  return sortByMaterialId(
    props.character?.talents,
    (item) => item.material_talents.id,
  );
});
</script>
