<script setup lang="ts">

</script>

<template>
    <section class="grid">
        <slot></slot>
    </section>
</template>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-auto-flow: row dense;
    grid-auto-columns: 1fr;
    grid-auto-rows: min-content;
    grid-template-columns: 1fr 1fr;
    gap: 1em 1em;
    justify-content: space-around;
    align-content: space-around;
    justify-items: stretch;
    align-items: stretch;
}
</style>