<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item
        label="编码"
        prop="ecCode"
      >
        <el-input
          v-model="form.ecCode"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="ecAddress"
      >
        <el-input
          v-model="form.ecAddress"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="别名"
        prop="ecAlias"
      >
        <el-input
          v-model="form.ecAlias"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="所属小区"
        prop="ecHousingestateId"
      >
        <el-input
          v-model="form.ecHousingestateId"
          style="width: 370px;"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'

const defaultForm = {
  id: null,
  ecCode: '',
  ecAddress: '',
  ecAlias: '',
  ecServiceProviderId: '',
  ecHousingestateId: ''
}
export default {
  mixins: [form(defaultForm)],
  props: {
  },
  data() {
    return {
      rules: {
        ecCode: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        ecAddress: [
          { required: true, message: '请输入地址', trigger: 'blur', type: 'number' }
        ],
        ecAlias: [
          { required: true, message: '请输入别名', trigger: 'blur', type: 'number' }
        ],
        ecServiceProviderId: [
          { required: true, message: '请选择运营商', trigger: 'blur', type: 'number' }
        ],
        ecHousingestateId: [
          { required: true, message: '请选择小区', trigger: 'blur', type: 'number' }
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
