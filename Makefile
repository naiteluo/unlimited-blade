all:
	@node index.js
test:
	@mocha ./test/*.js -R list
run-server:
	@DEBUG=express:* node ./test-server/server.js
.PHONY: all test run-server
