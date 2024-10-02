import axios from "axios";
import { defineStore } from "pinia";

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        books: [],
        isLoading: false,
        userUploadedBooks: []
    }),
    getters: {
        selectedBooks: (state) => {
            return (id) => state.books.find(book => book._id === id)
        }
    },

    actions: {
        async fetchBooks() {
            this.isLoading = true
            try {
                const response = await axios.get('http://localhost:3000/api/v1/books')
                this.books = response.data
            } catch (error) {
                console.error("fetchBooks Erorr : ", error)
            }
            finally {
                this.isLoading = false
            }
        },
        async fetchBooksByUploader() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/books/uploader')
                this.userUploadedBooks = response.data
            } catch (error) {
                console.error("fetchBooksByUploader Erorr : ", error)
            }

        },
        async addNewBook(newBook) {
            console.log("addnew Book çalıştı", newBook);
            try {
                this.isLoading = true
                const response = await axios.post('http://localhost:3000/api/v1/books/', newBook)
                console.log("addnew bOok response", response);
                this.books.push(response.data.book)
                this.isLoading = false
            } catch (error) {
                console.log(error);
                throw error.response.data
            } finally {
                this.isLoading = false
            }
        },
        async editTheBook(bookId, bookData) {
            console.log("edit book bilgileri", bookId, bookData);
            try {
                this.isLoading = true
                const response = await axios.put(`http://localhost:3000/api/v1/books/${bookId}`, bookData)
                const updatedBookData = response.data.book
                const bookIndex = this.books.findIndex((book => book._id = bookId))
                this.isLoading = false
                if (bookIndex !== -1) {
                    this.books.splice(bookIndex, 1, updatedBookData)
                }
            } catch (error) {
                console.log(error);
                throw error.response.data
            } finally {
                this.isLoading = false
            }

        },
        async deleteTheBook(bookId) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`)
                this.books = this.books.filter(book => book._id !== bookId)
            } catch (error) {
                throw error.response.data
            }
        }

    }
})