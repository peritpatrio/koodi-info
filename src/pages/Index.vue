<template>
  <Layout class="h-full bg-gray-100 flex flex-col">
    <section class="bg-gray-900 relative">
      <div class="flex container mx-auto px-4 py-3">
        <div class="w-full lg:w-2/3  my-6 z-40">
          <span class="text-xs font-black uppercase text-teal-400 mb-2 block">{{this.$page.meta.globals.homePage.pageTitle}}</span>
          <h1 class="sm:text-3xl text-1xl font-semibold	tracking-wide leading-tight text-gray-100 mb-2">{{this.$page.meta.globals.homePage.pageContent}}</h1>
          <p class="text-l font-normal tracking-wider leading-normal text-gray-200 mt-12">Kerro mistä haluat tietää enemmän</p>
          <form 
              name="proposal"
              method="post"
              v-on:submit.prevent="handleSubmit"
              action="/success/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
            <div class="flex flex-wrap my-4">
            <div class="w-full sm:w-5/6 mb-3">
              <input v-model="formData.proposal" class="bg-gray-100 appearance-none border-2 border-gray-200 rounded sm:rounded-tr-none sm:rounded-br-none w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" type="text" name="proposal" placeholder="Esim. Node.js, Vue, Design system">
            </div>
            <div class="w-full sm:w-1/6">
              <button class="bg-teal-500 appearance-none border-2 border-teal-500 rounded sm:rounded-tl-none sm:rounded-bl-none w-full py-4 px-4 text-black font-bold leading-tight focus:outline-none focus:bg-teal-200 focus:border-teal-200 hover:bg.teal-200" type="submit">{{this.submitText}}</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="h-full bg-gray-100">
      <div class="container mx-auto px-4 py-3">
        <div class="py-6 flex flex-wrap -mx-2">
          <div v-for="(item, i) in $page.posts.entries" :key="item.id" :post="item" class="w-full sm:w-1/1 md:w-1/3 px-2 my-4" :class="{'': i > 0 }">
            <Card :post="item" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Card from '~/components/Card.vue'
import Notifications from '~/components/Notifications.vue'
export default {
  data() {
    return {
      formData: {},
      notificationData: []
    }
  },
  components: {
    Card,
    Notifications
  },
  props:{
    submitText: {
      type: String,
      required: false,
      default: 'Ehdota'
    }
  },
  metaInfo () {
    return {
      title: this.$page.meta.globals.homePage.pageSeoContent.title,
      meta: [
        { name: 'description', content: this.$page.meta.globals.homePage.pageSeoContent.description },
        { property: "og:type", content: 'website' },
        { property: "og:title", content: this.$page.meta.globals.homePage.pageSeoContent.social.facebook.title },
        { property: "og:description", content: this.$page.meta.globals.homePage.pageSeoContent.social.facebook.description },
        { property: "og:url", content: "https://koodi.info" },
        { property: "og:image",  content: this.$page.meta.globals.homePage.pageSeoContent.social.facebook.image.url },
        { name: "twitter:card", content: "Summary" },
        { name: "twitter:title", content: this.$page.meta.globals.homePage.pageSeoContent.social.twitter.title },
        { name: "twitter:description", content: this.$page.meta.globals.homePage.pageSeoContent.description },
        { name: "twitter:site", content: "@vj_andrei" },
        { name: "twitter:creator", content: "@vj_andrei" },
        { name: "twitter:image", content: this.$page.meta.globals.homePage.pageSeoContent.social.twitter.image.url },
      ],
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    },
    handleSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
      .then(() => {
        this.formData = ""
        this.submitText = "Kiitos 👍🏻"
      })
      .catch(error => alert(error))
    }
  }
}
</script>

<page-query> 
query Craft ($slug: String){
  meta: craft{
    globals{
       homePage {
        pageTitle
        pageContent
        pageSeoContent {
          title
          description
          social {
            twitter {
              title
              description
              image{
                url
              }
            }
            facebook {
              title
              description
              image{
                url
              }
            }
          }
        }
      }
    }
  }
  posts: craft {
  entries  (slug: $slug) {
    ... on craft_KoodiInfo{
        uri
        slug
        title
        postTitle
      	pageSummaryContent{
          content
        }
      }
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteUrl
  }
}
</static-query>