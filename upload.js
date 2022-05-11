function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!bytes) {
       return '0 Byte' 
    } 
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), i) + ' ' + sizes[i]
}


export function upload(selector, options = {}) {
    let files = []
    const input = document.querySelector(selector)
    const preview = document.createElement('div')

    preview.classList.add('preview')

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'Открыть'

    if(options.multi) {
        input.setAttribute('multiple', true)
    }

    if(options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()

    const changeHeandler = event => {
        if(!event.target.files.length) {
            return
        }

        files = Array.from(event.target.files)

        preview.innerHTML = ''
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

        const block = preview
        .querySelector(`[data-name="${name}"]`)
        .closest('.preview__img')

        block.remove()
    }


    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHeandler)
    preview.addEventListener('click', removeHeandler)
}