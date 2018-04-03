<template>
    <div class="content">
        <h1>河北省食品药品从业人员健康检查表</h1>
        <Form :label-width="80" :model="record">
            <Row>
                <Col span="6">
                    <FormItem label="体检日期:" style="width:240px">
                        <DatePicker type="date" placeholder="选择体检日期" v-model="record.check_date"></DatePicker>
                    </FormItem>
                </Col>
            
                <Col span="6">
                    <FormItem label="编号:"  style="width:360px">
                        <Input type="text" disabled placeholder="编号" v-model="record.serial_no" />
                    </FormItem>
                </Col>
            </Row>
            <h2>基本信息</h2>
            <Row>
                <Col span="6">
                    <FormItem label="单位名称:" style="width:360px">
                        <Input type="text" placeholder="单位名称" v-model="record.company" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="单位性质:"  style="width:360px">
                        <Input type="text" placeholder="单位性质" v-model="record.company_type" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="姓名:" style="width:360px">
                        <Input type="text" placeholder="姓名" v-model="record.name" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="性别:"  style="width:180px">
                        <RadioGroup v-model="record.gender">
                            <Radio label="M">男</Radio>
                            <Radio label="F">女</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            
                <Col span="6">
                    <FormItem label="年龄:"  style="width:360px">
                        <Input type="text" placeholder="年龄" v-model="record.age" />
                    </FormItem>
                </Col>
               
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="民族:"  style="width:360px">
                        <Input type="text" placeholder="民族" v-model="record.nationality" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="文化程度:" style="width:360px">
                       <Input type="text" placeholder="文化程度" v-model="record.education" />
                    </FormItem>
                </Col>
            
                <Col span="6">
                    <FormItem label="身份证号:"  style="width:360px">
                        <Input type="text" placeholder="身份证号" v-model="record.pin_no" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="岗位:"  style="width:360px">
                        <Input type="text" placeholder="岗位" v-model="record.station" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="工龄:"  style="width:360px">
                        <Input type="text" placeholder="工龄" v-model="record.work_duration" />
                    </FormItem>
                </Col>
                 <Col span="6" offset="6">
                    <img class="user-photo" :src="record.photo" width="200" height="150" @click="makePhoto"/>
                </Col>
            </Row>
            <h2>既往病史</h2>
            <Row>
                <Col span="6">
                    <FormItem label="肝病:" style="width:240px">
                        <DatePicker type="date" placeholder="发病日期" v-model="record.liver_time"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="痢疾:" style="width:240px">
                        <DatePicker type="date" placeholder="发病日期" v-model="record.dysentery_time"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="伤寒:" style="width:240px">
                        <DatePicker type="date" placeholder="发病日期" v-model="record.typhoid_time"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="肺结核:" style="width:240px">
                        <DatePicker type="date" placeholder="发病日期" v-model="record.phthisic_time"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="皮肤病:" style="width:240px">
                        <DatePicker type="date" placeholder="发病日期" v-model="record.dermatitis_time"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="其他:" style="width:240px">
                        <DatePicker type="date" placeholder="发病日期" v-model="record.other_time"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <h2>体征</h2>
            <Row>
                <Col span="6">
                    <FormItem label="心:" style="width:360px">
                       <Input type="text" v-model="record.heart_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="肺:" style="width:360px">
                        <Input type="text" v-model="record.lung_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="肝:" style="width:360px">
                        <Input type="text" v-model="record.liver_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="脾:" style="width:360px">
                        <Input type="text" v-model="record.spleen_status" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="皮肤病:" style="width:360px">
                        <Input type="text" v-model="record.skin_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="其他:" style="width:360px">
                        <Input type="text" v-model="record.other_status" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="医师签名:" style="width:360px">
                        <Input type="text" v-model="record.status_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>视力及辨色力</h2>
            <Row>
                <Col span="6">
                    <FormItem label="左眼:" style="width:360px">
                       <Input type="text" placeholder="左眼视力" v-model="record.eye_left" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="右眼:" style="width:360px">
                        <Input type="text" placeholder="右眼视力" v-model="record.eye_right" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="辨色力:" style="width:360px">
                        <Input type="text" v-model="record.eye_color" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="医师签名:" style="width:360px">
                        <Input type="text" v-model="record.eye_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>X射线胸透或胸部拍片</h2>
            <Row>
                <Col span="12">
                    <FormItem label="说明:" style="width:720px">
                       <Input v-model="record.xray" type="textarea" :autosize="{minRows: 3,maxRows: 8}"/>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="医师签名:" style="width:360px">
                        <Input type="text" v-model="record.xray_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>大便培养</h2>
            <Row>
                <Col span="6">
                    <FormItem label="痢疾杆菌:" style="width:360px">
                        <Input type="text" placeholder="痢疾杆菌" v-model="record.excrement_dysentery" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="伤寒/副伤寒:" style="width:360px">
                        <Input type="text" placeholder="伤寒/副伤寒" v-model="record.excrement_wind_cold" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="医师签名:" style="width:360px">
                        <Input type="text" v-model="record.excrement_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>肝功能</h2>
            <Row>
                <Col span="6">
                    <FormItem label="谷丙转氨酶:" style="width:360px">
                        <Input type="text" placeholder="谷丙转氨酶" v-model="record.liver_gbzam" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="HAV-IgM:" style="width:360px">
                        <Input type="text" placeholder="HAV-IgM" v-model="record.liver_hav" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="HEV-IgM:" style="width:360px">
                        <Input type="text" placeholder="HEV-IgM" v-model="record.liver_hev" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="医师签名:" style="width:360px">
                        <Input type="text" v-model="record.liver_op" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <!-- <Col span="6" offset="6">
                    <FormItem>
                        <Button type="primary" @click="submitHandler">保存</Button>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem>
                        <Button type="ghost" @click="cancelHandler">取消</Button>
                    </FormItem>
                </Col> -->
                
            </Row>
        </Form>
        <Modal
            v-model="showModel"
            title="拍照"
            @on-ok="okHandler"
            @on-cancel="cancelPhotoHandler">
             
            <div class="booth">
                <video ref="video" width="200" height="150"></video>
                <Button type="primary" @click="snap" style="width:60px;height:32px;">拍照</Button>
                
                <canvas ref='canvas' width='200' height='150'></canvas>
            </div>
        </Modal>
    </div>
