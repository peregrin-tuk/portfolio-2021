<template>
    <div class="text-textBright tracking-wide font-secondary flex flex-col">
        <div class="text-textSubtle text-xxs">'20</div>
        <div class="text-md">Title of Position</div>
        <div class="flex justify-start">
            <img class="w-3 h-2.5" :src="require('~/assets/img/flag-' + country_code + '.png')" :alt="country_code + ' Flag'">
            <span class="text-xs">Univ. of Applied Sciences U.A.,<br>Hagenberg</span>
        </div>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            country_code: 'NL'
        }
    }
}
</script>

<style>

</style>