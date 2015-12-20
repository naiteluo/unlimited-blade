// run test server
var server = require('../../../test-server/server');
var port = server.config.port;

var _ = require('underscore');

describe('测试接口', function () {
  describe('正常case', function () {

    it('/user 接口应该包含以下key: name 和 age.', function () {

      var requestConfig = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port + '/user',
        params: {
          id: 1
        },
        timeout: 2000
      };
      var data = request(requestConfig);
      var error = data.error;
      var response = data.response;
      var output = data.output;

      expect(error).to.be(null);
      expect(response.statusCode).to.eql(200);

      expect(output).to.have.key('name', 'age');
      expect(output.age).to.be.a('number');

    });
    it('local test api should pass diff', function () {

      var requestConfigOnline = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port + '/user',
        params: {
          id: 1
        },
        timeout: 2000
      };
      var requestConfigOffline = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port + '/userOffline',
        params: {
          id: 1
        },
        timeout: 2000
      };

      var dataOnline = request(requestConfigOnline);
      var outputOnline = dataOnline.output;

      var dataOffline = request(requestConfigOffline);
      var outputOffline = dataOffline.output;
    });

    it.skip('frs should pass diff', function () {

      var params = {
        _client_type: "2",
        _client_version: "99.9.9",
        ka: "open",
        kw: "牛劈叉",
        m_api: "%2Fc%2Fs%2Fmsg",
        m_size_d: "471",
        m_size_u: "1194",
        net_type: "3",
        pn: "1",
        q_type: "100",
        rn: "90",
        rn_need: "30",
        scr_h: "960",
        scr_w: "640",
        sign: "123456tbclient654321",
        with_group: "1"
      };

      var config = {
        type: 'POST',
        params: _.clone(params),
        timeout: 2000
      };

      // TODO 用此方法可以实现增量diff，通过查看diff的patch来判断新上线是否符合预期
      var requestConfigOnline = _.extend(config, {
        uri: 'http://c.tieba.baidu.com/c/f/frs/page'
      });
      var requestConfigOffline =  _.extend(config, {
        uri: 'http://fes6.tieba.baidu.com/c/f/frs/page'
      });

      var dataOnline = request(requestConfigOnline);
      var outputOnline = dataOnline.output;

      var dataOffline = request(requestConfigOffline);
      var outputOffline = dataOffline.output;

      var diffResult = diff.diffJson(outputOffline, outputOnline, {
        ignore: [
          'app','tbs', 'server_time', 'time', 'logid'
        ]
      });
      // console.log('abc');
      expect(diffResult).to.be({});
    });

  });
});
