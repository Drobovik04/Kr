<template>
    <div class="cards_container">
        <div v-for="item in items" class="card">
            <img class="imgCard" v-bind:src="item.path" alt="">
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>
    
<script>
export default
{
    props:{
        items:{
            type: Object,
            required:true
        }
        
    }
}
</script>
    
<style>

</style>