import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'
import CryptoJS from 'crypto-js';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    API: 'http://localhost:4000',
    streams: Array,
    followedHashtags: Array,
    showSettings: false,
  },
  mutations: {
    setTokenAndKey(state, tokenAndKey) {
      state.token = tokenAndKey.token;
      state.userkey = tokenAndKey.userkey;
    },
    getStreams(state, streams) {
      state.streams = streams;
      console.log("STORE....streams from store: ", state.streams);
    },
    setFollowed(state, followed) {
      state.followed = followed;
      console.log("STORE....streams from store: ", state.streams);
    },
    toggle(state) {
      state.showSettings = !state.showSettings;
      console.log("Store toggle", state.showSettings);
    }
  },
  actions: {
    async checkStatus(ctx) {
      const token = sessionStorage.getItem("shuiToken");
      console.log('token isLoggedin', typeof (token))

      if (token) {
        try {
          let resp = await axios.get(`${ctx.state.API}/isloggedin`, {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
            },
          });
          console.log('User: ', resp.data)
          ctx.commit('showSettings');
          // router.push("/showSettings");
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('user not logged in')
        // router.push('/login')
      }
    },
    async login(ctx, cred) {

      let resp = await axios.post(`${ctx.state.API}/auth/login`, {
        username: cred.username,
        password: cred.password
      });

      // Session Storage. Storing token and user key thats coming from server
      sessionStorage.setItem('shuiToken', resp.data.token);
      sessionStorage.setItem('shuiUserkey', resp.data.userkey);

      ctx.commit('setTokenAndKey', resp.data)

      // Route to /flows
      router.push('/flow')

    },
    async register(ctx, cred) {
      try {
        const resp = await axios.post(`${ctx.state.API}/users`, {
          username: cred.username,
          password: cred.password,
        });
        console.log("New USER: ", resp);
        //take the registered user to login
        router.push("/login")
      } catch (error) {
        console.log(error);
      }
    },
    async getStreams(ctx) {
      try {
        let streams = await axios.get(`${ctx.state.API}/allHashtags`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('shuiToken')}` //to get the authorization header. We take this from store
          }
        });
        console.log("TOKEN", sessionStorage.getItem('shuiToken'))
        let decryptedStream = streams.data.map(stream => {
          let decryptedInfo = CryptoJS.AES.decrypt(stream.info, sessionStorage.getItem('shuiToken')).toString(CryptoJS.enc.Utf8)

          console.log("CRYPTED Information: ", stream.info)
          console.log("DeCrypted information: ", decryptedStream)



          stream.info = decryptedInfo;
          console.log("DeCrypted information: ", stream.info)
          return stream;
        })

        console.log("Get Streams from store: ", streams)
        // ctx.commit("getStreams", streams.data)
        ctx.commit("getStreams", decryptedStream)
      } catch (error) {
        console.log(error)
      }

      //   console.log("Get Streams from store: ", streams)
      //   ctx.commit("getStreams", streams.data)
      // } catch (error) {
      //   console.log(error)
      // }
    },
    async createStream(ctx, newFlow) {
      console.log("IN CREATE STREAM STORE");
      const createdflow = await axios.post(
        `${ctx.state.API}/addStream`,
        {
          info: newFlow.info,
          hashtag: newFlow.hashtag,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
      router.push("/flow");
      console.log("newflow", createdflow);
    },
    async addHastag(ctx, hashtag) {
      console.log("Inside add hashtag store")
      const tag = await axios.post(
        `${ctx.state.API}/addHashtag`,
        { hashtag },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
      console.log("STORE-HASHTAG ADDED", tag);
    },
    async removeHashTags(ctx, hashtag) {
      console.log('HashTag to delete: ', hashtag);
      await axios.delete(`${ctx.state.API}/removeHashtag`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('shuiToken')}` //to get the authorization header. We take this from store
        },
        data: { hashtag },
      });
    },
    async removeUser(ctx) {
      await axios.delete(`${ctx.state.API}/removeUser`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
        },
      });
      sessionStorage.clear();
    },
    async followedHashtags(ctx) {
      const followed = await axios.get(
        `${ctx.state.API}/hashtags`,

        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );

      ctx.commit("setFollowed", followed.data);
    }

  },
  modules: {
  },
  getters: {
    allHashtags(state) {
      console.log("In getter store...")
      return state.streams.map((stream) => stream.hashtag);
    },
  }
})
