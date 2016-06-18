var config = {
  APIServer: "http://dev-api.ubi001.com/v1/"
}

import store from '../quote/assets/js/lib/store.min.js'

// function dataStore() {
//   console.log(data)
// }

// dataStore.prototype = {
//   data: function() {
//     return {
//       quoteNumber: '',
//       areaName: '',
//       areaNumber: '',
//       carNO: '',
//       carNOPre: '',
//       mobile: ''
//     }
//   }
// }

// var dataStore = {
//   data: function() {
//     return {
//       quoteNumber: '',
//       areaName: '',
//       areaNumber: '',
//       carNO: '',
//       carNOPre: '',
//       mobile: ''
//     }
//   }
// }

// for (let key in dataStore.data()) {
//   Object.defineProperty(dataStore, key, {
//     set: function (x) {
//         console.log("in property set accessor:" + key)
//         // this.newaccpropvalue = x
//         // console.log(key)
//         store.set('quote_' + key, x)
//     },
//     get: function () {
//         console.log("in property get accessor:" + key)
//         // return this.newaccpropvalue
//         return store.get('quote_' + key)
//     }
//   });
// }
var dataStore = {
  quoteNumber: "",
  areaName: "",
  areaNumber: "",
  carNO: "",
  plateNum: "",
  mobile: "",
  ownName: "",

  // vehicle
  vehicle_newcar: "", // 0已上牌 1未上牌
  vehicle_engine: "1303029686", // 发动机号
  vehicle_vin: "LGWEE2K51DE060185",
  vehicle_register: "2013-06-25",
  vehicle_model: "长城CC7150CE0C轿车",
  vehicle_id: "4028b2b64b5995f9014b5da269720adb",
  vehicle_code: "TYD1029BDC",
  vehicle_transfer: 0, // 是否过户 0 1

  // c01
  // 车辆损失险
  c01_duty_01: 1,
  c01_duty_01_deduction: 1,

  // 第三者责任险
  c01_duty_02: 1,
  c01_duty_02_deduction: 1,
  c01_duty_02_amount: 50,

  // 司机座位责任险
  c01_duty_04: 1,
  c01_duty_04_deduction: 1,
  c01_duty_04_amount: 50000,

  // 乘客座位责任险
  c01_duty_05: 1,
  c01_duty_05_deduction: 1,
  c01_duty_05_amount: 10000,
  c01_duty_05_seat: 4,

  // 玻璃单独破碎险
  c01_duty_08: 1,
  c01_duty_08_kind: 0,
  c01_duty_08_deduction: 1,

  // 车身划痕损失险
  c01_duty_17: 1,
  c01_duty_17_amount: 2000,
  c01_duty_17_deduction: 1,

  // 涉水损失险损失险
  c01_duty_41: 1,
  c01_duty_41_deduction: 1,

  // 盗抢险
  c01_duty_03: 1,
  c01_duty_03_deduction: 1,

  // 自燃损失险
  c01_duty_18: 1,
  c01_duty_18_deduction: 1,

  // 交强险起期
  c51_startDate: '',

  // 商业险起期
  c01_startDate: '',

  // 车船税
  tax_type: 1,

  applicant_id: "412927197812141714", // 身份证号码

  ref: "",
  refType: "",

  // 刷新quoteNumber
  refreshQuoterNumber: 1
}

// vue watch
var watcher = {}

for(let i in dataStore) {
  dataStore[i] = store.get('ds.' + i) || dataStore[i]
  // console.log(dataStore[i])
  watcher['DS.' + i] = function(val, oldVal) {
    if (val !== oldVal) {
      store.set('ds.' + i, val)
    }
  }
}
// console.log(watcher)
module.exports.dataStore = dataStore
module.exports.watcher = watcher
module.exports.config = config
