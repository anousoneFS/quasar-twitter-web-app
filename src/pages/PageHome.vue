<template>
  <q-page class="relative-position">
   <q-scroll-area class="absolute full-width full-height">
    <div class="q-py-lg q-px-md row q-gutter-x-md items-end">
      <div class="col">
        <q-input
          class="new-qweet"
          v-model="newQtweetContent"
          autogrow
          bottom-slots
          placeholder="how are you today?"
          counter
          maxlength="50"
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <template>
          <q-btn
            @click="addQweet"
            :disable="!newQtweetContent"
            class="q-mb-lg"
            rounded
            unelevated
            color="primary"
            no-caps
            label="Tweet"
          />
        </template>
      </div>
    </div>

    <q-separator class="divider" size="16px" color="grey-2" />

    <q-list separator>
      <transition-group
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <q-item class="qweet q-py-md" v-for="qweet in qweets" :key="qweet.id">
          <q-item-section avatar>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-subtitle1">
            <q-item-label
              ><strong>lisa conell</strong
              ><span class="text-grey-7">@lisa_conell
                <br class="lt-md">&bull;             {{ qweet.date | relativeDate }}
                </span></q-item-label
            >
            <q-item-label caption>
              <p class="qweet-content text-body1">{{ qweet.content }}</p>
            </q-item-label>
            <div class="qweet-icon row justify-between q-mt-sm">
              <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
              <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
              <q-btn @click="toggledLiked(qweet)" flat round :color="qweet.liked ? 'pink' : 'grey'" size="sm" :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'" />
              <q-btn
                @click="deleteQweet(qweet)"
                flat
                round
                color="grey"
                size="sm"
                icon="fas fa-trash"
              />
            </div>
          </q-item-section>
        </q-item>
      </transition-group>
    </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'
export default {
  name: 'PageHome',
  data () {
    return {
      newQtweetContent: '',
      qweets: [
        // {
        //   id: 'id1',
        //   content: 'how are you today? i am fine',
        //   date: 1616106059031,
        //   liked: false
        // },
        // {
        //   id: 'id2',
        //   content: 'what is your name? haha',
        //   date: 1616106131154,
        //   liked: true
        // }
      ]
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date(), { addSuffix: true })
    }
  },
  methods: {
    addQweet () {
      const newQweet = {
        content: this.newQtweetContent,
        date: Date.now(),
        liked: false
      }
      // this.qweets.unshift(newQweet)
      db.collection('qweets').add(newQweet).then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
      this.newQtweetContent = ''
    },

    deleteQweet (qweet) {
      // const dateToDelete = qweet.date
      // const id = this.qweets.findIndex(ind => ind.date === dateToDelete)
      // this.qweets.splice(id, 1)
      // console.log('delete:', id, 1)
      db.collection('qweets').doc(qweet.id).delete().then(() => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    toggledLiked (qweet) {
      db.collection('qweets').doc(qweet.id).update({
        liked: !qweet.liked
      }).then(() => {
        console.log('Document successfully updated!')
      }).catch((error) => {
        console.error('Error updating document: ', error)
      })
    }
  },
  mounted () {
    db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const qweetChange = change.doc.data()
        qweetChange.id = change.doc.id
        if (change.type === 'added') {
          console.log('New qweet: ', qweetChange)
          this.qweets.unshift(qweetChange)
        }
        if (change.type === 'modified') {
          console.log('Modified qweet: ', qweetChange)
          const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
          Object.assign(this.qweets[index], qweetChange)
        }
        if (change.type === 'removed') {
          console.log('Removed qweet: ', qweetChange)
          const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
          this.qweets.splice(index, 1)
        }
      })
    })
  }
}
</script>
<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  font-size: 16px
  white-space: pre-line
.qweet-icon
  margin-left: -5px
.qweet:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)
</style>
