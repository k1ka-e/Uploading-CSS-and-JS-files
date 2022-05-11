export function upload(selector, options = {}) {
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

        const files = Array.from(event.target.files)

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
                <div class="preview__remove">&times;</div>
                <img src="${src}" alt="${file.name}" />
                <div class="preview__info">

                </div>
            </div>
                `)
            }

            reader.readAsDataURL(file)
        });
    }

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHeandler)
}