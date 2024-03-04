<template>
<div class="main_container">
    <sidebar>
        <div class="filters">
            <div class="headfilter">
                По имени
            </div>
            <input type="text" id="filterinput" placeholder="Название" v-model="searchQuery">
        </div>
        <div class="filters">
            <div class="tags_container">
                    <div class="labelfortags_container">Жанр</div>
                    <ul>
                        <li v-for="genre in uniqueGenres" :key="genre">
                            <input type="checkbox" v-model="selectedGenres" :value="genre">{{ genre }}</input>
                        </li>
                    </ul>
            </div>
        </div>
        <div class="filters">
            <div class="tags_container">
                <div class="labelfortags_container">Стиль</div>
                <ul>
                    <li v-for="style in uniqueStyles" :key="style">
                        <input type="checkbox" v-model="selectedStyles" :value="style">{{ style }}</input>
                    </li>
                </ul>
            </div>
        </div>
        <div class="filters">
            <div class="tags_container">
                <div class="labelfortags_container">Техника</div>
                <ul>
                    <li v-for="technique in uniqueTechniques" :key="technique">
                        <input type="checkbox" v-model="selectedTechniques" :value="technique">{{ technique }}</input>
                    </li>
                </ul>
            </div>
        </div>
    </sidebar>
<Cards v-bind:items="filteredCards"/>
</div>
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
            cardstoshow:[],
            selectedGenres: [],
            selectedStyles: [],
            selectedTechniques: [],
            searchQuery:''
        }
    },
    computed: {
        filteredCards() {
            return this.artists.reduce((acc, artist) => {
            const filteredPictures = artist.artist.pictures.filter(picture => {
                return (this.selectedGenres.length === 0 || this.selectedGenres.every(genre => picture.genres.includes(genre))) &&
                       (this.selectedStyles.length === 0 || this.selectedStyles.every(style => picture.styles.includes(style))) &&
                       (this.selectedTechniques.length === 0 || this.selectedTechniques.every(technique => picture.techniques.includes(technique))) &&
                       (picture.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            });
            return acc.concat(filteredPictures);
        }, []);
        }
    },
    created(){
        this.uniqueGenres = this.getUniqueGenres(this.artists);
        this.uniqueStyles = this.getUniqueStyles(this.artists);
        this.uniqueTechniques = this.getUniqueTechniques(this.artists);
        this.cardstoshow = this.getCardsToShow(this.artists);
    },
    methods:{
        getUniqueGenres(data){
            const unique = new Set();
            data.forEach(item => {
                item.artist.pictures.forEach(picture => {
                    picture.genres.forEach(genre => {
                        unique.add(genre);
                    });
                });
            });
            return Array.from(unique);
        },
        getUniqueStyles(data){
            const unique = new Set();
            data.forEach(item => {
                item.artist.pictures.forEach(picture => {
                    picture.styles.forEach(genre => {
                        unique.add(genre);
                    });
                });
            });
            return Array.from(unique);
        },
        getUniqueTechniques(data){
            const unique = new Set();
            data.forEach(item => {
                item.artist.pictures.forEach(picture => {
                    picture.techniques.forEach(genre => {
                        unique.add(genre);
                    });
                });
            });
            return Array.from(unique);
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