<template>
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="load-c" size="73" class="spin-icon-load"></Icon>
            <div style="font-size:18px;margin-top:8px;">Loading...</div>
        </Spin>
        <div class="ctrl-tools">
            <Button type="primary" @click="returnHome">返回</Button>
            <Button type="primary" @click="exportPdf">导出为PDF</Button>
        </div>
        <div ref="checkTable" class="check-table">
            <Row>
                <Col span="18">
                    <h1>河北省食品药品从业人员健康检查表</h1>
                </Col>
                <Col span="6">
                    <div class="photo-div">
                        <img :src="record.photo" height="100%" width="100%" v-show="record.photo"/>
                    </div>
                    
                </Col>
            </Row>
            <Row class="row" >
                <Col span="18">
                    <div style="text-align:left;">
                        <label>体检日期:</label>
                        <label>{{ record.check_date }}</label>
                    </div>
                </Col>
                <Col span="6">
                    <div  style="text-align:left;">
                        <label>编号:</label>
                        <label>{{ record.serial_no }}</label>
                    </div>
                </Col>
            </Row>
            <Row class="row">
                <Col span="12">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">单位:</label>
                        <p class="field-p">{{ record.company }}</p>
                    </div>
                </Col>
                <Col span="8">
                    <div class="field-div">
                        <label class="field-label" style="width:84px;">单位性质:</label>
                        <p class="field-p">{{ record.company_type }}</p>
                    </div>
                </Col>
            </Row>
            <Row class="row">
                <Col span="4">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">姓名:</label>
                        <p class="field-p">{{ record.name }}</p>
                    </div>
                </Col>
                <Col span="3">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">性别:</label>
                        <p class="field-p">{{ record.gender == 'M' ? '男' : '女'}}</p>
                    </div>
                </Col>
                <Col span="3">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">年龄:</label>
                        <p class="field-p">{{ record.age }}</p>
                    </div>
                </Col>
                <Col span="5">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">民族:</label>
                        <p class="field-p">{{ record.nationality }}</p>
                    </div>
                </Col>
                <Col span="5">
                    <div class="field-div">
                        <label class="field-label" style="width:84px;">文化程度:</label>
                        <p class="field-p">{{ record.education }}</p>
                    </div>
                </Col>
            </Row>
            <Row class="row">
                <Col span="8">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">岗位:</label>
                        <p class="field-p">{{ record.station }}</p>
                    </div>
                </Col>
                <Col span="4">
                    <div class="field-div">
                        <label class="field-label" style="width:42px;">工龄:</label>
                        <p class="field-p">{{ record.work_duration }}</p>
                    </div>
                </Col>
                <Col span="8">
                    <div class="field-div">
                        <label class="field-label" style="width:82px;">身份证号:</label>
                        <p class="field-p">{{ record.pin_no }}</p>
                    </div>
                </Col>
            </Row>
            <Row class="row" style="margin-top:36px;">
                <table>
                    <tr>
                        <td rowspan="2" style="width:80px;">
                            <div style="width:42px;margin:0 auto;">既往病史</div>
                        </td>
                        <td style="width:120px;">病&nbsp;&nbsp;&nbsp;&nbsp;名</td>
                        <td>肝&nbsp;&nbsp;&nbsp;&nbsp;类</td>
                        <td>痢&nbsp;&nbsp;&nbsp;&nbsp;疾</td>
                        <td>伤&nbsp;&nbsp;&nbsp;&nbsp;寒</td>
                        <td>肺结核</td>
                        <td>皮肤病</td>
                        <td>其&nbsp;&nbsp;&nbsp;&nbsp;他</td>
                    </tr>
                    <tr>
                        <!-- <td>111</td> -->
                        <td style="width:120px;">患病时间</td>
                        <td>{{ record.liver_time }}</td>
                        <td>{{ record.dysentery_time }}</td>
                        <td>{{ record.typhoid_time }}</td>
                        <td>{{ record.phthisic_time }}</td>
                        <td>{{ record.dermatitis_time }}</td>
                        <td>{{ record.other_time }}</td>
                    </tr>
                    <tr>
                        <!-- <td>111</td> -->
                        <td style="width:80px;" rowspan="4">体征</td>
                        <td>心</td>
                        <td colspan="3">{{ record.heart_status }}</td>
                        <td>肝</td>
                        <td colspan="2">{{ record.liver_status }}</td>
                    </tr>
                    <tr>
                        <td>肺</td>
                        <td colspan="3">{{ record.lung_status }}</td>
                        <td>脾</td>
                        <td colspan="2">{{ record.spleen_status }}</td>
                    </tr>
                    <tr>
                        <td>皮肤</td>
                        <td colspan="6">{{ record.skin_status }}</td>
                    </tr>
                    <tr>
                        <td>其他</td>
                        <td colspan="3">{{ record.other_status }}</td>
                        <td>医师签名</td>
                        <td colspan="2">{{ record.status_op }}</td>
                    </tr>
                    <!--视力-->
                    <tr>
                        <td style="width:120px;" rowspan="2">视力及辨色力</td>
                        <td>视力</td>
                        <td>左</td>
                        <td colspan="2">{{ record.status_op }}</td>
                        <td>右</td>
                        <td colspan="2">{{ record.status_op }}</td>
                    </tr>
                    <tr>
                        <td>辨色力</td>
                        <td colspan="3">{{ record.eye_left }}</td>
                        <td>医师签名</td>
                        <td colspan="2">{{ record.eye_right }}</td>
                    </tr>
                    <tr style="height:120px;ttext-align:left;">
                        <td>X线胸透或胸部拍片</td>
                        <td colspan="7">
                            <div style="height:90px;text-align:left;padding-left:24px; padding-top:8px;">{{ record.xray }}</div>
                            <div style="height:30px;text-align:right;padding-right:180px;">医师签名: {{ record.xray_op }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:120px;" rowspan="7">实验室检查化验单附后</td>
                        <td colspan="2">检查项目</td>
                        <td colspan="4">单位结果</td>
                        <td>检验师签名</td>
                    </tr>
                    <tr>
                        <td rowspan="2">大便培养</td>
                        <td>痢疾杆菌</td>
                        <td colspan="4">{{ record.excrement_dysentery }}</td>
                        <td rowspan="2">{{ record.excrement_op }}</td>
                    </tr>
                    <tr>
                        <td >伤寒/副伤寒</td>
                        <td colspan="4">{{ record.excrement_wind_cold }}</td>
                    </tr>
                    <tr>
                        <td rowspan="3">肝功能</td>
                        <td>谷丙转氨酶</td>
                        <td colspan="4">{{ record.liver_gbzam }}</td>
                        <td>{{ record.excrement_op }}</td>
                    </tr>
                    <tr>
                        <td>HAV-IgM</td>
                        <td colspan="4">{{ record.liver_hav }}</td>
                        <td>{{ record.excrement_op }}</td>
                    </tr>
                    <tr>
                        <td>HEV-IgM</td>
                        <td colspan="4">{{ record.liver_hev }}</td>
                        <td>{{ record.excrement_op }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">其他</td>
                        <td colspan="4"></td>
                        <td></td>
                    </tr>
                    <tr style="height:160px">
                        <td colspan="8">
                            <div style="height:30px;text-align:left;padding-left:16px;margin-top:8px;">
                                检查结论:
                            </div>
                            <div style="height:70px;text-align:left;padding-left:54px;">{{ record.conclusion }}</div>
                            <div style="height:30px;text-align:right;padding-right:240px;">主检医师签名: {{ record.conclusion_op }}</div>
                            <div style="height:30px;text-align:right;padding-right:250px;">{{ record.conclusion_date }}</div>
                        </td>
                    </tr>
                </table>
            </Row>
            <p class="note">*说明：发现谷丙转氨酶异常的，方加做HAV-IgM、HEV-IgM两个指标</p>
        </div>
    </div>
  
</template>
<style scoped>
    .content {
        font-size: 16px;
        margin: 0px 200px;
    }

    .ctrl-tools {
        text-align: left;
        padding-left: 32px;
        height: 60px;
        line-height: 60px;
    }

    .photo-div {
        width:148px;
        height:206px; 
        background-image: url('../assets/user.jpg'); 
        background-size: 148px 206px;
    }

    .check-table {
        padding: 60px;
        background-color: #fff;
    }
    h1 {
        height: 206px;
        line-height: 206px;
        font-size: 32px;
        margin-left: 100px;
    }

    .row {
        
        padding-bottom:4px;
        padding-top: 8px;
    }

    .row:nth-child(2) {
        border-bottom:2px solid #000; 
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        height: 42px;

    }

    td {
        border: 1px solid #000;
        
    }

    .note {
        font-size: 18px;
        text-align: left;
        margin-top: 6px;
        margin-left: 6px;
    }

    .field-div {
        width: 100%;
        text-align: left;
        display: flex;
    }

    .field-label {
    }
    .field-p {

        border-bottom: 2px solid #000;
        width: 90%;
        padding-left: 10px;
    }
</style>
<script>
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
                        var doc = new jsPDF("p", "mm", "a4");
                        
                        doc.addImage(imgData, 'JPEG', 0, 0,210,297);

                        doc.save(vm.record.name + "_" + vm.record.serial_no + '.pdf');
                    }
                });
            }
        }
    }
</script>