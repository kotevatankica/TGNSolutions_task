<template>
        <div class="home_page">
                <p class="title">This is the home page.</p>
                <div>
                        You can create products in the products area, which will be listed for you to see, edit, or delete.
                        <br>
                        You can produce an invoice from the list of products in the invoices area, which can also be previewed,
                        edited, or deleted
                        <br>
                        Products and invoices that are generated will be saved in localStorage.
                </div>
        </div>
</template>
<style scoped>
.home_page {
        padding-top: 30px;
        width: 50%;
        min-height: 30vh;
        margin: 0 auto;
        font-size: 18px;
}

.home_page div {
        background-color: white;
        padding: 20px;
        line-height: 2rem;
}
</style>