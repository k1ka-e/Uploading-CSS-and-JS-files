function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!bytes) {
       return '0 Byte' 
    } 
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), i) + ' ' + sizes[i]
}

const element = (tag,classes = [], content) => {
    const node = document.createElement(tag)

    if (classes.length) {
        node.classList.add(...classes)
    }

    if (content) {
        node.textContent = content
    }

    return node
    
}


export function upload(selector, options = {}) {
    let files = []
    const input = document.querySelector(selector)
    const preview = element('div', ['preview'])
    const open = element('button', ['btn'], 'Открыть')
    const upload = element('button', ['btn', 'primary'], 'Загрузить')
    upload.style.display = 'none'


    if(options.multi) {
        input.setAttribute('multiple', true)
    }

    if(options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', upload)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()

    const changeHeandler = event => {
        if(!event.target.files.length) {
            return
        }

        files = Array.from(event.target.files)
        preview.innerHTML = ''
        upload.style.display = 'inline'


        files.forEach(file => {
            if (!file.type.match( 'image')) {
                return
            }

            const reader = new FileReader()

            reader.onload = ev => {
                const src = ev.target.result
                preview.insertAdjacentHTML('afterbegin', `
            <div class="preview__img">
              <div class="preview__remove" data-name="${file.name}">&times;</div>
                <img src="${src}" alt="${file.name}" />
                <div class="preview__info">
                <span>${file.name}</span>
                ${bytesToSize(file.size)}
              </div>
            </div>
            `)

            }

            reader.readAsDataURL(file)
        });
    }

    const removeHeandler = event => {
        if(!event.target.dataset.name) {
            return
        }

        const {name} = event.target.dataset
        files = files.filter(file => file.name !== name)

        if(!files.length) {
            upload.style.display = 'none'
        }

        const block = preview
        .querySelector(`[data-name="${name}"]`)
        .closest('.preview__img')

        block.classList.add('removing')
        setTimeout( () => block.remove(), 300)
    }

    const uploadHeandler = () => {

    }


    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHeandler)
    preview.addEventListener('click', removeHeandler)
    upload.addEventListener('click', uploadHeandler)
}