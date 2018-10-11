//test vue
let vm = new Vue({
    el: '#app',
    data: {
        title: 'Vue Running',
        loginEmail: '',
        loginPassword: '',
        isLogin : false,
        events : [],

        
    },
    created: function () {
        axios.get('http://localhost:3000/events', {})
            .then(result => {
                this.events = result.data
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        login: function () {
            let self = this

            axios.post('http://localhost:3000/users/login', {
                    email: self.loginEmail,
                    password: self.loginPassword,
                })
                .then((result) => {
                    console.log(result)
                    localStorage.setItem('token',result.data.token)
                    self.isLogin = true
                }).catch((err) => {
                    console.log(err)
                });

        },

        logout :function(){

        }


    },
    watch: {


    },

})