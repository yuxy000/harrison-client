<template>
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="load-c" size="73" class="spin-icon-load"></Icon>
            <div style="font-size:18px;margin-top:8px;">Loading...</div>
        </Spin>
        <h1>河北省食品药品从业人员健康检查表</h1>
        <Form :label-width="80" :model="record">
            <Row>
                <Col span="8">
                    <FormItem label="体检日期:"  style="float:left;">
                        <DatePicker type="date" placeholder="选择体检日期" :value="record.check_date" @on-change="getTime('check_date', $event)"></DatePicker>
                    </FormItem>
                </Col>

                <Col span="8">
                    <FormItem label="编号:" >
                        <Input type="text" disabled placeholder="编号" v-model="record.serial_no" />
                    </FormItem>
                </Col>
            </Row>
            <h2>基本信息</h2>
            <div class="base-info">
                <div class="info-container">
                    <Row>
                        <Col span="12">
                            <FormItem label="单位名称:">
                                <Input type="text" placeholder="单位名称" v-model="record.company" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="单位性质:" >
                                <Input type="text" placeholder="单位性质" v-model="record.company_type" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="姓名:" >
                                <Input type="text" placeholder="姓名" v-model="record.name" />
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="性别:" style="min-width:168px;">
                                <RadioGroup v-model="record.gender" style="float:left;">
                                    <Radio label="M">男</Radio>
                                    <Radio label="F">女</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="年龄:">
                                <Input type="text" placeholder="年龄" v-model="record.age" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="民族:" >
                                <Input type="text" placeholder="民族" v-model="record.nationality" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="文化程度:">
                            <Input type="text" placeholder="文化程度" v-model="record.education" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="身份证号:">
                                <Input type="text" placeholder="身份证号" v-model="record.pin_no" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="岗位:">
                                <Input type="text" placeholder="岗位" v-model="record.station" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="工龄:">
                                <Input type="text" placeholder="工龄" v-model="record.work_duration" />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="photo-container">
                    <div class="photo-div"  @click="makePhoto">
                        <img class="user-photo" :src="record.photo" width="100%" height="100%" v-show="record.photo"/>
                    </div>
                </div>
            </div>
            <h2>既往病史</h2>
            <Row>
                <Col span="6">
                    <FormItem label="肝病:" style="float:left;">
                        <DatePicker type="date" placeholder="发病日期" :value="record.liver_time" @on-change="getTime('liver_time', $event)"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="痢疾:" style="float:left;">
                        <DatePicker type="date" placeholder="发病日期" :value="record.dysentery_time" @on-change="getTime('dysentery_time', $event)"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="伤寒:" style="float:left;">
                        <DatePicker type="date" placeholder="发病日期" :value="record.typhoid_time" @on-change="getTime('typhoid_time', $event)"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="肺结核:" style="float:left;">
                        <DatePicker type="date" placeholder="发病日期" :value="record.phthisic_time" @on-change="getTime('phthisic_time', $event)"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="皮肤病:" style="float:left;">
                        <DatePicker type="date" placeholder="发病日期" :value="record.dermatitis_time" @on-change="getTime('dermatitis_time', $event)"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="其他:" style="float:left;">
                        <DatePicker type="date" placeholder="发病日期" :value="record.other_time" @on-change="getTime('other_time', $event)"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <h2>体征</h2>
            <Row>
                <Col span="6">
                    <FormItem label="心:">
                       <Input type="text" v-model="record.heart_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="肺:">
                        <Input type="text" v-model="record.lung_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="肝:">
                        <Input type="text" v-model="record.liver_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="脾:">
                        <Input type="text" v-model="record.spleen_status" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="皮肤病:">
                        <Input type="text" v-model="record.skin_status" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="其他:">
                        <Input type="text" v-model="record.other_status" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <FormItem label="医师签名:">
                        <Input type="text" v-model="record.status_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>视力及辨色力</h2>
            <Row>
                <Col span="8">
                    <FormItem label="左眼:">
                       <Input type="text" placeholder="左眼视力" v-model="record.eye_left" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="右眼:" >
                        <Input type="text" placeholder="右眼视力" v-model="record.eye_right" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="辨色力:">
                        <Input type="text" v-model="record.eye_color" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="医师签名:">
                        <Input type="text" v-model="record.eye_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>X射线胸透或胸部拍片</h2>
            <Row>
                <Col span="16">
                    <FormItem label="说明:">
                       <Input v-model="record.xray" type="textarea" :autosize="{minRows: 3,maxRows: 8}"/>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="医师签名:">
                        <Input type="text" v-model="record.xray_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>大便培养</h2>
            <Row>
                <Col span="8">
                    <FormItem label="痢疾杆菌:">
                        <Input type="text" placeholder="痢疾杆菌" v-model="record.excrement_dysentery" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="伤寒/副伤寒:">
                        <Input type="text" placeholder="伤寒/副伤寒" v-model="record.excrement_wind_cold" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="医师签名:">
                        <Input type="text" v-model="record.excrement_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>肝功能</h2>
            <Row>
                <Col span="8">
                    <FormItem label="谷丙转氨酶:">
                        <Input type="text" placeholder="谷丙转氨酶" v-model="record.liver_gbzam" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="HAV-IgM:">
                        <Input type="text" placeholder="HAV-IgM" v-model="record.liver_hav" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="HEV-IgM:">
                        <Input type="text" placeholder="HEV-IgM" v-model="record.liver_hev" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="医师签名:">
                        <Input type="text" v-model="record.liver_op" />
                    </FormItem>
                </Col>
            </Row>
            <h2>检查结论</h2>
            <Row>
                 <Col span="24">
                    <FormItem label="结论:">
                       <Input v-model="record.conclusion" type="textarea" :autosize="{minRows: 3,maxRows: 8}"/>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="医师签名:">
                        <Input type="text" v-model="record.conclusion_op" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="日期:" style="float:left;">
                        <DatePicker type="date" placeholder="结论日期" :value="record.conclusion_date" @on-change="getTime('conclusion_date', $event)"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="4" offset="8">
                    <FormItem>
                        <Button type="primary" @click="submitHandler">保存</Button>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem>
                        <Button type="ghost" @click="cancelHandler">取消</Button>
                    </FormItem>
                </Col>
            </Row>

        </Form>
        <Modal
            v-model="showModel"
            title="拍照"
            width="702"
            @on-ok="okHandler"
            @on-cancel="cancelPhotoHandler">

            <div class="booth">
                <video ref="video" width="295" height="413"></video>
                <Button type="primary" @click="snap" style="width:60px;height:32px;">拍照</Button>
                <div class="photo-canvas">
                    <canvas ref='canvas' width='295' height='413'></canvas>
                </div>

            </div>
        </Modal>
    </div>
