<template>
    <div class="cards_container">
        <div v-for="item in items" class="card" v-bind:style="{ backgroundImage: 'url(' + item.path + ')' }">
        </div>
    </div>
</template>
    
<script>
export default
{
    props:{
        items:{
            type:Array,
            required:true
        }
        
    }
}
</script>
    
<style>
    
</style>