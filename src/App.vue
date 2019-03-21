<template>
    <div id="app">
        <keep-alive>
            <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {}
        },
        created() {
        },
        methods: {},
    }

</script>
<style>
</style>
