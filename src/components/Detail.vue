<template>
<div id="detail">
    <el-row>
        <el-col :span="6">
            <span>地址:</span><span >{{this.detail.address}}</span>
        </el-col>
    </el-row>
    <el-row>
       <el-col :span="6">
              <span>日期:</span><span>{{this.detail.date}}</span>
        </el-col>
    </el-row>
    <el-row>
       <el-col :span="6">
              <span>姓名:</span><span>{{this.detail.name}}</span>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
       detail: ""
    }
  },
  created() {
      this.detail = this.$route.query.detail
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
          this.$router.push({path: '/detail', params:{detail: user}})
      }
  }
}
</script>
<style scoped>
.row-margin{
    margin-top: 20px;
}
</style>
