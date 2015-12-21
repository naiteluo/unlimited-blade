/**
 * 引入数据或公用方法或自定义工具方法
 */

// 公用数据
var commonData = require('../common/data');

describe('frs pub_env diff, ', function () {
  describe('client normal', function () {
    it('should pass', function () {

      var requestConfigOnline = commonData.getConfig({
        config: {
          uri: 'http://c.tieba.baidu.com/c/f/frs/page'
        },
        params: {
          kw: '小米'
        },
        userName: 'naiteluo',
        pubEnv: 0
      });

      var requestConfigPreview = commonData.getConfig({
        config: {
          uri: 'http://c.tieba.baidu.com/c/f/frs/page'
        },
        params: {
          kw: '小米'
        },
        userName: 'naiteluo',
        pubEnv: 1
      });

      var dataOnline = request(requestConfigOnline);
      var outputOnline = dataOnline.output;

      var dataPreview = request(requestConfigPreview);
      var outputPreview = dataPreview.output;

      // 登录状态校验
      expect(outputOnline.user.is_login).to.be.eql(1);
      expect(outputPreview.user.is_login).to.be.eql(1);

      var diffResult = diff.diffJson(outputPreview, outputOnline, {
        ignore: [
          'app','tbs', 'server_time', 'time', 'logid', 'sign_count'
        ]
      });

      // diff校验
      expect(diffResult).to.be.eql({});

    });
  });
});
