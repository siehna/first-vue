export default {
  methods: {
    setVideo: function () {
      let video = document.getElementById("video")
      let media = navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      media.then((stream) => {
        video.srcObject = stream
      })
    }
  },

  mounted: function () {
    eventHub.$emit('change-title', 'Camera')
    this.setVideo()
  }
}
