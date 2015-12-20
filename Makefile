all:
	@node index.js
test:
	@mocha ./test/tool-case/*.js -R list
run-server:
	@DEBUG=express:* node ./test-server/server.js
run-ub:
	@node ./test/dev-case/exec-ub.js
.PHONY: all test run-server run-ub
