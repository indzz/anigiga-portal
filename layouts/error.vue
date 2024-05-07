<template>
    <div class="error-page">
        <div class="error-code">
            {{error.statusCode}}
        </div>
        <h1 class="error-title">{{ title }}</h1>
        <p class="error-message">{{error.message}}</p>
        <NuxtLink to="/" class="btn-back">
            Back to Home
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        layout: 'plain',
        props: {
            error: {
                type: Object,
                default: null
            }
        },
        computed: {
            title() {
                return this.error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred';
            }
        },
        head() {
            return {
                title: this.title
            }
        }
    }
</script>

<style lang="scss">
    .error-page {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,PingFang TC,Heiti TC,Microsoft JhengHei,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
        font-size: 16px;
        color: #333333;
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .error-code {
        font-size: 8.25rem;
        font-weight: 700;
        &:after {
            content: " ";
            display: block;
            margin: 0 auto 16px auto;
            width: 64px;
            height: 10px;
            background: #0097A6;
        }
    }
    .error-title {
        font-size: 2.25rem;
        font-weight: 700;
    }
    .error-message {
        margin-bottom: 16px;
    }
    .btn-back {
        background: #ABC71C;
        color: #ffffff;
        display: inline-block;
        padding: 12px 16px;
        min-width: 290px;
        text-align: center;
        text-decoration: none;
        border-radius: 25px;
        transition: background-color 0.4s;
        &:hover {
            background: darken(#ABC71C, 5%);
        }
    }
</style>
