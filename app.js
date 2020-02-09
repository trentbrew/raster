// Change the configurations.  

//lazy login
const lazy = '0106';

console.log(document.body.style.opacity = 1);

if(prompt('Enter pin:') == lazy) {
    var config = {
        apiKey: "AIzaSyCHpz4ty7srkDV3AiUDZJLFEOfYGLMpqUM",
        authDomain: "nihal-819a6.firebaseapp.com",
        databaseURL: "https://nihal-819a6.firebaseio.com",
        projectId: "nihal-819a6",
        storageBucket: "nihal-819a6.appspot.com",
        messagingSenderId: "489064704671"
    }
}
else {

    var config = {}
    alert('Incorrect pin')
    document.location.reload()
}



var beepboop = this.item;

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

// Initialize the FirebaseUI Widget using Firebase.
//var ui = new firebaseui.auth.AuthUI(firebase.auth());

new Vue({
    el: "#app",
    firestore() {
        return {
            filmReel: firebase.firestore().collection("filmReel"),
            items: firebase.firestore().collection("portfolioItems")
        }
    },
    data(){
        return {
            homeActive: true,
            reelWindowActive: false,
            filmWindowActive: false,
            photoWindowActive: false,
            settingsWindowActive: false,
            auth: '',
            photo: {
                src: ""
            },
            reel: {
                finalFilm: ""
            },
            item: {
                title: "",
                genre: "",
                summary: "",
                finalFilm: "",
                credits: [
                    {
                        role: "",
                        name: ""
                    }
                ],
                screenGrabs: [
                    ""
                ]
            }
        }
    },
    beforeCreate: function() {
        //this.auth = prompt('please enter password');

        //console.log('items: ' + this.beepboop);

        //console.log(this.auth);

        // Initialize Firebase.

        
        //login

        
        /*ui.start('#firebaseui-auth-container', {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            //signInSuccessUrl: 
            // Other config options...
        });*/
    },

    created: function() {
        console.log('after authentication');
    },
    methods: {
        add() {
            console.log('clicked')
            console.log(this.items)
            this.$firestore.items.add(this.item).then(()=>{
                this.item.title = "",
                this.item.genre = "",
                this.item.summary = "",
                this.item.finalFilm = "",
                this.item.credits = [
                    {
                        role: "",
                        name: ""
                    }
                ],
                this.item.screenGrabs = [
                    ""
                ]

                //refresh page
                setTimeout(function() {
                    document.location.reload();
                });
            })
        },
        addReel() {
            console.log('clicked')
            console.log(this.items)
            this.$firestore.filmReel.add(this.reel).then(()=>{

                this.reel.finalFilm = ""

                //refresh page
                setTimeout(function() {
                    document.location.reload();
                });
            })
        },
        remove(e) {
            console.log(e.screenGrabs);

            //deleting screenGrab directory in storage

            if(confirm("Are you sure you want to delete " + e.title + "?")) {
                //deleting item from database
                this.$firestore.items.doc(e['.key']).delete().then(
                    function() {
                        alert("Project deleted");
                        //refresh page
                        document.location.reload();       
                    }
                )
            }
            else {
                //alert("Project was not deleted");
            }


            /* ---------- TODO ---------- */


            /*for(let i = 0; i < e.screenGrabs.length; i++) {
                firebase.storage().ref().child(e.imgPaths[i]).delete().then(function() {
                    console.log("Image deleted successfully");
                }).catch(function(error) {
                    console.error("Image not deleted successfully");
                });
            }*/
        },
        newCredit() {
            this.item.credits.push(
                {
                    role: "",
                    name: ""
                }
            );
        },
        newScreenGrab() {
            //console.log("pushed new screengrab")
        },
        handleUpload(e) {
            console.log("...handling screengrab upload for " + this.item.title);

            var parentObj = this;

            var file = e.target.files[0];

            var imgPath = this.item.title + "/" + file.name;

            //create a storage ref
            var storageRef = firebase.storage().ref(imgPath);

            //upload file
            var task = storageRef.put(file);

            //update progress bar
            task.on('state_changed', 
            
                function progress(snapshot) {
                    //var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   //uploader.value = percentage;
                },
                function error(err) {
                    
                },
                function complete() {
                    //console.log(storageRef.child(imgPath).getDownloadURL().getResults());

                    task.snapshot.ref.getDownloadURL().then(
                        function(downloadURL) {
                            console.log('File available at: ' + downloadURL)
                            parentObj.item.screenGrabs.push(
                                downloadURL + ""
                            );
                            console.log('screenGrabs' + parentObj.item.screenGrabs);
                        }
                    )

                    //console.log("screenGrabs: " + parentObj.item.screenGrabs);
                }
            
            )

        },
        handlePhotoUpload(e) {
            console.log("...handling photo upload");

            var parentObj = this;

            var file = e.target.files[0];

            var imgPath = this.item.title + "/" + file.name;

            //create a storage ref
            var storageRef = firebase.storage().ref(imgPath);

            //upload file
            var task = storageRef.put(file);

            //update progress bar
            task.on('state_changed', 
            
                function progress(snapshot) {
                    //var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   //uploader.value = percentage;
                },
                function error(err) {
                    
                },
                function complete() {
                    //console.log(storageRef.child(imgPath).getDownloadURL().getResults());

                    task.snapshot.ref.getDownloadURL().then(
                        function(downloadURL) {
                            console.log('File available at: ' + downloadURL)
                            parentObj.item.screenGrabs.push(
                                downloadURL + ""
                            );
                            console.log('screenGrabs' + parentObj.item.screenGrabs);
                        }
                    )

                    //console.log("screenGrabs: " + parentObj.item.screenGrabs);
                }
            
            )

        },
        handleFilmUpload(e) {
            console.log("...handling film upload for " + this.item.title);

            var parentObj = this;

            var file = e.target.files[0];

            var filmPath = this.item.title + "/" + file.name;

            //create a storage ref
            var storageRef = firebase.storage().ref(filmPath);

            //upload file
            var task = storageRef.put(file);

            //update progress bar
            task.on('state_changed', 
            
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;

                    if(percentage == 100) {
                        //uploader.style.background = "#66BB6A";
                    }
                },
                function error(err) {
                    
                },
                function complete() {
                    //console.log(storageRef.child(imgPath).getDownloadURL().getResults());

                    task.snapshot.ref.getDownloadURL().then(
                        function(downloadURL) {
                            console.log('File available at: ' + downloadURL)
                            parentObj.item.finalFilm = downloadURL + ""
                        }
                    )

                    console.log("video: " + parentObj.item.screenGrabs);
                }
            )
        },

        handleReelUpload(e) {
            console.log("...handling reel upload for ");

            var parentObj = this;

            var file = e.target.files[0];

            var filmPath = "Reel/" + file.name;

            //create a storage ref
            var storageRef = firebase.storage().ref(filmPath);

            //upload file
            var task = storageRef.put(file);

            //update progress bar
            task.on('state_changed', 
            
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;

                    if(percentage == 100) {
                        //uploader.style.background = "#66BB6A";
                    }
                },
                function error(err) {
                    
                },
                function complete() {
                    //console.log(storageRef.child(imgPath).getDownloadURL().getResults());

                    task.snapshot.ref.getDownloadURL().then(
                        function(downloadURL) {
                            console.log('File available at: ' + downloadURL)
                            parentObj.reel.finalFilm = downloadURL + ""
                        }
                    )
                }
            )
        },

        toggleHome() {
            //alert('Home');
            this.filmWindowActive = false;
            this.photoWindowActive = false;
            this.settingsWindowActive = false;
            this.reelWindowActive = false;
            this.homeActive = true;
        },
        toggleFilm() {
            //alert('Film section');
            if(this.filmWindowActive) {
                this.homeActive = true;
                console.log('home? ' + this.homeActive);
            }
            else {
                this.homeActive = false;
            }
            this.filmWindowActive = !this.filmWindowActive;
            this.settingsWindowActive = false;
            this.photoWindowActive = false;
            this.reelWindowActive = false;
        },
        toggleReel() {
            //alert('Film section');
            if(this.reelWindowActive) {
                this.homeActive = true;
                console.log('home? ' + this.homeActive);
            }
            else {
                this.homeActive = false;
            }
            this.reelWindowActive = !this.reelWindowActive;
            this.settingsWindowActive = false;
            this.photoWindowActive = false;
            this.filmWindowActive = false;
        },
        togglePhoto() {
            //alert('Photo section');
            if(this.photoWindowActive) {
                this.homeActive = true;
            }
            else {
                this.homeActive = false;
            }
            this.photoWindowActive = !this.photoWindowActive;
            this.settingsWindowActive = false;
            this.filmWindowActive = false;
            this.reelWindowActive = false;
        },
        toggleSettings() {
            //alert('Settings section');
            if(this.settingsWindowActive) {
                this.homeActive = true;
            }
            else {
                this.homeActive = false;
            }
            this.settingsWindowActive = !this.settingsWindowActive;
            this.photoWindowActive = false;
            this.filmWindowActive = false;
            this.reelWindowActive = false;
        }
    }
})