<script>

export default {

        data() {

                return {
                        invoice: {}
                }
        },
        mounted() {
                this.invoice = JSON.parse(localStorage.getItem('selectedInvoice'))
        }
}
</script>

<template>
        <div class="view_form">
                <div class="row">
                        <div class="col-md-12">
                                <p class="title"> Invoice details</p>
                        </div>
                </div>
                <div class="form">
                        <div class="row">

                                <div class="col-md-4">

                                        Invoice Number:
                                </div>
                                <div class="col-md-8">
                                        {{ invoice.invoiceNumber }}
                                </div>
                        </div>
                        <div class="row">
                                <div class="col-md-4">
                                        Bill to:
                                </div>
                                <div class="col-md-8">
                                        {{ invoice.customerName }}
                                </div>
                        </div>
                        <div class="row">

                                <div class="col-md-4">
                                        Date:
                                </div>
                                <div class="col-md-8">
                                        {{ invoice.date }}
                                </div>
                        </div>
                        <div class="row">

                                <div class="col-md-4">
                                        Description:
                                </div>
                                <div class="col-md-8">
                                        {{ invoice.description }}
                                </div>
                        </div>
                        <div class="row">

                                <div class="col-md-4">
                                        Total price: (&#8364;)

                                </div>
                                <div class="col-md-8">
                                        {{ invoice.totalPrice }}
                                </div>
                        </div>
                        <div class="row">

                                <div class="col-md-4">
                                        Paid:

                                </div>
                                <div class="col-md-8">
                                        <span v-if="invoice.isPaid === 'paid'">
                                                <p>This invoice has been paid.</p>
                                        </span>
                                        <span v-if="invoice.isPaid === 'notPaid'">
                                                <p>This invoice has not been paid.</p>
                                        </span>
                                </div>
                        </div>
                </div>

        </div>
</template>

<style scoped>
.view_form {
        padding-top: 60px;
        margin: 0 auto;
        width: 60%;
}

.view_form .form {
        padding: 20px;
        font-size: 20px;
        background-color: #f5f8fa;
}

.col-md-8 {
        margin-bottom: 30px;
}

@media (max-width: 768px) {
        .view_form {
                margin-bottom: 20px;
        }

}
</style>