</template>

<style lang="css" scoped>
    .content {
        font-size: 12px;
        margin: 0px 120px;
        background-color: rgb(245, 245, 245);
    }
    h1 {
        height: 60px;
        line-height: 72px;
        font-size: 32px;
        margin-bottom: 10px;
    }

    h2 {
        text-align: left;
        margin-left: 10px;
        margin-bottom: 6px;
    }

    .user-photo {
        margin-top: -200PX;
    }

    .booth {
        display: flex;
        align-items: center;
        background:#ccc;
        border: 10px solid #ddd;
        margin: 0 auto;
    }

</style>

<script>
    export default {
        data() {
            return {
                showModel: false,
                mediaStreamTrack: {

                },
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
        methods: {
            submitHandler: function () {
                
            },
            cancelHandler: function () {

            },
            makePhoto: function () {
                if (this.photo == '') {
                    return;
                }
                var vm = this;
                this.showModel = true;
                var vendorUrl = window.URL || window.webkitURL;
        
                //媒体对象
                navigator.getMedia = navigator.getUserMedia ||
                                    navagator.webkitGetUserMedia ||
                                    navigator.mozGetUserMedia ||
                                    navigator.msGetUserMedia;
                navigator.getMedia({
                    video: true, //使用摄像头对象
                    audio: false,  //不适用音频
                }, function(stream){
                    vm.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
                    console.log(stream);
                    vm.$refs.video.src = vendorUrl.createObjectURL(stream, );
                    vm.$refs.video.play();
                }, function(error) {
                    //error.code
                    console.log(error);
                });
            },
            okHandler: function () {
                this.mediaStreamTrack && mediaStreamTrack.stop();
                this.record.photo = this.$refs.canvas.toDataURL("image/png");
                this.$refs.canvas.getContext('2d').clearRect(0, 0, 200, 150);

            },
            cancelPhotoHandler: function () {
                this.mediaStreamTrack && mediaStreamTrack.stop();
                this.$refs.canvas.getContext('2d').clearRect(0, 0, 200, 150);
            },
            snap: function () {
                //绘制canvas图形
                this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, 200, 150);
            }
         }
    }
</script>