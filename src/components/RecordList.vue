<template>
  <div class="container">
    <div class="ctrl-toos">
        <Button type="primary" @click="addHealthRecord">添加</Button>
        <Select v-model="searchType" style="width:120px;margin-left:36px;margin-right:4px;">
            <Option v-for="item in searchTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="searchValue" style="width:240px;">
            <Button slot="append" icon="ios-search"></Button>
        </Input>
    </div>
   <Table border :columns="tableColumns" :data="records"></Table>
   <Page class-name="i-page" :total="100" show-elevator></Page>
  </div>
</template>

<script>
export default {
    data () {
        return {
            searchType: 'name',
            searchTypes: [
                { label: '按姓名查询', value: 'name' },
                { label: '按身份证查询', value: 'pinNo' }
            ],
            searchValue: '',
            tableColumns: [
                {
                    title: 'ID',
                    key: 'id',
                },
                {
                    title: '序号',
                    key: 'serialNo'
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
                    key: 'age'
                },
                {
                    title: '身份证号',
                    key: 'pinNo'
                },
                {
                    title: '岗位',
                    key: 'station'
                },
                {
                    title: '工龄',
                    key: 'workDuration'
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
                    key: 'checkDate'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 200,
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
                                        this.show(params.index)
                                    }
                                }
                            }, '预览'),
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
                                        this.show(params.index)
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
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            records: [
                {"id":8,"serialNo":"13110020180004","company":"","name":"Tom","gender":"M","age":0,"nationality":"","education":""},
                {"id":7,"serialNo":"13110020180003","company":"","name":"Jhon","gender":"N","age":0,"nationality":"","education":""},
                {"id":6,"serialNo":"13110020180002","company":"","name":"范冰冰","gender":"F","age":0,"nationality":"","education":""},
                {"id":5,"serialNo":"13110020180001","company":"","name":"李晨","gender":"N","age":0,"nationality":"","education":""}
            ]
        }
    },
    methods: {
        addHealthRecord: function () {
            this.$router.push('entry-record');
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        width: 100%;
        height: 100%;
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
    .i-page {
        margin-top: 8px;
    }
</style>
