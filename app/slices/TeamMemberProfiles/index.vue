<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage, PrismicRichText, PrismicText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TeamMemberProfilesSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div v-for="(member, index) in slice.primary.members" :key="index">
      <PrismicImage :field="member.image" />
      <PrismicText :field="member.name" />
      <PrismicRichText :field="member.title" />
      <PrismicRichText :field="member.bio" />
      <div>
        <div v-for="(experience, expIndex) in member.experience" :key="expIndex">
          <PrismicRichText :field="experience.item" />
        </div>
      </div>
      <PrismicRichText :field="member.education" />
    </div>
  </section>
</template>
