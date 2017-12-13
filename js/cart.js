new Vue({
    // 挂载元素选择器
    el: "#app",
    // 代理数据
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    // 局部过滤器
    filters: {
        formatMoney: function (value) {
            //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
            return "￥" + value.toFixed(2);
        }
    },
    // 编译完成后执行
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    // 定义方法
    methods: {
        cartView: function () {
            let _this = this;
            this.$http.get("data/cartData.json").then(response => {
                this.productList = response.body.result.list;
            });
        },
        changeMorey: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if (typeof item.checked == "undefined") {
                // Vue.set(item, "checked", true);
                this.$set(item, "checked", true)
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) => {
                if (typeof item.checked == "undefined") {
                    this.$set(item, "checked", this.checkAllFlag)
                } else {
                    item.checked = this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            this.totalMoney = 0;
            this.productList.forEach((item, index) => {
                if (item.checked) {
                    this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});

// 全局过滤器
Vue.filter("Money", function (value, type) {
    return "￥" + value.toFixed(2) + type;
});