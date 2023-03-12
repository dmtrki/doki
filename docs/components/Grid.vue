<script setup lang="ts">
import {computed, ref} from "vue";

    const props = defineProps({
        centerItems: {
            type: Boolean,
            default: false,
        },
        layout: {
            type: String,
            default: 'equal'
        }
    })

    const mods = []

    if (props.centerItems) mods.push('centerItems')

    if (props.layout) mods.push(props.layout)

    const computedClasses = computed(() => {
        const classes = ['grid']
        mods.forEach((mod) => classes.push(`grid--${mod}`))
        return classes.join(' ')
    })
</script>

<template>
    <section :class="computedClasses">
        <slot></slot>
    </section>
</template>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-auto-flow: row dense;
    grid-auto-columns: 1fr;
    grid-auto-rows: min-content;
    gap: 1em 1em;
    justify-content: space-around;
    align-content: space-around;
    justify-items: stretch;
    align-items: stretch;

    &--centerItems {
        align-items: center;
    }

    &--equal {
        grid-template-columns: 1fr 1fr;
    }

    &--2_1 {
        grid-template-columns: 2fr 1fr;
    }

    &--1_2 {
        grid-template-columns: 1fr 2fr;
    }
}
</style>