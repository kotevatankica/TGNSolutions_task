<script>

export default {

        data() {
                return {
                        products: [],
                        selected_products: [],
                        customerName: '',
                        invoiceNumber: '',
                        selectedDate: null,
                        isPaid: null,
                        edit_inovoice: {},
                        message: '',
                }
        },
        computed: {
                description() {
                        if (this.selected_products !== "0") {
                                let desc = '';
                                this.selected_products.forEach(el => {
                                        desc += `${el.name} * ${el.quantity}, `;
                                })
                                return desc;
                        }
                },
                totalPrice() {
                        if (this.selected_products !== "0") {
                                let sum = 0;
                                this.selected_products.forEach(el => {
                                        sum += el.price * el.quantity;

                                })
                                return sum;
                        }
                },
        },

        methods: {
                incrementQuantity(product) {

                        if (!product.quantity) {
                                product.quantity = 1;
                        } else {
                                product.quantity++;
                        }
                        if (!this.selected_products.includes(product)) {
                                this.selected_products.push(product);
                        } else {
                                this.selected_products.splice(this.selected_products.indexOf(product), 1);
                                this.selected_products.push(product)
                        }

                },
                decrementQuantity(product) {

                        if (product.quantity && product.quantity > 0) {
                                product.quantity--;
                        }
                        if (!this.selected_products.includes(product)) {
                                this.selected_products.push(product);
                        } else {
                                this.selected_products.splice(this.selected_products.indexOf(product), 1);
                                this.selected_products.push(product)
                        }

                        if (product.quantity == '0') {
                                this.selected_products.splice(this.selected_products.indexOf(product), 1);
                        }

                },
                saveInvoice() {

                        if (this.$route.query.mode !== 'Edit') {
                                if (this.invoiceNumber && this.customerName && this.selectedDate && this.description && this.totalPrice && this.isPaid) {

                                        const new_invoice = {
                                                invoiceNumber: this.invoiceNumber,
                                                customerName: this.customerName,
                                                date: this.selectedDate,
                                                description: this.description,
                                                totalPrice: this.totalPrice,
                                                isPaid: this.isPaid
                                        };
                                        const all_invoices = JSON.parse(localStorage.getItem('invoices'))


                                        all_invoices.push(new_invoice)
                                        localStorage.setItem('invoices', JSON.stringify(all_invoices));

                                        this.message = `Invoice  ${this.invoiceNumber} is created.`

                                        setTimeout(() => {
                                                this.message = ''
                                        }, 5000)

                                        this.invoiceNumber = '';
                                        this.customerName = '';
                                        this.selectedDate = null;
                                        this.isPaid = null;
                                        this.selected_products = [];


                                }

                        }
                        else {

                                // edit invoice 
                                // cannot display description and total price (they are computed property)

                                // const edited_invoice = {
                                //         invoiceNumber: this.invoiceNumber,
                                //         customerName: this.customerName,
                                //         date: this.selectedDate,
                                //         description: this.description,
                                //         totalPrice: this.totalPrice,
                                //         isPaid: this.isPaid
                                // };

                                // const all_invoices = JSON.parse(localStorage.getItem('invoices'))


                                // const index_invoice = all_invoices.findIndex(p => p.invoiceNumber === this.edit_inovoice.invoiceNumber)
                                // all_invoices.splice(index_invoice, 1)
                                // all_invoices.splice(index_invoice, 0, edited_invoice)

                                // localStorage.setItem('invoices', JSON.stringify(all_invoices));

                                // this.message = `Invoice  ${this.invoiceNumber} is created.`

                                // setTimeout(() => {
                                //         this.message = ''
                                // }, 5000)
                        }
                },


        },
        mounted() {

                const getProducts = localStorage.getItem("products");
                if (getProducts) {
                        this.products = JSON.parse(getProducts);
                }

                if (this.$route.query.mode === 'Edit') {
                        this.edit_inovoice = JSON.parse(localStorage.getItem('selectedInvoice'));

                        if (this.edit_inovoice) {

                                this.invoiceNumber = this.edit_inovoice.invoiceNumber;
                                this.customerName = this.edit_inovoice.customerName;
                                this.selectedDate = this.edit_inovoice.date;
                                this.description = this.edit_inovoice.description;
                                this.totalPrice = this.edit_inovoice.totalPrice;
                                this.isPaid = this.edit_inovoice.isPaid
                        }
                }



        }

}

</script>

