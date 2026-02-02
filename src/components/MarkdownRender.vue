<template>
  <h2 class="divider text-quaternary pb-4">Build(s)</h2>
  <div class="lore-text" v-html="renderedMarkdown" />
</template>

<script setup>
import { marked } from "marked";
import { computed } from "vue";

const props = defineProps({
  content: String,
});

const renderedMarkdown = computed(() => marked(props.content));
</script>

<style>
.lore-text {
  line-height: 1.6;
}
.lore-text p {
  margin-bottom: 1.2em;
}
</style>
