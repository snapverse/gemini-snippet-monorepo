export default function (window: HTMLElement) {
  let grabbing = false
  let offset = { x: 0, y: 0 }

  window.onmousedown = (ev) => {
    const target = ev.target as HTMLElement
    target.style.cursor = 'grabbing'

    offset = { x: ev.offsetX, y: ev.offsetY }

    grabbing = true
  }

  window.onmouseup = (ev) => {
    const target = ev.target as HTMLElement
    target.style.cursor = 'grab'
    grabbing = false
  }

  window.onmouseenter = (ev) => {
    const target = ev.target as HTMLElement
    target.style.cursor = 'grab'
  }

  document.addEventListener('mousemove', (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    const coords = { x: ev.clientX, y: ev.clientY }

    if (grabbing) {
      window.style.transform = `
				translate(${coords.x - offset.x}px, ${coords.y - offset.y}px)
      `
    }
  })

  return window
}
