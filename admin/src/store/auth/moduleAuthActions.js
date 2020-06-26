  import router from '@/router'

export default {
  loginAttempt({ dispatch }, payload) {
    let errorMsg = 'El usuario no existe';
    for (let Employee of payload.allEmployees) {
      if (payload.LoginData.user == Employee.user) {
        let realPass = payload.decodePass(Employee.password);
        if (payload.LoginData.password == realPass) {
          var User = Employee;
        } else {
          errorMsg = 'Contraseña incorrecta';
        }
        break;
      }
    }
    if (typeof User != 'undefined') {
      let newPayload = {
        User,
        notify: payload.notify,
        closeAnimation: payload.closeAnimation
      };
      dispatch('login', newPayload)
    } else {
      if(payload.closeAnimation) payload.closeAnimation()
      payload.notify('danger', 'Error', errorMsg);
    }
  },
  login({ commit, state, dispatch }, payload) {

    localStorage.userID = payload.User.id;
    // localStorage.User = JSON.stringify(payload.User);

    // Close animation if passed as payload
    if(payload.closeAnimation) payload.closeAnimation()
    payload.notify('success', 'Ingresaste',
      `¡Bienvenid${payload.User.isFemale ? 'a' : 'o'} <b>${payload.User.nick}</b>!`
    );
    // if username update is not required
    // just reload the page to get fresh data
    // set new user data in localstorage
    router.push(router.currentRoute.query.to || '/');


    // if (state.isUserLoggedIn()) {
    //   // Close animation if passed as payload
    //   if(payload.closeAnimation) payload.closeAnimation()
    //   payload.notify({
    //     title: 'Login Attempt',
    //     text: 'You are already logged in!',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   });
    //   return false
    // }
    // Set FLAG username update required for updating username
    // let isUsernameUpdateRequired = false;

    // if username is provided and updateUsername FLAG is true
    // set local username update FLAG to true
    // try to update username
    // if(payload.updateUsername && payload.userDetails.username) {
    //
    //   isUsernameUpdateRequired = true;
    //
    //   dispatch('updateUsername', {
    //     user: result.user,
    //     username: payload.userDetails.username,
    //     notify: payload.notify,
    //     isReloadRequired: true
    //   })
    // }

    // if(!isUsernameUpdateRequired) {
    //   commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
    // }

    }, // login

































    registerUser({dispatch}, payload) {

        // create user using firebase
        firebase.auth().createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
            .then(() => {
                payload.notify({
                    title: 'Account Created',
                    text: 'You are successfully registered!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                });

                const newPayload = {
                    userDetails: payload.userDetails,
                    notify: payload.notify,
                    updateUsername: true
                }
                dispatch('login', newPayload)
            }, (error) => {
                payload.notify({
                    title: 'Error',
                    text: error.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            })
    },
    updateUsername({ commit }, payload) {
        payload.user.updateProfile({
            displayName: payload.username
        }).then(() => {

            // If username update is success
              // update in localstorage
            let newUserData = Object.assign({}, payload.user.providerData[0])
            newUserData.displayName = payload.username
            commit('UPDATE_AUTHENTICATED_USER', newUserData)

            // If reload is required to get fresh data after update
              // Reload current page
            if(payload.isReloadRequired) {
                router.push(router.currentRoute.query.to || '/')
            }
        }).catch((err) => {
              payload.notify({
                time: 8800,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            });
        })
    },
    updateAuthenticatedUser({ commit }, payload) {
        commit('UPDATE_AUTHENTICATED_USER', payload)
    }
}
