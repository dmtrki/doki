<link rel="stylesheet" href="../../../../../snap/joplin-desktop/30/.config/joplin-desktop/userchrome.css">
<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  info: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  accent: {
    type: Boolean,
    default: false,
  },
  warn: {
    type: Boolean,
    default: false,
  },
  alert: {
    type: Boolean,
    default: false,
  }
})

const mods = []

if (props.info) mods.push('info')
if (props.primary) mods.push('primary')
if (props.success) mods.push('success')
if (props.accent) mods.push('accent')
if (props.warn) mods.push('warn')
if (props.alert) mods.push('alert')

const classMod = computed(() => ['adm', ...mods.map(it => `adm--${it}`)].join(' '))
</script>

<template>
    <div :class="classMod">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@import "styles/main";

.adm {

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

<style lang="scss">
@import "styles/main";

.adm {
  border: 1px solid $cBaseLighter;
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem 1.5rem;
  border-radius: 8px;

  h5, h4, h3 {
    background: var(--color-info-light);
    padding: 0.6rem;
    margin: 0;
    border-radius: 8px;
    font-size: 1.34rem;

    a {
      color: #fff;
    }

    > strong {
      display: inline-block;
      margin: 0 1rem;
      background: #ffffff;
      border-radius: 5px;
      padding: 1px 3px;
      font-size: 1.1em;
    }
  }

  > blockquote {
    opacity: 1;
    border: 0;
    text-align: center;
    font-size: 1.3em;
    margin: 0;
    padding: 0.2em 0.8em;
    color: #333;
    background: var(--color-info-light);
  }

  &--justify {
    > h5, > h4, > h3 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &.primary > h5, &.primary > h4, &.primary > h3 {

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

  > h3 > em, > h4 > em,  > h5 > em {
    display: inline-block;
    margin: 0 1rem 0 0.5rem;
  }

  > p {
    font-size: 1.1em;
    padding: 1rem;
    margin: 0;
  }


  > h5 + blockquote {
    margin-top: -5px;
    z-index: -1;
  }

  &--info {
    border: 1px solid $cInfoLight;


    h5, h4, h3 {
      background: $cInfo;
      color: #fff;
    }

    .example {
      background: var(--color-info-dark);
    }
  }

  &--primary {
    border: 1px solid $cInfoLight;


    h5, h4, h3 {
      background: $cInfo;
      color: #fff;
    }

    > blockquote {
      background: var(--color-info-light);
    }
  }
  &--success {
    border: 1px solid $cSuccessLight;

    h5, h4, h3 {
      background: $cSuccess;
      color: #fff;
    }

    > blockquote {
      background: var(--color-primary-light);
    }
  }

  &--accent {
    border: 1px solid $cAccentLight;

    h5, h4, h3 {
      background: $cAccent;
      color: #fff;
    }

    > blockquote {
      background: var(--color-accent-light);
    }
  }
  &--warn {
    border: 1px solid $cWarnLight;

    h5, h4, h3 {
      background: $cWarn;
      color: #fff;
    }

    > blockquote {
      background: var(--color-warn-light);
    }
  }

  &--alert {
    border: 1px solid $cAlertLight;

    h5, h4, h3 {
      background: $cAlert;
      color: #fff;
    }

    > blockquote {
      background: var(--color-alert-light);
    }
  }
}
</style>