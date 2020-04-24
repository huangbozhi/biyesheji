<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="xueli" label="学历"></el-table-column>
      <el-table-column prop="school" label="毕业院校" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      tableData: [
        {
          username: "hbz",
          idCard: "362502199858585858",
          sex: "男",
          xueli: "本科",
          school: "东华理工大学"
        }
      ]
    };
  },
  created() {
    this.axiosAllInfo();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      let idCard = this.tableData[index].idCard;
      let username = this.tableData[index].username;
      this.$router.push({
        path: "/modify",
        query: {
          username: username,
          idCard: idCard
        }
      });
    },
    handleDelete(index, row) {
      let idCard = this.tableData[index].idCard;
      // console.log(index, idCard);
      axios({
        url: url.delete,
        method: "delete",
        data: {
          idCard: idCard
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.axiosAllInfo();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "fail"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    axiosAllInfo() {
      axios({
        url: url.queryAll,
        method: "post"
      })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data;
            console.log(this.tableData);
          } else {
            console.log("error");
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
  width: 90%;
  margin: 0 auto;
  padding-top: 40px;
}
</style>