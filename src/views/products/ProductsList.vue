<script>
export default {
        data() {

                return {
                        products: [],

                }
        },
        methods: {
                createProduct() {
                        this.$router.push({
                                name: "CreateProduct",
                                query: { mode: "Create" }

                        });
                },
                viewProduct(product) {
                        localStorage.setItem("selectedProduct", JSON.stringify(product));
                        this.$router.push({
                                name: "ViewProduct",
                                params: { name: product.name }
                        });
                },
                editProduct(product) {
                        localStorage.setItem("selectedProduct", JSON.stringify(product));
                        this.$router.push({
                                name: "EditProduct",
                                params: { name: product.name },
                                query: { mode: "Edit" }
                        });
                },
                deleteProduct(e, index) {
                        this.products.splice(index, 1);
                        localStorage.setItem('products', JSON.stringify(this.products));
                }

        },
        mounted() {

                let getProducts = localStorage.getItem("products");
                if (getProducts) {
                        this.products = JSON.parse(getProducts);
                } else {
                        localStorage.setItem('products', '[]');
                }
        }
}
</script>

<template>
        <div class="container">
                <button @click="createProduct" class="redBtn">Create product</button>
        </div>
        <div v-if="products.length" class="container ">
                <ul>
                        <li v-for="(product, index) in products" :key="index">
                                <span> {{ product.name }}</span>
                                <span class="actions">

                                        <a @click="viewProduct(product)">
                                                <i class="fa fa-eye" aria-hidden="true"></i>

                                        </a>
                                        <a @click="editProduct(product)">
                                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </a>
                                        <a @click="deleteProduct($event, index)"><i class="fa fa-times" aria-hidden="true"></i>

                                        </a>



                                </span>
                        </li>
                </ul>
        </div>
        <div v-else>

                <p class="no_available">There are currently no products available.</p>
        </div>
</template>

<style scoped></style>