<template>
        <div class="invoice">
                <div class="products">
                        <p class="title">List of products</p>
                        <span class="products_d"> Name - price </span>
                        <span class="product_q"> Quantity</span>
                        <div class="list">
                                <div v-for="(product, index) in products" :key="index">
                                        {{ product.name }} - {{ product.price }} &#8364;
                                        <div class="quantity">
                                                <a @click="decrementQuantity(product)" v-if="product.quantity > 0">-</a>

                                                <span v-if="selected_products.length == 0"> {{ product.quantity = 0 }}</span>
                                                <span v-else>{{ product.quantity || 0 }}</span>
                                                <a @click="incrementQuantity(product)">+</a>
                                        </div>
                                </div>
                        </div>
                </div>

                <div class="invoice_form">

                        <div class="row">
                                <div class="col-md-12">
                                        <p class="title"> {{ $route.query.mode }} inovoice </p>
                                </div>
                        </div>
                        <form>
                                <div class="row">
                                        <div class="col-md-4 margin-bottom-30">
                                                <label for="invoice-number">Invoice Number:</label>
                                                <input type="number" id="invoice-number" v-model="invoiceNumber"
                                                        placeholder="Invoice Number ex.(12345)">
                                        </div>
                                        <div class="col-md-4 margin-bottom-30">

                                                <label for="invoice-number">Bill To:</label>
                                                <input type="text" id="customerName" v-model="customerName"
                                                        placeholder="Customer full name">
                                        </div>
                                        <div class="col-md-4 margin-bottom-30">

                                                <label for="datepicker">Select a date:</label>
                                                <input type="date" id="datepicker" v-model="selectedDate">
                                        </div>
                                </div>
                                <div class="row">
                                        <div class="col-md-12 margin-bottom-30">
                                                <label for="">Description:</label>
                                                <textarea type="text" name="description" id="" :value="description"></textarea>
                                        </div>
                                </div>
                                <div class="row">
                                        <div class="col-md-6 margin-bottom-30">
                                                <label for="price">Total price (&#8364;):</label>
                                                <input type="number" name="price" id="" :value="totalPrice">
                                        </div>
                                        <div class="col-md-6 margin-bottom-30">
                                                <label for="paid">Paid:</label>
                                                <br>
                                                <label class="isPaid">
                                                        <input type="radio" value="paid" v-model="isPaid">
                                                        Yes
                                                </label>
                                                <label class="isPaid">
                                                        <input type="radio" value="notPaid" v-model="isPaid">
                                                        No
                                                </label>

                                                <div v-if="isPaid === 'paid'">
                                                        <p>This invoice has been paid.</p>
                                                </div>
                                                <div v-if="isPaid === 'notPaid'">
                                                        <p>This invoice has not been paid.</p>
                                                </div>
                                                <div v-if="isPaid === null">
                                                        <p>This invoice has ...</p>
                                                </div>
                                        </div>
                                </div>

                                <div class="row">
                                        <div class="col-md-12">
                                                <span class="required">*All fields are required.</span>

                                                <button @click.prevent="saveInvoice" class="submitBtn">Save</button>

                                                <div v-if="message" class="notification">{{ message }}</div>

                                        </div>


                                </div>
                        </form>

                </div>


        </div>
</template>

<style scoped>
.invoice {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 60px;
        margin-bottom: 30px;
}

.invoice .products {

        background-color: #f5f8fa;
        width: 30%;

}

.list {
        overflow-y: scroll;
        max-height: 65vh;
}

.products .list>div {
        padding: 10px 20px 10px 20px;
        font-size: 18px;
        font-weight: 500;
}

.products_d {
        font-size: 18px;
        margin-left: 20px;
        font-style: italic;
}

.product_q {
        float: right;
        margin-right: 20px;
        font-size: 18px;
        font-style: italic;

}

.products div .quantity {
        float: right;
}

.products div .quantity a {
        font-size: 18px;
        padding: 0 3px;
        font-weight: bolder;
        margin: 5px;
        cursor: pointer;

}

.invoice .invoice_form {
        background-color: #f5f8fa;
        width: 60%;
}

.invoice_form form {
        padding: 20px;
}

.isPaid {
        margin: 0 20px;
}

.isPaid input {
        display: none;
}

@media (max-width: 768px) {
        .invoice {
                flex-direction: column;
        }

        .invoice .products,
        .invoice .invoice_form {
                width: 80%;
                margin: 0 auto;

        }
}
</style>


