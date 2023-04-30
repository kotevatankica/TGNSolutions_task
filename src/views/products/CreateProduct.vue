<script>
export default {
        data() {
                return {
                        name: '',
                        description: '',
                        price: '',
                        product: {},
                        message: '',
                }
        },
        methods: {
                saveProduct() {

                        if (this.$route.query.mode !== 'Edit') {

                                if (this.name && this.description && this.price) {
                                        const new_product = {
                                                name: this.name,
                                                description: this.description,
                                                price: this.price
                                        }
                                        const products = JSON.parse(localStorage.getItem('products'))
                                        products.push(new_product)
                                        localStorage.setItem('products', JSON.stringify(products))

                                        this.message = `Product with name ${this.name} is created.`

                                        this.name = ''
                                        this.description = ''
                                        this.price = ''

                                }
                                setTimeout(() => {
                                        this.message = ''
                                }, 5000)

                        } else {
                                const edited_product = {

                                        name: this.name,
                                        description: this.description,
                                        price: this.price
                                }
                                const all_products = JSON.parse(localStorage.getItem('products'));

                                const index_product = all_products.findIndex(p => p.name === this.product.name)

                                all_products.splice(index_product, 1)
                                all_products.splice(index_product, 0, edited_product)
                                localStorage.setItem('products', JSON.stringify(all_products));

                                this.message = `Product with name  ${this.name} is updated.`

                                setTimeout(() => {
                                        this.message = ''
                                }, 5000)
                        }

                },

        },
        mounted() {

                if (this.$route.query.mode === 'Edit') {

                        this.product = JSON.parse(localStorage.getItem('selectedProduct'))
                        if (this.product) {

                                this.name = this.product.name
                                this.description = this.product.description
                                this.price = this.product.price

                        }
                }
        }

}
</script>

<template>
        <div class="product_form">
                <div class="row">
                        <div class="col-md-12">
                                <p class="title"> {{ $route.query.mode }} a product</p>
                        </div>
                </div>
                <form>
                        <div class="row">
                                <div class="col-md-6 margin-bottom-30">
                                        <label for="name">Name:</label>
                                        <input type="text" name="name" id="" v-model="name">
                                </div>
                                <div class="col-md-6 margin-bottom-30">

                                        <label for="price">Price (&#8364;):</label>
                                        <input type="number" name="price" id="" v-model="price">
                                </div>
                        </div>
                        <div class="row">
                                <div class="col-md-12 margin-bottom-30">
                                        <label for="">Description:</label>
                                        <textarea type="text" name="description" id="" v-model="description"></textarea>
                                </div>
                        </div>

                        <div class="row">
                                <div class="col-md-12">
                                        <span class="required">*All fields are required.</span>

                                        <button @click.prevent="saveProduct" class="submitBtn">Save</button>
                                        <div v-if="message" class="notification">{{ message }}</div>
                                </div>
                        </div>
                </form>
        </div>
</template>

<style scoped>

.product_form form {
        background-color: #fafbfc;
        padding: 20px;
}
</style>