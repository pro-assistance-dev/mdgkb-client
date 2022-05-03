run:
	npm run --openssl-legacy-provider serve

git_commit:
	git pull origin develop
	git add .
	git commit -m "$m"

git_push: git_commit
	git push -u origin HEAD