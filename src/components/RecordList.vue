<template>
  <div class="container">
    <Spin fix v-if="loading">
        <Icon type="load-c" size="73" class="spin-icon-load"></Icon>
        <div style="font-size:18px;margin-top:8px;">Loading...</div>
    </Spin>
    <div class="ctrl-toos">
        <Button type="primary" @click="addHealthRecord">添加</Button>
        <Select v-model="searchType" style="width:120px;margin-left:36px;margin-right:4px;">
            <Option v-for="item in searchTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="searchValue" style="width:240px;" @on-enter="searchRecord">
            <Button slot="append" icon="ios-search" @click="searchRecord"></Button>
        </Input>
    </div>
   <Table border :columns="tableColumns" :data="records" class="record-table" :height="tableHeight"></Table>
   <div class="i-page">
        <Page :total="recordTotal" show-sizer show-total @on-change="pageChangeHandler" @on-page-size-change="pageSizeChangeHandler"></Page>
   </div>
   
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            searchType: 'name',
            loading:true,
            page: 1,
            pageSize:10,
            tableHeight:640,
            searchTypes: [
                { label: '按姓名查询', value: 'name' },
                { label: '按身份证查询', value: 'pin_no' }
            ],
            searchValue: '',
            tableColumns: [
                {
                    title: 'ID',
                    key: 'id',
                    width: 80
                },
                {
                    title: '序号',
                    key: 'serial_no'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '性别',
                    key: 'gender',
                    render: function (h, params) {
                        var viewLabel = '未知';
                        if(params.row.gender == 'M'){
                            viewLabel = "男";
                        }else if(params.row.gender == 'F'){
                            viewLabel = "女";
                        }
                        return h('span', viewLabel);
                    }
                },
                {
                    title: '年龄',
                    key: 'age',
                    width: 80
                },
                {
                    title: '身份证号',
                    key: 'pin_no',
                    width: 180
                },
                {
                    title: '岗位',
                    key: 'station'
                },
                {
                    title: '工龄',
                    key: 'work_duration',
                    width:80
                },
                {
                    title: '民族',
                    key: 'nationality'
                },
                {
                    title: '文化程度',
                    key: 'education'
                },
                {
                    title: '体检日期',
                    key: 'check_date'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 240,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.row.id)
                                    }
                                }
                            }, '预览'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    title: '生成证件'
                                },
                                on: {
                                    click: () => {
                                        this.update(params.row.id)
                                    }
                                },
                                style: {
                                    marginRight: '5px'
                                },
                            }, '证件'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updateRecord(params.row.id);
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            records: [],
            recordTotal: 0
        }
    },
    mounted: function () {
        this.tableHeight = window.innerHeight - 102; 
    },
    created: function () {
        this.getHealthRecord();
    },
    methods: {
        getHealthRecord: function () {
            let vm = this;
            axios.post('/harrison/tableJsonTest?rows=' + this.pageSize + '&page=' + this.page + '&' + this.searchType + '=' + this.searchValue)
                .then(function (response) {
                    console.log(response);
                    vm.records = response.data.rows;
                    vm.recordTotal = response.data.total;
                    vm.loading = false;
                })
                .catch(function (error) {
                    console.log(error);
                    vm.loading = false;
                });

        },
        pageChangeHandler: function (page) {
            this.page = page;
            this.loading = true;
            this.getHealthRecord();
        },
        pageSizeChangeHandler: function (pageSize) {
            this.pageSize = pageSize;
            this.loading = true;
            this.getHealthRecord();
        },
        addHealthRecord: function () {
            this.$router.push('entry-record');
        },
        updateRecord (recordId) {
            this.$router.push('/entry-record/' + recordId);
        },
        show: function (recordId) {
            this.$router.push('/show-record/' + recordId);
        },
        update: function (recordId) {
            this.$router.push('/health-certificate/' + recordId);
        },
        remove (recordId) {
            let vm = this;
            this.$Modal.warning({
                title: '提示',
                content: "<p>确认删除吗，删除后无法恢复！</p>",
                onOk: () => {
                axios.post('/harrison/deleteHealthRecordServlet?deleteIDs=' + recordId)
                    .then(function (response) {
                        vm.getHealthRecord();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                
            });
        },
        searchRecord: function () {
            this.loading = true;
            this.getHealthRecord();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .ctrl-toos {
        height: 48px;
        padding-left: 20px;
        display: flex;
        align-items: center;
    }

    .toos-item {
        margin-right: 10px;
    }

    .record-table {
        height: calc(100% - 96px);
    }

    .i-page {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
