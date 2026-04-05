<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/vue";

defineProps(getSliceComponentProps<Content.TeamMemberProfilesSlice>());
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="team"
  >
    <div class="team__grid">
      <div
        v-for="(member, index) in slice.primary.members"
        :key="index"
        class="team__member"
      >
        <PrismicImage :field="member.image" class="team__photo" />
        <div class="team__content">
          <p class="team__tagline">{{ member.title }}</p>
          <PrismicRichText :field="member.bio" class="team__bio" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.team {
  padding: $spacing-lg $spacing-sm;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm $spacing-lg;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__member {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-xs;
  }

  &__photo {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  &__tagline {
    font-weight: 700;
    color: $color-black;
    margin: 0;
    line-height: 1.4;
  }

  &__bio {
    :deep(p) {
      margin: 0 0 0.75rem;
      line-height: 1.6;
    }

    :deep(ul) {
      margin: 0 0 0.75rem;
      padding-left: 1.25rem;
    }

    :deep(li) {
      margin-bottom: 0.4rem;
      line-height: 1.5;
    }
  }
}
</style>
