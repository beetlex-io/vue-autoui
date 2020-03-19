/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var _5f9cf23953934d128018775a54c2789a='<div><auto-form url="/orders" v-model="orders.data" @completed="orders.get()" size="mini" @fieldchange="orders.get()"></auto-form><auto-grid url="/orders" height="100%" :data="orders.result.items" :pages="orders.result.pages" :currentpage="orders.result.index" @pagechange="onPageChange" size="mini"></auto-grid>';
Vue.component('models-orders',
    {
        data(){
            return {
                orders: new beetlexAction("/orders", {}, { index: 0, pages: 0, items: [] })
            };
        },
        methods: {
            onPageChange(page){
                this.orders.data.index = page;
                this.orders.get();
            },
        },
        mounted(){
        }
,template:_5f9cf23953934d128018775a54c2789a
});
