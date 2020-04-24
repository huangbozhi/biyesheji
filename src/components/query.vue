<template>
  <div class="box">
    <div class="query">
      通过姓名和身份证查询信息
      <!-- <h3>通过姓名和身份证查询</h3> -->
    </div>
    <div class="formBox">
      <el-form label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="idCard"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button class="mr" :loading="loading" type="success" @click="query">查询</el-button>
      <el-button type="info" @click="goBack">返回</el-button>
    </div>
    <div v-if="isShow" class="form-info">
      查询的内容：
      <el-table :data="tableData">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="xueli" label="学历"></el-table-column>
        <el-table-column prop="school" label="毕业院校"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      isShow: false,
      loading: false,
      name: "",
      idCard: "",
      tableData: [
        {
          name: "",
          idCard: "",
          sex: "",
          xueli: "",
          school: ""
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    query() {
      this.checkForm() && this.axiosQuery();
    },
    checkForm() {
      if (this.name == "") {
        this.$message("姓名不能为空");
        return false;
      } else if (this.idCard == "") {
        this.$message("身份证不能为空");
        return false;
      } else {
        return true;
      }
    },
    fuzhi(data) {
      this.tableData[0].name = data.username;
      this.tableData[0].idCard = data.idCard;
      this.tableData[0].sex = data.sex;
      this.tableData[0].xueli = data.xueli;
      this.tableData[0].school = data.school;
    },
    axiosQuery() {
      this.loading = true;

      axios({
        url: url.query,
        method: "post",
        data: {
          username: this.name,
          idCard: this.idCard
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.isShow = true;
            this.fuzhi(res.data.data);
            console.log(this.name, this.xueli);
          } else {
            this.$message({
              message: "未查询到该用户信息",
              type: "fail"
            });
            this.isShow = false;
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
  text-align: center;
}
.query {
  position: absolute;
  /* transform: translateX(50%); */
  margin-left: 30px;
  margin-top: 120px;
}
.formBox {
  position: relative;
  width: 60%;
  height: 150px;
  padding-top: 180px;
  margin: 0 auto;
}
.mr {
  margin-right: 60px;
}
.form-info {
  width: 80%;
  margin: 0 auto;
  position: relative;
  margin-top: 80px;
}
</style>