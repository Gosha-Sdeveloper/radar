<template>
    <button ref="subscribe" @click="toggleSubscribe($event)"
        :class="['subscribe-btn relative text-lg rounded-full cursor-pointer transition-colors duration-200 hover:opacity-90 border border-white/30 active:scale-98', user_folowed ? 'active text-black bg-white' : 'text-white bg-indigo-900', type === 'chanel' ? 'subscribe-chanel' : 'subscribe-player', type === 'chat' ? 'subscribe-chat' : 'subscribe-player']">
        <span class="relative z-20">
            {{ user_folowed ? 'Вы подписаны' : 'Подписаться' }}
        </span>
    </button>
</template>

<script>
import { useBurst } from '../../../composables/useBurst';

export default {
    name: "SubscribeBtn",

    props: {
        type: {
            type: String,
            required: true,
            default: 'chanel',
        }
    },

    data() {
        return {
            user_folowed: false,
        }
    },

    methods: {
        toggleSubscribe(e) {
            this.burst(e);
            setTimeout(() => {
                this.user_folowed = !this.user_folowed
            }, 90);
            if (!this.user_folowed) {
                setTimeout(() => {
                    this.$refs.subscribe.style.display = "none"
                }, 1200);
            }
        },
        burst(e) {
            const { burst } = useBurst()
            burst(e)
        }

    }

}
</script>

<style scoped>
.subscribe-btn {
    will-change: transform, opacity, color;
}

.subscribe-chanel {
    padding: 6px 18px;
}

.subscribe-player {
    padding: 3px 12px;
}

.subscribe-chat {
    padding: 4px 12px;
    font-size: 14px;
}

.subscribe-btn.active {
    animation: subscribe 300ms ease 850ms;
}

@keyframes subscribe {
    from {
        opacity: 1;
    }

    to {
        opacity: 0
    }
}
</style>
