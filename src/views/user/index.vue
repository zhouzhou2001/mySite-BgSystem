<template>
  <div class="app-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          type=""
          v-model="form.name"
          autocomplete="off"
          style="width: 30%"
        ></el-input>
      </el-form-item>

      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          type=""
          v-model="form.oldLoginPwd"
          autocomplete="off"
          style="width: 30%"
        ></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          type=""
          v-model="form.loginPwd"
          autocomplete="off"
          style="width: 30%"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认新密码" prop="validationPswd">
        <el-input
          type=""
          v-model="form.validationPswd"
          autocomplete="off"
          style="width: 30%"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="setNewPassword">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setAdmin, getInfo } from "@/api/user";
export default {
  data() {
    //处理确认密码匹配规则
    let checkNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.form.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        loginId: "",
        oldLoginPwd: "",
        loginPwd: "",
        validationPswd: "",
      },

      rules: {
        name: [{ message: "请输入用户名", trigger: "blur" }],
        oldLoginPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        loginPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6到 18 个字符",
            trigger: "blur",
          },
        ],
        validationPswd: [
          { required: true, validator: checkNewPassword, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //回填用户名
    fetchData() {
      getInfo().then(({ data }) => {
        this.form.name = data.name;
      });
    },
    //提交修改密码
    setNewPassword() {
      if (this.form.name && this.form.loginPwd && this.form.oldLoginPwd) {
        setAdmin(this.form).then((res) => {
          if (!res.code && res.data) {
            this.$message({
              type: "success",
              message: "密码修改成功！",
            });
            this.handleReset();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
        });
      }
    },
    // 重置
    handleReset() {
      this.form.loginId = "";
      this.form.loginPwd = "";
      this.form.oldLoginPwd = "";
      this.form.validationPswd = "";
    },
  },
};
</script>

<style>
</style>