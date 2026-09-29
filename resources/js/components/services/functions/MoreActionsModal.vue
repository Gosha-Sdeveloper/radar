<template>
    <ul class="actions w-48 rounded-xl bg-white shadow-md overflow-hidden z-5">
        <li class="actions__function">
            <button @click="opendInfo"
                class="actions__function-btn ripple-btn flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#efefef] w-full cursor-pointer border border-transparent duration-50"
                aria-label="Показать информацию о группе">
                <svg class="z-2" width="26" height="26">
                    <use href="#info"></use>
                </svg>
                <span class="z-2">Информация</span>
            </button>
        </li>
        <li class="actions__function">
            <button @click="onNotificationClick"
                class="actions__function-btn actions__function-btn--notification ripple-btn flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#efefef] w-full cursor-pointer border border-transparent duration-50"
                aria-label="Настроить уведомления">
                <svg class="z-2" width="26" height="26">
                    <use href="#notifications"></use>
                </svg>
                <span class="z-2 notification-settings__text--default">Уведомления</span>
                <div
                    class="actions__function-notifications notification-settings flex items-center justify-between absolute left-10 w-35 bg-transparent z-2">
                    <span class="notification-settings__text">{{ this.notifications_on ? 'Откл.' : 'Вкл.'
                        }}</span>
                    <Switch class="pointer-events-none" id="notification" v-model="notifications_on" />
                </div>
            </button>
        </li>
        <li class="actions__function">
            <button @click="openDonate"
                class="actions__function-btn ripple-btn flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#efefef] w-full cursor-pointer border border-transparent  duration-50"
                aria-label="Настроить уведомления">
                <svg class="z-2" width="26" height="26">
                    <use href="#ruble"></use>
                </svg>
                <span class="z-2">Поддержать</span>
            </button>
        </li>
        <li class="actions__function">
            <button @click="openReport"
                class="actions__function-btn ripple-btn flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#efefef] w-full cursor-pointer border border-transparent duration-50"
                aria-label="Пожаловаться">
                <svg class="z-2" width="26" height="26">
                    <use href="#activities"></use>
                </svg>
                <span class="z-2">Пожаловаться</span>
            </button>
        </li>
        <li class="actions__function">
            <button @click="createRipple"
                class="actions__function-btn ripple-btn flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#efefef] w-full cursor-pointer border border-transparent duration-50 relative hover:text-red-600"
                aria-label="Покинуть сообщество">
                <svg class="z-2" width="26" height="26">
                    <use href="#exit"></use>
                </svg>
                <span class="z-2">Покинуть</span>
            </button>
        </li>
    </ul>


</template>

<script>
import Switch from '../../ui/buttons/Switch.vue';
import { useRipple } from '../../../composables/useRipple.js';


export default {
    name: "MoreActionsModal",

    components: {
        Switch
    },

    data() {
        return {
            is_active: false,
            notifications_on: true,
        }
    },

    methods: {
        onNotificationClick(e) {
            this.createRipple(e)
            this.toggleSetting()
        },

        toggleSetting() {
            this.notifications_on = !this.notifications_on
        },

        opendInfo(e) {
            this.createRipple(e)
            this.$emit('open-info')
            setTimeout(() => {
            }, 300);
        },

        openDonate(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('open-donate')
            }, 300);

        },

        openReport(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('open-report')
            }, 300);
        },

        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        }
    },
}
</script>

<style scoped>
.notification-settings__text--default {
    opacity: 1;
}

.actions__function-notifications {
    opacity: 0;
}

.actions__function-btn--notification:hover .notification-settings__text--default {
    opacity: 0;
}

.actions__function-btn--notification:hover .actions__function-notifications {
    opacity: 1;
}



.functions-enter-active {
    transition: transform 250ms ease;
    transform-origin: top right;
}

.functions-enter-from {
    transform: scale(0.3);
}
</style>
