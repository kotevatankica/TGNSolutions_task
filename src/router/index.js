import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductsList from "../views/products/ProductsList.vue"
import InvoicesList from "../views/invoices/InvoicesList.vue"
import CreateProduct from "../views/products/CreateProduct.vue"
import ViewProduct from "../views/products/ViewProduct.vue"
import CreateInvoice from "../views/invoices/CreateInvoice.vue"
import ViewInvoice from "../views/invoices/ViewInvoice.vue"
const router = createRouter({
        history: createWebHistory(),
        routes: [
                {
                        path: "/",
                        name: "Home",
                        component: Home,
                },
                {
                        path: "/products",
                        name: "ProductsList",
                        component: ProductsList,
                },
                {
                        path: "/invoices",
                        name: "InvoicesList",
                        component: InvoicesList,
                        props: true
                },
                {
                        path: "/createproduct",
                        name: "CreateProduct",
                        component: CreateProduct,
                },
                {
                        path: "/products/:name",
                        name: "ViewProduct",
                        component: ViewProduct,
                },
                {
                        path: "/products/:name",
                        name: "EditProduct",
                        component: CreateProduct,
                },
                {
                        path: "/createinvoice",
                        name: "CreateInvoice",
                        component: CreateInvoice,
                },
                {
                        path: "/invoice/:invoiceNumber",
                        name: "ViewInvoice",
                        component: ViewInvoice,
                },
                {
                        path: "/invoice/:invoiceNumber",
                        name: "EditInvoice",
                        component: CreateInvoice,
                },


        ],
});

export default router;