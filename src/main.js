// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'


export default function (Vue, { router, head, isClient }) {
  // Add a html attributes
  head.htmlAttrs = { lang: 'fi', class: 'h-full' }
  head.bodyAttrs = { class: 'bg-gray-100 text-gray-900 tracking-wider leading-normal antialiased font-sans' }
  // Add a meta tag
  head.meta.push({
    name: 'keywords',
    content: 'HTML,CSS,XML,JavaScript,Koodari,Koodausta,Ohjeilmointi,Käyttöliittymäsuunnittelua'
  })
  // Add a Google fonts
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Raleway:400,700,900'
  })


  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
