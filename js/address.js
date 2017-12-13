new Vue({
    // 挂载元素选择器
    el: '.address',
    // 代理数据
    data: {
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shippingMethod:1
    },
    // 计算属性
    computed: {
        filteredItems: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    // 编译完成后执行
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    // 定义方法
    methods: {
        getAddressList: function () {
            this.$http.get("data/address.json").then(response => {
                var res = response.data;
                if (res.status == '0') {
                    this.addressList = res.result;
                }
            })
        },
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (item, index) {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        }
    }
});