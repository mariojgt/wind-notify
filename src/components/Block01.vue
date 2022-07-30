<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content w-full text-center">
            <div class="w-full">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img src="https://raw.githubusercontent.com/mariojgt/mariojgt/main/mario_avatar.png" />
                    </div>
                </div>
                <h1 class="text-5xl font-bold p-3">Wind-Notify</h1>
                <p class="py-6">Wind-Notify provide a simple and easy way to display tailwind and daisy UI toast
                    notification with almost 0 configuration, works using Vanilia js and basic inject the div that will
                    handle the toast all you need is to import and call ONE method.</p>
                <div class="badge">Tailwind</div>
                <div class="badge badge-primary">Daisy ui</div>
                <div class="badge badge-secondary">Vanilia Js</div>
                <div class="badge badge-outline">Light weight</div>

                <div class="p-10">
                    <h1 class="text-5xl font-bold">Examples</h1>

                    <div class="p-10">
                        <div class="form-control ">
                            <label class="label">
                                <span class="label-text">Position</span>
                            </label>
                            <select class="select select-bordered " v-model="position">
                                <option disabled selected>Select the position</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="right">Right</option>
                                <option value="left">Left</option>
                            </select>
                            <label class="label">
                                <span class="label-text">Notification Display Time</span>
                                <span class="label-text-alt">Must be in frames</span>
                            </label>
                            <input type="text" placeholder="Display Time" class="input "
                                v-model="displayTime" />
                        </div>
                        <div class="preview pt-5 bg-base-200 rounded-b-box rounded-tr-box flex flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-10 undefined"
                            style="background-size: 5px 5px">
                            <button class="btn btn-success"
                                @click="startWindToast('Success Example!', 'This is a success', 'success', displayTime, position);">success</button>
                            <button class="btn btn-info"
                                @click="startWindToast('Info Example!', 'This is a info', 'info', displayTime, position);">info</button>
                            <button class="btn btn-error"
                                @click="startWindToast('Error Example!', 'This is a error', 'error', displayTime, position);">error</button>
                            <button class="btn btn-warning"
                                @click="startWindToast('Warning Example!', 'This is a warning', 'warning', displayTime, position);">warning</button>
                        </div>
                    </div>
                </div>
                <div class="w-full p-10">
                    <h1 class="text-5xl font-bold p-10">Get stared</h1>
                    <p class="py-6">Installation</p>
                    <div class="mockup-code">
                        <pre data-prefix="$" class="text-warning" ><code>npm i @mariojgt/wind-notify</code></pre>
                    </div>
                    <p class="py-6">Import the class</p>
                    <div class="mockup-code">
                        <pre data-prefix="$" class="text-success" ><code>import { startWindToast } from "@mariojgt/wind-notify/packages/index.js";</code></pre>
                    </div>
                    <p class="py-6">How to use the notify class</p>
                    <div class="mockup-code">
                        <pre data-prefix="$" class="text-gray-500" ><code>// title = you notification title</code></pre>
                        <pre data-prefix="$" class="text-gray-500" ><code>// message = you notification message</code></pre>
                        <pre data-prefix="$" class="text-gray-500" ><code>// alertType = warning, success, info , error</code></pre>
                        <pre data-prefix="$" class="text-gray-500" ><code>// time = How long that notification will be available need to be in frames</code></pre>
                        <pre data-prefix="$" class="text-gray-500" ><code>// position = top, bottom, right, left</code></pre>
                        <pre data-prefix="$" class="text-info" ><code>startWindToast(title, message, alertType, time, position)</code></pre>
                    </div>
                    <p class="py-6">Notes: if using jit mode please add the packages/toasts/info.js file to the purge so you have the css classes</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { startWindToast } from "./../../packages/index.js";

import { ref } from "vue";

defineProps({
    msg: String,
});

const count = ref(0);
let position = ref('right');
let displayTime = ref(10);


</script>