</template>

<style lang="css" scoped>
    .content {
        font-size: 12px;
        margin: 0px auto;
        width: 66%;
        min-width: 720px;
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

    .base-info {
        display: flex;
    }

    .info-container {
        width: calc(100% - 280px);
    }

    .photo-container {
        width: 280px;
        margin-left: 100px;
    }

    .photo-div {
        width:148px;
        height:206px;
        background-image: url('../assets/user.jpg');
        background-size: 148px 206px;
    }

    .booth {
        display: flex;
        align-items: center;
        background:#ccc;
        border: 10px solid #ddd;
        margin: 0 auto;
    }

    .photo-canvas {
        width: 295px;
        height: 413px;
        background-image: url('../assets/user.jpg');
        background-size: 295px 413px;
    }

</style>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                showModel: false,
                loading: false,
                record: {
                    id: 0,
                    serial_no: '',
                    company: '',
                    company_type: '',
                    name: '',
                    gender: 'M',
                    age: '0',
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
                    eye_color: '',
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
                    liver_op: '',
                    conclusion_op: '',
                    conclusion_date: '',
                    check_date: '',
                    photo: ''
                }
            }
        },
        created: function () {
            if (this.$route.params.id) {
                this.loading = true;
                this.getHealthRecordById(this.$route.params.id);
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
            getTime: function(timeType,time) {
                console.log(timeType);
                console.log(time);
                this.record[timeType] = time;
            },
            submitHandler: function () {
                let vm = this;
                if (!checkCookie()) {
                    vm.$router.push('login');
                    vm.$Notice.waring({
                        desc: '在线时长超时，请重新登录.'
                    });
                    return;
                }
                if (this.record.id > 0) {
                    axios.post('/harrison/updateHealthRecordServlet', JSON.stringify(vm.record))
                        .then(function (response) {
                            console.log(response);
                            vm.$router.push('/');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    axios.post('/harrison/addHealthRecordServlet', JSON.stringify(vm.record))
                        .then(function (response) {
                            console.log(response);
                            vm.$router.push('/');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
            },
            getHealthRecordById: function (id) {
                let vm = this;
                if (!checkCookie()) {
                    vm.$router.push('login');
                    return;
                }
                axios.post('/harrison/getHealthRecordByIdServlet?id=' + id)
                        .then(function (response) {
                            console.log(response);
                            vm.record = Object.assign(vm.record, response.data);
                            vm.loading = false;
                             console.log(vm.record);
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.loading = false;
                        });
            },
            cancelHandler: function () {
                this.$router.push('/');
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
                                    console.log(navigator.getMedia);

                navigator.getMedia({
                    video: {
                        width: 295,
                        height: 413
                    },
                    audio: false,  //不适用音频
                }, function(stream){
                    vm.$refs.video.src = vendorUrl.createObjectURL(stream, );
                    vm.$refs.video.play();
                }, function(error) {
                    //error.code
                    console.log(error);
                });
            },
            okHandler: function () {
                this.record.photo = this.$refs.canvas.toDataURL("image/png");
                console.log(this.record.photo);
                this.$refs.canvas.getContext('2d').clearRect(0, 0, 295, 413);

            },
            cancelPhotoHandler: function () {
                this.$refs.canvas.getContext('2d').clearRect(0, 0, 295, 413);
            },
            snap: function () {
                //绘制canvas图形
                this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, 295, 413);
            }
         }
    }
</script>
