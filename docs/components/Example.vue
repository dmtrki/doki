<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

</script>

<template>
    <section class="example">
        <slot></slot>
    </section>
</template>

<style lang="scss" scoped>
@import "./styles/main";

 .example {
  background-color: $bgPrimary;
  border-radius: $borderRadiusL;
  padding: $padL;
 }
</style>
<style lang="scss">
@import "styles/main";

.example > blockquote {
    position: relative;
    display: block;
    border-left: 0;
    border-radius: $borderRadiusM;
    margin-top: -26px;
    padding: $padM $padM $padM $padXL;
    background-color: $bgCode;

  &::before {
    position: absolute;
    content: "";
    color: #c0c0c0;
    display: block;
    left: $padS;
    top: 14px;
  }

  p {
    color: #fff;
  }
}
</style>