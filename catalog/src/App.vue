<template>
<sidebar>
    <div class="filters">
        <div class="headfilter">
            По имени
        </div>
        <input type="text" id="filterinput" placeholder="Название">
    </div>
    <div class="filters">
        <div class="tags_container">
                <div class="labelfortags_container">Жанр</div>
                <ul>
                    <li v-for="genre in uniqueGenres">{{ genre }}</li>
                </ul>
        </div>
    </div>
    <div class="filters">
        <div class="tags_container">
            <div class="labelfortags_container">Стиль</div>
            <ul>
                <li v-for="genre in uniqueGenres">{{ genre }}</li>
            </ul>
        </div>
    </div>
    <div class="filters">
        <div class="tags_container">
            <div class="labelfortags_container">Техника</div>
            <ul>
                <li v-for="genre in uniqueGenres">{{ genre }}</li>
            </ul>
        </div>
    </div>
</sidebar>
<Cards v-bind:items="cardstoshow"/>
</template>

<script>
import bd from './bd.json';
import Cards from './Cards.vue';

export default
{
    components:{
        Cards
    },
    data(){
        return {
            artists:bd,
            uniqueGenres:[],
            uniqueStyles:[],
            uniqueTechniques:[],
            cardstoshow:[]
        }
    },
    created(){
        this.uniqueGenres = this.getUniqueGenres(this.artists);
        this.cardstoshow = this.getCardsToShow(this.artists);
    },
    methods:{
        getUniqueGenres(data){
            const uniqueGenres = new Set();
            data.forEach(item => {
                item.artist.pictures.forEach(picture => {
                    picture.genres.forEach(genre => {
                        uniqueGenres.add(genre);
                    });
                });
            });
            return Array.from(uniqueGenres);
        },
        getCardsToShow(data){
            const toshow = [];
            data.forEach(item => {
                item.artist.pictures.forEach(picture => {
                    toshow.push(picture);
                });
            });
            return Array.from(toshow);
        }
    }
}
</script>

<style>

</style>