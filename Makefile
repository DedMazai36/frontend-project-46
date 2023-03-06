install: npm ci
		npx simple-git-hooks
		
lint:
	npx eslint .
test:
	npm test
