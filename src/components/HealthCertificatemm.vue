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
       <div ref="checkTable" class="check-table noborder">

              <div class="slogan ml">
                关注民生健康
              </div>
              <div class="slogan mr">
                  共筑和谐社会
              </div>

              <div class="health-title">
                  河北省食品药品从业人员健康合格证明
              </div>
          <div class="info-div">
            <div class="info-left">
                <div class="row">
              		<div class="field-div" style="flex: 16;">
	                    <label class="field-label">姓&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
	                    <label class="field-p">{{ record.name }}</label>
                  	</div>

                  	<div class="field-div" style="flex: 8;">
                      	<label class="field-label">性&nbsp;&nbsp;&nbsp;别:</label>
                      	<label class="field-p">{{ record.gender == 'M' ? '男' : '女'}}</label>
                  	</div>
                </div>


                <div class="field-div">
                    <label class="field-label" >从业类别:</label>
                    <label class="field-p">{{ record.station }}</label>
                </div>

                <div class="field-div">
                    <label>证&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
                    <label>{{ record.serial_no }}</label>
                </div>

                <div class="field-div">
                    <label>体检单位:</label>
                    <label>哈励逊国际和平医院&nbsp;&nbsp;(盖章)</label>
                </div>
                <div class="field-div">
                    <label>有效期至:</label>
                    <label>{{ expiry_date }}</label>
                </div>
            </div>
            <div class="photo-div">
              <img :src="photo_img" height="100%" width="100%"/>
            </div>
          </div>
       </div>
    </div>

</template>
<style scoped>
    .content {
        margin: 0px auto;
        width: 85.6mm;
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
        .content {
          margin-left: 0;
        }
        .check-table {
          border: 0 !important;
        }
     }

   .check-table {
        		padding: 3.2mm 7.8mm 0;
		        background-color: #fff;
		        height: 54mm;
		        width: 85.6mm;
		        display: flex;
		        flex-direction: column;
		        box-sizing: content-box;
            border: 1px solid #000;
    }


    .slogan {
      font-size: 4.2mm;
      font-family: '华文行楷';
      color: #000;
      text-align: center;
      height: 10mm;
    }

    .ml {
    	margin-left: -20mm;
    }

    .mr {
    	margin-right: -20mm;
    }

    .health-title {
      font-size: 3.6mm;
      font-family: '宋体';
      font-weight: bold;
      text-align: center;
    }
    .info-div {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      margin-top: 4.8mm;
    }

    .info-left {
      width: calc(100% - 22mm);
      height: 100%;
    }

    .row {
    	display: flex;
    }

    .photo-div {/*273 * 336 */
        width:19.25mm;
        height:28mm;
        background-image: url('../assets/user.jpg');
        background-size: 19.25mm 28mm;
    }


    .field-div {
        font-family:"黑体" ;
        text-align: left;
        font-size: 3.2mm;
        height: 5.4mm;
        line-height: 5.4mm;
        text-align: left;
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
                    name: '',
                    gender: '',
                    station: '',
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
            },
            photo_img() {
              if (this.record.photo == '') {
                return 'data:image/jpeg;base64,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';
              } else {
                return this.record.photo;
              }
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

                        doc.addImage(imgData, 'JPEG', 0, 0,85.6,54);

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
