# mdgkb-client

## Installation
Для запуска проекта необходимо установить ряд пакетов.
Ниже приведен пример порядка установки для Ubuntu 20.04

### 1. Установите Node Version Manager (nvm): 
```
	sudo apt update 
	sudo apt install curl
	curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
	source ~/.bashrc
```
	и далее, установите node v16.11.0:
```
	nvm install v16.11.0
```
### 2. Установите Vue и проверьте версию:
```
	sudo apt update
	sudo npm install -g @vue/cli
	vue —version
```
### 3. Установите make:
```
	sudo apt update
	sudo apt install make
```
### 4. Установите Visual Studio Code:
```
	sudo apt install software-properties-common apt-transport-https wget
	wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
	sudo add-apt-repository "deb [arch=amd64]https://packages.microsoft.com/repos/vscode stable main"

	sudo apt update
	sudo apt install code
```
### 5. Установите и настройте Git:
```
	sudo apt update
	sudo apt install git
	git --version
	git config --global user.name "ваше имя в git"
	git config --global user.email "ваш email в git"
	git config --list
```
### 6. Если вы пользуйтесь программой контроля версий Sublime Merge, то установите ее:
```
	sudo apt update && sudo apt install apt-transport-https -y
	wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -

	echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list

	sudo apt update && sudo apt install sublime-merge -y
```
### 7. Установите make:
```
	sudo apt install make
	
```
### Переустановите ебучий curl
```
sudo snap remove curl
sudo apt install curl

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

