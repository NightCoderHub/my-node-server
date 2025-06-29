// 数据字典常量定义（纯JavaScript）

/**
 * 数据字典常量定义规范：
 * 1. 导出为一个数组：DICT_COLLECTION
 * 2. 数组的每个元素都是一个字典集合对象，包含以下字段：
 * - dictCode: 字符串，字典的唯一编码（如 'USER_STATUS'）
 * - dictId: 字符串，字典的唯一ID（可与dictCode相同或单独生成）
 * - dictName: 字符串，字典的中文名称（如 '用户状态'）
 * - sort: 数字，字典的排序值
 * - remark: 字符串，字典的备注说明
 * - dictList: 数组，包含该字典的具体项，每个项遵循原有 value、label 等结构
 * 3. 字典项（dictList中的元素）保持原有结构：value、label、sort、remark、color和disable等属性
 * 4. 所有字典值应保持一致的类型（字符串）
 */

const DICT_COLLECTION = [
  {
    dictCode: "USER_STATUS",
    dictId: "USER_STATUS", // 或者生成一个UUID
    dictName: "用户状态",
    sort: 1,
    remark: "用于表示用户的当前状态",
    dictList: [
      { value: "1", label: "正常", sort: 1, remark: "用户可正常登录使用", color: "success", disable: false },
      { value: "2", label: "禁用", sort: 2, remark: "用户被管理员禁用", color: "danger", disable: false },
      { value: "3", label: "锁定", sort: 3, remark: "用户因多次输错密码锁定", color: "warning", disable: false },
      { value: "4", label: "已删除", sort: 4, remark: "用户被逻辑删除", color: "default", disable: true },
      { value: "5", label: "已废弃", sort: 5, remark: "用户被废弃", color: "default", disable: true },
    ],
  },
  {
    dictCode: "GENDER",
    dictId: "GENDER",
    dictName: "性别",
    sort: 2,
    remark: "用于表示用户的性别",
    dictList: [
      { value: "1", label: "男", sort: 1, remark: "男性用户", color: "primary", disable: false },
      { value: "2", label: "女", sort: 2, remark: "女性用户", color: "success", disable: false },
      { value: "3", label: "其他", sort: 3, remark: "其他性别", color: "default", disable: false },
    ],
  },
  {
    dictCode: "ORDER_STATUS",
    dictId: "ORDER_STATUS",
    dictName: "订单状态",
    sort: 3,
    remark: "用于表示订单的当前处理状态",
    dictList: [
      { value: "1", label: "待付款", sort: 1, remark: "订单已创建但尚未支付", color: "warning", disable: false },
      { value: "2", label: "已付款", sort: 2, remark: "订单已支付但尚未发货", color: "primary", disable: false },
      { value: "3", label: "已发货", sort: 3, remark: "订单已发货但尚未签收", color: "primary", disable: false },
      { value: "4", label: "已完成", sort: 4, remark: "订单已签收完成", color: "success", disable: false },
      { value: "5", label: "已取消", sort: 5, remark: "订单已被取消", color: "danger", disable: false },
      { value: "6", label: "已退款", sort: 6, remark: "订单已退款", color: "default", disable: false },
    ],
  },
  {
    dictCode: "PAYMENT_METHOD",
    dictId: "PAYMENT_METHOD",
    dictName: "支付方式",
    sort: 4,
    remark: "用于表示订单的支付方式",
    dictList: [
      { value: "1", label: "支付宝", sort: 1, remark: "通过支付宝支付", color: "primary", disable: false },
      { value: "2", label: "微信支付", sort: 2, remark: "通过微信支付", color: "success", disable: false },
      { value: "3", label: "信用卡", sort: 3, remark: "通过信用卡支付", color: "warning", disable: false },
      { value: "4", label: "银行转账", sort: 4, remark: "通过银行转账支付", color: "default", disable: false },
      { value: "5", label: "现金", sort: 5, remark: "通过现金支付", color: "default", disable: false },
    ],
  },
  {
    dictCode: "PRIORITY",
    dictId: "PRIORITY",
    dictName: "优先级",
    sort: 5,
    remark: "用于表示任务或事项的优先级",
    dictList: [
      { value: "1", label: "低", sort: 1, remark: "低优先级任务", color: "primary", disable: false },
      { value: "2", label: "中", sort: 2, remark: "中优先级任务", color: "warning", disable: false },
      { value: "3", label: "高", sort: 3, remark: "高优先级任务", color: "danger", disable: false },
      { value: "4", label: "紧急", sort: 4, remark: "紧急优先级任务", color: "danger", disable: false },
    ],
  },
  {
    dictCode: "COMMON_STATUS",
    dictId: "COMMON_STATUS",
    dictName: "通用状态",
    sort: 6,
    remark: "通用的启用/禁用状态表示",
    dictList: [
      { value: "1", label: "启用", sort: 1, remark: "启用状态", color: "success", disable: false },
      { value: "0", label: "禁用", sort: 2, remark: "禁用状态", color: "danger", disable: false },
    ],
  },
  {
    dictCode: "AUDIT_STATUS",
    dictId: "AUDIT_STATUS",
    dictName: "审核状态",
    sort: 7,
    remark: "用于表示审核流程中的状态",
    dictList: [
      { value: "1", label: "待审核", sort: 1, remark: "等待审核", color: "warning", disable: false },
      { value: "2", label: "已通过", sort: 2, remark: "审核已通过", color: "success", disable: false },
      { value: "3", label: "已拒绝", sort: 3, remark: "审核已拒绝", color: "danger", disable: false },
    ],
  },
  {
    dictCode: "EDUCATION_LEVEL",
    dictId: "EDUCATION_LEVEL",
    dictName: "学历",
    sort: 8,
    remark: "用于表示用户的学历层次",
    dictList: [
      { value: "小学", label: "小学", sort: 1, remark: "小学学历", color: "default", disable: false },
      { value: "初中", label: "初中", sort: 2, remark: "初中学历", color: "default", disable: false },
      { value: "高中", label: "高中", sort: 3, remark: "高中学历", color: "default", disable: false },
      { value: "中专", label: "中专", sort: 4, remark: "中专学历", color: "default", disable: false },
      { value: "大专", label: "大专", sort: 5, remark: "大专学历", color: "default", disable: false },
      { value: "本科", label: "本科", sort: 6, remark: "本科学历", color: "default", disable: false },
      { value: "硕士", label: "硕士", sort: 7, remark: "硕士学历", color: "default", disable: false },
      { value: "博士", label: "博士", sort: 8, remark: "博士学历", color: "default", disable: false }
    ]
  },
  {
    dictCode: "INTERESTS",
    dictId: "INTERESTS",
    dictName: "主要兴趣",
    sort: 9,
    remark: "用于表示用户的主要兴趣方向",
    dictList: [
      { value: "1", label: "编程", sort: 1, remark: "编程开发相关兴趣", color: "default", disable: false },
      { value: "2", label: "设计", sort: 2, remark: "设计相关兴趣", color: "default", disable: false },
      { value: "3", label: "艺术", sort: 3, remark: "艺术相关兴趣", color: "default", disable: false },
      { value: "4", label: "管理", sort: 4, remark: "管理相关兴趣", color: "default", disable: false },
      { value: "5", label: "语言", sort: 5, remark: "语言学习相关兴趣", color: "default", disable: false },
      { value: "6", label: "其他", sort: 6, remark: "其他兴趣", color: "default", disable: false }
    ]
  },
  {
    dictCode: "SECONDARY_INTERESTS",
    dictId: "SECONDARY_INTERESTS",
    dictName: "次要兴趣",
    sort: 10,
    remark: "用于表示用户的次要兴趣方向",
    dictList: [
      { value: "1", label: "音乐", sort: 1, remark: "音乐相关兴趣", color: "default", disable: false },
      { value: "2", label: "阅读", sort: 2, remark: "阅读相关兴趣", color: "default", disable: false },
      { value: "3", label: "运动", sort: 3, remark: "运动相关兴趣", color: "default", disable: false },
      { value: "4", label: "旅行", sort: 4, remark: "旅行相关兴趣", color: "default", disable: false }
    ]
  },
  {
    dictCode: "COURSE",
    dictId: "COURSE",
    dictName: "课程",
    sort: 11,
    remark: "用于表示用户学习的课程类型",
    dictList: [
      { value: "1", label: "Java全栈开发", sort: 1, remark: "Java全栈开发相关课程", color: "default", disable: false },
      { value: "2", label: "产品经理实战", sort: 2, remark: "产品经理实战相关课程", color: "default", disable: false },
      { value: "3", label: "高级英语口语", sort: 3, remark: "高级英语口语相关课程", color: "default", disable: false }
    ]
  },
  {
    dictCode: "LEARNING_METHOD",
    dictId: "LEARNING_METHOD",
    dictName: "偏好的学习方式",
    sort: 12,
    remark: "用于表示用户偏好的学习方式类型",
    dictList: [
      { value: "1", label: "线上", sort: 1, remark: "线上学习方式", color: "default", disable: false },
      { value: "2", label: "线下", sort: 2, remark: "线下学习方式", color: "default", disable: false },
      { value: "3", label: "混合", sort: 3, remark: "线上线下混合学习方式", color: "default", disable: false }
    ]
  }
];

module.exports = DICT_COLLECTION;