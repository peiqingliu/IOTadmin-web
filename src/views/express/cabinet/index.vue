<template>
  <div class="app-container">
    <div class="app-container">
      <!--工具栏-->
      <div class="head-container">
        <crudOperation :permission="permission" />
      </div>
      <!--数据-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" border style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="ecCode" label="锁控板ID" />
        <el-table-column prop="ecAddress" label="地址" />
        <el-table-column prop="ecAlias" label="别名" />
        <el-table-column prop="status" label="状态" align="center" />
        <el-table-column prop="lastDate" label="创建日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.lastDate) }}</span>
          </template>
        </el-table-column>
        <!--   编辑与删除   -->
        <el-table-column
          label="操作"
          width="130px"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
      <!--表单渲染-->
      <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="570px">
        <el-form ref="form" :inline="false" :model="form" :rules="rules" size="small" label-width="95px">
          <el-form-item label="快递柜编码" prop="ecCode">
            <el-input v-model="form.ecCode" />
          </el-form-item>
          <el-form-item label="地址" prop="ecAddress">
            <el-input v-model="form.ecAddress" />
          </el-form-item>
          <el-form-item label="别名" prop="ecAlias">
            <el-input v-model="form.ecAlias" />
          </el-form-item>
          <el-form-item label="所属小区" prop="ecHousingestateId">
            <el-select
              v-model="form.ecHousingestateId"
              style="width: 178px"
              placeholder="请选择"
              @remove-tag="deleteTag"
              @change="changeHosingestate"
            >
              <el-option
                v-for="item in ecHousingestates"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import crudCabinet from '@/api/express/cabinet'
import CRUD, { presenter, form, crud } from '@crud/crud'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import crudOperation from '@crud/CRUD.operation'
import { getAllKdgHousingEstate } from '@/api/express/kdgHousingEstate'
const defaultForm = { ecCode: null, ecAddress: null, ecAlias: null, ecHousingestateId: null }
export default {
  name: 'Cabinet',
  components: { pagination, udOperation, crudOperation },
  mixins: [presenter(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: '',
      url: 'api/kdgExpCabinet/',
      sort: ['ecCode,asc', 'ecId,desc'],
      crudMethod: { ...crudCabinet }
    })
  },
  data() {
    return {
      ecHousingestates: [],
      permission: {
        add: ['admin', 'job:add'],
        edit: ['admin', 'job:edit'],
        del: ['admin', 'job:del']
      },
      rules: {
        ecCode: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        ecAddress: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        ecAlias: [
          { required: true, message: '请输入别名', trigger: 'blur' }
        ],
        ecServiceProviderId: [
          { required: true, message: '请选择运营商', trigger: 'blur' }
        ],
        ecHousingestateId: [
          { required: true, message: '请选择小区', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getKdgHousingEstate()
    },
    deleteTag(value) {
    },
    changeHosingestate(value) {
    },
    getKdgHousingEstate() {
      getAllKdgHousingEstate().then(res => {
        this.ecHousingestates = res.result.map(item => {
          return { value: `${item.heId}`, label: `${item.heName}` }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
