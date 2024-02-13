<template>
<sidebar>
    <div class="filters">
        <div class="headfilter">
            Фильтрация
        </div>
        <input type="text" id="filterinput" placeholder="Название">
        <div class="tags_container">

        </div>
    </div>
</sidebar>
</template>

<script>

</script>

<style>
    #app
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 500px;
        width: 350px;
        position: relative;
        left: 0px;
    }
    sidebar
    {
        display: flex;
        flex-direction: column;
        height: 500px;
        width: 350px;
        position: relative;
        top: 10%;
        left: 0px;
        background-color: rgb(224, 224, 224);
        border-radius: 20px;
    }
    .headfilter
    {
        display: flex;
        justify-content: center;
    }
    #filterinput
    {
        width: 100%;

    }
</style>