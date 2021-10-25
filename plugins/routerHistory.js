export default ({ app }, inject) => {
    inject('initialHistoryCount', window.history.length)
  }
  