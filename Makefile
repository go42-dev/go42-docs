.PHONY: preview

preview:
	npm ci --no-audit --no-fund
	npm run build
	npm run preview
