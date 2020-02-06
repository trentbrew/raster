<template>
            <div class="content">
                <div class="section-left">
                    <div class="section-fixed">
    
                        <h2>New project</h2>
                        <div class="general-section">
                            <label>Project Title</label>
                            <input class="form-control" type="text" v-model="item.title" v-on:keyup.enter="add()">
                            <br>
                
                            <label>Genre</label>
                            <input class="form-control" type="text" v-model="item.genre" v-on:keyup.enter="add()">
                            <br>
                
                            <label>Summary</label>
                            <input class="form-control" type="text" v-model="item.summary" v-on:keyup.enter="add()">
                            <br>
                        </div>
    
                        <h2>Credits</h2>
    
                        <div class="credits-section">
                            <ul>
                                <li v-for="(c, index) in item.credits">
                                    <label class="left-label">Role</label>
                                    <input class="form-control" type="text" v-model="item.credits[index].role" v-on:keyup.enter="add()">
                                    <label>Name</label>
                                    <input class="form-control" type="text" v-model="item.credits[index].name" v-on:keyup.enter="add()">
                                </li>
                                <button class="btn" @click="newCredit()">Add another credit</button>
                            </ul>
                            <br>
                        </div>
    
                        <h2>Upload screengrabs (PNG, GIF, JPG, JPEG)</h2>
    
    
                        <div class="upload-section screengrabs-section">
                            <ul>
                                <li v-for="(s, index) in item.screenGrabs">
                                    <!--progress value="0" max="100" id="uploader">0%</progress-->
                                    <input @change="handleUpload" type="file" value="upload" class="fileButton" id="fileButton" />
                                </li>
                                <!--button class="btn btn-primary" @click="newScreenGrab()">Add another screengrab</button-->
                            </ul>
                            <br>
                        </div>
    
                        <h2>Upload final film (mp4)</h2>
    
                        <div class="upload-section final-film-section">
            
                            <ul>
                                <progress style="transition: 200ms" value="0" max="100" id="uploader">0%
                                </progress>
                                <input @change="handleFilmUpload" type="file" value="upload" class="fileButton" id="fileButtonFilm" />
                            </ul>
                            <br>
                        </div>
            
                        <button class="btn btn-primary" @click="add()">Add to portfolio</button>
                    </div>
                </div>
    
                <div class="section-right">
                    <ul class="list-group">
                        <li class="list-group-item project-item" v-for="(i, index) in items" :id="'vid' + index">
                            <button style="float: right" @click="remove(i)" class="badge">Remove from portfolio</button>
                            <div class="vid-section">
                                
                                <video controls autoplay muted>
                                    <source :src="i.finalFilm" type="video/mp4" />
                                </video>
                                <div class="vid-text">
                                    <h1>{{i.title}}</h1>
                                    <strong><p style="opacity:0.5">{{i.genre}}</p></strong>
                                    <p class="summary">{{i.summary}}</p>
                                </div>
                            </div>
                            <br>
                            <ul style="display: inline-flex; list-style: none; padding: 0px" class="images">
                                <li v-for="(p, index) in i.screenGrabs">
                                    <img :src="p" />
                                </li>
                            </ul>
                            <br>
                            <p class="credit" style="display: inline-flex" v-for="(c, index) in i.credits"><span>{{c.role}}</span>&nbsp;<strong>{{c.name}}</strong>&nbsp;</p>
                        </li>
                    </ul>
                </div>
            </div>
</template>