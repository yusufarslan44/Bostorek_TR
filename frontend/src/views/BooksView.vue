<template>
  <div class="container">
    <SectionHeader title="Books" text="Books page Lorem ipsum dolor sit, amet
    consectetur adipisicing elit. Dolorem magnam officia minima perspiciatis
    esse. Vero!" />
    <BookList :books="paginationBooks" />
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage" />
  </div>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/widgets/Pagination.vue";
import { useBookStore } from '@/stores/bookStore';
import { mapState } from 'pinia';

export default {
  name: "BooksView",
  components: {
    SectionHeader,
    BookList,
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    ...mapState(useBookStore, ['books']),
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    paginationBooks() {
      const starIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = starIndex + this.itemsPerPage;
      return this.books.slice(starIndex, endIndex);
    },
  },
  methods: {
    updatePage(page) {
      this.currentPage = page
    },

  },

};
</script>

<style scoped>
.auth-box {
  margin-top: -30px;
}
</style>
