let appear = false;
const settingBar = document.querySelector('.setting-bar');
const settingButton = document.getElementById('settings');

function changeSettingBarState() {
    if (appear == true) {
        appear = false;
    } else {
        appear = true;
    }
}

function settingBarAppear() {
    if (appear == true) {
        settingBar.style.animation = 'hide 0.3s ease-in-out forwards';
    } else {
        settingBar.style.display = 'block';
        settingBar.style.animation = 'move 0.3s ease-in-out forwards';
    }
    changeSettingBarState();
}

settingButton.addEventListener('click', settingBarAppear)

