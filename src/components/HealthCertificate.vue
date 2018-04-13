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
          <Row>
            <Col offset="4">
              <div class="slogan">
                关注民生健康
              </div>
            </Col>
          </Row>
          <Row >
            <Col offset="10">
              <div class="slogan">
                  共筑和谐社会
              </div>
            </Col>
          </Row>
          <Row >
            <Col>
              <div class="health-title">
                  河北省食品药品从业人员健康合格证明
              </div>
            </Col>
          </Row>
          <div class="info-div">
            <div class="info-left">
              <Row>
              <Col span="12">
                  <div class="field-div">
                      <label class="field-label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:&nbsp;</label>
                      <label class="field-p">{{ record.name }}</label>
                  </div>
              </Col>
              <Col span="12">
                  <div class="field-div">
                      <label class="field-label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:&nbsp;</label>
                      <label class="field-p">{{ record.gender == 'M' ? '男' : '女'}}</label>
                  </div>
              </Col>

          </Row>
            <Row>
                <Col span="24">
                    <div class="field-div">
                        <label class="field-label" >从业类别:&nbsp;</label>
                        <label class="field-p">{{ record.station }}</label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <div class="field-div">
                        <label>证&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;</label>
                        <label>{{ record.serial_no }}</label>
                    </div>
                 </Col>
            </Row>
             <Row>
                <Col span="24">
                    <div class="field-div">
                        <label>体检单位:&nbsp;</label>
                        <label>哈励逊国际和平医院&nbsp;&nbsp;(盖章)</label>
                    </div>
                 </Col>
            </Row>
             <Row>
                 <Col span="24">
                    <div class="field-div">
                        <label>有效期至:&nbsp;</label>
                        <label>{{ expiry_date }}</label>
                    </div>
                </Col>
            </Row>
            </div>
            <div class="photo-div">
              <img :src="record.photo" height="100%" width="100%" v-show="record.photo"/>
            </div>
          </div>
        </div>
    </div>

</template>
<style scoped>
    .content {
        font-size: 26px;
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



     @media print {
        .noprint{
            display: none;
        }
        .check-table-print {
            transform: scale(0.5);
        }
     }

    .check-table {
        padding: 48px 84px;
        border: 1px solid #ddd;
        background-color: #fff;
        height: 567px;
        width: 900px;
        display: flex;
        flex-direction: column;
    }

    .row {
        padding: 32px 0;
        width: 900px;
    }

    .slogan {
      font-size: 42px;
      font-family: '华文行楷';
      color: #000;
      text-align: left;
      height: 54px;
    }

    .health-title {
      font-size: 42px;
      font-family: '宋体';
      font-weight: bold;
    }

    .info-div {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      margin-top: 24px;
    }

    .info-left {
      width: 500px;
      height: 100%;
    }

    .photo-div {/*273 * 336 */
        width:171px;
        height:240px;
        background-image: url('../assets/user.jpg');
        background-size: 171px 240px;
    }


    .field-div {
        text-align: left;
        height: 50px;
        line-height: 50px;
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
                return year +' 年 ' + cDateStr[1] +' 月 ' + cDateStr[2] + ' 日';

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
                        // |————————————————————————————|
                        var doc = new jsPDF("1", "mm", "a4");

                        doc.addImage(imgData, 'JPEG', 50, 30,85.6,54);

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
