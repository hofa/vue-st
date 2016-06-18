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

  applicant_id: "412927197812141714", // 身份证号码

  ref: "",
  refType: "",


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
