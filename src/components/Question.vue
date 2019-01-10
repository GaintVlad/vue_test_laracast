<template>
    <div>
        <div v-if="! editing">
        <h2 v-text="question_model.title"></h2>
        <p>{{question_model.body}}</p>

        <button id="edit" @click="edit()">Edit</button>
        </div>
        <div v-if="editing">
            <input type="text" name="title" placeholder="title" v-model="form.title"/>
            <br/>
            <textarea name="body" cols="30" rows="10" v-model="form.body" placeholder="body"></textarea>
            <br/>
            <button id="update" @click="update">Update</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>
        <p v-if="success">Your Question was updated successfully</p>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Question',
        props: ['question'],
        data() {
            return {
                question_model: this.question,
                editing: false,
                form: {
                    title:null, body:null
                },
                success: false
            }
        },
        computed: {},
        methods: {
            edit(){
                this.editing=true;
                this.form = Object.assign({}, this.question_model)
                this.success = false;
            },
            update() {
                this.editing=false
                axios.post('question/1', this.form)
                    .then(({data}) => {
                        this.question_model = Object.assign({}, data)
                        this.success = true;
                    })


            },
            cancel() {
                this.editing=false
                this.success = false;
            }
        }
    }
</script>
<style>
</style>
