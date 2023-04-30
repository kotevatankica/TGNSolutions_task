<script>

export default {

        data() {

                return {
                        invoices: [],
                        selectedStatus: 'all',
                }
        },
        computed: {
                filteredInvoices() {
                        if (this.selectedStatus === "all") {
                                return this.invoices;
                        } else {
                                return this.invoices.filter(invoice => invoice.isPaid === this.selectedStatus);
                        }
                }
        },
        methods: {

                createInvoice() {
                        this.$router.push({
                                name: "CreateInvoice",
                                query: { mode: "Create" }
                        });
                },
                viewInvoice(invoice) {
                        localStorage.setItem("selectedInvoice", JSON.stringify(invoice));

                        this.$router.push({
                                name: "ViewInvoice",
                                params: { invoiceNumber: invoice.invoiceNumber }
                        });
                },
                editInvoice(invoice) {
                        localStorage.setItem("selectedInvoice", JSON.stringify(invoice));
                        this.$router.push({
                                name: "EditInvoice",
                                params: { invoiceNumber: invoice.invoiceNumber },
                                query: { mode: "Edit" }
                        });

                },
                deleteInvoice(e, index) {

                        this.invoices.splice(index, 1);
                        localStorage.setItem('invoices', JSON.stringify(this.invoices));
                }
        },
        mounted() {

                let getInvoices = localStorage.getItem("invoices");
                if (getInvoices) {
                        this.invoices = JSON.parse(getInvoices);
                } else {
                        localStorage.setItem('invoices', '[]');
                }
        }

}
</script>
<template>
        <div class="container">
                <button @click="createInvoice" class="redBtn">Create invoice</button>

                <select v-model="selectedStatus" v-if="invoices.length > 0">
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="notPaid">Not Paid</option>
                </select>

        </div>
        <div v-if="invoices.length" class="container ">
                <ul>
                        <li v-for="(  invoice, index  ) in   filteredInvoices  " :key="index">
                                <div class="row">
                                        <div class="col-md-4"> {{ invoice.invoiceNumber }}</div>
                                        <div class="col-md-3">{{ invoice.date }} </div>
                                        <div class="col-md-3" v-if="invoice.isPaid == 'paid'"> Paid </div>
                                        <div class="col-md-3" v-else> Not paid</div>

                                        <div class="col-md-2 actions">
                                                <a @click="viewInvoice(invoice)">
                                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                                </a>
                                                <a @click="editInvoice(invoice)">
                                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </a>
                                                <a @click="deleteInvoice($event, index)"><i class="fa fa-times"
                                                                aria-hidden="true"></i>
                                                </a>

                                        </div>
                                </div>
                        </li>
                </ul>
        </div>
        <div v-else>

                <p class="no_available">There are currently no invoices available.</p>
        </div>
</template>

<style scoped>
select {
        height: 30px;
        margin: 28px 0px 0px 130px;
        border-radius: 10px;
        padding: 5px;
        border-color: #cc2944;

}

@media (max-width: 768px) {
        ul li {
                text-align: center;
        }
}
</style>