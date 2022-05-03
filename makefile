run:
	npm run --openssl-legacy-provider serve

push_full:
	git add .
	git commit -m "$m"
	git push
