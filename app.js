// Change the configurations.  
var config = {
    apiKey: "AIzaSyCHpz4ty7srkDV3AiUDZJLFEOfYGLMpqUM",
    authDomain: "nihal-819a6.firebaseapp.com",
    databaseURL: "https://nihal-819a6.firebaseio.com",
    projectId: "nihal-819a6",
    storageBucket: "nihal-819a6.appspot.com",
    messagingSenderId: "489064704671"
}
    
// Initialize Firebase.
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

new Vue({
    el: "#app",
    firestore() {
        return {
            items: firebase.firestore().collection("portfolioItems")
        }
    },
    data(){
        var creditNum = 1
        return {
            item: {
                title: "",
                genre: "",
                summary: "",
                credits: [
                    {
                        role: "",
                        name: ""
                    }
                ]
            }
        }
    },
    methods: {
        add() {
            console.log('clicked')
            this.$firestore.items.add(this.item).then(()=>{
                this.item.title = "",
                this.item.genre = "",
                this.item.summary = ""
                this.item.credits = [
                    {
                        role: "",
                        name: ""
                    }
                ]
            })
        },
        remove(e) {
            this.$firestore.items.doc(e['.key']).delete()
        },
        newCredit() {
            this.item.credits.push(
                {
                    role: "",
                    name: ""
                }
            );
        }
    }
})