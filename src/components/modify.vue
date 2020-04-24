<template>
  <div class="box">
    <div class="add-box">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-bind:disabled="disabled" v-model="ruleForm.idCard"></el-input>
        </el-form-item>
        <div class="sex">
          性别
          <el-select class="db1" v-model="ruleForm.sex" placeholder="请选择">
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="xueli">
          学历
          <el-select class="db2" v-model="ruleForm.xueli" placeholder="请选择">
            <el-option
              v-for="item in optionsXueli"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-form-item label="毕业院校" prop="school">
          <el-input v-model="ruleForm.school"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button class="mr" type="success" @click="confirm">确定</el-button>
      <el-button type="info" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        idCard: "",
        sex: "",
        xueli: "",
        school: ""
      },
      disabled: false,
      idCard: "",
      username: "",
      optionsSex: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      optionsXueli: [
        {
          value: "小学",
          label: "小学"
        },
        {
          value: "初中",
          label: "初中"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "专科",
          label: "专科"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "研究生",
          label: "研究生"
        },
        {
          value: "博士",
          label: "博士"
        },
        {
          value: "博士后",
          label: "博士后"
        },
        {
          value: "硕士",
          label: "硕士"
        }
      ]
    };
  },
  created() {
    this.idCard = this.$route.query.idCard;
    this.username = this.$route.query.username;
    this.axiosQuery();
  },
  methods: {
    confirm() {
      console.log(this.ruleForm);
      this.checkForm() && this.axiosModify();
    },
    axiosQuery() {
      axios({
        url: url.query,
        method: "post",
        data: {
          username: this.username,
          idCard: this.idCard
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.ruleForm = res.data.data;
            this.disabled = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    axiosModify() {
      console.log(url.modify);
      axios({
        url: url.modify,
        method: "post",
        data: this.ruleForm
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.$router.push("/preview");
          } else {
            this.$message({
              message: res.data.message,
              type: "fail"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkForm() {
      if (this.ruleForm.username == "") {
        this.$message("姓名不能为空");
        return false;
      } else if (this.ruleForm.sex == "") {
        this.$message("请选择性别");
        return false;
      } else if (this.ruleForm.xueli == "") {
        this.$message("请选择学历");
        return false;
      } else if (this.ruleForm.school == "") {
        this.$message("请填写学校");
        return false;
      }
      return true;
    },
    goBack() {
      this.$router.push("/");
    },
    
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 1024px;
  background-color: #324057;
}
.add-box {
  position: relative;
  padding-top: 130px;
  width: 60%;
}
.sex,
.xueli {
  margin-left: 60px;
  font-size: 14px;
  color: #606266;
}
.db1 {
  width: 150px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.db2 {
  width: 150px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.add-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.button {
  position: absolute;
  left: 50%;
  top: 450px;
  transform: translateX(-50%);
}
</style>