<template>
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="load-c" size="73" class="spin-icon-load"></Icon>
            <div style="font-size:18px;margin-top:8px;">Loading...</div>
        </Spin>
        <div class="ctrl-tools">
            <Button type="primary" @click="returnHome">返回</Button>
            <Button type="primary" @click="exportPdf">导出</Button>
        </div>
        <div ref="checkTable" class="check-table">
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
        width: 900px;
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
        margin-top: -340px;
        margin-left: 80px;
    }

    .check-table {
        padding: 64px 64px 96px 64px;
        background-color: #ddd;
        border: 1px solid #ddd;
        border-radius: 6px;
        height: 500px;
        width: 900px;
    }

    .row {
        padding: 32px 0;
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
        methods: {
            getHealthRecordById: function (id) {
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
                        var doc = new jsPDF("1", "mm", "a6");
                        
                        doc.addImage(imgData, 'JPEG', 0, 0,105,74);

                        doc.save('certificate_' + vm.record.name + "_" + vm.record.serial_no + '.pdf');
                    }
                });
            }
        }
    }
</script>