<template>
  <el-main class="box">
    <div class="gongneng">
      <el-button @click="goQuery" class="item" type="primary">去查询</el-button>
      <el-button @click="goAdd" class="item" type="primary">去添加</el-button>
      <el-button @click="having" class="item" type="primary">已添加</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    goQuery() {
      this.$router.push("/query");
    },
    goAdd() {
      this.$router.push("/add");
    },
    having() {
      this.$router.push("/preview");
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 1021px;
  text-align: center;
  padding-top: 80px;
  background-color: #324057;
}
.gongneng {
  margin-top: 50px;
}
.item {
  margin-left: 40px;
}
</style>>