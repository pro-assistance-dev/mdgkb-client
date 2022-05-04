run:
	npm run --openssl-legacy-provider serve


#####
#GIT#
#####

git_push: git_commit
	git push -u origin HEAD

git_commit:
	git pull origin develop
	git add .
	git commit -m "$m"

# example: make git_feature n=1
git_feature:
	git flow feature start PORTAL-$n