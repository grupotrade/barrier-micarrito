export const states = {
    list: []
}

export const actions = {
    async registerUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            this.$fire.auth.createUserWithEmailAndPassword(payload.email, payload.password).then(data => {
                    const collection = this.$fire.firestore.collection('users')
                    const mailcollection = this.$fire.firestore.collection('mails')
                    collection.doc(data.user.uid).set({
                        displayName: payload.name +' '+ payload.lastName,
                        name: payload.name,
                        lastName: payload.lastName,
                        state: payload.email,
                        city: payload.city,
                        group: payload.group,
                        email: payload.email,
                        role: 'public',
                        enable: false,
                        deleted_at: "",
                    })
                    mailcollection.add({
                        to: payload.email,
                        message: {
                          subject: 'Bienvenido a Barrier Clima',
                          html: '<h3>¡Felicitaciones!</h3> <p>Ya estás registrado a la <strong>Plataforma de Gestión de Contenidos de SIM Gift Box</strong>, by Trade Design</p><p>Por cualquier inquietud o consulta, puedes comunicarte con nosotros a través del siguiente mail: hola@trade-design.com.ar</p><p>Saludos,</p><p>El Equido de Trade Design</p>'
                        }
                      })
                      this.$fire.auth().currentUser.sendEmailVerification()
                        .then(() => {
                            // Email verification sent!
                            // ...
                        });
                    resolve("Usuario registrado con éxito.")
                  }, error => {
                    reject('Error al registrarse')
                });        
        })
    },
    async createUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            this.$fire.auth.createUserWithEmailAndPassword(payload.email, payload.password).then(data => {
                    const collection = this.$fire.firestore.collection('users')
                    const mailcollection = this.$fire.firestore.collection('mails')
                    collection.doc(data.user.uid).set({
                        displayName: payload.name +' '+ payload.lastName,
                        name: payload.name,
                        lastName: payload.lastName,
                        email: payload.email,
                        group: payload.group,
                        role: 'admin',
                        enable: true,
                        deleted_at: "",
                    })
                    mailcollection.add({
                        to: payload.email,
                        message: {
                            subject: 'Bienvenido a SIM Gift Box',
                            html: '<h3>¡Felicitaciones!</h3> <p>Ya estás registrado a la <strong>Plataforma de Gestión de Contenidos de SIM Gift Box</strong>, by Trade Design</p><p>Por cualquier inquietud o consulta, puedes comunicarte con nosotros a través del siguiente mail: hola@trade-design.com.ar</p><p>Saludos,</p><p>El Equido de Trade Design</p>'
                          }
                      })
                    resolve("Usuario creado con éxito.")
                  }, error => {
                    reject('Error al crear usuario'+error)
                });        
        })
    },
    listUsers({commit}) {
        return new Promise((resolve, reject) => {
            let users = []
            const ref = this.$fire.firestore.collection('users')
            ref.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    item.id = doc.id
                    users.push(item)
                })
                    
                commit('setUser', users)
                resolve(users)
            }, error => {
                reject('Error al listar los usuarios')
            })
            
        })
    },
    subscribeEmail({}, payload) {
        return new Promise((resolve, reject) => {
            this.$fire.firestore
                .collection('newsletter')
                .add(payload)
                .then(() => {
                    resolve()
                    this.$fire.firestore
                    .collection('mails')
                    .add({
                        to: payload.email,
                        message: {
                            subject: 'Newsletter SIM GIFTBOX - Suscripción confirmada',
                            html: '<h4>¡Gracias por unirte!</h4><p>En unos minutos recibirás un nuevo correo con el enlace del descargable.</p><p>Si tienes cualquier duda o podemos ayudarte con tus regalos, no dudes en escribirnos a hola@sim-giftbox.com o llamarnos al +54 9 11 2611-7588</p><p>Hasta pronto!</p><p>El equipo de SIM GIFT BOX</p>'
                          }
                      })
                    .then(() => {
                        resolve()
                        this.$fire.firestore
                    .collection('mails')
                    .add({
                        to: 'hola@sim-giftbox.com',
                        message: {
                            subject: 'Nuevo Usuario Registrado al Newsletter SIM',
                            html: 'Un nuevo usuario se ha registrado al newsletter. <br>El usuario '+payload.email+' espera que le envíes un archivo descargable'
                          }
                      })
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        
    }
}

export const mutations = {
    setUser (state, payload) {
        state.list = JSON.parse(JSON.stringify(payload))
    }
}

export const getters = {
    getUsers: (state) => {
        return state.list
    }
}