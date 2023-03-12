<template>
    <section class="def">
        <slot></slot>
    </section>
</template>

<style lang="scss" scoped>
.def {
    font-size: 1.3em;
    line-height: 1.3;
    background: #00ffe1;
    background: radial-gradient(circle, rgb(0 55 255 / 18%) 0%, rgb(168 160 255 / 13%) 100%);
    padding: 34px;
    border-radius: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.3rem auto;

    p {
        padding: 0;
        margin: 0;
    }
}
</style>