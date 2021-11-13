export default function chooseTransition(to, from) {
  let transition

  if (!from || from.name == 'contact') {
    transition = ''
  }
  else if (to.name == 'index') {
    transition = { name: 'slide-out', mode: '' }
  }
  else if (from.name == 'index') {
    transition = { name: 'slide-in', mode: '' }
  }
  else if (to.name == 'project-uid' && from.name == 'projects') {
    transition = { name: 'push-left', mode: '' }
  }
  else if (to.name == 'projects' && from.name == 'project-uid') {
    transition = { name: 'push-right', mode: '' }
  }
  else {
    transition = ''
  }

  return transition
}
