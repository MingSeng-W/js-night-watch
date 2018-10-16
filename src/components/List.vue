<template>
<div>
<el-row>
    <el-col :span="8" :offset="4">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="2" :offset="1">
    <el-button type="primary" @click="search" id="search">搜索</el-button>
    </el-col>
</el-row>
<el-row class="row-margin">
    <el-col :span="12" :offset="4">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
       <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small" class="show-detail">查看</el-button>
        </template>
    </el-table-column>
    </el-table>
    </el-col>
</el-row>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  id="errorModal">
  <span v-text="errorMsg" :data-error="hasError" id="hasErrorSpan"></span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
        input:"",
        tableData: [],
        dialogVisible: false,
        errorMsg:'',
        hasError: false
    }
  },
  methods:{
      search(){
          let self = this
          if(isNaN(this.input)){
              this.errorMsg="请输入数字类型"
              this.hasError=true
              this.dialogVisible=true
              return
          }
          fetch(`/api/data/${this.input}`,{
            method: "post",
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify({ query: self.input })
            })
           .then(result => {
            // console.log(result)
            return result.json()
            })
            .then(res=> {
                self.tableData = res.data
            })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      toDetail(detail){
          let user  = detail
          this.$router.push({ path:'/detail', query: { detail: user}})
      }
  }
}
</script>
<style scoped>
.row-margin{
    margin-top: 20px;
}
</style>
