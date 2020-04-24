<template>
  <div class="box">
    <div class="add-box">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" v-model="idCard">
          <el-input v-model="idCard"></el-input>
        </el-form-item>
        <div class="sex">
          性别
          <el-select class="db1" v-model="sex" placeholder="请选择">
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
          <el-select class="db2" v-model="xueli" placeholder="请选择">
            <el-option
              v-for="item in optionsXueli"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-form-item label="毕业院校">
          <el-input v-model="school"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button :loading="openLoading" class="mr" type="success" @click="addInfo">添加</el-button>
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
      name: "",
      idCard: "",
      sex: "",
      xueli: "",
      school: "",
      openLoading: false, // 添加按钮loading状态
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
  methods: {
    goBack() {
      this.$router.push("/");
    },
    addInfo() {
      console.log(url.add);
      this.checkForm() && this.axiosAdd();
    },
    checkForm() {
      if (this.name == "") {
        this.$message("姓名不能为空");
        return false;
      } else if (this.idCard == "") {
        this.$message("身份证不能为空");
        return false;
      } else if (this.sex == "") {
        this.$message("请选择性别");
        return false;
      } else if (this.xueli == "") {
        this.$message("请选择学历");
        return false;
      } else if (this.school == "") {
        this.$message("请填写学校");
        return false;
      }
      return true;
    },
    axiosAdd() {
      this.openLoading = true;

      axios({
        url: url.add,
        method: "post",
        data: {
          username: this.name,
          idCard: this.idCard,
          sex: this.sex,
          xueli: this.xueli,
          school: this.school
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            console.log(res.data.message);
            this.$message({
              message: res.data.message,
              type: "success"
            });
            console.log("success");
            this.$router.push("/");
            this.openLoading = false;
          } else {
            if (res.data.code == 403) {
              this.openLoading = false;
              this.$message({
                message: res.data.message,
                type: "fail"
              });
            } else {
              this.openLoading = false;
              this.$message({
                message: "添加失败",
                type: "fail"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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