run:
	npm run --openssl-legacy-provider serve

git_commit:
	git pull origin develop
	git add .
	git commit -m "$m"

git_push: git_commit
	git push -u origin HEAD

git_merge_dev: git_push
	git fetch $(git rev-parse --abbrev-ref HEAD):develop
	git checkout develop
	git push