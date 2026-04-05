<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { PrismicImage } from "@prismicio/vue";

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
          <AppRichText :field="member.bio" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.team {
  padding: $spacing-lg $boxed;
  background-color: $color-navy-lighter;

  @media (max-width: $bp-mobile) {
    padding: $spacing-lg $boxed;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm $spacing-lg;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }
  }

  &__member {
    padding: $boxed;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
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
    margin-bottom: $spacing-xs;
  }

}
</style>
