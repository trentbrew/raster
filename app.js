// Change the configurations.  

//lazy login
var lazy = '0106';

console.log(document.body.style.opacity = 1);

if(/*prompt('Enter pin:') == lazy*/ true) {
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

firebase.firestore().collection("bio").orderBy("timestamp");

// Initialize the FirebaseUI Widget using Firebase.
//var ui = new firebaseui.auth.AuthUI(firebase.auth());

new Vue({
    el: "#app",
    firestore() {
        return {
            bio: firebase.firestore().collection("bio"),
            photos: firebase.firestore().collection("photos"),
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
            screengrabWindowActive: false,
            showPhotos: true,
            updateActive: false,
            focus: 0,
            auth: '',
            uploadProgress: 0,
            progressBuffer: [0,0],
            newBio: {
                timestamp: "",
                photo: "",
                text: ""
            },
            stagedItems: [], //array of staged objects
            //avgProgress: 0,
            uploadDone: false,
            photoCount: 1,
            photo: {
                src: "",
                srcSmall: "",
                timestamp: ""
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
                ],
                timestamp: ""
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

        //this.$firestore.photos.orderBy("timestamp");

    },

    created: function() {
        console.log('after authentication');
        
        this.setBio();
        this.setItems();

        //this.newBio.text = firebase.firestore().bio.doc("bio").text;
    },
    methods: {
        setBio() {
            this.$firestore.bio.doc("bio").get().then((doc)=>{
                this.newBio.text = doc.data().text;
                this.newBio.photo = doc.data().photo;
            });
        },
        setItems() {
            this.$firestore.items.get().then((collection) => {
                //console.log(collection.docs);
                for(let i = 0; i < collection.docs.length; i++) {
                    //console.log(collection.docs[i].data().title);
                
                    //----- adding in dynamic data for project update forms -----

                    this.stagedItems.push(collection.docs[i].data());
                    //this.updateActive.push(collection.docs[i].data().title);
                    //this.updateActive[i].push();
                }

                console.log("ITEMS: " + this.stagedItems);
            });
        },
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
                ],
                this.item.timestamp = Date.now()

                //refresh page
                setTimeout(function() {
                    document.location.reload();
                });
            })
        },
        addReel() {
            console.log(this.items)
            this.$firestore.filmReel.doc("reel").set(this.reel).then(()=>{

                this.reel.finalFilm = ""

                //refresh page
                setTimeout(function() {
                    document.location.reload();
                });
            })
        },
        addPhoto() {
            this.$firestore.photos.add(this.photo).then(()=>{

                this.photo = {
                    src: "",
                    timestamp: ""
                }

            })
        },
        addBio() {
            console.log('adding new bio');

            this.newBio.timestamp = Date.now();

            this.$firestore.bio.doc("bio").set(this.newBio).then(()=>{
                alert("Profile updated");
                this.toggleHome();
            })
        },
        stageUpdate(index, e) {
            //this.updateActive = true;
            //console.log("READY TO UPDATE");
            //console.log(i);
            //console.log(this.stagedItems[index].title);

            document.getElementById("update" + index).style.opacity = 1;
            document.getElementById("update" + index).style.pointerEvents = "all";
        },
        handleUpdate(index, e) {
            //console.log("updated " + e.title + " to " + this.stagedItems[index].title);

            this.$firestore.items.doc(e[".key"]).set(this.stagedItems[index]).then(()=>{

                //alert("Changes Saved");

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
        removePhoto(e) {
    
            //deleting screenGrab directory in storage

            console.log("target object: " + e.target);

            if(confirm("Are you sure you want to delete this photo?")) {
                //deleting item from database
                this.$firestore.photos.doc(e['.key']).delete().then(
                    function() {
                        //alert("Photo deleted");     
                    }
                )
            }
            else {
                //alert("Photo was not deleted");
            }

            //---------- TODO ----------

            //recursively remove files from storage

        },
        newCredit() {
            this.item.credits.push(
                {
                    role: "",
                    name: ""
                }
            );
        },
        handleNewScreenGrab(e) {
            console.log("...handling screengrab upload for " + e.target.id);

            //console.log(e.target.id.substring(10));

            var parentObj = this;
            var task = [];

            for(let i = 0; i < e.target.files.length; i++) {
                //push file into storage
                task.push(firebase.storage().ref(parentObj.stagedItems[e.target.id.substring(10)].title + "/" + e.target.files[i].name).put(e.target.files[i]));
            
                //update progress bar and handle onComplete
                task[i].on('state_changed', function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        var avgProgress;

                        parentObj.progressBuffer[1] = percentage;

                        if((i > 0)) {
                            avgProgress = parentObj.progressBuffer[1] - parentObj.progressBuffer[0];
                        }

                        //when done, turn green
                        if (percentage == 100) {
                            parentObj.uploadDone = true;
                        }

                        parentObj.uploadProgress = percentage;

                        parentObj.progressBuffer[0] = percentage;

                        //uploader.value = percentage;

                        console.log(percentage);
                    },
                    function error(err) {
                        
                    },
                    function complete() {
                        //console.log(storageRef.child(imgPath).getDownloadURL().getResults());

                        task[i].snapshot.ref.getDownloadURL().then(
                            function(downloadURL) {
                                console.log('File available at: ' + downloadURL)
                                
                                parentObj.stagedItems[e.target.id.substring(10)].screenGrabs.push(downloadURL + "");

                                console.log(parentObj.stagedItems[e.target.id.substring(10)].screenGrabs);
                                //parentObj.photoCount++;
                                //console.log(parentObj.photo);
                            }
                        )
                        //console.log("screenGrabs: " + parentObj.item.screenGrabs);

                        document.getElementById("update" + e.target.id.substring(10)).style.opacity = 1;
                        document.getElementById("update" + e.target.id.substring(10)).style.pointerEvents = "all";

                    }
                )
            }
        },
        handleScreengrabUpload(e) {
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
            var task = [];

            for(let i = 0; i < e.target.files.length; i++) {
                //push file into storage
                task.push(firebase.storage().ref("Photos/" + e.target.files[i].name).put(e.target.files[i]));
            
                //update progress bar and handle onComplete
                task[i].on('state_changed', function progress(snapshot) {


                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        var avgProgress;

                        parentObj.progressBuffer[1] = percentage;

                        if((i > 0)) {
                            avgProgress = parentObj.progressBuffer[1] - parentObj.progressBuffer[0];
                        }

                        //when done, turn green
                        if (percentage == 100) {
                            parentObj.uploadDone = true;
                        }

                        parentObj.uploadProgress = percentage;

                        parentObj.progressBuffer[0] = percentage;

                        //uploader.value = percentage;

                        console.log(percentage);
                    },
                    function error(err) {
                        
                    },
                    function complete() {
                        //console.log(storageRef.child(imgPath).getDownloadURL().getResults());

                        task[i].snapshot.ref.getDownloadURL().then(
                            function(downloadURL) {
                                console.log('File available at: ' + downloadURL)
                                
                                parentObj.photo = {
                                    src: downloadURL + "",
                                    timestamp: Date.now()
                                }
                                console.log(parentObj.photo);
                                //parentObj.photoCount++;
                                //console.log(parentObj.photo);
                                parentObj.addPhoto();
                            }
                        )
                        //console.log("screenGrabs: " + parentObj.item.screenGrabs);
                    }
                )
            }
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
                    
                    parentObj.uploadProgress = percentage;

                    if(percentage == 100) {
                        //uploader.style.background = "#66BB6A";
                        parentObj.uploadDone = true;
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
                    //uploader.value = percentage;

                    parentObj.uploadProgress = percentage;

                    if(percentage == 100) {
                        //uploader.style.background = "#66BB6A";
                        parentObj.uploadDone = true;
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

        handleProfileUpload(e) {
            console.log("...handling profile upload");

            var parentObj = this;

            var file = e.target.files[0];

            var path = "Profile/" + file.name;

            //create a storage ref
            var storageRef = firebase.storage().ref(path);

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
                            console.log('File available at: ' + downloadURL);
                            parentObj.newBio.photo = downloadURL + "";
                            e.target.parentElement.style.backgroundImage = "url(" + downloadURL + ")";
                        }
                    )
                }
            )
        },
        //----------COMPRESSION METHODS----------
        iamgeCompression() {

        },

        //----------NAVIGATION----------
        toggleHome() {
            //alert('Home');
            this.filmWindowActive = false;
            this.photoWindowActive = false;
            this.settingsWindowActive = false;
            this.reelWindowActive = false;
            this.screengrabWindowActive = false;
            this.homeActive = true;
            this.photoCount = 1;
            this.uploadDone = false;
            this.uploadProgress = 0;
            this.item.credits = [""];
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
            this.screengrabWindowActive = false;
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
            this.screengrabWindowActive = false;
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
            this.screengrabWindowActive = false;
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
            this.screengrabWindowActive = false;
        },
        toggleScreengrab(index) {
            //alert('Settings section');
            if(this.screengrabWindowActive) {
                this.homeActive = true;
            }
            else {
                this.homeActive = false;
            }
            this.screengrabWindowActive = !this.screengrabWindowActive;
            this.photoWindowActive = false;
            this.filmWindowActive = false;
            this.reelWindowActive = false;
            this.settingsWindowActive = false;

            console.log(this.stagedItems[index].screenGrabs);

            this.focus = index;
        }
    }
})