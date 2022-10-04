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

git_merge: git_push
	git checkout develop
	git pull
	git merge @{-1}
	git push

# example: make git_feature n=1
git_feature:
	git flow feature start PORTAL-$n

git_deploy:
	git checkout develop
	git pull
	git checkout master
	git merge --no-commit develop
	git push

#######
#TESTS#
#######

jest_local := ./node_modules/.bin/jest

test_file:
	$(jest_local) -t 'sanitize name get capitalize and not spaced name'

test_covarage:
	$(jest_local) --coverage $n
#
test_covarage_for_file:
	$(jest_local) $t --coverage --collectCoverageFrom=$n

########
#DOCKER#
########

docker_build:
	docker build -t mdgkb-client .

docker_up:
	docker compose up --force-recreate -d

docker_down:
	docker compose down

