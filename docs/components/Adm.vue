<link rel="stylesheet" href="../../../../../snap/joplin-desktop/30/.config/joplin-desktop/userchrome.css">
<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  mod: {
    type: String,
  }
})

const classMod = computed(() => props.mod)
</script>

<template>
    <div class="adm" :class="classMod">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>

.adm {
  border: 1px solid var(--color-main-light);
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem 1.5rem;
  border-radius: 8px;

  &--primary > .code > blockquote { background: var(--color-primary-dark); }
  &--accent > .code > blockquote { background: var(--color-accent-dark); }
  &--warn > .code > blockquote { background: var(--color-warn-dark); }
  &--alert > .code > blockquote { background: var(--color-alert-dark); }


  &--info {
    border: 1px solid var(--color-info-light);

    .example {
      background: var(--color-info-dark);
    }
  }


  h5, h4, h3 {
    background: var(--color-info-light);
    padding: 0.6rem;
    margin: 0;
    border-radius: 8px;
    font-size: 1.34rem;

    a {
      color: #fff;
    }
  }

  &--justify {
    > h5, > h4, > h3 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &.info > h5, &.info > h4, &.info > h3 {
    background: var(--color-info);
    color: #fff;
  }

  &.primary > h5, &.primary > h4, &.primary > h3 {
    background: var(--color-primary-dark);
    color: #fff;
  }

  &.accent > h5, &.accent > h4, &.accent > h3 {
    background: var(--color-accent-dark);
    color: #fff;
  }

  &.warn > h5, &.warn > h4, &.warn > h3 {
    background: var(--color-warn);
  }

  &.alert > h5, &.alert > h4, &.alert > h3 {
    background: var(--color-alert);
  }

  .adm > h5 > strong, .adm > h4 > strong, .adm > h3 > strong {
    display: inline-block;
    margin: 0 1rem;
    background: #ffffff;
    border-radius: 5px;
    padding: 1px 3px;
    font-size: 1.1em;
  }

  .adm > h3 > em, .adm > h4 > em, .adm > h5 > em {
    display: inline-block;
    margin: 0 1rem 0 0.5rem;
  }

  .adm > p {
    font-size: 1.1em;
    padding: 1rem;
    margin: 0;
  }

  .adm .joplin-editable {
    margin: 0.1em 1em;
  }

  /* ADM BLOCKQUOTE */

  .adm > blockquote {
    opacity: 1;
    border: 0;
    text-align: center;
    font-size: 1.3em;
    margin: 0;
    padding: 0.2em 0.8em;
    color: #333;
    background: var(--color-info-light);
  }

  .adm > h5 + blockquote {
    margin-top: -5px;
    z-index: -1;
  }

  &.info > blockquote {
    background: var(--color-info-light);
  }

  &.primary > blockquote {
    background: var(--color-primary-light);
  }

  &.accent > blockquote {
    background: var(--color-accent-light);
  }

  &.warn > blockquote {
    background: var(--color-warn-light);
  }

  &.alert > blockquote {
    background: var(--color-alert-light);
  }

}
/* ADM LISTS */
.adm ol {
  padding-left: 1em;
  font-size: 1.2em;
}

.adm ol li {
  margin-bottom: 0.8em;
}

.adm > .code > blockquote {
  max-width: 90%;
  margin-left: 5%;
  background: #0047cc;
  color: #fff;
}


</style>