function getTestData(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = {
        msg: '操作成功',
        code: '0000',
        data: {},
        success: true
      };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = getTestData;
