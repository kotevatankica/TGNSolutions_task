<script>

export default {

        data() {

                return {
                        product: {}
                }
        },
        mounted() {
                const products = JSON.parse(localStorage.getItem('products'))
                const index = this.$route.params.name;
                this.product = products[index]
        }
}
</script>

<template>
        <div class="product_form">
                <div class="row">
                        <div class="col-md-12">
                                <p class="title"> Product details</p>
                        </div>
                </div>
                <div class="form">
                        <div class="row">
                                <div class="col-md-4">
                                        Name:
                                </div>
                                <div class="col-md-8">
                                        {{ product.name }}
                                </div>
                        </div>
                        <div class="row">

                                <div class="col-md-4">
                                        Price (&#8364;):

                                </div>
                                <div class="col-md-8">
                                        {{ product.price }}
                                </div>
                        </div>
                        <div class="row">

                                <div class="col-md-4">
                                        Description:
                                </div>
                                <div class="col-md-8">
                                        {{ product.description }}
                                </div>
                        </div>
                </div>


        </div>
</template>

<style scoped>
.product_form .form {
        background-color: #fafbfc;
        padding: 20px;
        font-size: 20px;

}

.col-md-8 {
        margin-bottom: 30px;
}
</style>