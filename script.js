let repeat = document.getElementById('repeat').innerHTML
let repeatHtml = document.getElementById('repeat').innerHTML
const terminal = document.getElementById('terminal')
const redBut = document.getElementById('red')
const orangeBut = document.getElementById('orange')
const greenBut = document.getElementById('green')
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
    const toggler = new Toggler
    toggler.toggleClass('terwin', 'terwin', 'terwinFullScr');
    toggler.toggleClass('navbar', 'navbar', 'navbarFullScr');
    toggler.toggleProperty('title', 'width', '63vw', '100vw')
    document.getElementById('type').focus()
})

greenBut.addEventListener('click', () => {
    alert('Didn\'t decided what to do when green is clicked if you have any idea please share.\n\nThank you')
})

document.getElementById('name').addEventListener('change', () => {
    let userEls = [...document.getElementsByClassName('user')]
    const name = document.getElementById('name')
    repeatHtml = repeatHtml.replace(`${user}`, `@${name.value.trim().replace(' ', '-').toLowerCase()}`)
    repeat = repeat.replace(`${user}`, `@${name.value.trim().replace(' ', '-').toLowerCase()}`)
    user = `@${name.value.trim().replace(' ', '-').toLowerCase()}`
    userEls.forEach(user => {
        user.innerText = `@${name.value.trim().replace(' ', '-').toLowerCase()}`
    })
    name.value = ''
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
    document.getElementById('type').remove()
    switch (val.split(' ')[0]) {
        case 'help':
            inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                        commands:<br>help:<br>shows the commands.<br>
                        source:<br>sends the github link of this site.<br>
                        <br>Webter can perfrom some basic arithmetic operation like addition, substraction, division, multiplication, etc.
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
            break
        default:
            try {
                output = looseJsonParse(val)
            } catch (e) {
                output = `<span class="redTxt">${e.stack.replaceAll('\n', '<br>')}</span>`
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
            else if(output.toString().includes('redTxt'))
                inputHtml.innerHTML = `
                    <span class="carretRed"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="redTxt">${val}</span><br>
                    <span>Command doesn't exist: ${val.split(' ')[0]}<br></span>`
            else
                inputHtml.innerHTML = `
                    <span class="carret"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="text">${val}</span><br>
                    <span>
                        ${output}<br>
                    </span>`
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

function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

var baseLogFunction = console.log;
console.log = function () {
    baseLogFunction.apply(console, arguments);
    var args = Array.prototype.slice.call(arguments);
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

window.onerror = function (message, url, linenumber) {
    console.log("JavaScript error: " + message + " on line " +
        linenumber + " for " + url);
}

function copyOutput(inputHtml) {
    output = document.getElementById('mylog').innerText
    inputHtml.innerHTML += `<span>${output.replaceAll('\n', '<br>')}</span>`
    document.getElementById('mylog').innerHTML = ''
    console.clear()
}