export default function printMe(p) {
  return () => {
    console.log('Print:', Date.now())
    p.innerHTML = `ClickTime: ${Date.now()}`
  }
}
