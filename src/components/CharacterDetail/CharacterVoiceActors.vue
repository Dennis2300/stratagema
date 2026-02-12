<template>
  <div class="py-6 md:py-8">
    <h2 class="divider text-quaternary py-4">Voice Actors</h2>

    <template v-if="props.character?.va?.length">
      <div class="hidden md:flex md:flex-row gap-8">
        <div class="flex flex-col gap-3 min-w-[140px]">
          <div
            v-for="item in sortedGroupedVA"
            :key="item.code"
            class="flex items-center h-7"
          >
            <span :class="`fi fi-${item.code} text-xl`"></span>
            <strong class="ml-2 text-base-content">{{ item.label }}:</strong>
          </div>
        </div>
        <div class="flex flex-col gap-3 flex-1">
          <div
            v-for="item in sortedGroupedVA"
            :key="item.code"
            class="flex items-center h-7"
          >
            <template v-if="item.actors.length">
              <template v-for="(a, index) in item.actors" :key="a.id">
                <template v-if="a.link">
                  <a
                    :href="a.link"
                    target="_blank"
                    rel="noopener"
                    class="link link-hover text-tertiary"
                  >
                    {{ a.name }}
                  </a>
                </template>
                <template v-else>
                  <span class="text-base-content">{{ a.name }}</span>
                </template>
                <span
                  v-if="index < item.actors.length - 1"
                  class="mx-1 text-base-content/60"
                >
                  &
                </span>
              </template>
            </template>
            <span v-else class="text-base-content/60 italic">No VA</span>
          </div>
        </div>
      </div>

      <!-- Mobile: Stacked cards -->
      <div class="flex flex-col gap-4 md:hidden">
        <div
          v-for="item in sortedGroupedVA"
          :key="item.code"
          class="bg-base-300/50 rounded-lg p-4"
        >
          <div class="flex items-center gap-2 mb-2">
            <span :class="`fi fi-${item.code} text-2xl`"></span>
            <strong class="text-lg text-base-content">{{ item.label }}</strong>
          </div>
          <div class="pl-8">
            <template v-if="item.actors.length">
              <template v-for="(a, index) in item.actors" :key="a.id">
                <template v-if="a.link">
                  <a
                    :href="a.link"
                    target="_blank"
                    rel="noopener"
                    class="link link-primary hover:link-hover"
                  >
                    {{ a.name }}
                  </a>
                </template>
                <template v-else>
                  <span class="text-base-content">{{ a.name }}</span>
                </template>
                <span
                  v-if="index < item.actors.length - 1"
                  class="mx-1 text-base-content/60"
                >
                  &
                </span>
              </template>
            </template>
            <span v-else class="text-base-content/60 italic">No VA</span>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="bg-error/10 border border-error/20 rounded-lg p-4">
      <p class="text-error font-semibold flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Not Revealed
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: Object,
});

const languages = [
  { label: "English", code: "us" },
  { label: "Japanese", code: "jp" },
  { label: "Chinese", code: "cn" },
  { label: "Korean", code: "kr" },
];

const groupedVA = computed(() => {
  if (!props.character?.va) return {};
  return props.character.va.reduce((acc, actor) => {
    const code = actor.lang.code;
    if (!acc[code]) acc[code] = [];
    acc[code].push(actor);
    return acc;
  }, {});
});

const sortedGroupedVA = computed(() => {
  return languages.map((lang) => ({
    code: lang.code,
    label: lang.label,
    actors: groupedVA.value[lang.code] || [],
  }));
});
</script>
