<template>
    <div class="content">
        <div class="ctrl-tools noprint">
            <Button type="primary" @click="returnHome">返回</Button>
            <Button type="primary" @click="exportPdf">导出为PDF</Button>
            <Button type="primary" @click="print">打印</Button>
        </div>
        <div ref="checkTable" class="check-table check-table-print">
          <div class="health-title">
              河北省食品药品从业人员健康合格证明
          </div>
          <div class="info-div">
            <div class="field-div">
                妥善保管，自觉接受监督检查
            </div>
            <div class="field-div">
                体检结果查询，真伪查询等可通过本辖区内局政务网站
            </div>

            <div class="field-div">
                本证明在本省范围内有效
            </div>
          </div>

          <div class="field-company">
              河北省食品药品监督管理局监制
          </div>

        </div>
    </div>

</template>
<style scoped>
    .content {
        font-size: 20px;
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
        padding: 56px 84px;
        border: 1px solid #ddd;
        background-color: #fff;
        height: 567px;
        width: 900px;
        display: flex;
        flex-direction: column;
    }

    .health-title {
      font-size: 32px;
      font-family: '宋体';
      font-weight: bold;
    }

    .info-div {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      margin-top: 96px;
    }



    .field-div {
        margin-left: 72px;
        text-align: left;
        height: 54px;
        line-height: 54px;
    }

    .field-company {
      text-align: right;
      padding-right: 64px;
    }
</style>
<script>
    // import {html2canvas,onrendered, canvas} from 'html2canvas';
    // import jsPDF from 'jspdf'
    import axios from 'axios';
    export default {
        data: function () {
            return {

            }
        },
        created: function() {

        },
        computed: {

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

                        doc.save('certificate_back' + '.pdf');
                    }
                });
            },
            print() {
                window.print();
            }
        }
    }
</script>
