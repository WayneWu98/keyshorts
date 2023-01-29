import './main'

window.onload = () => {
  const parent = document.querySelector('.parent') as HTMLElement
  const child = document.querySelector('.child') as HTMLElement
  parent.registerKeyshort(['Meta', 'f'], {
    handler: () => {
      console.log('parent keyshort hit')
      child.focus()
    }, repeat: true
  })
  child.registerKeyshort(['Meta', 'f'], {
    handler: () => {
      console.log('child keyshort hit')
      document.body.focus()
    }, repeat: true
  })
  document.body.registerKeyshort(['Meta', 'f'], () => {
    console.log('document keyshort hit')
    parent.focus()
  })
}