const imputbox = document.getElementById('imputbox');
const progress = document.querySelector('.progress');
const weakness = document.querySelector('.weakness');
imputbox.addEventListener('input', display);

function display() {
    const array = checkStrength(imputbox.value);
    let strength = 100;
    weakness.innerHTML = "";
    weakness.style.display='none';
    if (!this.value) return
    array.forEach((value) => {
        if (value == null) return;
        const node = document.createElement('div');
        node.innerHTML = value.id1;
        weakness.appendChild(node);
        strength -= value.id2;
    });
    progress.style.setProperty('--strength', strength);
    weakness.style.display='block';
}

function checkStrength(pwd) {
    let array = [];
    array.push(checkLength(pwd));
    array.push(checkUppercase(pwd));
    array.push(checkLowercase(pwd));
    array.push(checkNumber(pwd));
    array.push(checkSpacialchar(pwd));
    array.push(checkRepeat(pwd));
    return array;
}

function checkLength(pwd) {
    if (pwd.length <= 5) {
        return {
            id1: "Your password is too short",
            id2: 40
        };
    }
    else if (pwd.length <= 10) {
        return {
            id1: "Your password could be longer",
            id2: 15
        };
    }
}

function checkUppercase(pwd) { return checktype(pwd, /[A-Z]/g, 'Uppercase charecters') }
function checkLowercase(pwd) { return checktype(pwd, /[a-z]/g, 'Lowercase charecters') }
function checkNumber(pwd) { return checktype(pwd, /[0-9]/g, 'Numbers') }
function checkSpacialchar(pwd) { return checktype(pwd, /[^0-9A-Za-z\g]/g, 'Spcial charecters') }

function checktype(pwd, regex, type) {
    const w = pwd.match(regex) || [];
    if (w.length == 0) {
        return {
            id1: `Your password has no ${type}`,
            id2: "20"
        };
    }
    else if (w.length <= 2) {
        return {
            id1: `Your password could use more ${type}`,
            id2: 5
        };
    }
}

function checkRepeat(pwd) {
    const regex = /(.)\1/g;
    let w = pwd.match(regex) || [];
    if (w.length > 0) {
        return {
            id1: `Your password has repeat characters`,
            id2: w.length * 5
        };
    }
}