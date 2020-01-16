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

new Vue({
    el: "#app",
    firestore() {
        return {
            persons: firebase.firestore().collection("persons")
        }
    },
    data(){
    return {
        person: {
            name: ""
        }
    }
    },
    methods: {
        add() {
            console.log('clicked')
            this.$firestore.persons.add(this.person).then(()=>{
                this.person.name = ""
            })
        },
        remove(e) {
            this.$firestore.persons.doc(e['.key']).delete()
        }
    }
})