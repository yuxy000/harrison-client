<template>
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="load-c" size="73" class="spin-icon-load"></Icon>
            <div style="font-size:18px;margin-top:8px;">Loading...</div>
        </Spin>
        <div class="ctrl-tools noprint">
            <Button type="primary" @click="returnHome">返回</Button>
            <Button type="primary" @click="exportPdf">导出为PDF</Button>
            <Button type="primary" @click="print">打印</Button>
        </div>
        <div ref="checkTable" class="check-table check-table-print">
            <Row class="row">
                <Col span="8">
                    <div class="field-div">
                        <label class="field-label" style="width:64px;">姓名:</label>
                        <p class="field-p">{{ record.name }}</p>
                    </div>
                </Col>
                <Col span="8">
                    <div class="field-div">
                        <label class="field-label" style="width:64px;">性别:</label>
                        <p class="field-p">{{ record.gender == 'M' ? '男' : '女'}}</p>
                    </div>
                </Col>
               
            </Row>
            <Row class="row">
                <Col span="12">
                    <div class="field-div">
                        <label class="field-label" style="width:64px;">单位:</label>
                        <p class="field-p">{{ record.company }}</p>
                    </div>
                </Col>    
            </Row>
            <Row class="row">
                <Col span="12">
                    <div  style="text-align:left;">
                        <label>编号:</label>
                        <label>{{ record.serial_no }}</label>
                    </div>
                 </Col>
            </Row>
             <Row class="row">
                 <Col span="12">
                    <div  style="text-align:left;">
                        <label>有效期:</label>
                        <label>{{ expiry_date }}</label>
                    </div>
                </Col>
                <Col span="6" offset="12">
                    <div class="photo-div">
                        <img :src="record.photo" height="100%" width="100%" v-show="record.photo"/>
                    </div>
                    
                </Col>
            </Row>
             
        </div>
    </div>
  
</template>
<style scoped>
    .content {
        font-size: 24px;
        margin: 0px auto;
        width: 874px;
        display: flex;
        flex-direction: column;
    }

    .ctrl-tools {
        text-align: left;
        padding-left: 32px;
        height: 60px;
        line-height: 60px;
    }

    .photo-div {
        width:240px;
        height:336px; 
        background-image: url('../assets/user.jpg'); 
        background-size: 240px 336px;
        margin-top: -330px;
        margin-left: 80px;
    }

    
     @media print {
        .noprint{
            display: none;
        }
        .check-table-print {
            transform: scale(0.5);
        }
     }

    .check-table {
        padding: 64px 64px 96px 64px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 6px;
        height: 614px;
        width: 874px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .row {
        padding: 32px 0;
        width: 900px;
    }


    .field-div {
        width: 100%;
        text-align: left;
        display: flex;
    }
    .field-p {

        width: 90%;
        padding-left: 10px;
    }
</style>
<script>
    // import {html2canvas,onrendered, canvas} from 'html2canvas';
    // import jsPDF from 'jspdf'
    import axios from 'axios';
    export default {
        data: function () {
            return {
                loading:true,
                record: {
                    id: 0,
                    serial_no: '',
                    company: '',
                    company_type: '',
                    name: '',
                    gender: '',
                    age: 0,
                    nationality: '',
                    education: '',
                    station: '',
                    work_duration: '',
                    pin_no: '',
                    liver_time: '',
                    dysentery_time: '',
                    typhoid_time: '',
                    phthisic_time: '',
                    dermatitis_time: '',
                    other_time: '',
                    heart_status: '',
                    lung_status: '',
                    liver_status: '',
                    spleen_status: '',
                    skin_status: '',
                    other_status: '',
                    eye_left: '',
                    eye_right: '',
                    ye_color: '',
                    xray: '',
                    excrement_dysentery: '',
                    excrement_wind_cold: '',
                    liver_gbzam: '',
                    liver_hav: '',
                    liver_hev: '',
                    conclusion: '',
                    status_op: '',
                    eye_op: '',
                    xray_op: '',
                    excrement_op: '',
                    conclusion_op: '',
                    conclusion_date: '',
                    check_date: '',
                    photo: ''
                }
            }
        },
        created: function() {
            console.log(this.$route.params)
            if (this.$route.params.id) {
                this.getHealthRecordById(this.$route.params.id);
            }
        }, 
        computed: {
            expiry_date: function () {
                let cDateStr = this.record.check_date.split("-");
                let year = parseInt(cDateStr[0]) + 1;
                return year +' - ' + cDateStr[1] +' - ' + cDateStr[2];

            }
        },
        
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            if (!checkCookie()) {
                console.log('beforeRouteEnter');
                next(vm => {
                    // 通过 `vm` 访问组件实例
                    vm.$Notice.warning({
                        title: '在线时长超时，请重新登录.',
                        //desc: '在线时长超时，请重新登录. '
                    });
                    vm.$router.replace('/login');
                    return;
                })  
            } else {
                next();
            }
        
        },
        
        beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        if (!checkCookie()) {
            console.log('beforeRouteEnter');
            next(vm => {
                // 通过 `vm` 访问组件实例
                vm.$Notice.warning({
                    title: '在线时长超时，请重新登录.',
                    //desc: '在线时长超时，请重新登录. '
                });
                vm.$router.replace('/login');
            })  
        } else {
            next();
        }
    },
        methods: {
            getHealthRecordById: function (id) {
                if (!checkCookie()) {
                    return;
                }
                let vm = this;
                this.loading = true;
                axios.post('/harrison/getHealthRecordByIdServlet?id=' + id)
                        .then(function (response) {
                            console.log(response);
                            vm.record = Object.assign(vm.record, response.data);
                            vm.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.loading = false;
                        });
            },
            returnHome: function () {
                this.$router.push('/');
            },
            exportPdf: function () {
                var vm = this;
                console.log('exportPdf');
                // 将 checkTable 渲染成 canvas
                html2canvas(vm.$refs.checkTable, {

                    // 渲染完成时调用，获得 canvas
                    onrendered: function(canvas) {
                        // 从 canvas 提取图片数据
                        var imgData = canvas.toDataURL('image/jpeg');
                        // |—————————————————————————————|                     
                        // A0 841×1189                           
                        // A1 594×841                            
                        // A2 420×594                            
                        // A3 297×420                            
                        // A4 210×297                            
                        // A5 148×210                            
                        // A6 105×148                            
                        // A7 74×105                             
                        // A8 52×74                              
                        // A9 37×52                              
                        // A10 26×37             
                        //     |——|———————————————————————————|
                        var doc = new jsPDF("1", "mm", "a4");
                        
                        doc.addImage(imgData, 'JPEG', 50, 30,74,52);

                        doc.save('certificate_' + vm.record.name + "_" + vm.record.serial_no + '.pdf');
                    }
                });
            },
            print() {
                window.print();
            }
        }
    }
</script>