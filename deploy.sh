sudo apt install curl
sudo apt install make
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install latest
curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
sudo npm install -g typescript
sudo npm install -g ts-node
npm run collect-compiler-information
npm run compile
npm run test
npm run collect-images
npm run save
npm run start
