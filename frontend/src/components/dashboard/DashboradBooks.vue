<template>
    <!-- Button -->
    <div class="row mb-3">
        <div class="col text-end">
            <button type="button" class="btn btn-primary" @click="openAddModal()">Add Book</button>
        </div>
    </div>

    <!-- Table -->
    <div class="row">
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Page</th>
                        <th class="text-center">Edit</th>
                        <th class="text-center">Delete</th>
                    </tr>
                </thead>
                <TransitionGroup name="list" tag="tbody">
                    <tr v-for="book in userBooks" :key="book._id">
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td style="max-width: 250px">
                            {{ book.description }}
                        </td>
                        <td>{{ book.pageNumber }}</td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['far', 'pen-to-square']" class="text-warning"
                                style="cursor: pointer" @click="openEditModal(book)" />
                        </td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['fas', 'trash']" class="text-danger" style="cursor: pointer"
                                @click="deleteBook(book._id, book.title)" />
                        </td>
                    </tr>
                </TransitionGroup>
            </table>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">{{ modalTitle }}</h5>
                    <button type="button" @click="modal.hide()" class="btn-close" aria-label="Close"></button>
                </div>

                <div class="modal-body mx-5">
                    <div class="d-flex justify-content-center" v-if="isLoading">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="col mb-3">
                            <label for="title" class="form-label">Title
                                <span class="text-danger">*</span>
                            </label>
                            <input type="text" class="form-control" id="title" name="title" required
                                v-model="bookData.title" />
                        </div>
                        <div class="col mb-3">
                            <label for="author" class="form-label">Author
                                <span class="text-danger">*</span>
                            </label>
                            <input type="text" class="form-control" id="author" name="author" required
                                v-model="bookData.author" />
                        </div>
                        <div class="col mb-3">
                            <label for="description" class="form-label">Description
                                <span class="text-danger">*</span>
                            </label>
                            <textarea name="description" id="description" class="form-control" cols="30" rows="10"
                                v-model="bookData.description"></textarea>
                        </div>
                        <div class="col mb-3">
                            <label for="author" class="form-label">Number of Pages
                                <span class="text-danger">*</span>
                            </label>
                            <input type="number" class="form-control" id="numOfPages" name="numOfPages" required
                                v-model="bookData.pageNumber" />
                        </div>

                        <div class="col mb-3">
                            <label for="author" class="form-label">Photo
                                <!-- <span class="text-danger"></span> -->
                            </label>
                            <input type="file" class="form-control form-control-lg" id="image" name="image" required
                                @change="handleFileUpload" />
                        </div>
                        <div class="text-end mb-4">
                            <button type="button" @click="modal.hide()" class="btn btn-outline-secondary">
                                Close
                            </button>
                            <button @click="saveBook()" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useBookStore } from "@/stores/bookStore";
import { mapActions, mapState } from "pinia";
import { Modal } from 'bootstrap';
import { useToast } from "vue-toastification";


export default {
    name: "DashboardBooks",
    data() {
        return {
            modal: null,
            bookData: {
                title: '',
                author: '',
                description: '',
                pageNumber: null,
                image: null
            },
            modalTitle: 'Add Book',
        }
    },
    created() {
        this.fetchBooksByUploader();
    },
    mounted() {
        this.modal = new Modal(this.$refs.addEditModal)
    },
    methods: {
        ...mapActions(useBookStore, ["addNewBook", "fetchBooksByUploader", "deleteTheBook", "editTheBook"]),
        handleFileUpload(event) {
            console.log("event yakaladık", event.target.files[0]);
            const file = event.target.files[0];
            this.bookData.image = file;
        },
        showToast(message, options) {
            const toast = useToast()

            toast(message, {
                position: "top-right",
                closeButton: "button",
                icon: true,
                rtl: false,
                ...options,
            })
        },
        async deleteBook(bookId, bookTitle) {
            try {
                await this.deleteTheBook(bookId)

                await this.fetchBooksByUploader()
                this.showToast(`${bookTitle} deleted succesfully`, { type: 'warning', timeout: 3000 })
            } catch (error) {
                console.log("deleteBook error", error);
            }
        },
        async addBook() {
            try {
                const formData = new FormData();
                formData.append('title', this.bookData.title);
                formData.append('author', this.bookData.author);
                formData.append('description', this.bookData.description);
                formData.append('pageNumber', this.bookData.pageNumber);
                formData.append('image', this.bookData.image)
                console.log("form data böyle ", formData);
                await this.addNewBook(formData);
                console.log("book data", this.bookData);
                this.modal.hide();
                this.bookData = {
                    title: '',
                    author: '',
                    description: '',
                    pageNumber: null,
                    image: null
                }
                await this.fetchBooksByUploader();
                this.showToast('New book added successfully', { type: 'success', timeout: 2000 });

            } catch (error) {
                console.log("addBook error", error);
            }
        },
        openEditModal(existingBook) {
            this.modalTitle = 'Edit Book'
            this.editBookId = existingBook._id
            console.log("existing Book", existingBook);

            this.bookData = {
                title: existingBook.title,
                author: existingBook.author,
                description: existingBook.description,
                pageNumber: existingBook.pageNumber,
                image: existingBook.image
            };


            this.modal.show()
        },
        saveBook() {
            if (this.modalTitle === 'Add Book') {
                this.addBook()

            } else {
                this.editBook()
            }

        },
        async editBook() {
            try {
                const editedData = new FormData();
                editedData.append('title', this.bookData.title);
                editedData.append('author', this.bookData.author);
                editedData.append('description', this.bookData.description);
                editedData.append('pageNumber', this.bookData.pageNumber);
                editedData.append('image', this.bookData.image)

                await this.editTheBook(this.editBookId, editedData)
                await this.fetchBooksByUploader();
                this.modal.hide();
                this.showToast("The book edited succesfully", { type: 'success', timeout: 3000 })

            } catch (error) {
                console.log("editBook error", error);
            }
        },
        openAddModal() {
            this.modalTitle = "Add Book"
            this.bookData = {
                title: '',
                author: '',
                description: '',
                pageNumber: null
            }
            this.modal.show()
        }
    },
    computed: {
        ...mapState(useBookStore, ['userUploadedBooks', 'isLoading']),
        userBooks() {
            return this.userUploadedBooks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
    }

}
</script>

<style scoped>
.spinner-border {
    margin-top: 60%;
}

.modal-content {
    min-height: 648px;
}

.btn-outline-secondary {
    border-radius: 25px;
    height: 48px;
    margin-right: 20px;
    min-width: 120px;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 2s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(300px);
}

.list-leave-active {
    position: absolute;
}
</style>