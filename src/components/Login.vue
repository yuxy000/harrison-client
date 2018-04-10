<template>
  <div class="container">
      <div class="login-div">
          <img class="logo" src="../assets/logo.png" alt="">
          <Form :model="user" :label-width="48" style="width:360px;">
              <FormItem label="用户名" style="font-size:16px;">
                <Input v-model="user.user_name" placeholder="用户名" />
              </FormItem>
              <FormItem label="密码">
                <Input type="password" v-model="user.password" placeholder="密码" />
              </FormItem>
              <FormItem style="margin-left:0px;">
                  <Button type="primary" @click="reset">重置</Button>
                  <Button type="primary" @click="login">登录</Button>
              </FormItem>
          </Form>
      </div>
  </div>
</template>
<style scoped>
    .container {
        width: 100%;
        height: 100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('../assets/2.jpg') no-repeat;
        background-size: 100%;

    }
    .login-div{
        width: 520px;
        height: 420px;
        border:1px solid #ddd;
        border-radius: 10px;
        background-color: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 10px 10px 32px rgba(0, 0, 0, .2);
    }

    .logo {
        margin-bottom: 36px;
    }
    
</style>
<<script>
    import axios from 'axios';
    export default {
        data: function () {
            return {
                user: {
                    user_name: '',
                    password: ''
                }
            }
        },
        methods: {
            reset: function () {
                this.user.user_name = '';
                this.user.password = '';
            },
            login: function () {
                let vm = this;
                if(this.user.user_name.trim() == '' || this.user.password.trim() == ''){
                    alert('请输入用户名和密码.');
                    return;
                }
                axios.post('/harrison/loginServlet?user_name=' + vm.user.user_name + '&password=' + vm.user.password)
                .then(function (response) {
                    setCookie('username',vm.user.user_name,1);
                    vm.$router.push('/');
                })
                .catch(function (error) {
                    alert('用户名或密码错误.');
                    return;
                });
            }
        }
    }

</script>