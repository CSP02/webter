let repeatHtml = document.getElementById('repeat').innerHTML
const terminal = document.getElementById('terminal')
const terHtml = terminal.innerHTML
const redBut = document.getElementById('red')
const orangeBut = document.getElementById('orange')
const greenBut = document.getElementById('green')

redBut.addEventListener('click', () => {
    const innerChild = [...terminal.childNodes]
    terminal.innerHTML = ''
    let i = 0
    let interval = setInterval(function () {
        if (i >= innerChild.length)
            clearInterval(interval);
        else
            terminal.appendChild(innerChild[i]);
        console.log(i)
        i++
    }, 500)
    if (i >= 12) {
        document.getElementById('type').focus()
    }
})
orangeBut.addEventListener('click', () => {
    const toggler = new Toggler
    toggler.toggleClass('terwin', 'terwin', 'terwinFullScr');
    toggler.toggleClass('navbar', 'navbar', 'navbarFullScr');
    toggler.toggleProperty('title', 'width', '63vw', '100vw')
    document.getElementById('type').focus()
})
greenBut.addEventListener('click', () => {
    alert('Didn\'t decided what to do when green is clicked if you have any idea please share.\n\nThank you' )
})
document.getElementById('name').addEventListener('change', () => {
    let userEls = [...document.getElementsByClassName('user')]
    const name = document.getElementById('name')
    userEls.forEach(user => {
        user.innerText = `@${name.value.trim().replace(' ', '-').toLowerCase()}`
    })
    name.value = ''
    repeatHtml = document.getElementById('repeat').innerHTML
})

function create() {
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
        default:
            function looseJsonParse(obj) {
                return Function('"use strict";return (' + obj + ')')();
            }
            let output
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
            } else
                inputHtml.innerHTML = `
                    <span class="carretRed"><i class="fa-solid fa-angle-right"></i></span>
                    <span class="redTxt">${val}</span><br>
                    <span>Command doesn't exist: ${val.split(' ')[0]}<br><b>If you are trying console.log() view the browser's console.</b></span>`
    }
    terminal.innerHTML += repeatHtml
    document.getElementById('type').scrollTo()
}

window.onchange = function (changed) {
    document.getElementById('terwin').scrollTo(0, document.getElementById('terwin').scrollHeight)
    document.getElementById('type').focus()
}