<template>
  <section>
    <Carousel :items="carouselItems" height="400px"></Carousel>
  </section>
  <section class="my-5">
    <SectionHeader title="Featured Books" text="We declare long prop name using Camel case" />
    <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <TransitionGroup v-else name="fade" tag="div" class="card-wrapper container-sm d-flex justify-content-around">
            <div v-for="(book, index) in filteredBooks" :key="book._id || index" class="card" style="width: 18rem;">
              <img src="../../../template/images/b_detail.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">{{ book.description }}</p>
                <p class="card-text"><small class="text-body-secondary">{{ book.updatedAt
                    }}</small></p>
              </div>
            </div>
          </TransitionGroup>
        </div>
        <button @click="prevBooks" class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button @click="nextBooks" class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from '@/components/widgets/Carousel.vue';
import hero_1 from '@/assets/images/hero_1.jpg'
import hero_2 from '@/assets/images/hero_2.jpg'
import hero_3 from '@/assets/images/hero_3.jpg'
import { useBookStore } from '@/stores/bookStore';
import { mapState } from 'pinia';
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
      currentStartIndex: 0,

    }
  },
  methods: {
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


  computed: {
    ...mapState(useBookStore, ['books', 'isLoading']),
    filteredBooks() {
      // const copiedBooks = [...this.books]
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

.fade-enter-from {
  opacity: 0.2;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 1s ease;
}
</style>
