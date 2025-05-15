export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap',
        },
      ],
    },
  },
})
