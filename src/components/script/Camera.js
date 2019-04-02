export default {

  mounted:function () {
    eventHub.$emit('change-title', 'Camera')
  }
}
