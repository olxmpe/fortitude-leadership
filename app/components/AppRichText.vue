<script setup lang="ts">
import type { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/vue";

defineProps<{ field: RichTextField }>();
</script>

<template>
  <div class="rich-text">
    <PrismicRichText :field="field" />
  </div>
</template>
