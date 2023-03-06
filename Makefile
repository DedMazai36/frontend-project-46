install: install-deps
		

lint:
	npx eslint .
test:
	npm test

install-deps:
	npm ci