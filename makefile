.PHONY: all

all: compile.json
	cargo build
	npm install
	npm run collect-images
	npm run collect-compiler-information
	npm run compile
	npm run collect-images
	npm run start

compile.json:
	touch compile.json
