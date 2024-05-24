let repeat = document.getElementById('repeat').innerHTML
let repeatHtml = document.getElementById('repeat').innerHTML
const terminal = document.getElementById('terminal')
const redBut = document.getElementById('red')
const orangeBut = document.getElementById('orange')
const greenBut = document.getElementById('green')
const terwin = document.getElementById('terwin')
const navbar = document.getElementById("navbar")
let user = '@user'

const resetHtml = [`<br><p>Welcome to the webter!</p>
                    <p>Just a terminal like thing in web(not a real shell). Inspired from <a href="https://github.com/LavSarkari/LavSarkari.github.io/">LavSarkari</a>.</p>
                    <p>Type help to get commands list</p>
                    <p><b>Note:</b> This is not a real terminal so real commands wont work here
                    </p>`,
    `<div id="repeat">
                    <div id="loc">
                        <span class="user" id="user">@user</span>
                        <span class="in" id="in"> in</span>
                        <span class="loc" id="location"> ./webter</span>
                    </div>
                    <div id="inp">
                        <span class="carret"><i class="fa-solid fa-angle-right"></i></span>&nbsp;<input id="type" onchange="create()" autocomplete="off" autofocus spellcheck="false">
                    </div>
                </div>`]
let output

redBut.addEventListener('click', () => {
    const innerChild = resetHtml
    terminal.innerHTML = ''
    let i = 0
    let interval = setInterval(function () {
        if (i >= innerChild.length)
            clearInterval(interval);
        else
            terminal.innerHTML += innerChild[i];
        i++
    }, 700)
    if (document.getElementById('type'))
        document.getElementById('type').focus()
    repeatHtml = repeatHtml.replaceAll(`${repeatHtml.innerText}`, '@user')
    repeat = repeat.replaceAll(`${user}`, `@user`)
    repeatHtml = repeatHtml.replaceAll(`${user}`, `@user`)
    document.getElementById('mylog').innerHTML = ''
    user = '@user'
})
orangeBut.addEventListener('click', () => {
    terwin.classList.remove("terwin_close")
    navbar.classList.remove("navbar_close")
    terwin.classList.toggle("terwinFullScr")
    navbar.classList.toggle("navbarFullScr")
    document.getElementById('type').focus()
})

greenBut.addEventListener('click', () => {
    terwin.classList.toggle("terwin_close")
    navbar.classList.toggle("navbar_close")
})

document.getElementById('name').addEventListener('change', () => {
    ChangeName(false, null);
})

document.addEventListener('click', (clicked) => {
    if (clicked.target.id == 'name') { }
    else
        if (document.getElementById('type'))
            document.getElementById('type').focus()
})

function create() {
    let isClearCmd = false
    const inputHtml = document.getElementById('type').parentElement
    let val = document.getElementById('type').value
    const valTag = document.getElementById('type')
    document.getElementById('type').remove()
    switch (val.split(' ')[0]) {
        case 'help':
            inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                        <b>commands:</b><br>
                        <span class="greenTxt">help</span>: shows the commands.<br>
                        <span class="greenTxt">source</span>: sends the github link of this site.<br>
                        <span class="greenTxt">clear</span>: clears the terminal<br>
                        <span class="greenTxt">changeUser</span>: changes the user(you can also change at the about input section)<br>
                        <br><b>Navigation Button fucntions:</b><br>
                        <span class="redTxt">Red Button</span>: Restart the terminal.<br>
                        <span class="orangeTxt">Orange Button</span>: Maximize/Restore down the terminal.<br>
                        <span class="greenTxt">Green Button</span>: Minimize the terminal<br>
                        Webter can perfrom some basic arithmetic operation like addition, substraction, division, multiplication, etc.
                        <span>It can also perform some js methods</span>
                    </span>`
            break;
        case 'source':
            inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                        source:&nbsp;<a href="https://github.com/Chandra-sekhar-pilla/webter">https://github.com/Chandra-sekhar-pilla/webter</a><br>
                    </span>`
            break;
        case 'clear':
            isClearCmd = true
            break;
        case 'changeUser':
            const isChanged = ChangeName(true, valTag);
            if (isChanged)
                inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                    User changed.
                    </span>`
            else
                inputHtml.innerHTML = `
                    <span class="carretRed"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="redTxt">${val}</span><br>
                    <span>Enter a username to change.<br></span>`
            break;
        default:
            try {
                output = looseJsonParse(val)
            } catch (e) {
                output = `<span class="redTxt">${e.stack.replaceAll('\n', '<br>')}</span>`
                console.log(output)
            }
            if (!isNaN(val.replace(/[^\w\s]/gi, '')) || output) {
                inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                        ${output}<br>
                    </span>`
            }
            if (val.includes('console.log')) {
                inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>`
                copyOutput(inputHtml)
            }
            else if (output.toString().includes('redTxt')) {
                inputHtml.innerHTML = `
                    <span class="carretRed"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="redTxt">${val}</span><br>
                    <span>Command doesn't exist: ${val.split(' ')[0]}<br></span>`
            } else {
                inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                        ${output}<br>
                    </span>`
            }
    }
    if (!isClearCmd)
        terminal.innerHTML += repeatHtml
    else {
        terminal.innerHTML = repeat
        isClearCmd = false
    }
    document.getElementById('type').scrollTo()
}

window.onchange = function (changed) {
    document.getElementById('terwin').scrollTo(0, document.getElementById('terwin').scrollHeight)
    document.getElementById('type').focus()
}

window.onload = function () {
    document.getElementById('mylog').innerHTML = ''
}

function ChangeName(isCmd, val) {
    let userEls = [...document.getElementsByClassName('user')]
    let name
    let isChanged = false
    if (!isCmd)
        name = document.getElementById('name')
    else
        name = val
    if (name.value.replace('changeUser', '').trim().replace(' ', '-').toLowerCase() != '') {
        repeatHtml = repeatHtml.replace(`${user}`, `@${name.value.replace('changeUser', '').trim().replace(' ', '-').toLowerCase()}`)
        repeat = repeat.replace(`${user}`, `@${name.value.replace('changeUser', '').trim().replace(' ', '-').toLowerCase()}`)
        user = `@${name.value.replace('changeUser ', '').trim().replace(' ', '-').toLowerCase()}`
        userEls.forEach(user => {
            user.innerText = `@${name.value.replace('changeUser', '').trim().replace(' ', '-').toLowerCase()}`
        })
        name.value = ''
        isChanged = true
    } else {
        isChanged = false
    }
    return isChanged;
}

function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

var baseLogFunction = console.log;
console.log = function () {
    baseLogFunction.apply(console, arguments);
    var args = Array.prototype.slice.call(arguments);
    document.querySelector('#mylog').innerHTML = ""
    for (var i = 0; i < args.length; i++) {
        var node = createLogNode(args[i]);
        document.querySelector('#mylog').appendChild(node);
    }
}

function createLogNode(message) {
    var node = document.createElement("div");
    var textNode = document.createTextNode(message);
    node.appendChild(textNode);
    return node;
}

function copyOutput(inputHtml) {
    output = document.getElementById('mylog').innerText
    inputHtml.innerHTML += `<span>${output.replaceAll('\n', '<br>')}</span>`
    document.getElementById('mylog').innerHTML = ''
    console.clear()
}