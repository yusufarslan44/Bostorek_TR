<template>
    <section>
        <Carousel :items="carouselItems" height="400px"></Carousel>
    </section>
    <section class="my-5">
        <SectionHeader title="Featured Books" text="We declare long prop name using Camel case" />
        <div>
            <transition-group name="fade" tag="div" class="row">
                <div class="col-md-3 mb-4 px-1" v-for="(book, index) in filteredBooks" :key="book._id || index">
                    <div :class="['card', { 'custom-card-start': index === 0, 'custom-card-end': index === 3 }]">
                        <img src="../../../template/images/b_detail.jpg" class="card-img-top card-image" alt="...">
                        <div class="card-body ">
                            <h5 class="card-title">{{ book.title }}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional
                                content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </transition-group>

            <div class="custom-button-position position-absolute d-flex ">
                <button @click="prevBooks"
                    class="custom-button  border-0 rounded-circle d-flex justify-content-center align-items-center"><span
                        class="carousel-control-prev-icon"></span></button>
                <button @click="nextBooks"
                    class="custom-button  border-0 rounded-circle d-flex justify-content-center align-items-center"><span
                        class="carousel-control-next-icon"></span></button>
            </div>
        </div>
    </section>
</template>

<script>
import Carousel from '@/components/widgets/Carousel.vue';
import hero_1 from '@/assets/images/hero_1.jpg'
import hero_2 from '@/assets/images/hero_2.jpg'
import hero_3 from '@/assets/images/hero_3.jpg'
import Cards from '@/components/widgets/Cards.vue';
import SectionHeader from '@/components/SectionHeader.vue';

export default {
    name: "HomeView",
    components: {
        Carousel,

        SectionHeader
    },
    data() {
        return {
            carouselItems: [
                { imageUrl: hero_1, subtitle: 'Liberte', title: 'Lorem Ipsum Dolor Sit Amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { imageUrl: hero_2, subtitle: 'Egalite', title: 'Excepteur Sint Occaecat Cupidatat', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { imageUrl: hero_3, subtitle: 'Fraternite', title: 'Neque Porro Quisquam Est', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' }
            ],
            books: [],
            currentStartIndex: 0
        }
    },
    methods: {
        async fetchABook() {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/books`)
                const data = await response.json()
                this.books = data;
                console.log("Books", this.books);
            } catch (error) {

            }
        },
        nextBooks() {
            if (this.currentStartIndex + 4 < this.books.length) {
                this.currentStartIndex += 4;
            }
        },
        prevBooks() {
            if (this.currentStartIndex - 4 >= 0) {
                this.currentStartIndex -= 4;
            }
        },


    },

    created() {
        this.fetchABook()

    },
    computed: {
        filteredBooks() {
            const copiedBooks = [...this.books]
            // return copiedBooks
            //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            //   .slice(0, 4)
            return this.books.slice(this.currentStartIndex, this.currentStartIndex + 4);
        }
    }
};
</script>

<style scoped>
.custom-button {
    background-color: var(--primary-color);
    height: 50px;
    width: 50px;
}

.custom-card-group {
    box-shadow: 0px 0px 0px 0px;
}

.custom-card-end {
    background-image: linear-gradient(to left, rgb(0, 0, 0), rgb(255, 255, 255)100%)
}

.custom-card-start {
    background-image: linear-gradient(to right, rgb(0, 0, 0), rgb(255, 255, 255)100%)
}



.card-image {
    height: 270px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
    z-index: 1;
    position: relative;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
    transform: translateY(20px);
}
</style>