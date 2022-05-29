const repeatHtml = document.getElementById('repeat').innerHTML
const terminal = document.getElementById('terminal')

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
            const output = eval(val)
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