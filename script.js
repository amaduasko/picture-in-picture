const videoElement = document.getElementById('video')
const button = document.getElementById('button')

let error = false
const setError = (state) => (error = state)
// Prompt to select a media stream, pass to video element => play

const selectMediaStream = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }
    } catch (error) {
        setError(true)
    }
}

// listener

button.addEventListener('click', async () => {
    if (!videoElement.srcObject || error) {
        button.disabled = true

        await selectMediaStream()

        //start picture in picture
        await videoElement.requestPictureInPicture()

        //reset button
        button.disabled = false
        return
    }
    // Disable button
    button.disabled = true

    //start picture in picture
    await videoElement.requestPictureInPicture()

    //reset button
    button.disabled = false
})

//onload
window.onload = () => selectMediaStream()
