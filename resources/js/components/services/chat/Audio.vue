<template>
    <div class="audio__wrapper">
        <div class="audio w-full px-3 py-2 rounded-full bg-[#1c1c1c] grid grid-cols-[90px_1fr] gap-1.5 items-center">
            <audio @timeupdate="progressAudio()" @ended="toggleAudioPlaying()" ref="audio" src="/audio.mp3"></audio>
            <div class="audio__btns flex items-center gap-2">
                <button @click="toggleAudioPlaying()" v-show="!audio_playing"
                    class="audio__play-btn text-white active:opacity-75 cursor-pointer">
                    <svg width="14" height="14">
                        <use href="#play-media"></use>
                    </svg>
                </button>
                <button @click="toggleAudioPlaying()" v-show="audio_playing"
                    class="audio__stop-btn text-white active:opacity-75 cursor-pointer">
                    <svg width="14" height="14">
                        <use href="#stop-media"></use>
                    </svg>
                </button>
                <span class="audio__time text-sm text-white">
                    {{ audio_settings[1] }} / {{ audio_settings[0] }}
                </span>
            </div>
            <div ref="progressContainer" @click="scrollAudio($event)"
                class="audio__progress-container w-full py-0.5 px-0.5 bg-[#383838] rounded-full flex items-center cursor-pointer">
                <span ref="bufferBar"
                    class="audio__progress block w-full transition-transform duration-100 will-change-transform origin-left bg-white h-1 rounded-full"></span>
            </div>
        </div>
        <Transition name="opacity">
            <p v-if="transcription_opened" class="audio__transcription text-center">
                В этом сообщении нет четких слов.
            </p>
        </Transition>
    </div>
</template>

<script>
export default {
    name: "Audio",

    data() {
        return {
            audio_playing: false,
            audio_settings: ["1:28", "0:00"], // duration, time, persent, speed,
            transcription_opened: false,
        }
    },

    methods: {
        toggleAudioPlaying() {
            this.audio_playing = !this.audio_playing
            if (this.audio_playing) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
        },

        progressAudio(e) {
            const audio = this.$refs.audio
            const duration = audio.duration
            const time = audio.currentTime

            const percent = duration ? time / duration : 0
            this.$refs.bufferBar.style.transform = `scaleX(${percent})`

            this.audio_settings = [
                this.formatTime(duration),
                this.formatTime(time),
                0,
                1
            ]
        },

        scrollAudio(e) {
            const audio = this.$refs.audio

            const rect = this.$refs.progressContainer.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percent = Math.min(Math.max(x / rect.width, 0), 1)

            this.$refs.bufferBar.style.transform = `scaleX(${percent})`
            audio.currentTime = audio.duration * percent
        },

        transcriptAudio() {
            this.transcription_opened = true
        },
    }

}
</script>
